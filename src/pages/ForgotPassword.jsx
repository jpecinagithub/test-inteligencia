import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Loading from '../components/ui/Loading'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const { resetPassword } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!email) {
      setError('Por favor ingresa tu correo electrónico')
      setLoading(false)
      return
    }

    const result = await resetPassword(email)
    
    if (result.success) {
      setSuccess(true)
    } else {
      setError(result.error)
    }
    
    setLoading(false)
  }

  if (loading && !error && !success) return <Loading />

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <span className="text-lg sm:text-xl font-bold text-white">TestInteligencia</span>
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-white">Recuperar Contraseña</h1>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">Te enviaremos un enlace para restablecer tu contraseña</p>
        </div>

        <div className="card">
          {success ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Email enviado</h3>
              <p className="text-gray-400 mb-6">
                Hemos enviado un enlace de recuperación a <strong>{email}</strong>. 
                Revisa tu bandeja de entrada y sigue las instrucciones.
              </p>
              <Link to="/login" className="btn-primary inline-block">
                Volver al login
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <div className="bg-alert/20 border border-alert/50 text-alert px-4 py-3 rounded-lg mb-6 text-sm">
                  {error}
                </div>
              )}

              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-medium mb-2">Correo electrónico</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="tu@email.com"
                  autoComplete="email"
                />
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Enviando...
                  </>
                ) : (
                  'Enviar enlace de recuperación'
                )}
              </button>
            </>
          )}
        </div>

        <p className="text-center text-gray-400 mt-6">
          ¿Recordaste tu contraseña?{' '}
          <Link to="/login" className="text-primary hover:text-blue-400 font-medium">
            Inicia sesión
          </Link>
        </p>

        <div className="mt-8 text-center">
          <Link to="/" className="text-gray-500 hover:text-gray-300 text-sm">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
