import { Link } from 'react-router-dom'

const ACCENTS = {
  green: {
    bar: 'bg-brand-green',
    icon: 'bg-brand-green/15 text-brand-green',
    arrow: 'bg-brand-green',
    hover: 'group-hover:text-brand-green',
  },
  blue: {
    bar: 'bg-brand-blue',
    icon: 'bg-brand-blue/15 text-brand-blue',
    arrow: 'bg-brand-blue text-white',
    hover: 'group-hover:text-brand-blue',
  },
  amber: {
    bar: 'bg-amber-400',
    icon: 'bg-amber-400/20 text-amber-500',
    arrow: 'bg-amber-400',
    hover: 'group-hover:text-amber-500',
  },
}

export default function GameCard({
  to,
  icon,
  emoji,
  title,
  description,
  meta = [],
  accent = 'green',
}) {
  const a = ACCENTS[accent] ?? ACCENTS.green

  return (
    <Link
      to={to}
      className="group relative bg-white rounded-3xl border-2 border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col"
    >
      <div className={`h-2 w-full ${a.bar}`} />
      <div className="p-6 sm:p-7 flex flex-col flex-1">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${a.icon}`}>
            {emoji ? <span>{emoji}</span> : <i className={icon} />}
          </div>
          <h3 className="text-xl font-black text-brand-navy leading-tight">{title}</h3>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed flex-1">{description}</p>

        {meta.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-5">
            {meta.map((m) => (
              <span
                key={m}
                className="text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 border border-slate-200"
              >
                {m}
              </span>
            ))}
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <span className={`text-sm font-extrabold text-brand-navy transition-colors ${a.hover}`}>
            Jugar ahora
          </span>
          <span
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:translate-x-1 ${a.arrow}`}
          >
            <i className="fa-solid fa-arrow-right text-sm" />
          </span>
        </div>
      </div>
    </Link>
  )
}
