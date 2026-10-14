import { useGameDisplay } from '../lib/sync.js'
import DisplayLayout, { WaitingForHost } from '../components/DisplayLayout.jsx'

const CHANNEL = 'incret-tradicional-display'
const MEDALS = ['🥇', '🥈', '🥉']

function SetupView() {
  return (
    <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-4 lg:gap-6 p-6 lg:p-10 text-center overflow-hidden">
      <div className="text-[clamp(3.5rem,min(9vw,16vh),8rem)] animate-bounce leading-none">🪀</div>
      <h2 className="text-[clamp(1.8rem,min(4.5vw,8vh),4rem)] font-black text-brand-navy">
        Torneo de Perinola
      </h2>
      <p className="text-sm lg:text-xl text-slate-500 max-w-2xl">
        Inicia el torneo desde el panel de gestión para ver los enfrentamientos.
      </p>
    </div>
  )
}

function MatchView({ state }) {
  const { match, matchPoints } = state
  const p1 = matchPoints[match.table1Id] ?? 0
  const p2 = matchPoints[match.table2Id] ?? 0

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-2 lg:gap-4 p-4 sm:p-6 lg:p-8 overflow-hidden">
      <div className="text-center shrink-0">
        <span className="inline-block bg-brand-navy text-white text-xs lg:text-lg font-black px-4 lg:px-6 py-1 lg:py-2 rounded-full uppercase tracking-wider">
          Partido {state.roundNumber} de {state.totalRounds}
        </span>
      </div>

      <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-3 lg:gap-6 overflow-hidden w-full">
        <div className="text-center shrink-0">
          <div className="text-[clamp(2.5rem,min(6vw,10vh),5.5rem)] leading-none">{match.game.emoji}</div>
          <h2 className="font-black leading-tight text-amber-500 text-[clamp(1.5rem,min(4vw,7vh),3.6rem)]">
            {match.game.name}
          </h2>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 lg:gap-8 w-full max-w-5xl shrink-0">
          <div className="bg-white border-4 border-slate-200 rounded-3xl px-3 lg:px-8 py-3 lg:py-6 text-center shadow-sm min-w-0">
            <p className="text-[clamp(1rem,min(2.2vw,4vh),1.9rem)] font-black text-brand-navy leading-tight truncate">
              {match.table1}
            </p>
            <p className="text-[clamp(2.2rem,min(6vw,11vh),5rem)] font-black text-brand-green leading-none tabular-nums">
              {matchPoints[match.table1Id] ?? 0}
            </p>
          </div>
          <span className="text-[clamp(1.2rem,min(3vw,5vh),2.6rem)] font-black text-slate-300">VS</span>
          <div className="bg-white border-4 border-slate-200 rounded-3xl px-3 lg:px-8 py-3 lg:py-6 text-center shadow-sm min-w-0">
            <p className="text-[clamp(1rem,min(2.2vw,4vh),1.9rem)] font-black text-brand-navy leading-tight truncate">
              {match.table2}
            </p>
            <p className="text-[clamp(2.2rem,min(6vw,11vh),5rem)] font-black text-brand-green leading-none tabular-nums">
              {matchPoints[match.table2Id] ?? 0}
            </p>
          </div>
        </div>

        {state.lastResult && (
          <p className="text-[clamp(1rem,min(2.2vw,4vh),1.9rem)] font-black text-brand-green shrink-0 truncate max-w-full">
            {state.lastResult.tie
              ? '🤝 ¡Empate!'
              : state.lastResult.skip
                ? 'Partido saltado'
                : `🏆 Ganó ${state.lastResult.winner}`}
          </p>
        )}
      </div>

      <RankingStrip ranking={state.ranking} />
    </div>
  )
}

function RankingStrip({ ranking }) {
  return (
    <div
      className="grid gap-2 lg:gap-3 shrink-0"
      style={{ gridTemplateColumns: `repeat(${Math.max(ranking.length, 1)}, minmax(0, 1fr))` }}
    >
      {ranking.map((r, i) => (
        <div
          key={r.id}
          className={`rounded-2xl border-2 px-2 py-2 lg:px-3 lg:py-3 text-center min-w-0 ${
            i === 0 && r.score > 0 ? 'border-brand-green bg-brand-green/10 shadow-lg' : 'border-slate-200 bg-white'
          }`}
        >
          <p className="text-xs lg:text-sm font-bold text-slate-500 uppercase tracking-wide truncate">
            {MEDALS[i] ?? i + 1} {r.name}
          </p>
          <p className="text-[clamp(1.3rem,min(3vw,5.5vh),2.6rem)] font-black text-brand-navy leading-none">
            {r.score}
          </p>
        </div>
      ))}
    </div>
  )
}

function ChampionView({ state }) {
  const many = state.ranking.length > 6

  return (
    <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-2 lg:gap-4 p-4 sm:p-8 text-center overflow-hidden">
      <i className="fa-solid fa-trophy text-amber-400 text-[clamp(3rem,min(8vw,14vh),7rem)] animate-bounce shrink-0" />
      <h2 className="text-[clamp(1.6rem,min(4vw,7vh),3.4rem)] font-black text-brand-navy shrink-0">
        ¡Torneo Finalizado!
      </h2>
      <p className="text-sm lg:text-2xl text-slate-500 font-bold shrink-0">Líder del marcador general</p>
      <p className="text-[clamp(2rem,min(5.5vw,10vh),5rem)] font-black text-brand-green leading-none break-words shrink-0">
        {state.champion?.name}
      </p>
      {state.champion && (
        <p className="text-lg lg:text-3xl font-black text-brand-navy shrink-0">{state.champion.score} pts</p>
      )}

      <div className="w-full max-w-3xl flex-1 min-h-0 flex flex-col gap-2 justify-center overflow-hidden mt-2">
        {state.ranking.map((r, i) => (
          <div
            key={r.id}
            className={`flex items-center justify-between px-4 lg:px-8 py-2 rounded-2xl border-2 flex-1 max-h-16 min-h-0 ${
              i === 0 && r.score > 0 ? 'bg-amber-50 border-amber-300' : 'bg-white border-slate-200'
            }`}
          >
            <span className="font-bold text-brand-navy flex items-center gap-3 lg:gap-4 min-w-0 text-base lg:text-2xl">
              <span className="text-slate-400 shrink-0">{MEDALS[i] ?? `#${i + 1}`}</span>
              <span className="truncate">{r.name}</span>
            </span>
            <span className="font-black text-brand-navy shrink-0 text-base lg:text-2xl">{r.score} pts</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TradicionalDisplay() {
  const state = useGameDisplay(CHANNEL)

  let content
  if (!state?.ready) content = <WaitingForHost />
  else if (state.finished) content = <ChampionView state={state} />
  else if (state.phase === 'playing' && state.match) content = <MatchView state={state} />
  else content = <SetupView />

  return <DisplayLayout>{content}</DisplayLayout>
}