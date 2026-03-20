import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useTest } from '../context/TestContext'
import { TEST_TYPES, DEFAULT_TEST_TYPE } from '../data/testConfig'

export default function PreTest() {
  const navigate = useNavigate()
  const { startTest } = useTest()
  const [selectedType, setSelectedType] = useState(DEFAULT_TEST_TYPE)
  const selectedConfig = TEST_TYPES[selectedType]
  const minutesLabel = `${Math.round(selectedConfig.duration / 60)} minutos`

  const handleStart = async () => {
    const result = await startTest(selectedType)
    if (result.success) {
      navigate(`/test?type=${selectedType}`)
    }
  }

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        <div className="card">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Test de Inteligencia</h1>
            <p className="text-gray-400">Antes de comenzar, lee las instrucciones</p>
          </div>

          <div className="bg-dark-700/50 rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-white mb-4">Selecciona modalidad</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {Object.values(TEST_TYPES).map((testType) => (
                <button
                  key={testType.id}
                  type="button"
                  onClick={() => setSelectedType(testType.id)}
                  className={`text-left rounded-lg border p-4 transition-colors ${
                    selectedType === testType.id
                      ? 'border-primary bg-primary/10'
                      : 'border-dark-600 bg-dark-800/50 hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-semibold">{testType.label}</span>
                    <span className="text-xs text-gray-400">{testType.description}</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    {testType.totalQuestions} preguntas · {Math.round(testType.duration / 60)} min
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-dark-700/50 rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Instrucciones
            </h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary text-sm font-bold">1</span>
                </span>
                <span>El test tiene una duración de <strong className="text-white">{minutesLabel} exactos</strong>.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary text-sm font-bold">2</span>
                </span>
                <span>El test <strong className="text-alert">NO puede pausarse</strong>. Una vez iniciado, debes completarlo.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary text-sm font-bold">3</span>
                </span>
                <span>Responderás <strong className="text-white">{selectedConfig.totalQuestions} preguntas</strong> de diferentes áreas cognitivas.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary text-sm font-bold">4</span>
                </span>
                <span>El tiempo seguirá corriendo aunque cierres la pestaña. Si vuelves, podrás continuar.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary text-sm font-bold">5</span>
                </span>
                <span>Al terminar, recibirás tus resultados instantly y por email.</span>
              </li>
            </ul>
          </div>

          <div className="bg-warning/10 border border-warning/30 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-warning flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h3 className="text-warning font-medium mb-1">Importante</h3>
                <p className="text-gray-400 text-sm">
                  Asegúrate de tener suficiente tiempo y una conexión estable a internet antes de comenzar. 
                  No cierres esta ventana durante el test.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/dashboard"
              className="btn-secondary flex-1 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver
            </Link>
            <button
              onClick={handleStart}
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Comenzar Test
            </button>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          Al continuar, aceptas estas condiciones y confirmas que estás listo para comenzar.
        </p>
      </div>
    </div>
  )
}
