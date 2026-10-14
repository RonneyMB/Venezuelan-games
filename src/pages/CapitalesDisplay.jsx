import { useGameDisplay } from '../lib/sync.js'
import DisplayLayout, { WaitingForHost } from '../components/DisplayLayout.jsx'
import VenezuelaMap from '../games/capitales/components/VenezuelaMap.jsx'
import { VENEZUELA_STATES } from '../games/capitales/data/states.js'

const CHANNEL = 'incret-capitales-display'
const MEDALS = ['🥇', '🥈', '🥉']

function RankingStrip({ ranking, direction = 'row' }) {
  if (direction === 'column') {
    return (
      <div className="flex flex-col gap-2 lg:gap-3 w-full">
        {ranking.map((r, i) => {
          const isLeader = i === 0 && r.score > 0
          return (
            <div
              key={r.id}
              className={`flex-1 min-h-0 max-h-24 lg:max-h-32 flex items-center justify-between gap-2 lg:gap-3 rounded-2xl border-4 px-3 lg:px-4 py-2 min-w-0 ${
                isLeader
                  ? 'border-amber-400 bg-amber-50 shadow-xl ring-4 ring-amber-200'
                  : 'border-slate-300 bg-white'
              }`}
            >
              <span
                className={`min-w-0 truncate font-black uppercase tracking-wide leading-tight text-[clamp(0.85rem,min(1.3vw,2.4vh),1.5rem)] ${
                  isLeader ? 'text-amber-700' : 'text-slate-600'
                }`}
              >
                {MEDALS[i] ?? i + 1} {r.name}
              </span>
              <span
                className={`shrink-0 font-black leading-none text-[clamp(2rem,min(3.4vw,6vh),4rem)] ${
                  isLeader ? 'text-amber-600' : 'text-brand-navy'
                }`}
              >
                {r.score}
              </span>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div
      className="grid gap-2 lg:gap-3 shrink-0"
      style={{ gridTemplateColumns: `repeat(${Math.max(ranking.length, 1)}, minmax(0, 1fr))` }}
    >
      {ranking.map((r, i) => (
        <div
          key={r.id}
          className={`rounded-2xl border-2 px-2 py-2 lg:px-3 lg:py-3 text-center min-w-0 ${
            i === 0 && r.score > 0 ? 'border-amber-400 bg-amber-50 shadow-lg' : 'border-slate-200 bg-white'
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

function StartView() {
  return (
    <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-4 lg:gap-6 p-6 lg:p-10 text-center overflow-hidden">
      <div className="text-[clamp(3.5rem,min(9vw,16vh),8rem)] animate-bounce leading-none">🗺️</div>
      <h2 className="text-[clamp(1.8rem,min(4.5vw,8vh),4rem)] font-black text-brand-navy">
        Capitales de Venezuela
      </h2>
      <p className="text-sm lg:text-xl text-slate-500 max-w-2xl">
        Inicia la partida desde el panel de gestión para comenzar.
      </p>
    </div>
  )
}

function GameView({ state }) {
  const feedback = state.answered ? state.feedback : null
  const isCorrect = feedback?.variant === 'correct'

  return (
    <div className="relative flex-1 min-h-0 flex flex-col gap-2 lg:gap-4 p-4 sm:p-6 lg:p-8 overflow-hidden">
      <div className="shrink-0 flex items-center justify-center bg-white border-2 border-slate-200 rounded-2xl px-6 py-2 shadow-sm">
        <div className="text-center">
          <p className="text-xs lg:text-base uppercase font-bold text-slate-400 tracking-wider">Progreso</p>
          <p className="text-[clamp(1.2rem,min(2.4vw,4.5vh),2.2rem)] font-black leading-none text-brand-navy">
            {state.currentIndex + 1} / {state.total}
          </p>
        </div>
      </div>

      <div className="flex-1 min-h-0 flex gap-3 lg:gap-4 overflow-hidden">
        <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-1 lg:gap-2 overflow-hidden">
          <div className="flex-1 min-h-0 w-full max-w-5xl">
            <VenezuelaMap states={VENEZUELA_STATES} activeId={state.activeId} />
          </div>
          <p className="text-xs lg:text-base uppercase tracking-[0.3em] text-slate-400 font-bold shrink-0">
            Estado / Entidad Federal
          </p>
          <h2 className="text-[clamp(1.6rem,min(4.5vw,7.5vh),4rem)] font-black text-amber-500 leading-none break-words text-center shrink-0 max-w-full">
            {state.stateName}
          </h2>
        </div>

        <div className="shrink-0 w-52 lg:w-80 flex flex-col gap-2 lg:gap-3 min-h-0">
          <p className="shrink-0 text-center text-[clamp(0.85rem,min(1.3vw,2.2vh),1.25rem)] font-black uppercase tracking-widest text-brand-navy">
            Marcador General
          </p>
          <RankingStrip ranking={state.ranking} direction="column" />
        </div>
      </div>

      {feedback && (
        <div className="absolute inset-0 z-20 flex items-center justify-center p-4 lg:p-8 pointer-events-none">
          <div
            className={`animate-feedback-pop w-full max-w-3xl rounded-3xl px-6 lg:px-10 py-6 lg:py-10 text-center text-white shadow-2xl border-4 ${
              isCorrect ? 'bg-emerald-500/95 border-emerald-300' : 'bg-slate-600/95 border-slate-400'
            }`}
          >
            <div className="text-[clamp(2rem,min(5vw,9vh),4.5rem)] leading-none mb-2 lg:mb-4">
              {isCorrect ? '🎉' : '👀'}
            </div>
            <h2 className="text-[clamp(1.5rem,min(4vw,7vh),3.4rem)] font-black leading-none mb-2 lg:mb-4 break-words">
              {isCorrect ? `¡${feedback.tableName} +10!` : 'Capital'}
            </h2>
            <p className="text-[clamp(0.95rem,min(2vw,3.6vh),1.7rem)] font-semibold">
              La capital de <strong>{feedback.stateName}</strong> es{' '}
              <strong>{feedback.capital}</strong>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

function ResultsView({ state }) {
  return (
    <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-2 lg:gap-4 p-4 sm:p-8 text-center overflow-hidden">
      <div className="text-[clamp(3rem,min(8vw,14vh),7rem)] leading-none">🏆</div>
      <h2 className="text-[clamp(1.6rem,min(4vw,7vh),3.4rem)] font-black text-brand-navy shrink-0">
        ¡Partida Completada!
      </h2>
      <p className="text-sm lg:text-2xl text-slate-500 font-bold shrink-0">Líder del marcador general</p>
      <p className="text-[clamp(2rem,min(5.5vw,10vh),5rem)] font-black text-brand-green leading-none break-words shrink-0">
        {state.leader?.score > 0 ? state.leader?.name : '—'}
      </p>

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

export default function CapitalesDisplay() {
  const state = useGameDisplay(CHANNEL)

  let content
  if (!state?.ready) content = <WaitingForHost />
  else if (state.screen === 'game') content = <GameView state={state} />
  else if (state.screen === 'results') content = <ResultsView state={state} />
  else content = <StartView />

  return <DisplayLayout>{content}</DisplayLayout>
}
