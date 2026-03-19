export function calculateScore(questions, answers) {
  const areaScores = {
    matematica: { correct: 0, total: 0, percentage: 0 },
    linguistica: { correct: 0, total: 0, percentage: 0 },
    espacial: { correct: 0, total: 0, percentage: 0 },
    logica: { correct: 0, total: 0, percentage: 0 },
    personalidad: { correct: 0, total: 0 }
  }

  const cognitiveAreas = ['matematica', 'linguistica', 'espacial', 'logica']
  
  let totalCognitive = { correct: 0, total: 0 }
  
  questions.forEach(question => {
    const { area, correctAnswer, id } = question
    const userAnswer = answers[id]
    
    if (area === 'personalidad') {
      areaScores.personalidad.total++
      if (userAnswer !== undefined && userAnswer !== null) {
        areaScores.personalidad.correct++
      }
    } else {
      areaScores[area].total++
      totalCognitive.total++
      
      if (userAnswer === correctAnswer) {
        areaScores[area].correct++
        totalCognitive.correct++
      }
    }
  })

  cognitiveAreas.forEach(area => {
    if (areaScores[area].total > 0) {
      areaScores[area].percentage = Math.round(
        (areaScores[area].correct / areaScores[area].total) * 100
      )
    }
  })

  const totalScore = totalCognitive.total > 0
    ? Math.round((totalCognitive.correct / totalCognitive.total) * 100)
    : 0

  const iqEstimate = Math.round(75 + (totalScore * 0.5))

  const personalitySummary = calculatePersonalitySummary(
    questions.filter(q => q.area === 'personalidad'),
    answers
  )

  const summary = generateSummary(areaScores, totalScore, personalitySummary)

  return {
    totalScore,
    iqEstimate,
    areaScores,
    personalitySummary,
    summary,
    totalQuestions: questions.length,
    cognitiveCorrect: totalCognitive.correct,
    cognitiveTotal: totalCognitive.total
  }
}

function calculatePersonalitySummary(personalityQuestions, answers) {
  const traits = {
    analytical: [],
    impulsivity: [],
    persistence: [],
    pressureTolerance: [],
    decisionConfidence: []
  }

  personalityQuestions.forEach(q => {
    const answer = answers[q.id]
    if (answer !== undefined && answer !== null) {
      if (q.trait) {
        traits[q.trait].push(answer)
      }
    }
  })

  const average = (arr) => arr.length > 0 
    ? arr.reduce((a, b) => a + b, 0) / arr.length 
    : 3

  return {
    analytical: interpretTrait(average(traits.analytical)),
    impulsivity: interpretTrait(average(traits.impulsivity), true),
    persistence: interpretTrait(average(traits.persistence)),
    pressureTolerance: interpretTrait(average(traits.pressureTolerance)),
    decisionConfidence: interpretTrait(average(traits.decisionConfidence))
  }
}

function interpretTrait(value, invert = false) {
  const scaledValue = ((value / 3) * 5)
  
  if (invert) {
    if (scaledValue <= 2) return 'Alto'
    if (scaledValue <= 3.5) return 'Moderado'
    return 'Bajo'
  } else {
    if (scaledValue >= 4) return 'Alto'
    if (scaledValue >= 2.5) return 'Moderado'
    return 'Bajo'
  }
}

