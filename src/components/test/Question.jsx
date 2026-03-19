export default function Question({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  onAnswer
}) {
  const isPersonality = question.area === 'personalidad'

  const handleOptionClick = (index) => {
    onAnswer(index)
  }

  const areaLabels = {
    matematica: { label: 'Matemática', color: 'text-secondary' },
    linguistica: { label: 'Lingüística', color: 'text-primary' },
    espacial: { label: 'Espacial', color: 'text-warning' },
    logica: { label: 'Lógica', color: 'text-alert' },
    personalidad: { label: 'Personalidad', color: 'text-purple-400' }
  }

  const areaInfo = areaLabels[question.area] || { label: question.area, color: 'text-gray-400' }

  return (
    <div className="animate-fadeIn px-2 sm:px-0">
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <span className={`text-xs sm:text-sm font-medium ${areaInfo.color}`}>
            {areaInfo.label}
          </span>
          <span className="text-xs sm:text-sm text-gray-500">
            {currentIndex + 1} / {totalQuestions}
          </span>
        </div>
        <div className="h-1 bg-dark-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      <div className="card mb-4 sm:mb-6">
        <h2 className="text-base sm:text-xl text-white mb-4 sm:mb-6 leading-relaxed">
          {question.prompt}
        </h2>

        <div className="space-y-2 sm:space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              className={`w-full p-3 sm:p-4 rounded-lg text-left transition-all flex items-center gap-2 sm:gap-3 text-sm sm:text-base ${
                selectedAnswer === index
                  ? 'bg-primary text-white'
                  : 'bg-dark-700 text-gray-300 hover:bg-dark-600 hover:text-white'
              }`}
            >
              <span className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs sm:text-sm font-bold ${
                selectedAnswer === index
                  ? 'bg-white/20'
                  : 'bg-dark-600'
              }`}>
                {String.fromCharCode(65 + index)}
              </span>
              <span className="flex-1 break-words">{option}</span>
              {selectedAnswer === index && (
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {isPersonality && (
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-2 sm:p-3 mb-4 sm:mb-6">
          <p className="text-purple-300 text-xs sm:text-sm flex items-center gap-2">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Parte del perfil de personalidad.
          </p>
        </div>
      )}
    </div>
  )
}
