import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTest } from '../context/TestContext'
import Timer from '../components/test/Timer'
import Question from '../components/test/Question'
import Progress from '../components/test/Progress'
import Loading from '../components/ui/Loading'

export default function Test() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const {
    currentAttempt,
    questions,
    currentIndex,
    setCurrentIndex,
    answers,
    saveAnswer,
    timeRemaining,
    setTimeRemaining,
    testStatus,
    startTest,
    resumeTest,
    finishTest,
    TEST_DURATION
  } = useTest()

  const [loading, setLoading] = useState(true)
  const [finishing, setFinishing] = useState(false)

  useEffect(() => {
    const initTest = async () => {
      const resumeId = searchParams.get('resume')
      
      if (resumeId) {
        const result = await resumeTest(resumeId)
        if (!result.success) {
          const startResult = await startTest()
          if (startResult.success) {
            navigate('/test')
          } else {
            navigate('/dashboard')
          }
        }
      } else if (!currentAttempt) {
        const result = await startTest()
        if (!result.success) {
          navigate('/dashboard')
        }
      }
      setLoading(false)
    }

    initTest()
  }, [])

  useEffect(() => {
    if (testStatus !== 'active') return

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          handleFinish()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [testStatus])

  const handleFinish = useCallback(async () => {
    if (finishing) return
    setFinishing(true)
    
    const result = await finishTest()
    
    if (result) {
      navigate(`/results/${result.attemptId}`)
    } else {
      navigate('/dashboard')
    }
  }, [finishTest, navigate, finishing])

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }, [currentIndex, questions.length, setCurrentIndex])

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }, [currentIndex, setCurrentIndex])

  const handleAnswer = useCallback((answer) => {
    const question = questions[currentIndex]
    if (question) {
      saveAnswer(question.id, answer)
    }
  }, [questions, currentIndex, saveAnswer])

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100
  const answeredCount = Object.keys(answers).length

  if (loading) return <Loading />

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl mb-4">Cargando preguntas...</p>
          <Loading />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col">
      <header className="bg-dark-800 border-b border-dark-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <span className="text-white font-semibold hidden sm:block">TestInteligencia</span>
            </div>
          </div>
          
          <Timer timeRemaining={timeRemaining} totalTime={TEST_DURATION} />
          
          <div className="text-sm text-gray-400">
            <span className="text-white font-semibold">{answeredCount}</span>/{questions.length}
          </div>
        </div>
        
        <Progress current={currentIndex + 1} total={questions.length} percentage={progress} />
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          <Question
            question={currentQuestion}
            currentIndex={currentIndex}
            totalQuestions={questions.length}
            selectedAnswer={answers[currentQuestion.id]}
            onAnswer={handleAnswer}
            onNext={handleNext}
            onPrev={handlePrev}
            onFinish={handleFinish}
            isLast={currentIndex === questions.length - 1}
            finishing={finishing}
          />
        </div>
      </main>

      <footer className="bg-dark-800 border-t border-dark-700 py-4 px-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Anterior
          </button>
          
          <div className="flex gap-1">
            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentIndex
                    ? 'bg-primary w-4'
                    : answers[questions[i].id] !== undefined
                    ? 'bg-secondary'
                    : 'bg-dark-600 hover:bg-dark-500'
                }`}
              />
            ))}
          </div>
          
          {currentIndex === questions.length - 1 ? (
            <button
              onClick={handleFinish}
              disabled={finishing}
              className="btn-danger flex items-center gap-2 text-sm px-4 py-2"
            >
              {finishing ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Finalizando...
                </>
              ) : (
                <>
                  Finalizar
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="text-gray-400 hover:text-white flex items-center gap-2 text-sm transition-colors"
            >
              Siguiente
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </footer>
    </div>
  )
}
