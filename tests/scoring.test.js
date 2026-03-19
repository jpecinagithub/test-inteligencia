import { describe, it, expect } from 'vitest'
import { calculateScore, generateResultsEmailHTML } from '../src/services/scoring'

describe('calculateScore', () => {
  const mockQuestions = [
    { id: 'q1', area: 'matematica', correctAnswer: 1 },
    { id: 'q2', area: 'matematica', correctAnswer: 2 },
    { id: 'q3', area: 'linguistica', correctAnswer: 0 },
    { id: 'q4', area: 'linguistica', correctAnswer: 1 },
    { id: 'q5', area: 'espacial', correctAnswer: 3 },
    { id: 'q6', area: 'espacial', correctAnswer: 0 },
    { id: 'q7', area: 'logica', correctAnswer: 1 },
    { id: 'q8', area: 'logica', correctAnswer: 2 },
    { id: 'q9', area: 'cultura', correctAnswer: 1 },
    { id: 'q10', area: 'cultura', correctAnswer: 2 }
  ]

  it('debe retornar 0% cuando no hay respuestas correctas', () => {
    const answers = {
      q1: 0, q2: 0, q3: 1, q4: 0, q5: 0,
      q6: 1, q7: 0, q8: 0, q9: 0, q10: 0
    }
    const result = calculateScore(mockQuestions, answers)
    expect(result.totalScore).toBe(0)
  })

  it('debe retornar 100% cuando todas las respuestas son correctas', () => {
    const answers = {
      q1: 1, q2: 2, q3: 0, q4: 1, q5: 3,
      q6: 0, q7: 1, q8: 2, q9: 1, q10: 2
    }
    const result = calculateScore(mockQuestions, answers)
    expect(result.totalScore).toBe(100)
  })

  it('debe retornar 40% cuando 4 de 10 son correctas', () => {
    const answers = {
      q1: 1, q2: 0, q3: 0, q4: 0, q5: 0,
      q6: 0, q7: 1, q8: 0, q9: 0, q10: 0
    }
    const result = calculateScore(mockQuestions, answers)
    expect(result.totalScore).toBe(40)
  })

  it('debe calcular correctamente las puntuaciones por área', () => {
    const answers = {
      q1: 1, q2: 2, q3: 0, q4: 0, q5: 3,
      q6: 3, q7: 1, q8: 1, q9: 0, q10: 0
    }
    const result = calculateScore(mockQuestions, answers)
    
    expect(result.areaScores.matematica.correct).toBe(2)
    expect(result.areaScores.matematica.total).toBe(2)
    expect(result.areaScores.matematica.percentage).toBe(100)
    
    expect(result.areaScores.linguistica.correct).toBe(1)
    expect(result.areaScores.linguistica.total).toBe(2)
    expect(result.areaScores.linguistica.percentage).toBe(50)
  })

  it('debe estimar CI basándose en puntuación total', () => {
    const questions = [
      { id: 'q1', area: 'matematica', correctAnswer: 0 },
      { id: 'q2', area: 'matematica', correctAnswer: 0 }
    ]
    const answers = { q1: 0, q2: 0 }
    const result = calculateScore(questions, answers)
    
    expect(result.iqEstimate).toBeGreaterThanOrEqual(75)
    expect(result.iqEstimate).toBeLessThanOrEqual(125)
  })

  it('debe generar mensaje de resumen para puntuación superior', () => {
    const questions = [
      { id: 'q1', area: 'matematica', correctAnswer: 0 },
      { id: 'q2', area: 'matematica', correctAnswer: 0 }
    ]
    const answers = { q1: 0, q2: 0 }
    const result = calculateScore(questions, answers)
    
    expect(result.summary.overall).toBe('Excepcional')
  })

  it('debe generar mensaje de resumen para puntuación promedio', () => {
    const questions = [
      { id: 'q1', area: 'matematica', correctAnswer: 0 }
    ]
    const answers = { q1: 1 }
    const result = calculateScore(questions, answers)
    
    expect(result.summary.overall).toBe('En desarrollo')
  })

  it('debe identificar fortalezas y áreas de mejora', () => {
    const questions = [
      { id: 'q1', area: 'matematica', correctAnswer: 0 },
      { id: 'q2', area: 'matematica', correctAnswer: 1 },
      { id: 'q3', area: 'linguistica', correctAnswer: 0 }
    ]
    const answers = { q1: 0, q2: 1, q3: 1 }
    
    const result = calculateScore(questions, answers)
    
    expect(result.summary.strengths).toBeDefined()
    expect(result.summary.improvements).toBeDefined()
  })

  it('debe manejar preguntas sin responder', () => {
    const questions = [
      { id: 'q1', area: 'matematica', correctAnswer: 1 }
    ]
    const answers = {}
    const result = calculateScore(questions, answers)
    
    expect(result.totalScore).toBe(0)
    expect(result.areaScores.matematica.percentage).toBe(0)
  })
})

describe('generateResultsEmailHTML', () => {
  it('debe generar HTML válido para email', () => {
    const results = {
      totalScore: 80,
      iqEstimate: 115,
      areaScores: {
        matematica: { correct: 4, total: 5, percentage: 80 },
        linguistica: { correct: 4, total: 5, percentage: 80 },
        espacial: { correct: 4, total: 5, percentage: 80 },
        logica: { correct: 4, total: 5, percentage: 80 },
        personalidad: { correct: 4, total: 5 }
      },
      personalitySummary: {
        analytical: 'Alto',
        impulsivity: 'Bajo',
        persistence: 'Alto',
        pressureTolerance: 'Moderado',
        decisionConfidence: 'Alto'
      },
      summary: {
        overall: 'Superior',
        message: 'Excelente rendimiento',
        strengths: ['Matemática (80%)'],
        improvements: []
      },
      timeUsed: 600
    }

    const html = generateResultsEmailHTML(results, 'Test User')
    
    expect(html).toContain('<!DOCTYPE html>')
    expect(html).toContain('Test User')
    expect(html).toContain('80%')
    expect(html).toContain('115')
    expect(html).toContain('Superior')
    expect(html).toContain('Matemática')
  })

  it('debe formatear correctamente el tiempo', () => {
    const results = {
      totalScore: 50,
      iqEstimate: 100,
      areaScores: {
        matematica: { correct: 1, total: 2, percentage: 50 },
        linguistica: { correct: 1, total: 2, percentage: 50 },
        espacial: { correct: 1, total: 2, percentage: 50 },
        logica: { correct: 1, total: 2, percentage: 50 },
        personalidad: { correct: 1, total: 2 }
      },
      personalitySummary: {
        analytical: 'Moderado',
        impulsivity: 'Moderado',
        persistence: 'Moderado',
        pressureTolerance: 'Moderado',
        decisionConfidence: 'Moderado'
      },
      summary: {
        overall: 'Promedio',
        message: 'Rendimiento promedio',
        strengths: [],
        improvements: ['Matemática (50%)']
      },
      timeUsed: 420
    }

    const html = generateResultsEmailHTML(results, 'Usuario')
    
    expect(html).toContain('7m')
    expect(html).toContain('0s')
  })
})
