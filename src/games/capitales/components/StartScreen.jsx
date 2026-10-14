export default function StartScreen({ tables, onStart }) {
  return (
    <section className="glass-panel rounded-3xl p-6 sm:p-10 text-center max-w-2xl w-full my-auto shadow-2xl relative overflow-hidden border border-amber-300/40">
      <div className="text-6xl mb-4 animate-bounce">🗺️</div>
      <h2 className="font-outfit text-3xl sm:text-5xl font-extrabold tracking-tight mb-3 text-brand-navy">
        <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
          24 Capitales
        </span>{' '}
        de Venezuela
      </h2>
      <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto mb-6 leading-relaxed">
        Se muestra un estado en el mapa y las mesas compiten por responder su capital. El
        administrador pulsa la mesa ganadora para sumarle <strong>+10</strong> al{' '}
        <strong>marcador general</strong>.
      </p>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {tables.map((t) => (
          <span
            key={t.id}
            className="text-xs font-bold px-3 py-1.5 rounded-full bg-brand-navy/5 text-brand-navy border border-slate-200"
          >
            {t.name}
          </span>
        ))}
      </div>

      <button
        onClick={onStart}
        disabled={tables.length < 1}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-outfit font-black text-lg shadow-xl hover:scale-105 active:scale-95 transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        ▶️ Iniciar Partida
      </button>

      <div className="text-xs text-slate-500 mt-6 flex items-center justify-center gap-2">
        <span>💡 Tip:</span>
        <span>El administrador ve la capital correcta y asigna los puntos manualmente.</span>
      </div>
    </section>
  )
}
