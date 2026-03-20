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
import { explanations } from '../data/explanations.js'
import { TEST_TYPES, DEFAULT_TEST_TYPE, TEST_AREAS } from '../data/testConfig'
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
  const [currentTestConfig, setCurrentTestConfig] = useState(TEST_TYPES[DEFAULT_TEST_TYPE])
  const [timeRemaining, setTimeRemaining] = useState(TEST_TYPES[DEFAULT_TEST_TYPE].duration)
  const [testStatus, setTestStatus] = useState('idle')

  const getTestConfig = useCallback((testType) => {
    return TEST_TYPES[testType] || TEST_TYPES[DEFAULT_TEST_TYPE]
  }, [])

  const selectRandomQuestions = useCallback((testType = DEFAULT_TEST_TYPE) => {
    const config = getTestConfig(testType)
    const selected = []

    const shuffle = (list) => [...list].sort(() => Math.random() - 0.5)

    TEST_AREAS.forEach(area => {
      const areaQuestions = questionsPool.filter(q => q.area === area)
      const perArea = config.questionsPerArea?.[area] || 0
      const byDifficulty = {
        1: areaQuestions.filter(q => q.difficulty === 1),
        2: areaQuestions.filter(q => q.difficulty === 2),
        3: areaQuestions.filter(q => q.difficulty === 3)
      }

      const areaSelected = []
      Object.entries(config.difficultyTargets || {}).forEach(([difficulty, count]) => {
        const bucket = byDifficulty[difficulty] || []
        areaSelected.push(...shuffle(bucket).slice(0, Math.min(count, bucket.length)))
      })

      if (areaSelected.length < perArea) {
        const usedIds = new Set(areaSelected.map(q => q.id))
        const remaining = areaQuestions.filter(q => !usedIds.has(q.id))
        areaSelected.push(...shuffle(remaining).slice(0, perArea - areaSelected.length))
      }

      if (areaSelected.length > perArea) {
        areaSelected.splice(perArea)
      }

      selected.push(...areaSelected)
    })

    return shuffle(selected)
  }, [getTestConfig])

  const startTest = useCallback(async (testType = DEFAULT_TEST_TYPE) => {
    if (!user) return { success: false, error: 'Usuario no autenticado' }
    
    try {
      const config = getTestConfig(testType)
      const selectedQuestions = selectRandomQuestions(testType)
      const totalDuration = config.duration
      const expiresAt = new Date(Date.now() + totalDuration * 1000)
      
      const attemptRef = await addDoc(collection(db, 'attempts'), {
        userId: user.uid,
        userEmail: user.email,
        userName: user.displayName,
        testType,
        totalDuration,
        questionsPerArea: config.questionsPerArea,
        totalQuestions: selectedQuestions.length,
        startedAt: serverTimestamp(),
        expiresAt: expiresAt.toISOString(),
        status: 'in_progress',
        questionIds: selectedQuestions.map(q => q.id),
        questionSnapshot: selectedQuestions,
        answers: {},
        remainingTimeAtLastSync: totalDuration,
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
        status: 'in_progress',
        testType,
        totalDuration
      }

      setCurrentAttempt(attempt)
      setQuestions(selectedQuestions)
      setAnswers({})
      setCurrentIndex(0)
      setCurrentTestConfig(config)
      setTimeRemaining(totalDuration)
      setTestStatus('active')

      return { success: true, attemptId: attemptRef.id }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }, [user, selectRandomQuestions, getTestConfig])

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
      const testType = data.testType || DEFAULT_TEST_TYPE
      const config = getTestConfig(testType)
      const totalDuration = data.totalDuration || config.duration
      
      setCurrentAttempt({
        id: attemptId,
        expiresAt: data.expiresAt,
        questions: data.questionSnapshot,
        status: 'in_progress',
        testType,
        totalDuration
      })
      setQuestions(data.questionSnapshot || [])
      setAnswers(data.answers || {})
      setCurrentIndex(0)
      setCurrentTestConfig({ ...config, duration: totalDuration })
      setTimeRemaining(remainingSeconds)
      setTestStatus('active')

      return { success: true, attemptId }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }, [user, getTestConfig])

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
    const totalDuration = currentAttempt?.totalDuration || currentTestConfig?.duration || TEST_TYPES[DEFAULT_TEST_TYPE].duration
    
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
        explanation: q.explanation || explanations[q.id] || 'No hay explicación disponible.'
      }))
      
      const updateData = {
        status: 'completed',
        finishedAt: serverTimestamp(),
        answers,
        questionDetails,
        finalScore: result.totalScore,
        areaScores: result.areaScores,
        resultSummary: result.summary,
        timeUsed: totalDuration - timeRemaining,
        updatedAt: serverTimestamp()
      }
      
      const cleanedUpdateData = cleanUndefined(updateData)
      
      await updateDoc(doc(db, 'attempts', attemptId), cleanedUpdateData)

      setTestStatus('completed')

      return {
        ...result,
        attemptId,
        timeUsed: totalDuration - timeRemaining,
        questionDetails,
        userEmail,
        userName
      }
    } catch (error) {
      console.error('Error al finalizar test:', error)
      return { attemptId, error: error.message }
    }
  }, [currentAttempt, currentTestConfig, questions, answers, timeRemaining, user])

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
    currentTestConfig
  }

  return (
    <TestContext.Provider value={value}>
      {children}
    </TestContext.Provider>
  )
}
