import { useTables } from '../context/TablesContext.jsx'

export default function TablesPanel() {
  const { tables, addTable, removeTable, renameTable, resetTables } = useTables()

  return (
    <section className="bg-white rounded-3xl border-2 border-slate-200 shadow-sm p-6 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-xl font-black text-brand-navy flex items-center gap-2">
            <i className="fa-solid fa-users-gear text-brand-green" />
            Mesas de Competencia
            <span className="text-[11px] font-bold text-brand-navy bg-brand-green/15 border border-brand-green/30 rounded-full px-2.5 py-0.5">
              {tables.length}
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Estas mesas son compartidas por la Trivia y el Torneo de Mímicas.
          </p>
        </div>
        <button
          onClick={resetTables}
          className="text-xs font-semibold px-3 py-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition flex items-center gap-1.5"
        >
          <i className="fa-solid fa-rotate-left" /> Restaurar 4 por defecto
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        {tables.map((table, index) => (
          <div
            key={table.id}
            className="group flex items-center gap-2 bg-slate-50 border border-slate-200 hover:border-brand-green rounded-xl pl-2 pr-1 py-1.5 w-48 transition-colors"
          >
            <span className="w-6 h-6 rounded-md bg-brand-navy text-white text-[11px] font-black flex items-center justify-center shrink-0">
              {index + 1}
            </span>
            <input
              type="text"
              value={table.name}
              onChange={(e) => renameTable(table.id, e.target.value)}
              className="w-full min-w-0 bg-transparent text-sm font-bold text-brand-navy focus:outline-none"
            />
            <button
              onClick={() => removeTable(table.id)}
              disabled={tables.length <= 1}
              title={tables.length <= 1 ? 'Debe haber al menos una mesa' : 'Eliminar mesa'}
              className="w-6 h-6 rounded-md text-slate-400 hover:bg-red-100 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center shrink-0 transition"
            >
              <i className="fa-solid fa-xmark text-xs" />
            </button>
          </div>
        ))}

        <button
          onClick={() => addTable()}
          className="flex items-center justify-center gap-2 w-48 border-2 border-dashed border-slate-300 hover:border-brand-green hover:text-brand-green text-slate-500 rounded-xl py-1.5 text-sm font-bold transition-colors"
        >
          <i className="fa-solid fa-plus text-xs" /> Agregar mesa
        </button>
      </div>
    </section>
  )
}
