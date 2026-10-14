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
  // En tiempo agotado la pregunta vuelve al mazo: no se revela la respuesta correcta.
  const showAnswer = state.answered && !state.timedOut

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-3 lg:gap-5 p-4 sm:p-6 lg:p-8 overflow-hidden">
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
            Ronda {Math.min(state.turnCount, state.totalTurnos)} / {state.totalTurnos}
          </span>
          <div
            className={`rounded-full border-[6px] lg:border-[8px] flex items-center justify-center w-[clamp(3rem,min(7vw,12vh),6rem)] h-[clamp(3rem,min(7vw,12vh),6rem)] ${
              urgent ? 'border-red-500 text-red-500 timer-urgent' : 'border-brand-green text-brand-navy'
            }`}
          >
            <span className="text-[clamp(1.2rem,min(3vw,5.5vh),2.8rem)] font-black font-mono leading-none">
              {state.timeLeft}
            </span>
          </div>
        </div>
      </header>

      {state.timedOut && (
        <div className="shrink-0 rounded-2xl border-4 border-amber-400 bg-amber-50 px-4 lg:px-6 py-3 lg:py-4 text-center">
          <p className="text-[clamp(1.1rem,min(2.6vw,4.5vh),2.2rem)] font-black text-amber-700 leading-tight">
            ⏱️ ¡Tiempo agotado! La pregunta vuelve al mazo.
          </p>
        </div>
      )}

      <div className="flex-1 min-h-0 flex flex-col gap-3 lg:gap-5 overflow-hidden">
        <section className="flex-1 min-h-0 overflow-y-auto flex flex-col">
          <div className="m-auto w-full max-w-6xl flex flex-col gap-3 lg:gap-5 py-2">
            <h2 className="text-[clamp(1.3rem,min(3.2vw,5.5vh),2.8rem)] font-black text-brand-navy text-center leading-[1.1]">
              {state.question}
            </h2>

            {isAnswering && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-5">
                {state.options.map((opt, idx) => {
                  const isCorrect = showAnswer && idx === state.correct
                  const isWrong = showAnswer && idx === state.selected && idx !== state.correct
                  let cls = 'bg-white border-slate-200 text-slate-800'
                  if (isCorrect) cls = 'bg-emerald-500 border-emerald-700 text-white'
                  else if (isWrong) cls = 'bg-red-500 border-red-700 text-white'
                  else if (showAnswer) cls = 'bg-white border-slate-200 text-slate-400 opacity-70'

                  return (
                    <div
                      key={idx}
                      className={`flex items-center gap-3 lg:gap-4 rounded-2xl lg:rounded-3xl border-2 p-3 lg:p-5 shadow-sm transition-colors ${cls}`}
                    >
                      <span className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-black/5 flex items-center justify-center text-xl lg:text-3xl font-black shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="min-w-0 break-words text-[clamp(0.95rem,min(1.4vw,2.6vh),1.35rem)] font-bold leading-snug">
                        {opt}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        <div className="shrink-0 border-t border-slate-200 pt-2">
          <div className="flex flex-wrap items-center justify-center gap-2 lg:gap-3 max-h-[22vh] overflow-hidden">
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
                    className={`shrink-0 flex items-center gap-1.5 lg:gap-2 rounded-full border-2 pl-1.5 pr-3 lg:pr-4 py-0.5 lg:py-1 transition-colors ${
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
                    <span className="min-w-0 max-w-[6rem] lg:max-w-[9rem] truncate text-xs sm:text-sm lg:text-base font-bold text-brand-navy">
                      {t.name}
                    </span>
                    {isActive && (
                      <span className="shrink-0 text-brand-green text-xs lg:text-sm font-black leading-none">
                        ▶
                      </span>
                    )}
                    <span className="shrink-0 text-sm sm:text-base lg:text-lg font-black text-brand-navy">
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
    <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-2 lg:gap-4 p-4 sm:p-8 text-center overflow-hidden">
      <i className="fa-solid fa-trophy text-amber-400 text-[clamp(3rem,min(8vw,14vh),7rem)] animate-bounce shrink-0" />
      <h2 className="text-[clamp(1.6rem,min(4vw,7vh),3.4rem)] font-black text-brand-navy shrink-0">
        ¡Juego Finalizado!
      </h2>
      <p className="text-sm lg:text-2xl text-slate-500 font-bold shrink-0">Líder del marcador general</p>
      <p className="text-[clamp(2rem,min(5.5vw,10vh),5rem)] font-black text-brand-green leading-none break-words shrink-0">
        {state.winnerName}
      </p>

      <div className="w-full max-w-3xl flex-1 min-h-0 flex flex-col gap-2 justify-center overflow-hidden mt-2">
        {ranking.map((r, i) => (
          <div
            key={r.id}
            className={`flex items-center justify-between px-4 lg:px-8 py-2 rounded-2xl border-2 flex-1 max-h-16 min-h-0 ${r.name === state.winnerName ? 'bg-amber-50 border-amber-300' : 'bg-white border-slate-200'}`}
          >
            <span className="font-bold text-brand-navy flex items-center gap-3 lg:gap-4 min-w-0 text-base lg:text-2xl">
              <span className="text-slate-400 shrink-0">#{i + 1}</span>
              <span className="truncate">{r.name}</span>
            </span>
            <span className="font-black text-brand-navy shrink-0 text-base lg:text-2xl">{r.score} pts</span>
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