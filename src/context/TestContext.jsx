import { createContext, useContext, useState, useCallback } from 'react'
import { 
  doc, 
  collection, 
  addDoc, 
  updateDoc, 
  getDoc, 
  query, 
  where, 
  orderBy, 
  getDocs,
  serverTimestamp 
} from 'firebase/firestore'
import { db } from '../services/firebase'
import { questionsPool } from '../data/questions'
import { calculateScore } from '../services/scoring'
import { useAuth } from './AuthContext'

const TestContext = createContext()

export function useTest() {
  return useContext(TestContext)
}

export function TestProvider({ children }) {
  const { user } = useAuth()
  const [currentAttempt, setCurrentAttempt] = useState(null)
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeRemaining, setTimeRemaining] = useState(600)
  const [testStatus, setTestStatus] = useState('idle')
  
  const TEST_DURATION = 600

  const selectRandomQuestions = useCallback(() => {
    const areas = ['matematica', 'linguistica', 'espacial', 'logica', 'cultura']
    const selected = []

    const DIFFICULTY_TARGETS = {
      1: 1,
      2: 2,
      3: 2
    }

    const shuffle = (list) => [...list].sort(() => Math.random() - 0.5)

    areas.forEach(area => {
      const areaQuestions = questionsPool.filter(q => q.area === area)
      const byDifficulty = {
        1: areaQuestions.filter(q => q.difficulty === 1),
        2: areaQuestions.filter(q => q.difficulty === 2),
        3: areaQuestions.filter(q => q.difficulty === 3)
      }

      const areaSelected = []
      Object.entries(DIFFICULTY_TARGETS).forEach(([difficulty, count]) => {
        const bucket = byDifficulty[difficulty] || []
        areaSelected.push(...shuffle(bucket).slice(0, count))
      })

      if (areaSelected.length < 5) {
        const usedIds = new Set(areaSelected.map(q => q.id))
        const remaining = areaQuestions.filter(q => !usedIds.has(q.id))
        areaSelected.push(...shuffle(remaining).slice(0, 5 - areaSelected.length))
      }

      selected.push(...areaSelected)
    })

    return shuffle(selected)
  }, [])

  const startTest = useCallback(async () => {
    if (!user) return { success: false, error: 'Usuario no autenticado' }
    
    try {
      const selectedQuestions = selectRandomQuestions()
      const expiresAt = new Date(Date.now() + TEST_DURATION * 1000)
      
      const attemptRef = await addDoc(collection(db, 'attempts'), {
        userId: user.uid,
        userEmail: user.email,
        userName: user.displayName,
        startedAt: serverTimestamp(),
        expiresAt: expiresAt.toISOString(),
        status: 'in_progress',
        questionIds: selectedQuestions.map(q => q.id),
        questionSnapshot: selectedQuestions,
        answers: {},
        remainingTimeAtLastSync: TEST_DURATION,
        finalScore: null,
        areaScores: null,
        personalitySummary: null,
        resultSummary: null,
        createdAt: serverTimestamp()
      })

      const attempt = {
        id: attemptRef.id,
        expiresAt: expiresAt.toISOString(),
        questions: selectedQuestions,
        status: 'in_progress'
      }

      setCurrentAttempt(attempt)
      setQuestions(selectedQuestions)
      setAnswers({})
      setCurrentIndex(0)
      setTimeRemaining(TEST_DURATION)
      setTestStatus('active')

      return { success: true, attemptId: attemptRef.id }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }, [user, selectRandomQuestions])

  const resumeTest = useCallback(async (attemptId) => {
    try {
      const attemptDoc = await getDoc(doc(db, 'attempts', attemptId))
      
      if (!attemptDoc.exists()) {
        return { success: false, error: 'Intento no encontrado' }
      }

      const data = attemptDoc.data()
      
      if (data.userId !== user?.uid) {
        return { success: false, error: 'No tienes acceso a este intento' }
      }

      if (data.status === 'completed') {
        return { success: false, error: 'Este test ya fue completado' }
      }

      const expiresAt = new Date(data.expiresAt)
      const now = new Date()
      
      if (now >= expiresAt) {
        await updateDoc(doc(db, 'attempts', attemptId), {
          status: 'expired'
        })
        return { success: false, error: 'El tiempo ha expirado' }
      }

      const remainingSeconds = Math.floor((expiresAt - now) / 1000)
      
      setCurrentAttempt({
        id: attemptId,
        expiresAt: data.expiresAt,
        questions: data.questionSnapshot,
        status: 'in_progress'
      })
      setQuestions(data.questionSnapshot || [])
      setAnswers(data.answers || {})
      setCurrentIndex(0)
      setTimeRemaining(remainingSeconds)
      setTestStatus('active')

      return { success: true, attemptId }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }, [user])

  const saveAnswer = useCallback(async (questionId, answer) => {
    const newAnswers = { ...answers, [questionId]: answer }
    setAnswers(newAnswers)

    if (currentAttempt) {
      try {
        await updateDoc(doc(db, 'attempts', currentAttempt.id), {
          answers: newAnswers,
          remainingTimeAtLastSync: timeRemaining,
          updatedAt: serverTimestamp()
        })
      } catch (error) {
        console.error('Error al guardar respuesta:', error)
      }
    }
  }, [answers, currentAttempt, timeRemaining])

  const finishTest = useCallback(async () => {
    if (!currentAttempt) {
      console.error('No hay intento activo')
      return null
    }

    const attemptId = currentAttempt.id
    const userEmail = user?.email || 'unknown@example.com'
    const userName = user?.displayName || 'Usuario'
    
    const result = calculateScore(questions, answers)
    
    const cleanUndefined = (obj) => {
      if (obj === null || obj === undefined) return obj
      if (typeof obj !== 'object') return obj
      if (Array.isArray(obj)) {
        return obj.map(item => cleanUndefined(item))
      }
      const cleaned = {}
      Object.entries(obj).forEach(([key, value]) => {
        if (value !== undefined) {
          cleaned[key] = cleanUndefined(value)
        }
      })
      return cleaned
    }
    
    try {
      const questionDetails = questions.map(q => ({
        id: q.id,
        area: q.area,
        prompt: q.prompt,
        options: q.options,
        correctAnswer: q.correctAnswer,
        userAnswer: answers[q.id],
        isCorrect: answers[q.id] === q.correctAnswer,
        explanation: q.explanation || 'No hay explicación disponible.'
      }))
      
      const updateData = {
        status: 'completed',
        finishedAt: serverTimestamp(),
        answers,
        questionDetails,
        finalScore: result.totalScore,
        areaScores: result.areaScores,
        resultSummary: result.summary,
        timeUsed: TEST_DURATION - timeRemaining,
        updatedAt: serverTimestamp()
      }
      
      const cleanedUpdateData = cleanUndefined(updateData)
      
      await updateDoc(doc(db, 'attempts', attemptId), cleanedUpdateData)

      setTestStatus('completed')

      return {
        ...result,
        attemptId,
        timeUsed: TEST_DURATION - timeRemaining,
        questionDetails,
        userEmail,
        userName
      }
    } catch (error) {
      console.error('Error al finalizar test:', error)
      return { attemptId, error: error.message }
    }
  }, [currentAttempt, questions, answers, timeRemaining, user])

  const getActiveAttempt = useCallback(async () => {
    if (!user) return null

    try {
      const q = query(
        collection(db, 'attempts'),
        where('userId', '==', user.uid),
        where('status', '==', 'in_progress'),
        orderBy('startedAt', 'desc')
      )
      
      const snapshot = await getDocs(q)
      
      if (!snapshot.empty) {
        return snapshot.docs[0].id
      }
      
      return null
    } catch (error) {
      console.error('Error al buscar intento activo:', error)
      return null
    }
  }, [user])

  const getAttemptHistory = useCallback(async () => {
    if (!user) return []

    try {
      const q = query(
        collection(db, 'attempts'),
        where('userId', '==', user.uid),
        where('status', '==', 'completed'),
        orderBy('finishedAt', 'desc')
      )
      
      const snapshot = await getDocs(q)
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    } catch (error) {
      console.error('Error al obtener historial:', error)
      return []
    }
  }, [user])

  const getAttemptById = useCallback(async (attemptId) => {
    try {
      const docSnap = await getDoc(doc(db, 'attempts', attemptId))
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() }
      }
      
      return null
    } catch (error) {
      console.error('Error al obtener intento:', error)
      return null
    }
  }, [])

  const value = {
    currentAttempt,
    questions,
    currentIndex,
    setCurrentIndex,
    answers,
    timeRemaining,
    setTimeRemaining,
    testStatus,
    startTest,
    resumeTest,
    saveAnswer,
    finishTest,
    getActiveAttempt,
    getAttemptHistory,
    getAttemptById,
    TEST_DURATION
  }

  return (
    <TestContext.Provider value={value}>
      {children}
    </TestContext.Provider>
  )
}
