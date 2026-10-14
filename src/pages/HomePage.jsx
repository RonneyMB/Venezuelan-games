import GameCard from '../components/GameCard.jsx'
import TablesPanel from '../components/TablesPanel.jsx'
import { useTables } from '../context/TablesContext.jsx'
import { useGlobalScore } from '../context/GlobalScoreContext.jsx'

const MEDALS = ['🥇', '🥈', '🥉']

function GlobalScorePanel() {
  const { tables } = useTables()
  const { totals, resetAll } = useGlobalScore()

  const ranking = tables
    .map((t) => ({ id: t.id, name: t.name, score: totals[t.id] ?? 0 }))
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))

  const hasPoints = ranking.some((r) => r.score > 0)

  const onReset = () => {
    if (
      window.confirm(
        '¿Reiniciar el MARCADOR GENERAL de todas las mesas? Todos los puntos acumulados se pondrán a cero.',
      )
    ) {
      resetAll()
    }
  }

  return (
    <section className="bg-white rounded-3xl border-2 border-slate-200 shadow-sm p-6 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-xl font-black text-brand-navy flex items-center gap-2">
            <i className="fa-solid fa-trophy text-amber-400" />
            Marcador General
            <span className="text-[11px] font-bold text-brand-navy bg-amber-400/20 border border-amber-400/40 rounded-full px-2.5 py-0.5">
              Acumulado
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Puntos acumulados por mesa entre todos los juegos. Se suman en vivo.
          </p>
        </div>
        <button
          onClick={onReset}
          disabled={!hasPoints}
          className="text-xs font-semibold px-3 py-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 transition flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <i className="fa-solid fa-rotate-left" /> Reiniciar marcador general
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {ranking.map((r, i) => (
          <div
            key={r.id}
            className={`rounded-2xl border-2 px-4 py-3 flex items-center justify-between gap-2 ${
              i === 0 && r.score > 0
                ? 'border-amber-300 bg-amber-50'
                : 'border-slate-200 bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-2 min-w-0">
              <span className="text-base shrink-0">{MEDALS[i] ?? `#${i + 1}`}</span>
              <span className="font-bold text-brand-navy text-sm truncate">{r.name}</span>
            </span>
            <span className="font-black text-brand-navy text-lg shrink-0">{r.score}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <div className="flex-1 w-full">
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 bg-brand-green/15 text-brand-green text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider border border-brand-green/30">
            <i className="fa-solid fa-trophy text-amber-400" /> Zona de Juegos 360NET
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl font-black text-brand-navy leading-tight">
            Elige tu <span className="text-brand-green">desafío</span> venezolano
          </h1>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            Cuatro juegos interactivos que suman a un <strong>marcador general</strong> compartido:
            trivia por mesas, torneo de mímicas, capitales de Venezuela y torneo de perinola.
          </p>
        </div>

        <div className="mb-8">
          <TablesPanel />
        </div>

        <div className="mb-10">
          <GlobalScorePanel />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <GameCard
            to="/trivia"
            emoji="🎲"
            accent="green"
            title="Trivia Venezolana"
            description="30 preguntas de historia, cultura y comida típica. Las mesas compiten por turnos con un temporizador de 15 segundos por pregunta."
            meta={['Por turnos', '30 preguntas', 'Panel Host']}
          />
          <GameCard
            to="/mimicas"
            emoji="🎭"
            accent="blue"
            title="Torneo de Mímicas"
            description="Cada mesa juega un turno de 7 minutos para adivinar la mayor cantidad de conceptos venezolanos. Gana la mesa con más aciertos."
            meta={['7 min / turno', '+100 palabras', 'Ranking']}
          />
          <GameCard
            to="/capitales"
            emoji="🗺️"
            accent="amber"
            title="Capitales de Venezuela"
            description="Observa el estado resaltado en el mapa. La mesa más rápida responde y el administrador le suma puntos al marcador general."
            meta={['24 estados', 'Por mesas', '+10 manual']}
          />
          <GameCard
            to="/tradicional"
            emoji="🪀"
            accent="blue"
            title="Torneo de Perinola"
            description="Torneo donde las mesas se enfrentan todas contra todas a 2 vueltas en partidas de Perinola, con marcador en vivo y puntaje manual. Gana la mesa con más puntos."
            meta={['Todos vs Todos', '2 vueltas', 'Marcador en vivo']}
          />
        </div>

        <div className="mt-10 bg-brand-navy rounded-3xl p-6 sm:p-8 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl sm:text-2xl font-black">¿Listo para el reto?</h3>
            <p className="text-slate-300 text-sm mt-2">
              Los puntajes se manejan en vivo. Ideal para eventos, reuniones y dinámicas de equipo de
              360NET, C.A.
            </p>
          </div>
          <i className="fa-solid fa-dice absolute -right-4 -bottom-6 text-brand-green/20 text-9xl" />
        </div>
      </section>
    </div>
  )
}
