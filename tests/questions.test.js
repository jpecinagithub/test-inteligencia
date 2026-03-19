import { describe, it, expect } from 'vitest'
import { questionsPool, TEST_CONFIG } from '../src/data/questions'

describe('questionsPool', () => {
  it('debe tener preguntas por cada área', () => {
    const mathQuestions = questionsPool.filter(q => q.area === 'matematica')
    const lingQuestions = questionsPool.filter(q => q.area === 'linguistica')
    const espQuestions = questionsPool.filter(q => q.area === 'espacial')
    const logQuestions = questionsPool.filter(q => q.area === 'logica')
    const cultQuestions = questionsPool.filter(q => q.area === 'cultura')
    
    expect(mathQuestions.length).toBeGreaterThanOrEqual(30)
    expect(lingQuestions.length).toBeGreaterThanOrEqual(30)
    expect(espQuestions.length).toBeGreaterThanOrEqual(20)
    expect(logQuestions.length).toBeGreaterThanOrEqual(20)
    expect(cultQuestions.length).toBeGreaterThanOrEqual(30)
  })

  it('cada pregunta debe tener 4 opciones', () => {
    questionsPool.forEach(q => {
      expect(q.options).toBeDefined()
      expect(q.options.length).toBe(4)
    })
  })

  it('correctAnswer debe ser un índice válido (0-3)', () => {
    questionsPool.forEach(q => {
      expect(q.correctAnswer).toBeGreaterThanOrEqual(0)
      expect(q.correctAnswer).toBeLessThan(4)
    })
  })

  it('cada pregunta debe tener un id único', () => {
    const ids = questionsPool.map(q => q.id)
    const uniqueIds = [...new Set(ids)]
    expect(uniqueIds.length).toBe(ids.length)
  })

  it('cada pregunta debe tener un área válida', () => {
    const validAreas = ['matematica', 'linguistica', 'espacial', 'logica', 'cultura']
    questionsPool.forEach(q => {
      expect(validAreas).toContain(q.area)
    })
  })

  it('cada pregunta debe tener difficulty entre 1-3', () => {
    questionsPool.forEach(q => {
      expect(q.difficulty).toBeGreaterThanOrEqual(1)
      expect(q.difficulty).toBeLessThanOrEqual(3)
    })
  })
})

describe('TEST_CONFIG', () => {
  it('debe tener duración de 10 minutos (600 segundos)', () => {
    expect(TEST_CONFIG.totalDuration).toBe(600)
  })

  it('debe tener 5 preguntas por área cognitiva', () => {
    expect(TEST_CONFIG.questionsPerArea.matematica).toBe(5)
    expect(TEST_CONFIG.questionsPerArea.linguistica).toBe(5)
    expect(TEST_CONFIG.questionsPerArea.espacial).toBe(5)
    expect(TEST_CONFIG.questionsPerArea.logica).toBe(5)
    expect(TEST_CONFIG.questionsPerArea.cultura).toBe(5)
  })

  it('debe tener tiempos de advertencia configurados', () => {
    expect(TEST_CONFIG.warningTimes).toBeDefined()
    expect(TEST_CONFIG.warningTimes.length).toBeGreaterThan(0)
  })
})

describe('Validación de respuestas correctas', () => {
  const verifyAnswer = (question) => {
    const answer = question.options[question.correctAnswer]
    return answer !== undefined && answer !== null
  }

  it('todas las preguntas deben tener respuesta correcta válida', () => {
    questionsPool.forEach(q => {
      expect(verifyAnswer(q)).toBe(true)
    })
  })
})

describe('Matemática - Verificación de patrones', () => {
  const mathQuestions = questionsPool.filter(q => q.area === 'matematica')

  it('math_001: serie 2,4,6,8,10', () => {
    const q = mathQuestions.find(q => q.id === 'math_001')
    expect(q.options[q.correctAnswer]).toBe('10')
  })

  it('math_003: Fibonacci 1,1,2,3,5,8,13', () => {
    const q = mathQuestions.find(q => q.id === 'math_003')
    expect(q.options[q.correctAnswer]).toBe('13')
  })

  it('math_011: 15+27=42', () => {
    const q = mathQuestions.find(q => q.id === 'math_011')
    expect(q.options[q.correctAnswer]).toBe('42')
  })

  it('math_016: 3x+7=22 → x=5', () => {
    const q = mathQuestions.find(q => q.id === 'math_016')
    expect(q.options[q.correctAnswer]).toBe('5')
  })

  it('math_021: 25% de 80 = 20', () => {
    const q = mathQuestions.find(q => q.id === 'math_021')
    expect(q.options[q.correctAnswer]).toBe('20')
  })

  it('math_023: 200+20%-20% = 192', () => {
    const q = mathQuestions.find(q => q.id === 'math_023')
    expect(q.options[q.correctAnswer]).toBe('$192')
  })
})

describe('Lógica - Verificación de silogismos', () => {
  const logQuestions = questionsPool.filter(q => q.area === 'logica')

  it('log_007: Modus ponens - si llueve, me quedo', () => {
    const q = logQuestions.find(q => q.id === 'log_007')
    expect(q.options[q.correctAnswer]).toContain('Me quedo')
  })

  it('log_002: Ningún reptil vuela, serpientes son reptiles → ninguna serpiente vuela', () => {
    const q = logQuestions.find(q => q.id === 'log_002')
    expect(q.options[q.correctAnswer]).toContain('Ninguna serpiente')
  })

  it('log_008: Si estudio, apruebo. No aprobé → No estudié', () => {
    const q = logQuestions.find(q => q.id === 'log_008')
    expect(q.options[q.correctAnswer]).toBe('No estudié')
  })

  it('log_014: Quien vive más al sur', () => {
    const q = logQuestions.find(q => q.id === 'log_014')
    expect(q.options[q.correctAnswer]).toBe('Pedro')
  })
})

describe('Cultura General - Verificación', () => {
  const cultQuestions = questionsPool.filter(q => q.area === 'cultura')

  it('cult_001: planeta más grande - Júpiter', () => {
    const q = cultQuestions.find(q => q.id === 'cult_001')
    expect(q.options[q.correctAnswer]).toBe('Júpiter')
  })

  it('cult_010: Mona Lisa - Da Vinci', () => {
    const q = cultQuestions.find(q => q.id === 'cult_010')
    expect(q.options[q.correctAnswer]).toBe('Da Vinci')
  })

  it('cult_011: llegada a la Luna - 1969', () => {
    const q = cultQuestions.find(q => q.id === 'cult_011')
    expect(q.options[q.correctAnswer]).toBe('1969')
  })
})
