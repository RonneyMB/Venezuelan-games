export default function RankingView({ tables, ranking, champion, finished, onStartTurn }) {
  const total = tables.length
  const played = ranking.filter((r) => r.played).length

  const startLabel = finished
    ? 'TORNEO FINALIZADO'
    : played === 0
      ? 'INICIAR PRIMER TURNO'
      : 'INICIAR SIGUIENTE TURNO'

  const statusBadge = (row) => {
    if (finished && row.id === champion?.id) {
      return (
        <span className="px-2.5 py-1 bg-amber-400 text-amber-950 rounded-full text-xs font-black whitespace-nowrap">
          🏆 Líder
        </span>
      )
    }
    if (row.played) {
      return (
        <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-bold whitespace-nowrap">
          Jugado
        </span>
      )
    }
    return (
      <span className="px-2 py-1 bg-slate-100 text-slate-500 rounded text-xs whitespace-nowrap">
        Por jugar
      </span>
    )
  }

  return (
    <section className="flex flex-col gap-6">
      <div className="gradient-brand text-white p-6 rounded-2xl shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="z-10 space-y-2 text-center md:text-left">
          <span className="inline-block bg-brand-green/20 text-brand-green text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider border border-brand-green/30">
            Marcador General
          </span>
          <h2 className="text-2xl md:text-3xl font-black">¡Desafío de Mímicas 360NET!</h2>
          <p className="text-slate-300 text-sm max-w-2xl">
            Cada mesa juega <strong>un turno de 7 minutos</strong> para adivinar la mayor cantidad
            posible de venezolanismos. Cada acierto suma al <strong>marcador general</strong> que se
            acumula entre todos los juegos.
          </p>
          <p className="text-slate-400 text-xs">
            {played} de {total} {total === 1 ? 'mesa ha jugado' : 'mesas han jugado'}
          </p>
        </div>
        <div className="z-10 flex-shrink-0">
          <button
            onClick={onStartTurn}
            disabled={finished}
            className="px-6 py-4 bg-brand-green hover:bg-brand-green-hover disabled:opacity-60 disabled:cursor-not-allowed text-brand-navy font-extrabold text-lg rounded-xl shadow-xl transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3"
          >
            <i className={`fa-solid ${finished ? 'fa-trophy' : 'fa-play'} text-xl`} />
            <span>{startLabel}</span>
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-brand-navy mb-4 flex items-center gap-2">
          <i className="fa-solid fa-ranking-star text-brand-green" />
          <span>Tabla de Posiciones (Acumulado)</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase font-extrabold border-b border-slate-200">
                <th className="p-3 w-16">Pos.</th>
                <th className="p-3">Mesa</th>
                <th className="p-3">Puntos</th>
                <th className="p-3">Estatus</th>
              </tr>
            </thead>
            <tbody className="text-sm font-semibold divide-y divide-slate-100">
              {ranking.map((row, index) => (
                <tr
                  key={row.id}
                  className={`hover:bg-slate-50 ${
                    finished && row.id === champion?.id ? 'bg-amber-50/60' : ''
                  }`}
                >
                  <td className="p-3 font-black text-slate-400">#{index + 1}</td>
                  <td className="p-3 font-bold text-brand-navy">
                    <span className="flex items-center gap-2">
                      {row.name}
                      {finished && row.id === champion?.id && (
                        <i className="fa-solid fa-crown text-amber-500" />
                      )}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="font-bold text-brand-navy">{row.score} pts</span>
                  </td>
                  <td className="p-3">{statusBadge(row)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
