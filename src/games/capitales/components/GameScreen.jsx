import VenezuelaMap from './VenezuelaMap.jsx'
import FeedbackBanner from './FeedbackBanner.jsx'
import { VENEZUELA_STATES } from '../data/states.js'

export default function GameScreen({
  currentState,
  mode,
  roundTimeLeft,
  roundTimerRunning,
  score,
  streak,
  currentIndex,
  total,
  feedback,
  answered,
  anim,
  onMarkCorrect,
  onMarkIncorrect,
  onNext,
  onStartTimer,
  onPauseTimer,
  onResetTimer,
}) {
  const cardAnim = anim === 'pop' ? 'pop-success' : anim === 'shake' ? 'shake' : ''

  const mins = Math.floor(roundTimeLeft / 60)
  const secs = roundTimeLeft % 60
  const timeLabel = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  const timeUrgent = roundTimeLeft <= 5

  const isLast = currentIndex + 1 >= total
  const showTimer = mode === 'timed'

  return (
    <section className="w-full max-w-5xl grid lg:grid-cols-12 gap-6 items-center">
      <div className="lg:col-span-6 glass-panel p-4 sm:p-6 rounded-3xl flex flex-col items-center justify-center relative min-h-[420px] sm:min-h-[520px]">
        <div className="absolute top-4 left-4 text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          Ubicación Territorial
        </div>

        <div className="w-full h-80 sm:h-[26rem] flex items-center justify-center my-2">
          <VenezuelaMap states={VENEZUELA_STATES} activeId={currentState?.id} />
        </div>

        <div className="w-full text-center mt-2">
          <span className="text-xs text-slate-500 uppercase font-semibold">
            Estado / Entidad Federal:
          </span>
          <h3 className="font-outfit font-black text-2xl sm:text-3xl text-amber-600 tracking-wide">
            {currentState?.name ?? 'Cargando...'}
          </h3>
        </div>
      </div>

      <div className="lg:col-span-6 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-2xl flex justify-between items-center gap-2 border-2 border-slate-200 text-xs sm:text-sm font-bold shadow-sm">
          <div className="flex items-center gap-1.5">
            <span className="text-lg">🎯</span>
            <div>
              <div className="text-slate-500 text-[10px] uppercase">Progreso</div>
              <span className="text-brand-navy">
                {currentIndex + 1} / {total}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-lg">🔥</span>
            <div>
              <div className="text-slate-500 text-[10px] uppercase">Racha</div>
              <span className="text-amber-600">{streak}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-lg">✅</span>
            <div>
              <div className="text-slate-500 text-[10px] uppercase">Aciertos</div>
              <span className="text-emerald-600">{score}</span>
            </div>
          </div>
        </div>

        {showTimer && (
          <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-sm flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⏱️</span>
              <div>
                <div className="text-slate-500 text-[10px] uppercase font-bold">
                  Tiempo de ronda
                </div>
                <span
                  className={`font-outfit font-black text-2xl leading-none ${
                    timeUrgent ? 'text-red-600 animate-pulse' : 'text-emerald-600'
                  }`}
                >
                  {timeLabel}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {roundTimerRunning ? (
                <button
                  onClick={onPauseTimer}
                  className="px-4 py-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-700 font-outfit font-black text-sm border border-amber-300 transition flex items-center gap-1.5"
                >
                  ⏸️ Pausar
                </button>
              ) : (
                <button
                  onClick={onStartTimer}
                  disabled={answered}
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-outfit font-black text-sm shadow-md transition flex items-center gap-1.5"
                >
                  ▶️ Iniciar
                </button>
              )}
              <button
                onClick={onResetTimer}
                className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-outfit font-black text-sm border border-slate-200 transition"
                title="Reiniciar contador"
              >
                🔄
              </button>
            </div>
          </div>
        )}

        <div
          className={`bg-white p-6 rounded-3xl border-2 border-amber-200 flex flex-col gap-5 shadow-lg ${cardAnim}`}
        >
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            Panel del sistema
          </div>

          <div className="text-center bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <p className="text-sm text-slate-500 font-semibold">🎤 Esperando respuesta del jugador...</p>
            <p className="text-xs text-slate-400 mt-1">
              Escucha la respuesta y márcala como correcta o incorrecta.
            </p>
          </div>

          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 text-center">
            <p className="text-xs uppercase font-bold text-amber-600 tracking-wider">
              Capital correcta
            </p>
            <p className="font-outfit font-black text-3xl text-amber-600 leading-tight">
              {currentState?.capital ?? '—'}
            </p>
          </div>

          <FeedbackBanner feedback={feedback} />

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onMarkCorrect}
              disabled={answered}
              className="px-4 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-outfit font-black text-base shadow-md transition flex items-center justify-center gap-2"
            >
              <span className="text-lg">✓</span> Correcto
            </button>
            <button
              onClick={onMarkIncorrect}
              disabled={answered}
              className="px-4 py-4 rounded-2xl bg-red-500 hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-outfit font-black text-base shadow-md transition flex items-center justify-center gap-2"
            >
              <span className="text-lg">✗</span> Incorrecto
            </button>
          </div>

          <button
            onClick={onNext}
            className="w-full px-4 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 text-slate-950 font-outfit font-black text-base shadow-md transition flex items-center justify-center gap-2"
          >
            <span className="text-lg">→</span> {isLast ? 'Finalizar' : 'Avanzar'}
          </button>
        </div>
      </div>
    </section>
  )
}
