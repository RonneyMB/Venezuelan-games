const MEDALS = ['🥇', '🥈', '🥉']

export default function PositionTable({ ranking, highlightId = null, compact = false }) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">📊</span>
        <h3 className="font-black text-brand-navy uppercase tracking-wide text-sm">Tabla de posiciones</h3>
      </div>

      <div className="grid gap-2">
        {ranking.map((r, i) => {
          const isLead = i === 0 && r.score > 0
          const isHighlight = r.id === highlightId
          return (
            <div
              key={r.id}
              className={`flex items-center justify-between rounded-2xl border-2 ${
                compact ? 'px-4 py-2.5' : 'px-5 py-3'
              } ${
                isHighlight
                  ? 'border-amber-400 bg-amber-50'
                  : isLead
                    ? 'border-brand-green bg-brand-green/10'
                    : 'border-slate-200 bg-white'
              }`}
            >
              <span className="flex items-center gap-3 font-bold text-brand-navy">
                <span
                  className={`flex items-center justify-center rounded-xl bg-brand-navy text-white text-xs font-black ${
                    compact ? 'w-7 h-7' : 'w-8 h-8'
                  }`}
                >
                  {MEDALS[i] ?? i + 1}
                </span>
                <span className={compact ? 'text-sm' : 'text-base'}>{r.name}</span>
              </span>

              <span className="flex items-center gap-4">
                {!compact && (
                  <span className="text-xs text-slate-500 font-semibold hidden sm:inline">
                    {r.played} PJ · {r.wins} G
                  </span>
                )}
                <span className={`font-black text-brand-navy ${compact ? 'text-lg' : 'text-xl'}`}>
                  {r.score}
                </span>
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
