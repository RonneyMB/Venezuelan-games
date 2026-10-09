import { useGameDisplay } from '../lib/sync.js'
import DisplayLayout, { WaitingForHost } from '../components/DisplayLayout.jsx'
import VenezuelaMap from '../games/capitales/components/VenezuelaMap.jsx'
import { VENEZUELA_STATES } from '../games/capitales/data/states.js'

const CHANNEL = 'incret-capitales-display'

function formatTime(total) {
  const minutes = Math.floor(total / 60)
  const seconds = total % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function Stat({ label, value, color = 'text-brand-navy' }) {
  return (
    <div className="text-center">
      <p className="text-base uppercase font-bold text-slate-400 tracking-wider">{label}</p>
      <p className={`text-[clamp(1.8rem,3vw,3rem)] font-black leading-none ${color}`}>{value}</p>
    </div>
  )
}

function StartView() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-8 p-12 text-center">
      <div className="text-[clamp(5rem,10vw,10rem)] animate-bounce">🗺️</div>
      <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-black text-brand-navy">
        Capitales de Venezuela
      </h2>
      <p className="text-2xl text-slate-500">
        Selecciona un modo en el panel de gestión para comenzar.
      </p>
    </div>
  )
}

function GameView({ state }) {
  const feedback = state.answered ? state.feedback : null
  const isCorrect = feedback?.variant === 'correct'
  const isTimeout = feedback?.variant === 'timeout'

  return (
    <div className="relative flex-1 flex flex-col gap-5 p-6 lg:p-10">
      <div className="flex items-center justify-center gap-8 lg:gap-16 flex-wrap bg-white border-2 border-slate-200 rounded-3xl px-8 py-4 shadow-sm">
        <Stat label="Progreso" value={`${state.currentIndex + 1} / ${state.total}`} />
        <Stat label="Aciertos" value={state.score} color="text-emerald-600" />
        <Stat label="Racha" value={state.streak} color="text-amber-500" />
        <Stat
          label="Tiempo"
          value={formatTime(state.roundTimeLeft ?? 0)}
          color={state.roundTimeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-brand-navy font-mono'}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <div className="w-full max-w-6xl h-[56vh] lg:h-[64vh]">
          <VenezuelaMap states={VENEZUELA_STATES} activeId={state.activeId} />
        </div>
        <p className="text-lg uppercase tracking-[0.3em] text-slate-400 font-bold">
          Estado / Entidad Federal
        </p>
        <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-black text-amber-500 leading-none">
          {state.stateName}
        </h2>
      </div>

      {feedback && (
        <div className="absolute inset-0 z-20 flex items-center justify-center p-8 pointer-events-none">
          <div
            className={`animate-feedback-pop w-full max-w-3xl rounded-3xl px-10 py-12 text-center text-white shadow-2xl border-4 ${
              isCorrect
                ? 'bg-emerald-500/95 border-emerald-300'
                : 'bg-red-500/95 border-red-300'
            }`}
          >
            <div className="text-[clamp(3rem,7vw,6rem)] leading-none mb-4">
              {isCorrect ? '🎉' : isTimeout ? '⏱️' : '❌'}
            </div>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-none mb-4">
              {isCorrect ? '¡Correcto!' : isTimeout ? '¡Tiempo agotado!' : '¡Incorrecto!'}
            </h2>
            <p className="text-[clamp(1.1rem,2.4vw,2rem)] font-semibold">
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
  const accuracy =
    state.totalAttempts > 0 ? Math.round((state.score / state.totalAttempts) * 100) : 100

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-8 p-12 text-center">
      <div className="text-[clamp(4rem,8vw,8rem)]">🏆</div>
      <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-black text-brand-navy">
        ¡Desafío Completado!
      </h2>

      <div className="grid grid-cols-3 gap-6 w-full max-w-4xl">
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-8">
          <p className="text-lg uppercase font-bold text-slate-400">Aciertos</p>
          <p className="text-[clamp(2rem,4vw,4rem)] font-black text-emerald-600">
            {state.score} / {state.total}
          </p>
        </div>
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-8">
          <p className="text-lg uppercase font-bold text-slate-400">Precisión</p>
          <p className="text-[clamp(2rem,4vw,4rem)] font-black text-amber-500">{accuracy}%</p>
        </div>
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-8">
          <p className="text-lg uppercase font-bold text-slate-400">Tiempo</p>
          <p className="text-[clamp(2rem,4vw,4rem)] font-black text-brand-navy">
            {state.elapsed}s
          </p>
        </div>
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

  return (
    <DisplayLayout>
      {content}
    </DisplayLayout>
  )
}
