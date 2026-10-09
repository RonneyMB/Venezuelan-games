export default function ResultsScreen({ score, total, totalAttempts, elapsed, onPlayAgain }) {
  const accuracy = totalAttempts > 0 ? Math.round((score / totalAttempts) * 100) : 100

  return (
    <section className="glass-panel rounded-3xl p-6 sm:p-10 text-center max-w-xl w-full my-auto shadow-2xl border border-amber-300/40">
      <div className="text-6xl mb-3">🏆</div>
      <h2 className="font-outfit text-3xl sm:text-4xl font-extrabold text-brand-navy mb-2">
        ¡Desafío Completado!
      </h2>
      <p className="text-slate-600 text-sm mb-6">
        Demostraste tu conocimiento sobre la geografía venezolana.
      </p>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white p-4 rounded-2xl border border-slate-200">
          <span className="text-[10px] text-slate-500 uppercase font-bold">Aciertos</span>
          <div className="font-outfit font-black text-2xl text-emerald-600 my-1">
            {score} / {total}
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200">
          <span className="text-[10px] text-slate-500 uppercase font-bold">Precisión</span>
          <div className="font-outfit font-black text-2xl text-amber-600 my-1">{accuracy}%</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200">
          <span className="text-[10px] text-slate-500 uppercase font-bold">Tiempo</span>
          <div className="font-outfit font-black text-2xl text-sky-600 my-1">{elapsed}s</div>
        </div>
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
