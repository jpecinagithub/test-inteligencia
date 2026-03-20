import { useState, useEffect } from 'react'

export default function Timer({ timeRemaining, totalTime }) {
  const [isShaking, setIsShaking] = useState(false)
  
  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60
  
  const safeTotal = totalTime > 0 ? totalTime : 1
  const warningThreshold = Math.round(safeTotal * 0.3)
  const criticalThreshold = Math.round(safeTotal * 0.1)
  const isWarning = timeRemaining <= warningThreshold
  const isCritical = timeRemaining <= criticalThreshold

  useEffect(() => {
    if (isCritical && timeRemaining > 0) {
      setIsShaking(true)
      const timeout = setTimeout(() => setIsShaking(false), 300)
      return () => clearTimeout(timeout)
    }
  }, [timeRemaining, isCritical])

  const formatTime = (num) => String(num).padStart(2, '0')

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
      isCritical ? 'bg-alert/20' : isWarning ? 'bg-warning/20' : 'bg-dark-700'
    } ${isShaking ? 'shake' : ''}`}>
      <svg 
        className={`w-5 h-5 ${isCritical ? 'text-alert' : isWarning ? 'text-warning' : 'text-gray-400'}`} 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className={`font-mono font-bold text-lg ${
        isCritical ? 'text-alert' : isWarning ? 'text-warning' : 'text-white'
      }`}>
        {formatTime(minutes)}:{formatTime(seconds)}
      </span>
    </div>
  )
}
