import VenezuelaMap from './VenezuelaMap.jsx'
import FeedbackBanner from './FeedbackBanner.jsx'
import { VENEZUELA_STATES } from '../data/states.js'

const MEDALS = ['🥇', '🥈', '🥉']

export default function GameScreen({
  currentState,
  currentIndex,
  total,
  feedback,
  answered,
  tables,
  ranking,
  onAward,
  onReveal,
  onNext,
}) {
  const isLast = currentIndex + 1 >= total

  return (
    <section className="w-full max-w-6xl grid lg:grid-cols-12 gap-6 items-start">
      <div className="lg:col-span-6 flex flex-col gap-4">
        <div className="glass-panel p-4 sm:p-6 rounded-3xl flex flex-col items-center justify-center relative min-h-[360px]">
          <div className="absolute top-4 left-4 text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            Ubicación Territorial
          </div>

          <div className="w-full h-72 sm:h-80 flex items-center justify-center my-2">
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

        <div className="bg-white rounded-3xl border-2 border-slate-200 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
              Marcador general
            </h4>
            <span className="text-xs font-bold text-slate-400">
              {currentIndex + 1} / {total}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {ranking.map((r, i) => (
              <div
                key={r.id}
                className={`rounded-xl border-2 px-3 py-2 flex items-center justify-between gap-1 ${
                  i === 0 && r.score > 0
                    ? 'border-amber-300 bg-amber-50'
                    : 'border-slate-200 bg-slate-50'
                }`}
              >
                <span className="font-bold text-brand-navy text-xs truncate">
                  {MEDALS[i] ?? `#${i + 1}`} {r.name}
                </span>
                <span className="font-black text-brand-navy text-sm shrink-0">{r.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-6 flex flex-col gap-4">
        <div className="bg-white p-6 rounded-3xl border-2 border-amber-200 flex flex-col gap-5 shadow-lg">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            Panel del administrador
          </div>

          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 text-center">
            <p className="text-xs uppercase font-bold text-amber-600 tracking-wider">
              Capital correcta
            </p>
            <p className="font-outfit font-black text-3xl text-amber-600 leading-tight">
              {currentState?.capital ?? '—'}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500 font-semibold mb-1 text-center">
              🎤 ¿Qué mesa respondió correctamente?
            </p>
            <p className="text-xs text-slate-400 mb-3 text-center">
              Pulsa la mesa para sumarle <strong>+10</strong> al marcador general.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {tables.map((t) => (
                <button
                  key={t.id}
                  onClick={() => onAward(t.id, t.name)}
                  disabled={answered}
                  className="px-3 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-outfit font-black text-sm shadow-md transition flex flex-col items-center gap-0.5"
                >
                  <span className="text-[11px] uppercase opacity-90">+10</span>
                  <span className="leading-tight text-center">{t.name}</span>
                </button>
              ))}
            </div>
          </div>

          <FeedbackBanner feedback={feedback} />

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onReveal}
              disabled={answered}
              className="px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed text-slate-600 font-bold text-sm border border-slate-200 transition"
            >
              👀 Revelar / Nadie acertó
            </button>
            <button
              onClick={onNext}
              className="px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 text-slate-950 font-outfit font-black text-sm shadow-md transition"
            >
              {isLast ? 'Finalizar →' : 'Avanzar →'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
