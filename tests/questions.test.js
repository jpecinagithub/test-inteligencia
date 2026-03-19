import { describe, it, expect } from 'vitest'
import { questionsPool, TEST_CONFIG } from '../src/data/questions'

describe('questionsPool', () => {
  it('debe tener exactamente 25 preguntas por área cognitiva', () => {
    const mathQuestions = questionsPool.filter(q => q.area === 'matematica')
    const lingQuestions = questionsPool.filter(q => q.area === 'linguistica')
    const espQuestions = questionsPool.filter(q => q.area === 'espacial')
    const logQuestions = questionsPool.filter(q => q.area === 'logica')
    
    expect(mathQuestions.length).toBe(25)
    expect(lingQuestions.length).toBe(25)
    expect(espQuestions.length).toBe(25)
    expect(logQuestions.length).toBe(25)
  })

  it('debe tener suficientes preguntas de personalidad', () => {
    const persQuestions = questionsPool.filter(q => q.area === 'personalidad')
    expect(persQuestions.length).toBeGreaterThanOrEqual(5)
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
    const validAreas = ['matematica', 'linguistica', 'espacial', 'logica', 'personalidad']
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

  it('preguntas de personalidad deben tener trait definido', () => {
    const persQuestions = questionsPool.filter(q => q.area === 'personalidad')
    const validTraits = ['analytical', 'impulsivity', 'persistence', 'pressureTolerance', 'decisionConfidence']
    
    persQuestions.forEach(q => {
      expect(q.trait).toBeDefined()
      expect(validTraits).toContain(q.trait)
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
    expect(TEST_CONFIG.questionsPerArea.personalidad).toBe(5)
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

  it('math_004: 15+27=42', () => {
    const q = mathQuestions.find(q => q.id === 'math_004')
    expect(q.options[q.correctAnswer]).toBe('42')
  })

  it('math_005: 3x+7=22 → x=5', () => {
    const q = mathQuestions.find(q => q.id === 'math_005')
    expect(q.options[q.correctAnswer]).toBe('5')
  })

  it('math_006: 25% de 80 = 20', () => {
    const q = mathQuestions.find(q => q.id === 'math_006')
    expect(q.options[q.correctAnswer]).toBe('20')
  })

  it('math_007: 200+20%-20% = 192', () => {
    const q = mathQuestions.find(q => q.id === 'math_007')
    expect(q.options[q.correctAnswer]).toBe('$192')
  })
})

describe('Lógica - Verificación de silogismos', () => {
  const logQuestions = questionsPool.filter(q => q.area === 'logica')

  it('log_002: Modus ponens - si llueve, me quedo', () => {
    const q = logQuestions.find(q => q.id === 'log_002')
    expect(q.options[q.correctAnswer]).toContain('Me quedo')
  })

  it('log_006: Ningún reptil vuela, serpientes son reptiles → ninguna serpiente vuela', () => {
    const q = logQuestions.find(q => q.id === 'log_006')
    expect(q.options[q.correctAnswer]).toContain('Ninguna serpiente')
  })

  it('log_007: Si estudio, apruebo. No aprobé → No estudié', () => {
    const q = logQuestions.find(q => q.id === 'log_007')
    expect(q.options[q.correctAnswer]).toBe('No estudié')
  })

  it('log_015: Quien vive más al sur', () => {
    const q = logQuestions.find(q => q.id === 'log_015')
    expect(q.options[q.correctAnswer]).toBe('Pedro')
  })
})
