export default function TimerBar({ timeLeft, total, phase }) {
  const urgent = timeLeft <= 4
  const isAnswering = phase === 'answering'

  const label = isAnswering ? '✍️ Respondiendo' : '⏸️ Listo'
  const badgeClasses = isAnswering
    ? 'bg-brand-green/20 text-brand-green border-brand-green/40'
    : 'bg-slate-500/20 text-slate-300 border-slate-500/40'

  return (
    <>
      {phase && (
        <span
          className={`hidden sm:inline-flex items-center gap-1.5 text-[10px] uppercase font-black tracking-wider px-2.5 py-1 rounded-full border ${badgeClasses}`}
        >
          {label}
        </span>
      )}
      <div className="flex items-center gap-3 ml-auto">
        <span className="text-xs uppercase font-bold text-slate-300 tracking-wider">Tiempo:</span>
        <div className="bg-brand-navy-dark px-4 py-1.5 rounded-xl border border-slate-700 flex items-center gap-2">
          <i className="fa-solid fa-stopwatch text-brand-green text-base" />
          <span className={`font-mono font-black text-2xl ${urgent ? 'timer-urgent' : 'text-white'}`}>
            {timeLeft}
          </span>
          <span className="text-xs font-bold text-slate-400">s</span>
        </div>
      </div>
    </>
  )
}
