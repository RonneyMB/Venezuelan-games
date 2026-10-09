import { useEffect, useState } from 'react'
import { useGameDisplay } from '../lib/sync.js'
import DisplayLayout, { WaitingForHost } from '../components/DisplayLayout.jsx'

const CHANNEL = 'incret-tradicional-display'
const MEDALS = ['🥇', '🥈', '🥉']
const ROLL_EMOJIS = ['🎲', '🌀', '🪀']

function SetupView() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-8 p-12 text-center">
      <div className="text-[clamp(5rem,10vw,10rem)] animate-bounce">🪀</div>
      <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-black text-brand-navy">
        Torneo de Juegos Tradicionales
      </h2>
      <p className="text-2xl text-slate-500">
        Inicia el torneo desde el panel de gestión para ver los enfrentamientos.
      </p>
    </div>
  )
}

function MatchView({ state }) {
  const { match } = state
  const rolling = state.rolling
  const revealed = Boolean(match.game)
  const [rollIndex, setRollIndex] = useState(0)

  useEffect(() => {
    if (!rolling) return
    const id = setInterval(() => setRollIndex((i) => (i + 1) % ROLL_EMOJIS.length), 120)
    return () => clearInterval(id)
  }, [rolling])

  return (
    <div className="flex-1 flex flex-col gap-6 p-6 lg:p-12">
      <div className="text-center">
        <span className="inline-block bg-brand-navy text-white text-xl font-black px-6 py-2 rounded-full uppercase tracking-wider">
          Partido {state.roundNumber} de {state.totalRounds}
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        <div className="text-center">
          <div className="text-[clamp(4rem,9vw,9rem)] leading-none">
            {revealed ? match.game.emoji : rolling ? ROLL_EMOJIS[rollIndex] : '🎲'}
          </div>
          <h2
            className={`font-black leading-tight ${
              revealed ? 'text-amber-500' : 'text-slate-400'
            } text-[clamp(2.5rem,6vw,6rem)] ${rolling ? 'animate-pulse' : ''}`}
          >
            {revealed ? match.game.name : rolling ? 'Sorteando juego…' : 'Juego por sortear'}
          </h2>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6 lg:gap-12 w-full max-w-6xl">
          <div className="bg-white border-4 border-slate-200 rounded-3xl px-8 py-10 text-center shadow-sm">
            <p className="text-[clamp(1.8rem,3.5vw,3.5rem)] font-black text-brand-navy leading-tight">
              {match.table1}
            </p>
          </div>
          <span className="text-[clamp(2rem,4vw,4rem)] font-black text-slate-300">VS</span>
          <div className="bg-white border-4 border-slate-200 rounded-3xl px-8 py-10 text-center shadow-sm">
            <p className="text-[clamp(1.8rem,3.5vw,3.5rem)] font-black text-brand-navy leading-tight">
              {match.table2}
            </p>
          </div>
        </div>

        {state.lastResult && (
          <p className="text-[clamp(1.3rem,2.5vw,2.5rem)] font-black text-brand-green">
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
      className="grid gap-4 mt-auto pt-4"
      style={{ gridTemplateColumns: `repeat(${Math.min(ranking.length, 6)}, minmax(0, 1fr))` }}
    >
      {ranking.map((r, i) => (
        <div
          key={r.id}
          className={`rounded-3xl border-2 p-4 text-center ${
            i === 0 && r.score > 0
              ? 'border-brand-green bg-brand-green/10 shadow-lg'
              : 'border-slate-200 bg-white'
          }`}
        >
          <p className="text-base font-bold text-slate-500 uppercase tracking-wide truncate">
            {MEDALS[i] ?? i + 1} {r.name}
          </p>
          <p className="text-[clamp(1.8rem,3.5vw,3.5rem)] font-black text-brand-navy leading-none">
            {r.score}
          </p>
        </div>
      ))}
    </div>
  )
}

function ChampionView({ state }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-6 p-10 text-center">
      <i className="fa-solid fa-trophy text-amber-400 text-[clamp(5rem,10vw,10rem)] animate-bounce" />
      <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-black text-brand-navy">
        ¡Torneo Finalizado!
      </h2>
      <p className="text-3xl text-slate-500 font-bold">Mesa campeona</p>
      <p className="text-[clamp(3rem,7vw,7rem)] font-black text-brand-green leading-none">
        {state.champion?.name}
      </p>

      <div className="grid gap-3 w-full max-w-3xl mt-6">
        {state.ranking.map((r, i) => (
          <div
            key={r.id}
            className={`flex items-center justify-between px-8 py-4 rounded-2xl border-2 text-2xl lg:text-3xl ${
              i === 0 && r.score > 0 ? 'bg-amber-50 border-amber-300' : 'bg-white border-slate-200'
            }`}
          >
            <span className="font-bold text-brand-navy flex items-center gap-4">
              <span className="text-slate-400">{MEDALS[i] ?? `#${i + 1}`}</span>
              {r.name}
            </span>
            <span className="font-black text-brand-navy">{r.score} pts</span>
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
