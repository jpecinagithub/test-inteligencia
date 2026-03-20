export function calculateScore(questions, answers) {
  const areaScores = {
    matematica: { correct: 0, total: 0, percentage: 0 },
    linguistica: { correct: 0, total: 0, percentage: 0 },
    espacial: { correct: 0, total: 0, percentage: 0 },
    logica: { correct: 0, total: 0, percentage: 0 },
    cultura: { correct: 0, total: 0, percentage: 0 }
  }

  const cognitiveAreas = ['matematica', 'linguistica', 'espacial', 'logica', 'cultura']
  
  let totalCorrect = 0
  let totalQuestions = 0
  
  questions.forEach(question => {
    const { area, correctAnswer, id } = question
    const userAnswer = answers[id]
    
    if (areaScores[area]) {
      areaScores[area].total++
      totalQuestions++
      
      if (userAnswer === correctAnswer) {
        areaScores[area].correct++
        totalCorrect++
      }
    }
  })

  cognitiveAreas.forEach(area => {
    if (areaScores[area] && areaScores[area].total > 0) {
      areaScores[area].percentage = Math.round(
        (areaScores[area].correct / areaScores[area].total) * 100
      )
    }
  })

  const totalScore = totalQuestions > 0
    ? Math.round((totalCorrect / totalQuestions) * 100)
    : 0

  const iqEstimate = Math.round(75 + (totalScore * 0.5))

  const summary = generateSummary(areaScores, totalScore)

  return {
    totalScore,
    iqEstimate,
    areaScores,
    summary,
    totalQuestions: questions.length,
    cognitiveCorrect: totalCorrect,
    cognitiveTotal: totalQuestions
  }
}

function generateSummary(areaScores, totalScore) {
  const topAreas = Object.entries(areaScores)
    .filter(([, value]) => value.total > 0)
    .sort((a, b) => b[1].percentage - a[1].percentage)

  const weakestAreas = [...topAreas].reverse().slice(0, 2)

  let summary = {
    overall: '',
    strengths: [],
    improvements: [],
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

  return summary
}

function formatAreaName(area) {
  const names = {
    matematica: 'Matemática',
    linguistica: 'Lingüística',
    espacial: 'Espacial',
    logica: 'Lógica',
    cultura: 'Cultura General'
  }
  return names[area] || area
}

export function generateResultsEmailHTML(results, userName) {
  const { totalScore, iqEstimate, areaScores, summary, timeUsed } = results
  
  const minutes = Math.floor(timeUsed / 60)
  const seconds = timeUsed % 60
  
  const areaBars = Object.entries(areaScores)
    .filter(([, value]) => value.total > 0)
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
