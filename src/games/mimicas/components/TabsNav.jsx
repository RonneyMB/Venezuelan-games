export default function TabsNav({ tab, onChange, onReset }) {
  const items = [
    { id: 'ranking', label: 'Ranking de Mesas', icon: 'fa-solid fa-ranking-star' },
    { id: 'game', label: 'Mesa de Juego', icon: 'fa-solid fa-gamepad text-brand-green' },
    { id: 'words', label: 'Banco de Palabras (100+)', icon: 'fa-solid fa-list-check' },
  ]

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl shadow-sm border border-slate-200">
      <div className="flex flex-wrap items-center gap-2">
        {items.map((item) => {
          const active = tab === item.id
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                active
                  ? 'bg-brand-navy text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <i className={item.icon} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </div>

      <button
        onClick={onReset}
        className="text-xs font-semibold px-3 py-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 transition-colors"
      >
        <i className="fa-solid fa-rotate-right mr-1" /> Reiniciar Torneo
      </button>
    </div>
  )
}
