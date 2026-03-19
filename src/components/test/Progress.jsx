export default function Progress({ current, total, percentage }) {
  return (
    <div className="h-1 bg-dark-700">
      <div 
        className="h-full bg-primary transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}