function generateSummary(areaScores, totalScore, personalitySummary) {
  const topAreas = Object.entries(areaScores)
    .filter(([key]) => key !== 'personalidad')
    .sort((a, b) => b[1].percentage - a[1].percentage)

  const weakestAreas = [...topAreas].reverse().slice(0, 2)

  let summary = {
    overall: '',
    strengths: [],
    improvements: [],
    profile: '',
    message: ''
  }

  if (totalScore >= 90) {
    summary.overall = 'Excepcional'
    summary.message = 'Demuestras una capacidad cognitiva sobresaliente. Tu rendimiento en todas las áreas es excelente.'
  } else if (totalScore >= 75) {
    summary.overall = 'Superior'
    summary.message = 'Tienes una capacidad cognitiva muy por encima del promedio. Sigue desafiándote.'
  } else if (totalScore >= 60) {
    summary.overall = 'Bueno'
    summary.message = 'Tu rendimiento es bueno y sólido en la mayoría de áreas. Hay espacio para crecer.'
  } else if (totalScore >= 45) {
    summary.overall = 'Promedio'
    summary.message = 'Tu capacidad está en el rango promedio. Con práctica puedes mejorar significativamente.'
  } else {
    summary.overall = 'En desarrollo'
    summary.message = 'Este test identifica áreas de oportunidad. Lo importante es seguir aprendiendo.'
  }

  if (topAreas[0]) {
    summary.strengths.push(`${formatAreaName(topAreas[0][0])} (${topAreas[0][1].percentage}%)`)
  }
  if (topAreas[1] && topAreas[1][1].percentage >= 70) {
    summary.strengths.push(`${formatAreaName(topAreas[1][0])} (${topAreas[1][1].percentage}%)`)
  }

  weakestAreas.forEach(([area, scores]) => {
    if (scores.percentage < 60) {
      summary.improvements.push(`${formatAreaName(area)} (${scores.percentage}%)`)
    }
  })

  const profileDescriptions = []
  if (personalitySummary.analytical === 'Alto') profileDescriptions.push('analítico')
  if (personalitySummary.persistence === 'Alto') profileDescriptions.push('persistente')
  if (personalitySummary.pressureTolerance === 'Alto') profileDescriptions.push('resistente bajo presión')
  if (personalitySummary.impulsivity === 'Alto') profileDescriptions.push('decisivo rápido')
  if (personalitySummary.decisionConfidence === 'Alto') profileDescriptions.push('seguro en decisiones')

  summary.profile = profileDescriptions.length > 0
    ? `Tu perfil muestra tendencias ${profileDescriptions.slice(0, 3).join(', ')}.`
    : 'Continúa desarrollando tus habilidades cognitivas.'

  return summary
}

function formatAreaName(area) {
  const names = {
    matematica: 'Matemática',
    linguistica: 'Lingüística',
    espacial: 'Espacial',
    logica: 'Lógica'
  }
  return names[area] || area
}

