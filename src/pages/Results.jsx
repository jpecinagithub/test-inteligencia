import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTest } from '../context/TestContext'
import { sendResultsByEmail } from '../services/api'
import Loading from '../components/ui/Loading'

export default function Results() {
  const { attemptId } = useParams()
  const { user } = useAuth()
  const { getAttemptById } = useTest()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [results, setResults] = useState(null)
  const [sendingEmail, setSendingEmail] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [targetEmail, setTargetEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [sendStatus, setSendStatus] = useState({ state: 'idle', message: '', email: '', id: '' })
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    const loadResults = async () => {
      try {
        const attempt = await getAttemptById(attemptId)
        
        if (!attempt) {
          navigate('/dashboard')
          return
        }

        if (user && attempt.userId !== user.uid) {
          navigate('/dashboard')
          return
        }

        if (attempt.finalScore === null || attempt.finalScore === undefined) {
          navigate('/dashboard')
          return
        }

        const finalResults = {
          totalScore: attempt.finalScore,
          iqEstimate: Math.round(75 + (attempt.finalScore * 0.5)),
          areaScores: attempt.areaScores,
          summary: attempt.resultSummary,
          timeUsed: attempt.timeUsed,
          attemptId: attempt.id,
          finishedAt: attempt.finishedAt?.toDate?.() || new Date(),
          userName: user?.displayName || 'Usuario',
          questionDetails: attempt.questionDetails || [],
          testType: attempt.testType || 'amateur'
        }

        setResults(finalResults)
        setTargetEmail((user?.email || '').trim())
      } catch (error) {
        console.error('Error loading results:', error)
        navigate('/dashboard')
      }
      
      setLoading(false)
    }

    loadResults()
  }, [attemptId, user, getAttemptById, navigate])

  const handleOpenEmailForm = () => {
    setShowEmailForm(true)
    setSendStatus({ state: 'idle', message: '', email: '', id: '' })
    setEmailError('')
  }

  const handleCloseEmailForm = () => {
    setShowEmailForm(false)
    setEmailError('')
    setSendStatus({ state: 'idle', message: '', email: '', id: '' })
  }

  const isValidEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  }

  const handleSendEmail = async () => {
    const email = targetEmail.trim()
    setEmailError('')
    setSendStatus({ state: 'idle', message: '', email: '', id: '' })

    if (!email) {
      setEmailError('Escribe un correo válido.')
      return
    }

    if (!isValidEmail(email)) {
      setEmailError('El correo no tiene un formato válido.')
      return
    }

    setSendingEmail(true)
    setSendStatus({ state: 'sending', message: 'Enviando...', email, id: '' })
    const result = await sendResultsByEmail(email, results)
    if (result.success) {
      setEmailSent(true)
      setShowEmailForm(false)
      setSendStatus({
        state: 'success',
        message: result.data?.message || 'Email enviado correctamente.',
        email,
        id: result.data?.id || ''
      })
    } else {
      setSendStatus({
        state: 'error',
        message: result.error || 'No se pudo enviar el email.',
        email,
        id: ''
      })
    }
    setSendingEmail(false)
  }

  if (loading) return <Loading />

  if (!results) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl mb-4">Resultados no encontrados</p>
          <Link to="/dashboard" className="btn-primary">Volver al panel</Link>
        </div>
      </div>
    )
  }

  const { totalScore, iqEstimate, areaScores, summary, timeUsed, questionDetails, testType } = results
  const minutes = Math.floor(timeUsed / 60)
  const seconds = timeUsed % 60
  const testTypeLabel = testType === 'profesional' ? 'Profesional' : 'Amateur'

  const areaLabels = {
    matematica: { name: 'Matemática', icon: '🧮', color: 'secondary' },
    linguistica: { name: 'Lingüística', icon: '📝', color: 'primary' },
    espacial: { name: 'Espacial', icon: '👁️', color: 'warning' },
    logica: { name: 'Lógica', icon: '🧠', color: 'alert' },
    cultura: { name: 'Cultura', icon: '📚', color: 'purple' }
  }

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-secondary'
    if (percentage >= 60) return 'text-primary'
    if (percentage >= 40) return 'text-warning'
    return 'text-alert'
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <header className="bg-dark-800 border-b border-dark-700">
        <div className="max-w-4xl mx-auto px-4 py-3 sm:py-4">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="hidden xs:inline">Volver al panel</span>
            <span className="xs:hidden">Volver</span>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">¡Test Completado!</h1>
          <p className="text-gray-400 text-sm sm:text-base">
            {results.finishedAt.toLocaleDateString('es-ES', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
          <div className="mt-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
              {testTypeLabel}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <div className="card text-center p-3 sm:p-4">
            <div className="text-3xl sm:text-5xl font-bold text-primary mb-1 sm:mb-2">{totalScore}%</div>
            <p className="text-gray-400 text-xs sm:text-sm">Total</p>
          </div>
          
          <div className="card text-center p-3 sm:p-4">
            <div className="text-3xl sm:text-5xl font-bold text-secondary mb-1 sm:mb-2">{iqEstimate}</div>
            <p className="text-gray-400 text-xs sm:text-sm">CI</p>
          </div>
          
          <div className="card text-center p-3 sm:p-4">
            <div className="text-2xl sm:text-4xl font-bold text-warning mb-1 sm:mb-2">
              {minutes}<span className="text-base sm:text-xl">m</span> {seconds}<span className="text-base sm:text-xl">s</span>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm">Tiempo</p>
          </div>
        </div>

        <div className="card mb-4 sm:mb-8 p-3 sm:p-6">
          <h2 className="text-base sm:text-xl font-semibold text-white mb-4 sm:mb-6 flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Rendimiento
          </h2>
          
          <div className="space-y-3 sm:space-y-4">
            {Object.entries(areaScores)
              .filter(([, value]) => value && value.total > 0)
              .map(([area, scores]) => {
                const info = areaLabels[area] || { name: area, icon: '📊', color: 'gray' }
                return (
                  <div key={area} className="bg-dark-700/50 rounded-lg p-2 sm:p-4">
                    <div className="flex items-center justify-between mb-1 sm:mb-2">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <span className="text-sm sm:text-base">{info.icon}</span>
                        <span className="text-white font-medium text-sm sm:text-base">{info.name}</span>
                      </div>
                      <span className={`font-bold text-sm sm:text-base ${getScoreColor(scores.percentage)}`}>
                        {scores.percentage}%
                      </span>
                    </div>
                    <div className="h-1.5 sm:h-2 bg-dark-600 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          scores.percentage >= 80 ? 'bg-secondary' :
                          scores.percentage >= 60 ? 'bg-primary' :
                          scores.percentage >= 40 ? 'bg-warning' : 'bg-alert'
                        }`}
                        style={{ width: `${scores.percentage}%` }}
                      />
                    </div>
                    <p className="text-gray-500 text-xs mt-1 hidden sm:block">
                      {scores.correct} de {scores.total} correctas
                    </p>
                  </div>
                )
              })}
          </div>
        </div>

        <div className="card mb-4 sm:mb-8 p-3 sm:p-6">
          <h2 className="text-base sm:text-xl font-semibold text-white mb-3 sm:mb-4">Análisis</h2>
          
          <div className="bg-dark-700/50 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
            <span className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-2 sm:mb-3 ${
              totalScore >= 75 ? 'bg-secondary/20 text-secondary' :
              totalScore >= 50 ? 'bg-warning/20 text-warning' : 'bg-alert/20 text-alert'
            }`}>
              {summary?.overall || 'Completado'}
            </span>
            <p className="text-gray-300 text-sm sm:text-base">{summary?.message}</p>
          </div>

          {summary?.strengths?.length > 0 && (
            <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
              <h3 className="text-secondary font-medium mb-1 sm:mb-2 flex items-center gap-2 text-sm sm:text-base">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Fortalezas
              </h3>
              <p className="text-gray-300 text-sm">{summary.strengths.join(', ')}</p>
            </div>
          )}

          {summary?.improvements?.length > 0 && (
            <div className="bg-warning/10 border border-warning/30 rounded-lg p-3 sm:p-4">
              <h3 className="text-warning font-medium mb-1 sm:mb-2 flex items-center gap-2 text-sm sm:text-base">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Áreas de Mejora
              </h3>
              <p className="text-gray-300 text-sm">{summary.improvements.join(', ')}</p>
            </div>
          )}
        </div>

        <div className="card mb-4 sm:mb-8 p-3 sm:p-6">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full flex items-center justify-between text-left"
          >
            <h2 className="text-base sm:text-xl font-semibold text-white flex items-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Revisar Preguntas
            </h2>
            <svg 
              className={`w-5 h-5 text-gray-400 transition-transform ${showDetails ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {showDetails && questionDetails && questionDetails.length > 0 && (
            <div className="mt-4 space-y-4">
              {questionDetails.map((q, index) => {
                const areaInfo = areaLabels[q.area] || { name: q.area, icon: '📊' }
                const userAnswerIndex = q.userAnswer
                const isCorrect = q.isCorrect
                
                return (
                  <div 
                    key={q.id} 
                    className={`bg-dark-700/50 rounded-lg p-3 sm:p-4 border-l-4 ${
                      isCorrect ? 'border-secondary' : 'border-alert'
                    }`}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-dark-600 flex items-center justify-center text-xs text-gray-400">
                        {index + 1}
                      </span>
                      <span className="text-xs text-gray-500">{areaInfo.icon} {areaInfo.name}</span>
                      <span className={`ml-auto text-xs font-medium px-2 py-0.5 rounded ${
                        isCorrect 
                          ? 'bg-secondary/20 text-secondary' 
                          : 'bg-alert/20 text-alert'
                      }`}>
                        {isCorrect ? '✓ Correcta' : '✗ Incorrecta'}
                      </span>
                    </div>
                    
                    <p className="text-white text-sm sm:text-base mb-3">{q.prompt}</p>
                    
                    <div className="space-y-2 text-xs sm:text-sm">
                      <div className="flex items-start gap-2">
                        <span className="text-gray-500 min-w-[80px]">Tu respuesta:</span>
                        <span className={isCorrect ? 'text-secondary' : 'text-alert'}>
                          {userAnswerIndex !== undefined && q.options[userAnswerIndex] 
                            ? q.options[userAnswerIndex] 
                            : 'Sin responder'}
                        </span>
                      </div>
                      
                      {!isCorrect && (
                        <div className="flex items-start gap-2">
                          <span className="text-gray-500 min-w-[80px]">Correcta:</span>
                          <span className="text-secondary">
                            {q.options[q.correctAnswer]}
                          </span>
                        </div>
                      )}
                      
                      {q.explanation && (
                        <div className="mt-2 p-2 bg-dark-800/50 rounded text-gray-400 text-xs">
                          💡 {q.explanation}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
          
          {showDetails && (!questionDetails || questionDetails.length === 0) && (
            <p className="mt-4 text-gray-400 text-sm">No hay detalles disponibles.</p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={handleOpenEmailForm}
            disabled={emailSent}
            className={`flex-1 btn-primary flex items-center justify-center gap-2 py-3 sm:py-4 text-sm sm:text-base ${
              emailSent ? 'bg-secondary hover:bg-secondary' : ''
            }`}
          >
            {emailSent ? (
              <>
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Enviado
              </>
            ) : (
              <>
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Enviar por email
              </>
            )}
          </button>
          
          <Link to="/pre-test" className="btn-secondary flex-1 flex items-center justify-center gap-2 py-3 sm:py-4 text-sm sm:text-base">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Repetir Test
          </Link>
        </div>

        {showEmailForm && (
          <div className="mt-4 card p-3 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-end gap-3">
              <div className="flex-1">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Enviar resultados a
                </label>
                <input
                  type="email"
                  value={targetEmail}
                  onChange={(e) => setTargetEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all"
                  placeholder="correo@ejemplo.com"
                  autoComplete="email"
                />
                {emailError && (
                  <p className="text-xs text-alert mt-2">{emailError}</p>
                )}
              </div>
              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={handleSendEmail}
                  disabled={sendingEmail}
                  className="btn-primary px-4 py-3 text-sm sm:text-base"
                >
                  {sendingEmail ? 'Enviando...' : 'Enviar ahora'}
                </button>
                <button
                  onClick={handleCloseEmailForm}
                  className="btn-secondary px-4 py-3 text-sm sm:text-base"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {sendStatus.state !== 'idle' && (
          <div
            className={`mt-3 text-xs sm:text-sm rounded-lg border px-4 py-3 ${
              sendStatus.state === 'success'
                ? 'border-secondary/40 bg-secondary/10 text-secondary'
                : sendStatus.state === 'error'
                  ? 'border-alert/40 bg-alert/10 text-alert'
                  : 'border-primary/40 bg-primary/10 text-primary'
            }`}
          >
            <div className="font-semibold">
              {sendStatus.state === 'success' && 'Email enviado'}
              {sendStatus.state === 'error' && 'Error al enviar'}
              {sendStatus.state === 'sending' && 'Enviando email'}
            </div>
            <div className="mt-1">{sendStatus.message}</div>
            {sendStatus.email && (
              <div className="mt-1 text-gray-400">Destino: {sendStatus.email}</div>
            )}
            {sendStatus.id && (
              <div className="mt-1 text-gray-400">ID de envío: {sendStatus.id}</div>
            )}
          </div>
        )}
      </main>

      <footer className="py-6 sm:py-8 px-4 border-t border-dark-700 mt-4 sm:mt-8">
        <div className="max-w-4xl mx-auto text-center text-gray-500 text-xs sm:text-sm">
          <p>Este test es una herramienta informativa y no constituye un diagnóstico profesional.</p>
        </div>
      </footer>
    </div>
  )
}
