export default function TurnSummaryModal({ open, teamName, score, isLast, onClose }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full text-center shadow-2xl border-4 border-brand-green">
        <div className="w-16 h-16 bg-brand-green/20 text-brand-green rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
          <i className="fa-solid fa-stopwatch" />
        </div>
        <h3 className="text-2xl font-black text-brand-navy">¡Tiempo Agotado!</h3>
        <p className="text-slate-500 font-bold my-1">Resultado de {teamName}</p>

        <div className="my-6 p-4 bg-slate-100 rounded-2xl">
          <span className="text-xs text-slate-400 font-bold uppercase block">
            Puntuación Total en 7 min
          </span>
          <span className="text-5xl font-black text-brand-navy">{score}</span>
          <span className="text-sm font-bold text-brand-green block mt-1">Aciertos logrados</span>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 bg-brand-navy hover:bg-brand-blue text-white font-extrabold rounded-xl shadow-lg transition-all"
        >
          {isLast ? 'Ver Resultados Finales' : 'Continuar al Ranking'}{' '}
          <i className="fa-solid fa-arrow-right ml-1" />
        </button>
      </div>
    </div>
  )
}
