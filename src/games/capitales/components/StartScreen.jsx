export default function StartScreen({ onStart }) {
  return (
    <section className="glass-panel rounded-3xl p-6 sm:p-10 text-center max-w-2xl w-full my-auto shadow-2xl relative overflow-hidden border border-amber-300/40">
      <div className="text-6xl mb-4 animate-bounce">🗺️</div>
      <h2 className="font-outfit text-3xl sm:text-5xl font-extrabold tracking-tight mb-3 text-brand-navy">
        ¿Te sabes las{' '}
        <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
          24 Capitales
        </span>{' '}
        de Venezuela?
      </h2>
      <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed">
        Observa el estado resaltado en el mapa de Venezuela y responde oralmente el nombre de su
        ciudad capital. El administrador validará tu respuesta.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 max-w-md mx-auto mb-8">
        <button
          onClick={() => onStart('normal')}
          className="p-5 rounded-2xl bg-white border-2 border-amber-200 hover:border-amber-400 hover:bg-amber-50 transition text-left group"
        >
          <div className="text-2xl mb-1">🧭 Modo Práctica</div>
          <div className="font-bold text-brand-navy text-sm group-hover:text-amber-600">
            Sin límite de tiempo
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Aprende y repasa cada estado a tu ritmo con validación del administrador.
          </div>
        </button>

        <button
          onClick={() => onStart('timed')}
          className="p-5 rounded-2xl bg-white border-2 border-amber-200 hover:border-amber-400 hover:bg-amber-50 transition text-left group"
        >
          <div className="text-2xl mb-1">⏱️ Contrarreloj</div>
          <div className="font-bold text-brand-navy text-sm group-hover:text-amber-600">
            30 segundos por ronda
          </div>
          <div className="text-xs text-slate-500 mt-1">
            El administrador inicia el contador en cada estado.
          </div>
        </button>
      </div>

      <div className="text-xs text-slate-500 flex items-center justify-center gap-2">
        <span>💡 Tip:</span>
        <span>El administrador verá la capital correcta y la marcará como correcta o incorrecta.</span>
      </div>
    </section>
  )
}