export function generateResultsEmailHTML(results, userName) {
  const { totalScore, iqEstimate, areaScores, personalitySummary, summary, timeUsed } = results
  
  const minutes = Math.floor(timeUsed / 60)
  const seconds = timeUsed % 60
  
  const areaBars = Object.entries(areaScores)
    .filter(([key]) => key !== 'personalidad')
    .map(([area, scores]) => `
      <div style="margin: 10px 0;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
          <span style="color: #94a3b8;">${formatAreaName(area)}</span>
          <span style="color: #fff; font-weight: 600;">${scores.percentage}%</span>
        </div>
        <div style="background: #334155; border-radius: 4px; height: 8px; overflow: hidden;">
          <div style="background: ${getScoreColor(scores.percentage)}; width: ${scores.percentage}%; height: 100%;"></div>
        </div>
      </div>
    `).join('')

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #0f172a; color: #f8fafc; padding: 40px 20px; margin: 0;">
      <div style="max-width: 600px; margin: 0 auto; background: #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">
        <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 40px; text-align: center;">
          <h1 style="margin: 0 0 10px 0; font-size: 28px; color: white;">Test de Inteligencia</h1>
          <p style="margin: 0; color: #bfdbfe; font-size: 14px;">Resultados detallados</p>
        </div>
        
        <div style="padding: 40px;">
          <p style="margin: 0 0 20px 0; color: #94a3b8;">Hola <strong style="color: #fff;">${userName}</strong>,</p>
          <p style="margin: 0 0 30px 0; color: #94a3b8; line-height: 1.6;">
            Has completado el test de inteligencia. A continuación encontrarás tu puntuación total y el desglose por áreas cognitivas.
          </p>
          
          <div style="display: flex; gap: 20px; margin-bottom: 30px;">
            <div style="flex: 1; background: #0f172a; border-radius: 12px; padding: 24px; text-align: center;">
              <div style="font-size: 48px; font-weight: 800; color: #3b82f6; line-height: 1;">
                ${totalScore}<span style="font-size: 20px; color: #64748b;">%</span>
              </div>
              <div style="color: #64748b; font-size: 12px; margin-top: 8px;">Puntuación Total</div>
            </div>
            <div style="flex: 1; background: #0f172a; border-radius: 12px; padding: 24px; text-align: center;">
              <div style="font-size: 48px; font-weight: 800; color: #10b981; line-height: 1;">
                ${iqEstimate}
              </div>
              <div style="color: #64748b; font-size: 12px; margin-top: 8px;">CI Estimado</div>
            </div>
          </div>
          
          <h2 style="color: #fff; font-size: 18px; margin: 0 0 20px 0; border-bottom: 1px solid #334155; padding-bottom: 10px;">
            Rendimiento por Área
          </h2>
          ${areaBars}
          
          <div style="margin-top: 30px; padding: 20px; background: #0f172a; border-radius: 12px; border-left: 4px solid #3b82f6;">
            <h3 style="color: #fff; margin: 0 0 10px 0; font-size: 16px;">${summary.overall}</h3>
            <p style="color: #94a3b8; margin: 0; font-size: 14px; line-height: 1.6;">${summary.message}</p>
          </div>
          
          ${summary.strengths.length > 0 ? `
            <div style="margin-top: 20px;">
              <h4 style="color: #10b981; margin: 0 0 10px 0; font-size: 14px;">Fortalezas</h4>
              <p style="color: #94a3b8; margin: 0; font-size: 14px;">${summary.strengths.join(', ')}</p>
            </div>
          ` : ''}
          
          ${summary.improvements.length > 0 ? `
            <div style="margin-top: 20px;">
              <h4 style="color: #f59e0b; margin: 0 0 10px 0; font-size: 14px;">Áreas de Mejora</h4>
              <p style="color: #94a3b8; margin: 0; font-size: 14px;">${summary.improvements.join(', ')}</p>
            </div>
          ` : ''}
          
          <div style="margin-top: 30px; padding: 20px; background: #0f172a; border-radius: 12px;">
            <h4 style="color: #fff; margin: 0 0 10px 0; font-size: 14px;">Perfil de Personalidad</h4>
            <p style="color: #94a3b8; margin: 0; font-size: 14px; line-height: 1.8;">
              • Orientación analítica: <span style="color: #fff;">${personalitySummary.analytical}</span><br>
              • Persistencia: <span style="color: #fff;">${personalitySummary.persistence}</span><br>
              • Tolerancia a presión: <span style="color: #fff;">${personalitySummary.pressureTolerance}</span><br>
              • Impulsividad: <span style="color: #fff;">${personalitySummary.impulsivity}</span>
            </p>
          </div>
          
          <div style="margin-top: 30px; text-align: center; color: #64748b; font-size: 12px;">
            <p style="margin: 0 0 5px 0;">Tiempo utilizado: <strong style="color: #94a3b8;">${minutes}m ${seconds}s</strong></p>
            <p style="margin: 0;">Test completado el ${new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
        </div>
        
        <div style="background: #0f172a; padding: 20px; text-align: center;">
          <p style="margin: 0; color: #64748b; font-size: 12px;">
            Este test es una herramienta informativa y no constituye un diagnóstico profesional.<br>
            © ${new Date().getFullYear()} Test de Inteligencia
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}

function getScoreColor(percentage) {
  if (percentage >= 80) return '#10b981'
  if (percentage >= 60) return '#3b82f6'
  if (percentage >= 40) return '#f59e0b'
  return '#ef4444'
}
