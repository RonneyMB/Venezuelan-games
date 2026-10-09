import { TURN_DURATION } from '../hooks/useMimicasGame.js'

export default function GameTable({
  activeTeamName,
  timeLeft,
  timerRunning,
  currentTurnScore,
  currentWord,
  feedback,
  onToggleTimer,
  onCorrect,
  onPass,
  onNext,
}) {
  const percent = (timeLeft / TURN_DURATION) * 100
  const flashClass = feedback === 'green' ? 'bg-brand-green/20' : feedback === 'amber' ? 'bg-amber-500/20' : ''

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

  return (
    <section className="flex flex-col gap-6">
      <div className="bg-brand-navy text-white p-4 rounded-2xl shadow-md flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-brand-green text-brand-navy rounded-xl flex items-center justify-center font-black text-2xl shadow">
            <i className="fa-solid fa-users" />
          </div>
          <div>
            <span className="text-xs uppercase text-slate-300 font-bold tracking-wider">
              Mesa Jugando Actualmente
            </span>
            <h3 className="text-xl font-black text-white">{activeTeamName || 'Mesa 1'}</h3>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-black/40 px-6 py-2.5 rounded-2xl border border-white/10">
          <div className="text-right">
            <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider block">
              Tiempo Restante
            </span>
            <div
              className={`text-3xl md:text-4xl font-black font-mono tracking-tight ${
                timeLeft <= 60 ? 'text-rose-400' : 'text-brand-green'
              }`}
            >
              {formatted}
            </div>
          </div>
          <button
            onClick={onToggleTimer}
            className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-white transition-all"
          >
            <i className={`fa-solid ${timerRunning ? 'fa-pause' : 'fa-play'}`} />
          </button>
        </div>

        <div className="bg-brand-green/20 border border-brand-green/40 px-6 py-2 rounded-2xl text-center">
          <span className="text-[10px] uppercase text-brand-green font-extrabold tracking-wider block">
            Aciertos
          </span>
          <span className="text-3xl font-black text-white">{currentTurnScore}</span>
        </div>
      </div>

      <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden shadow-inner">
        <div
          className="bg-brand-green h-full transition-all duration-1000 ease-linear"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div
        className={`bg-white border-2 border-slate-200 rounded-3xl p-6 md:p-12 shadow-xl flex flex-col items-center justify-center text-center relative min-h-[340px] transition-colors duration-200 ${flashClass}`}
      >
        <span className="px-4 py-1.5 bg-brand-navy/10 text-brand-navy font-extrabold text-xs md:text-sm rounded-full mb-4 uppercase tracking-wider border border-brand-navy/20">
          {currentWord ? `Categoría: ${currentWord.category}` : 'Categoría'}
        </span>

        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-brand-navy tracking-tight my-4 leading-tight">
          {currentWord ? currentWord.word : 'Presiona "Comenzar"'}
        </h2>

        <p className="text-slate-400 text-xs md:text-sm max-w-md mt-2">
          <i className="fa-solid fa-lightbulb text-amber-400 mr-1" /> No se permite hablar, emitir
          sonidos ni deletrear. Solo gestos y mímicas corporales.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs text-slate-500 font-medium">
          <span className="bg-slate-100 px-2.5 py-1 rounded-md border">
            <kbd className="font-bold text-slate-700">Enter</kbd> : Siguiente
          </span>
          <span className="bg-slate-100 px-2.5 py-1 rounded-md border">
            <kbd className="font-bold text-slate-700">Espacio / Right</kbd> : Correcto (+1)
          </span>
          <span className="bg-slate-100 px-2.5 py-1 rounded-md border">
            <kbd className="font-bold text-slate-700">Left / Down</kbd> : Pasar (0)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={onPass}
          className="py-5 px-6 bg-amber-500 hover:bg-amber-600 text-white font-black text-lg rounded-2xl shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-3"
        >
          <i className="fa-solid fa-forward text-2xl" />
          <div className="text-left">
            <span className="block leading-none">PASAR</span>
            <span className="text-xs font-normal opacity-80">(0 puntos)</span>
          </div>
        </button>

        <button
          onClick={onNext}
          className="py-5 px-6 bg-brand-navy hover:bg-brand-blue text-white font-black text-lg rounded-2xl shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-3"
        >
          <i className="fa-solid fa-rotate text-2xl text-brand-green" />
          <div className="text-left">
            <span className="block leading-none">ENTER / SIGUIENTE</span>
            <span className="text-xs font-normal text-slate-300">(Cambiar Mímica)</span>
          </div>
        </button>

        <button
          onClick={onCorrect}
          className="py-5 px-6 bg-brand-green hover:bg-brand-green-hover text-brand-navy font-black text-lg rounded-2xl shadow-xl transition-all transform active:scale-95 flex items-center justify-center gap-3"
        >
          <i className="fa-solid fa-circle-check text-3xl" />
          <div className="text-left">
            <span className="block leading-none">¡CORRECTO!</span>
            <span className="text-xs font-bold opacity-90">(+1 punto)</span>
          </div>
        </button>
      </div>
    </section>
  )
}
