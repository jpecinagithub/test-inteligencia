import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTest } from '../context/TestContext'
import Loading from '../components/ui/Loading'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const { getActiveAttempt, getAttemptHistory } = useTest()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [activeAttempt, setActiveAttempt] = useState(null)
  const [history, setHistory] = useState([])
  const [loggingOut, setLoggingOut] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      const activeId = await getActiveAttempt()
      if (activeId) {
        setActiveAttempt(activeId)
      }
      const historyData = await getAttemptHistory()
      setHistory(historyData.slice(0, 5))
      setLoading(false)
    }
    loadData()
  }, [getActiveAttempt, getAttemptHistory])

  const handleResume = () => {
    if (activeAttempt) {
      navigate(`/test?resume=${activeAttempt}`)
    }
  }

  const handleLogout = async () => {
    setLoggingOut(true)
    await logout()
    navigate('/')
  }

  if (loading) return <Loading />

  return (
    <div className="min-h-screen bg-dark-900">
      <header className="bg-dark-800 border-b border-dark-700">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <span className="font-bold text-white">TestInteligencia</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full border border-dark-600"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-dark-700 border border-dark-600 flex items-center justify-center text-xs font-semibold text-gray-300">
                  {(user?.displayName || user?.email || '?').slice(0, 1).toUpperCase()}
                </div>
              )}
              <span className="text-gray-300">Hola, {user?.displayName}</span>
            </div>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1"
            >
              {loggingOut ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Saliendo...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Cerrar sesión
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Mi Panel</h1>
          <p className="text-gray-400">Bienvenido, {user?.displayName}. ¿Listo para evaluar tu inteligencia?</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Test de Inteligencia</h2>
                  <p className="text-gray-400 text-sm">Amateur (5 min · 25 preguntas) o Profesional (10 min · 50 preguntas) · 5 áreas</p>
                </div>
              </div>

              <div className="bg-dark-700/50 rounded-lg p-4 mb-6">
                <h3 className="text-sm font-medium text-gray-300 mb-2">¿Qué evaluarás?</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-secondary rounded-full"></span>
                    <span className="text-gray-400">Matemática</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    <span className="text-gray-400">Lingüística</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-warning rounded-full"></span>
                    <span className="text-gray-400">Espacial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-alert rounded-full"></span>
                    <span className="text-gray-400">Lógica</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    <span className="text-gray-400">Cultura</span>
                  </div>
                </div>
              </div>

              {activeAttempt ? (
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleResume}
                    className="btn-primary flex-1 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Continuar Test
                  </button>
                  <Link to="/pre-test" className="btn-secondary flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Nuevo Test
                  </Link>
                </div>
              ) : (
                <Link
                  to="/pre-test"
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Comenzar Test Ahora
                </Link>
              )}
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <h3 className="font-semibold text-white">Tu Progreso</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Tests completados</span>
                <span className="text-white font-semibold">{history.length}</span>
              </div>
              {history.length > 0 && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Última puntuación</span>
                    <span className="text-secondary font-semibold">
                      {history[0]?.finalScore || 0}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Mejor puntuación</span>
                    <span className="text-primary font-semibold">
                      {Math.max(...history.map(h => h.finalScore || 0))}%
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {history.length > 0 && (
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Historial Reciente
              </h2>
            </div>
            <div className="space-y-3">
              {history.map((attempt) => (
                <Link
                  key={attempt.id}
                  to={`/results/${attempt.id}`}
                  className="flex items-center justify-between p-3 bg-dark-700/50 rounded-lg hover:bg-dark-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      attempt.finalScore >= 75 ? 'bg-secondary/20' :
                      attempt.finalScore >= 50 ? 'bg-warning/20' : 'bg-alert/20'
                    }`}>
                      <span className={`font-bold ${
                        attempt.finalScore >= 75 ? 'text-secondary' :
                        attempt.finalScore >= 50 ? 'text-warning' : 'text-alert'
                      }`}>
                        {attempt.finalScore}%
                      </span>
                    </div>
                  <div>
                    <p className="text-white text-sm font-medium">
                      {attempt.finishedAt?.toDate?.().toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      }) || 'Fecha no disponible'}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {(attempt.testType === 'profesional' ? 'Profesional' : 'Amateur')} · {attempt.timeUsed ? `${Math.floor(attempt.timeUsed / 60)}m ${attempt.timeUsed % 60}s` : '-'}
                    </p>
                  </div>
                </div>
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
