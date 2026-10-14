import { useGameDisplay } from '../lib/sync.js'
import DisplayLayout, { WaitingForHost } from '../components/DisplayLayout.jsx'

const CHANNEL = 'incret-mimicas-display'

function formatTime(total) {
  const minutes = Math.floor(total / 60)
  const seconds = total % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function RankingStrip({ ranking, activeId }) {
  return (
    <div
      className="grid gap-2 lg:gap-3 shrink-0"
      style={{ gridTemplateColumns: `repeat(${Math.max(ranking.length, 1)}, minmax(0, 1fr))` }}
    >
      {ranking.map((t) => {
        const isActive = t.id === activeId
        return (
          <div
            key={t.id}
            className={`rounded-2xl border-2 px-2 py-2 lg:px-3 lg:py-3 text-center min-w-0 ${
              isActive ? 'border-brand-green bg-brand-green/10 shadow-lg' : 'border-slate-200 bg-white'
            }`}
          >
            <p className="text-xs lg:text-base font-bold text-slate-500 uppercase tracking-wide truncate">
              {t.name}
            </p>
            <p className="text-[clamp(1.4rem,min(3.4vw,6vh),2.8rem)] font-black text-brand-navy leading-none">
              {t.score}
            </p>
          </div>
        )
      })}
    </div>
  )
}

function TurnView({ state }) {
  const warning = state.timeLeft <= 60

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-3 lg:gap-4 p-4 sm:p-6 lg:p-8 overflow-hidden">
      <div className="shrink-0 flex items-center justify-between gap-3 lg:gap-6 flex-wrap">
        <div className="bg-brand-navy text-white rounded-2xl px-5 lg:px-8 py-3 lg:py-4 shadow-xl min-w-0">
          <p className="text-xs lg:text-base uppercase tracking-wider text-slate-300 font-bold">Juega ahora</p>
          <p className="text-[clamp(1.4rem,min(3vw,5vh),2.6rem)] font-black leading-tight truncate">
            {state.currentTableName}
          </p>
        </div>

        <div
          className={`rounded-full border-[6px] lg:border-8 flex items-center justify-center w-[clamp(6rem,min(14vw,24vh),11rem)] h-[clamp(6rem,min(14vw,24vh),11rem)] shrink-0 ${
            warning ? 'border-rose-500 text-rose-500' : 'border-brand-green text-brand-navy'
          }`}
        >
          <span className="text-[clamp(1.6rem,min(4vw,7vh),3.4rem)] font-black font-mono leading-none">
            {formatTime(state.timeLeft)}
          </span>
        </div>

        <div className="bg-brand-green/15 border-2 border-brand-green/40 rounded-2xl px-5 lg:px-8 py-3 lg:py-4 text-center shrink-0">
          <p className="text-xs lg:text-base uppercase tracking-wider text-brand-green font-bold">Aciertos</p>
          <p className="text-[clamp(1.8rem,min(4vw,7vh),3.4rem)] font-black text-brand-navy leading-none">
            {state.currentTurnScore}
          </p>
        </div>
      </div>

      <div className="flex-1 min-h-0 flex flex-col items-center justify-center text-center gap-3 lg:gap-5 overflow-hidden">
        <span className="px-5 lg:px-8 py-1.5 lg:py-2.5 bg-brand-navy/10 text-brand-navy font-extrabold text-sm lg:text-xl rounded-full uppercase tracking-wider border-2 border-brand-navy/20 max-w-full truncate">
          {state.currentWord ? `Categoría: ${state.currentWord.category}` : 'Categoría'}
        </span>
        <h2 className="text-[clamp(2rem,min(8vw,12vh),6.5rem)] font-black text-brand-navy leading-[1.05] max-w-full break-words overflow-hidden">
          {state.currentWord ? state.currentWord.word : '¡Prepárate!'}
        </h2>
      </div>

      <RankingStrip ranking={state.ranking} activeId={state.currentTableId} />
    </div>
  )
}

function RankingView({ state }) {
  const total = state.ranking.length
  const played = state.ranking.filter((r) => r.played).length
  const many = total > 6

  return (
    <div className="flex-1 min-h-0 flex flex-col p-4 sm:p-6 lg:p-8 gap-3 lg:gap-5 overflow-hidden">
      <div className="text-center shrink-0">
        <span className="inline-block bg-brand-green/15 text-brand-green text-sm lg:text-xl font-black px-4 lg:px-6 py-1 lg:py-2 rounded-full uppercase tracking-wider border-2 border-brand-green/30">
          Marcador General
        </span>
        <h2 className="text-[clamp(1.6rem,min(4vw,7vh),3.4rem)] font-black text-brand-navy mt-2 lg:mt-4">
          ¡Desafío de Mímicas 360NET!
        </h2>
        <p className="text-sm lg:text-xl text-slate-500 mt-1">
          {played} de {total} {total === 1 ? 'mesa ha jugado' : 'mesas han jugado'}
        </p>
      </div>

      <div className="w-full max-w-4xl mx-auto flex-1 min-h-0 flex flex-col gap-2 lg:gap-3 justify-center overflow-hidden">
        {state.ranking.map((r, i) => (
          <div
            key={r.id}
            className={`flex items-center justify-between px-4 lg:px-8 rounded-2xl border-2 min-h-0 flex-1 max-h-20 ${
              r.played ? 'bg-white border-slate-200' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className={`flex items-center gap-3 lg:gap-5 font-black text-brand-navy min-w-0 ${many ? 'text-lg lg:text-2xl' : 'text-xl lg:text-3xl'}`}>
              <span className={`rounded-xl bg-brand-navy text-white flex items-center justify-center shrink-0 ${many ? 'w-8 h-8 text-sm' : 'w-10 h-10 lg:w-12 lg:h-12 text-base lg:text-xl'}`}>
                {i + 1}
              </span>
              <span className="truncate">{r.name}</span>
            </span>
            <span className={`font-black text-brand-navy shrink-0 ${many ? 'text-xl lg:text-3xl' : 'text-2xl lg:text-4xl'}`}>{`${r.score} pts`}</span>
          </div>
        ))}
      </div>
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
              r.id === state.champion?.id ? 'bg-amber-50 border-amber-300' : 'bg-white border-slate-200'
            }`}
          >
            <span className="font-bold text-brand-navy flex items-center gap-3 lg:gap-4 min-w-0 text-base lg:text-2xl">
              <span className="text-slate-400 shrink-0">#{i + 1}</span>
              <span className="truncate">{r.name}</span>
            </span>
            <span className="font-black text-brand-navy shrink-0 text-base lg:text-2xl">{`${r.score} pts`}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function MimicasDisplay() {
  const state = useGameDisplay(CHANNEL)

  let content
  if (!state?.ready) content = <WaitingForHost />
  else if (state.finished) content = <ChampionView state={state} />
  else if (state.currentTableId) content = <TurnView state={state} />
  else content = <RankingView state={state} />

  return (
    <DisplayLayout>
      {content}
    </DisplayLayout>
  )
}