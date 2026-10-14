const MEDALS = ['🥇', '🥈', '🥉']

export default function ResultsScreen({ ranking, leader, onPlayAgain }) {
  return (
    <section className="glass-panel rounded-3xl p-6 sm:p-10 text-center max-w-2xl w-full my-auto shadow-2xl border border-amber-300/40">
      <div className="text-6xl mb-3">🏆</div>
      <h2 className="font-outfit text-3xl sm:text-4xl font-extrabold text-brand-navy mb-2">
        ¡Partida Completada!
      </h2>
      <p className="text-slate-600 text-sm mb-6">
        Líder actual:{' '}
        <strong className="text-brand-green">{leader?.score > 0 ? leader.name : '—'}</strong>
      </p>

      <div className="mb-6 text-left">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3 text-center">
          Marcador general acumulado
        </h3>
        {ranking.map((r, i) => (
          <div
            key={r.id}
            className={`flex items-center justify-between px-5 py-3 rounded-2xl border-2 mb-2 ${
              i === 0 && r.score > 0 ? 'border-amber-300 bg-amber-50' : 'border-slate-200 bg-white'
            }`}
          >
            <span className="flex items-center gap-3 font-bold text-brand-navy">
              <span className="text-lg">{MEDALS[i] ?? `#${i + 1}`}</span>
              {r.name}
            </span>
            <span className="font-black text-brand-navy text-xl">{r.score} pts</span>
          </div>
        ))}
      </div>

      <button
        onClick={onPlayAgain}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-outfit font-black text-lg shadow-xl hover:scale-105 active:scale-95 transition"
      >
        JUGAR DE NUEVO 🔄
      </button>
    </section>
  )
}
