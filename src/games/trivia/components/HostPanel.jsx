export default function HostPanel({ open, onClose, tables, scores, onAdjust, onForceTurn }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 bg-brand-navy/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <h3 className="font-extrabold text-lg text-brand-navy flex items-center gap-2">
            <i className="fa-solid fa-sliders text-brand-green" /> Panel de Control del Host
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-xl font-bold"
            aria-label="Cerrar"
          >
            &times;
          </button>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider">
            Ajuste Manual de Puntajes:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {tables.map((table) => (
              <div
                key={table.id}
                className="bg-slate-50 p-2.5 rounded-xl border flex justify-between items-center gap-2"
              >
                <span className="font-bold text-xs text-brand-navy truncate">
                  {table.name}: {scores[table.id] ?? 0}
                </span>
                <div className="flex gap-1 shrink-0">
                  <button
                    onClick={() => onAdjust(table.id, -10)}
                    className="px-2 py-1 bg-red-100 text-red-700 font-bold text-xs rounded"
                  >
                    -10
                  </button>
                  <button
                    onClick={() => onAdjust(table.id, 10)}
                    className="px-2 py-1 bg-emerald-100 text-emerald-700 font-bold text-xs rounded"
                  >
                    +10
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider">
            Forzar Turno a Mesa:
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {tables.map((table) => (
              <button
                key={table.id}
                onClick={() => onForceTurn(table.id)}
                className="py-2 px-2 bg-brand-navy text-white font-bold text-xs rounded-xl hover:bg-brand-navy-light truncate"
              >
                {table.name}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-800 text-white font-bold px-5 py-2 rounded-xl text-xs"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}
