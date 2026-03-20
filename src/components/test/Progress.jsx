export default function Progress({ current, total, percentage }) {
  const resolvedPercentage = typeof percentage === 'number' && !Number.isNaN(percentage)
    ? percentage
    : total > 0
      ? (current / total) * 100
      : 0

  return (
    <div className="h-1 bg-dark-700">
      <div 
        className="h-full bg-primary transition-all duration-300"
        style={{ width: `${resolvedPercentage}%` }}
      />
    </div>
  )
}
