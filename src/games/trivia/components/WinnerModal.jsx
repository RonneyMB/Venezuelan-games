export default function WinnerModal({ open, winner, tables, scores, onRestart }) {
  if (!open) return null

  const ranking = tables
    .map((t) => ({ id: t.id, name: t.name, score: scores[t.id] ?? 0 }))
    .sort((a, b) => b.score - a.score)

  const winnerName = tables.find((t) => t.id === winner)?.name ?? '—'

  return (
    <div className="fixed inset-0 bg-brand-navy/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 text-center shadow-2xl border-4 border-brand-green">
        <div className="w-20 h-20 bg-amber-400 text-white rounded-full flex items-center justify-center text-4xl mx-auto mb-4 animate-bounce">
          <i className="fa-solid fa-trophy" />
        </div>
        <h3 className="text-2xl font-black text-brand-navy">¡Juego Finalizado!</h3>
        <p className="text-slate-500 font-bold my-1">
          Campeona: <span className="text-brand-green">{winnerName}</span>
        </p>

        <div className="my-6 space-y-2 max-h-[40vh] overflow-y-auto">
          {ranking.map((row, i) => (
            <div
              key={row.id}
              className={`flex items-center justify-between px-4 py-2.5 rounded-xl border ${
                row.id === winner ? 'bg-amber-50 border-amber-300' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <span className="font-bold text-brand-navy flex items-center gap-2 min-w-0">
                <span className="text-xs font-black text-slate-400 shrink-0">#{i + 1}</span>
                <span className="truncate">{row.name}</span>
                {row.id === winner && (
                  <i className="fa-solid fa-crown text-amber-500 shrink-0" />
                )}
              </span>
              <span className="font-black text-brand-navy shrink-0">{row.score} pts</span>
            </div>
          ))}
        </div>

        <button
          onClick={onRestart}
          className="w-full py-3.5 bg-brand-navy hover:bg-brand-navy-light text-white font-extrabold rounded-xl shadow-lg transition-all"
        >
          Jugar de nuevo <i className="fa-solid fa-rotate-right ml-1" />
        </button>
      </div>
    </div>
  )
}
