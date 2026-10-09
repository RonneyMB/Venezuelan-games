export default function QuestionCard({ question }) {
  return (
    <div className="min-h-[90px] flex items-center">
      <h3 className="text-xl sm:text-2xl font-extrabold text-brand-navy leading-snug">{question}</h3>
    </div>
  )
}
