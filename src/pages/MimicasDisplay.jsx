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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-auto pt-6">
      {ranking.map((t) => {
        const isActive = t.id === activeId
        return (
          <div
            key={t.id}
            className={`rounded-3xl border-2 p-4 lg:p-5 text-center ${
              isActive
                ? 'border-brand-green bg-brand-green/10 shadow-lg'
                : 'border-slate-200 bg-white'
            }`}
          >
            <p className="text-lg font-bold text-slate-500 uppercase tracking-wide truncate">
              {t.name}
            </p>
            <p className="text-[clamp(2.5rem,5vw,5rem)] font-black text-brand-navy leading-none">
              {t.score !== null ? t.score : '—'}
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
    <div className="flex-1 flex flex-col gap-6 p-6 lg:p-12">
      <div className="flex items-center justify-between gap-6 lg:gap-10 flex-wrap">
        <div className="bg-brand-navy text-white rounded-3xl px-10 py-6 shadow-xl">
          <p className="text-lg uppercase tracking-wider text-slate-300 font-bold">Juega ahora</p>
          <p className="text-[clamp(2rem,4vw,4rem)] font-black leading-tight">
            {state.currentTableName}
          </p>
        </div>

        <div
          className={`rounded-full border-[10px] flex items-center justify-center w-[clamp(9rem,15vw,15rem)] h-[clamp(9rem,15vw,15rem)] ${
            warning ? 'border-rose-500 text-rose-500' : 'border-brand-green text-brand-navy'
          }`}
        >
          <span className="text-[clamp(2.5rem,6vw,6rem)] font-black font-mono leading-none">
            {formatTime(state.timeLeft)}
          </span>
        </div>

        <div className="bg-brand-green/15 border-2 border-brand-green/40 rounded-3xl px-10 py-6 text-center">
          <p className="text-lg uppercase tracking-wider text-brand-green font-bold">Aciertos</p>
          <p className="text-[clamp(3rem,6vw,6rem)] font-black text-brand-navy leading-none">
            {state.currentTurnScore}
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center gap-8">
        <span className="px-8 py-3 bg-brand-navy/10 text-brand-navy font-extrabold text-2xl rounded-full uppercase tracking-wider border-2 border-brand-navy/20">
          {state.currentWord ? `Categoría: ${state.currentWord.category}` : 'Categoría'}
        </span>
        <h2 className="text-[clamp(3rem,9vw,9.5rem)] font-black text-brand-navy leading-[1.05] max-w-6xl">
          {state.currentWord ? state.currentWord.word : '¡Prepárate!'}
        </h2>
      </div>

      <RankingStrip ranking={state.ranking} activeId={state.currentTableId} />
    </div>
  )
}

function RankingView({ state }) {
  const total = state.ranking.length
  const played = state.ranking.filter((r) => r.score !== null).length

  return (
    <div className="flex-1 flex flex-col p-8 lg:p-12 gap-8">
      <div className="text-center">
        <span className="inline-block bg-brand-green/15 text-brand-green text-2xl font-black px-6 py-2 rounded-full uppercase tracking-wider border-2 border-brand-green/30">
          Torneo por Puntos
        </span>
        <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-black text-brand-navy mt-6">
          ¡Desafío de Mímicas 360NET!
        </h2>
        <p className="text-2xl text-slate-500 mt-2">
          {played} de {total} {total === 1 ? 'mesa ha jugado' : 'mesas han jugado'}
        </p>
      </div>

      <div className="w-full max-w-4xl mx-auto grid gap-4">
        {state.ranking.map((r, i) => (
          <div
            key={r.id}
            className={`flex items-center justify-between px-8 py-5 rounded-2xl border-2 ${
              r.score !== null ? 'bg-white border-slate-200' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className="flex items-center gap-5 font-black text-brand-navy text-3xl">
              <span className="w-12 h-12 rounded-xl bg-brand-navy text-white text-xl flex items-center justify-center">
                {i + 1}
              </span>
              {r.name}
            </span>
            <span className="font-black text-brand-navy text-4xl">
              {r.score !== null ? `${r.score} pts` : 'Por jugar'}
            </span>
          </div>
        ))}
      </div>
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
      {state.champion && (
        <p className="text-4xl font-black text-brand-navy">{state.champion.score} aciertos</p>
      )}

      <div className="grid gap-3 w-full max-w-3xl mt-6">
        {state.ranking.map((r, i) => (
          <div
            key={r.id}
            className={`flex items-center justify-between px-8 py-4 rounded-2xl border-2 text-2xl lg:text-3xl ${
              r.id === state.champion?.id
                ? 'bg-amber-50 border-amber-300'
                : 'bg-white border-slate-200'
            }`}
          >
            <span className="font-bold text-brand-navy flex items-center gap-4">
              <span className="text-slate-400">#{i + 1}</span>
              {r.name}
            </span>
            <span className="font-black text-brand-navy">
              {r.score !== null ? `${r.score} pts` : '—'}
            </span>
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
