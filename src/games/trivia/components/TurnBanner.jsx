export default function TurnBanner({ activeTableName }) {
  return (
    <div className="bg-brand-green-light border-b border-brand-green/20 px-6 py-2.5 flex items-center justify-between gap-3 flex-wrap">
      <div className="flex items-center gap-2 text-sm font-bold text-brand-navy">
        <i className="fa-solid fa-dice text-brand-green text-base" />
        <span>
          Turno asignado a{' '}
          <strong className="text-brand-navy underline">{activeTableName || '—'}</strong>
        </span>
      </div>
      <span className="bg-brand-navy text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
        <i className="fa-solid fa-award text-brand-green mr-1" /> Acierto = +10 pts
      </span>
    </div>
  )
}
