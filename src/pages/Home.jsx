import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Loading from '../components/ui/Loading'

export default function Home() {
  const { user, loading } = useAuth()

  if (loading) return <Loading />

  return (
    <div className="min-h-screen bg-dark-900">
      <header className="py-4 sm:py-6 px-4 border-b border-dark-700">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <span className="text-lg sm:text-xl font-bold text-white">TestInteligencia</span>
          </div>
          <nav className="flex gap-2 sm:gap-4">
            {user ? (
              <Link to="/dashboard" className="btn-primary text-sm sm:text-base px-3 sm:px-4 py-2">Mi Panel</Link>
            ) : (
              <Link to="/dashboard" className="btn-primary text-sm sm:text-base px-3 sm:px-4 py-2">Comenzar Test</Link>
            )}
          </nav>
        </div>
      </header>

      <main>
        <section className="py-12 sm:py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Test profesional en solo 10 minutos
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-4 sm:mb-6 leading-tight">
              Descubre tu verdadero
              <span className="block text-primary">potencial cognitivo</span>
            </h1>
            
            <p className="text-base sm:text-xl text-gray-400 mb-8 sm:mb-10 max-w-2xl mx-auto px-2">
              Evalúa tu inteligencia en 4 áreas clave: matemática, lingüística, espacial y lógica. 
              Un test diseñado científicamente que mide tu capacidad real bajo presión temporal.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-10 sm:mb-16">
              {user ? (
                <Link to="/dashboard" className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
                  Comenzar Test Ahora
                </Link>
              ) : (
                <>
                  <Link to="/register" className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
                    Comenzar Test Gratis
                  </Link>
                  <Link to="/login" className="btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
                    Ya tengo cuenta
                  </Link>
                </>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
              {[
                { icon: '🧮', title: 'Matemática', desc: 'Razonamiento numérico' },
                { icon: '📝', title: 'Lingüística', desc: 'Comprensión verbal' },
                { icon: '👁️', title: 'Espacial', desc: 'Percepción visual' },
                { icon: '🧠', title: 'Lógica', desc: 'Pensamiento crítico' }
              ].map((area, i) => (
                <div key={i} className="card text-center hover:border-primary/50 transition-colors p-3 sm:p-4">
                  <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{area.icon}</div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-1">{area.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-400">{area.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 px-4 bg-dark-800">
          <div className="max-w-6xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-1">Corrección Automática</h3>
                  <p className="text-sm sm:text-base text-gray-400">Resultados al instante, sin esperar.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-1">10 Minutos</h3>
                  <p className="text-sm sm:text-base text-gray-400">Test cronometrado bajo presión.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 sm:gap-4 sm:col-span-2 lg:col-span-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-warning/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-1">Resultados por Email</h3>
                  <p className="text-sm sm:text-base text-gray-400">Informe completo en tu bandeja.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">¿Listo para el reto?</h2>
            <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8">Regístrate gratis y descubre tu coeficiente intelectual.</p>
            {!user && (
              <Link to="/register" className="btn-primary text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4">
                Iniciar Test Ahora
              </Link>
            )}
          </div>
        </section>
      </main>

      <footer className="py-6 sm:py-8 px-4 border-t border-dark-700">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-xs sm:text-sm">
          <p>Este test es una herramienta informativa y no constituye un diagnóstico profesional.</p>
          <p className="mt-2">© {new Date().getFullYear()} Test de Inteligencia.</p>
        </div>
      </footer>
    </div>
  )
}
