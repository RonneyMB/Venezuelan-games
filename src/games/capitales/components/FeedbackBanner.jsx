export default function FeedbackBanner({ feedback }) {
  if (!feedback) return null

  let classes = ''
  let content = null

  if (feedback.variant === 'correct') {
    classes = 'bg-emerald-50 text-emerald-700 border border-emerald-300'
    content = (
      <>
        ¡Correcto! 🎉 La capital de <strong>{feedback.stateName}</strong> es{' '}
        <strong>{feedback.capital}</strong>.
      </>
    )
  } else if (feedback.variant === 'timeout') {
    classes = 'bg-red-50 text-red-700 border border-red-300'
    content = (
      <>
        ¡Tiempo agotado! ⏱️ La capital de <strong>{feedback.stateName}</strong> es{' '}
        <strong>{feedback.capital}</strong>.
      </>
    )
  } else {
    classes = 'bg-red-50 text-red-700 border border-red-300'
    content = (
      <>
        Incorrecto. La capital de <strong>{feedback.stateName}</strong> es{' '}
        <strong>{feedback.capital}</strong>.
      </>
    )
  }

  return (
    <div
      className={`p-4 rounded-2xl text-center font-outfit font-bold text-sm leading-relaxed ${classes}`}
    >
      {content}
    </div>
  )
}
