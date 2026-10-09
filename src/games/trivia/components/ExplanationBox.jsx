export default function ExplanationBox({ visible, success, title, text }) {
  if (!visible) return null

  return (
    <div
      className={`p-4 rounded-2xl border text-sm space-y-2 ${
        success ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'
      }`}
    >
      <div
        className={`font-bold flex items-center gap-2 text-base ${
          success ? 'text-emerald-800' : 'text-red-800'
        }`}
      >
        <i
          className={`fa-solid ${
            success ? 'fa-circle-check text-emerald-600' : 'fa-circle-xmark text-red-600'
          } text-xl`}
        />
        {title}
      </div>
      <p className="text-slate-700 leading-relaxed">{text}</p>
    </div>
  )
}
