export default function TableScoreboard({ tables, scores, activeTable, onAdjust }) {
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {tables.map((table, index) => {
        const isActive = activeTable === table.id
        return (
          <div
            key={table.id}
            className={`table-card bg-white p-4 rounded-2xl border-2 shadow-sm relative overflow-hidden flex flex-col justify-between ${
              isActive ? 'active-turn border-brand-green' : 'border-slate-200'
            }`}
          >
            <div className="flex justify-between items-start gap-2">
              <div className="min-w-0">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  Mesa #{index + 1}
                </span>
                <h2 className="font-extrabold text-base text-brand-navy truncate">{table.name}</h2>
              </div>
              <span
                className={`text-[10px] font-bold bg-brand-green text-brand-navy px-2.5 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
                  isActive ? '' : 'hidden'
                }`}
              >
                En Turno
              </span>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-xs text-slate-500 font-semibold">Puntos:</span>
              <span className="text-3xl font-black text-brand-navy">{scores[table.id] ?? 0}</span>
            </div>
            <div className="mt-2 pt-2 border-t border-slate-100 flex justify-end gap-1">
              <button
                onClick={() => onAdjust(table.id, -10)}
                title="Restar 10 pts"
                className="w-6 h-6 rounded bg-slate-100 hover:bg-red-100 text-red-600 font-bold text-xs flex items-center justify-center transition"
              >
                -
              </button>
              <button
                onClick={() => onAdjust(table.id, 10)}
                title="Sumar 10 pts"
                className="w-6 h-6 rounded bg-slate-100 hover:bg-emerald-100 text-emerald-600 font-bold text-xs flex items-center justify-center transition"
              >
                +
              </button>
            </div>
          </div>
        )
      })}
    </section>
  )
}
