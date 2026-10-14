export default function FeedbackBanner({ feedback }) {
  if (!feedback) return null

  if (feedback.variant === 'correct') {
    return (
      <div className="p-4 rounded-2xl text-center font-outfit font-bold text-sm leading-relaxed bg-emerald-50 text-emerald-700 border border-emerald-300">
        ¡Correcto! 🎉 <strong>{feedback.tableName}</strong> suma <strong>+10</strong>. La capital de{' '}
        <strong>{feedback.stateName}</strong> es <strong>{feedback.capital}</strong>.
      </div>
    )
  }

  return (
    <div className="p-4 rounded-2xl text-center font-outfit font-bold text-sm leading-relaxed bg-slate-100 text-slate-600 border border-slate-300">
      La capital de <strong>{feedback.stateName}</strong> es <strong>{feedback.capital}</strong>.
    </div>
  )
}
