export const TEST_AREAS = ['matematica', 'linguistica', 'espacial', 'logica', 'cultura']

export const TEST_TYPES = {
  amateur: {
    id: 'amateur',
    label: 'Amateur',
    description: '25 preguntas en 5 minutos',
    duration: 300,
    totalQuestions: 25,
    questionsPerArea: {
      matematica: 5,
      linguistica: 5,
      espacial: 5,
      logica: 5,
      cultura: 5
    },
    difficultyTargets: {
      1: 1,
      2: 2,
      3: 2
    }
  },
  profesional: {
    id: 'profesional',
    label: 'Profesional',
    description: '50 preguntas en 10 minutos',
    duration: 600,
    totalQuestions: 50,
    questionsPerArea: {
      matematica: 10,
      linguistica: 10,
      espacial: 10,
      logica: 10,
      cultura: 10
    },
    difficultyTargets: {
      1: 2,
      2: 4,
      3: 4
    }
  }
}

export const DEFAULT_TEST_TYPE = 'amateur'
