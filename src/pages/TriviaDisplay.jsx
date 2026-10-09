import { useGameDisplay } from '../lib/sync.js'
import DisplayLayout, { WaitingForHost } from '../components/DisplayLayout.jsx'
import WildcardDisplay from '../games/trivia/components/WildcardDisplay.jsx'

const CHANNEL = 'incret-trivia-display'

function QuestionView({ state }) {
  const urgent = state.timeLeft <= 4
  const isAnswering = state.phase === 'answering' || state.answered
  const phaseLabel = isAnswering ? '✍️ Respondiendo' : '⏸️ Listo para comenzar'
  const phaseClasses = isAnswering
    ? 'bg-brand-green/15 text-brand-green border-brand-green/40'
    : 'bg-slate-100 text-slate-600 border-slate-300'

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-4 lg:gap-6 p-4 sm:p-6 lg:p-10 overflow-hidden">
      <header className="shrink-0 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3 flex-wrap min-w-0">
          <span className="bg-brand-green/15 text-brand-green border-2 border-brand-green/40 px-4 lg:px-6 py-1.5 lg:py-2 rounded-full text-sm sm:text-base lg:text-xl font-black uppercase tracking-wider">
            {state.category}
          </span>
          <span
            className={`px-3 lg:px-5 py-1.5 lg:py-2 rounded-full text-xs sm:text-sm lg:text-lg font-black uppercase tracking-wider border-2 ${phaseClasses}`}
          >
            {phaseLabel}
          </span>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 shrink-0">
          <span className="text-xs sm:text-sm lg:text-2xl font-bold text-slate-500">
            Pregunta {state.currentIndex + 1} / {state.totalQuestions}
          </span>
          <div
            className={`rounded-full border-[6px] lg:border-[8px] flex items-center justify-center w-[clamp(3.5rem,7vw,7rem)] h-[clamp(3.5rem,7vw,7rem)] ${
              urgent ? 'border-red-500 text-red-500 timer-urgent' : 'border-brand-green text-brand-navy'
            }`}
          >
            <span className="text-[clamp(1.5rem,3.5vw,3.5rem)] font-black font-mono leading-none">
              {state.timeLeft}
            </span>
          </div>
        </div>
      </header>

      <div className="flex-1 min-h-0 flex flex-col gap-4 lg:gap-6 overflow-hidden">
        <section className="flex-1 min-h-0 overflow-y-auto flex flex-col">
          <div className="m-auto w-full max-w-6xl flex flex-col gap-4 lg:gap-6 py-2">
            <h2 className="text-[clamp(1.5rem,3.4vw,3.25rem)] font-black text-brand-navy text-center leading-[1.1]">
              {state.question}
            </h2>

            {isAnswering && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-5">
                {state.options.map((opt, idx) => {
                  const isCorrect = state.answered && idx === state.correct
                  const isWrong = state.answered && idx === state.selected && idx !== state.correct
                  let cls = 'bg-white border-slate-200 text-slate-800'
                  if (isCorrect) cls = 'bg-emerald-500 border-emerald-700 text-white'
                  else if (isWrong) cls = 'bg-red-500 border-red-700 text-white'
                  else if (state.answered) cls = 'bg-white border-slate-200 text-slate-400 opacity-70'

                  return (
                    <div
                      key={idx}
                      className={`flex items-center gap-3 lg:gap-4 rounded-2xl lg:rounded-3xl border-2 p-3 lg:p-5 shadow-sm transition-colors ${cls}`}
                    >
                      <span className="w-10 h-10 lg:w-14 lg:h-14 rounded-xl bg-black/5 flex items-center justify-center text-xl lg:text-3xl font-black shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="min-w-0 break-words text-[clamp(1rem,1.5vw,1.5rem)] font-bold leading-snug">
                        {opt}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        <div className="shrink-0 border-t border-slate-200 pt-3">
          <div className="flex flex-wrap items-center justify-center gap-2 lg:gap-3">
            {[...state.tables]
              .sort((a, b) => b.score - a.score)
              .map((t, i) => {
                const isActive = t.id === state.activeTableId
                const medal =
                  i === 0
                    ? 'bg-amber-400 text-white'
                    : i === 1
                      ? 'bg-slate-300 text-white'
                      : i === 2
                        ? 'bg-amber-700 text-white'
                        : 'bg-brand-navy/10 text-brand-navy'
                return (
                  <div
                    key={t.id}
                    className={`shrink-0 flex items-center gap-1.5 lg:gap-2 rounded-full border-2 pl-1.5 pr-3 lg:pr-4 py-1 lg:py-1.5 transition-colors ${
                      isActive
                        ? 'border-brand-green bg-brand-green/15 ring-2 ring-brand-green/40'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center text-xs lg:text-sm font-black shrink-0 ${medal}`}
                    >
                      {i + 1}
                    </span>
                    <span className="min-w-0 max-w-[7rem] lg:max-w-[11rem] truncate text-xs sm:text-sm lg:text-base font-bold text-brand-navy">
                      {t.name}
                    </span>
                    {isActive && (
                      <span className="shrink-0 text-brand-green text-xs lg:text-sm font-black leading-none">
                        ▶
                      </span>
                    )}
                    <span className="shrink-0 text-sm sm:text-base lg:text-xl font-black text-brand-navy">
                      {t.score}
                    </span>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}

function WinnerView({ state }) {
  const ranking = [...state.tables].sort((a, b) => b.score - a.score)

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-6 p-10 text-center">
      <i className="fa-solid fa-trophy text-amber-400 text-[clamp(5rem,10vw,10rem)] animate-bounce" />
      <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-black text-brand-navy">
        ¡Juego Finalizado!
      </h2>
      <p className="text-3xl text-slate-500 font-bold">Mesa campeona</p>
      <p className="text-[clamp(3rem,7vw,7rem)] font-black text-brand-green leading-none">
        {state.winnerName}
      </p>

      <div className="grid gap-3 w-full max-w-3xl mt-6">
        {ranking.map((r, i) => (
          <div
            key={r.id}
            className={`flex items-center justify-between px-8 py-4 rounded-2xl border-2 text-2xl lg:text-3xl ${
              r.name === state.winnerName
                ? 'bg-amber-50 border-amber-300'
                : 'bg-white border-slate-200'
            }`}
          >
            <span className="font-bold text-brand-navy flex items-center gap-4">
              <span className="text-slate-400">#{i + 1}</span>
              {r.name}
            </span>
            <span className="font-black text-brand-navy">{r.score} pts</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TriviaDisplay() {
  const state = useGameDisplay(CHANNEL)

  return (
    <DisplayLayout>
      {!state?.ready ? (
        <WaitingForHost />
      ) : state.finished ? (
        <WinnerView state={state} />
      ) : state.wildcardPhase && state.wildcardPhase !== 'idle' ? (
        <WildcardDisplay
          phase={state.wildcardPhase}
          current={state.currentWildcard}
          result={state.wildcardResult}
        />
      ) : (
        <QuestionView state={state} />
      )}
    </DisplayLayout>
  )
}
