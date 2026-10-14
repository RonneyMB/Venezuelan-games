import { useEffect, useState } from 'react'
import { WILDCARD_TYPES } from '../data/wildcards.js'

const SUSPENSE_EMOJIS = ['🎲', '🌀', '🪀']

const TYPE_META = Object.fromEntries(WILDCARD_TYPES.map((t) => [t.type, t]))

function SuspenseView() {
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setCycle((c) => c + 1), 280)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="py-6 flex flex-col items-center gap-6 text-center">
      <div className="text-7xl animate-sparkle">🎲</div>
      <p className="text-3xl font-black text-brand-navy animate-pulse">Sorteando un juego...</p>
      <div className="flex gap-5 text-4xl">
        {SUSPENSE_EMOJIS.map((emoji, i) => (
          <span
            key={emoji}
            className={`transition-all duration-200 ${
              cycle % SUSPENSE_EMOJIS.length === i
                ? 'scale-125 opacity-100'
                : 'scale-90 opacity-40'
            }`}
          >
            {emoji}
          </span>
        ))}
      </div>
      <p className="text-sm text-slate-500">¡Prepárense para el reto!</p>
    </div>
  )
}

function ModalHeader({ emoji, title, subtitle }) {
  return (
    <div className="text-center space-y-2">
      <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-500 flex items-center justify-center text-3xl mx-auto">
        {emoji}
      </div>
      <h3 className="text-xl font-black text-brand-navy">{title}</h3>
      {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
    </div>
  )
}

function ReadyView({ current, onStart, onCancel }) {
  const meta = TYPE_META[current.type] ?? {}
  const title = current.type === 'traditional' ? current.data?.name : meta.title

  return (
    <div className="space-y-6 text-center">
      <div className="text-7xl animate-float">{meta.emoji}</div>

      <div>
        <p className="text-xs uppercase font-bold tracking-widest text-brand-green mb-1">
          El sistema sorteó este reto
        </p>
        <h3 className="text-2xl sm:text-3xl font-black text-brand-navy break-words">{title}</h3>
      </div>

      {current.type === 'traditional' && (
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 border-2 border-pink-200 rounded-3xl p-5">
          <p className="text-sm text-slate-600 leading-relaxed">{current.data?.description}</p>
        </div>
      )}

      {current.type === 'song' && (
        <div className="bg-gradient-to-br from-fuchsia-50 to-indigo-50 border-2 border-fuchsia-200 rounded-3xl p-5">
          <p className="text-sm text-slate-600 leading-relaxed">
            Reproduce la canción ahora y pide a la mesa que la adivine.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={onCancel}
          className="py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-sm rounded-xl transition"
        >
          Cancelar
        </button>
        <button
          onClick={onStart}
          className="py-3.5 bg-brand-green hover:bg-brand-green-hover text-brand-navy font-extrabold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
        >
          Continuar <i className="fa-solid fa-play" />
        </button>
      </div>
    </div>
  )
}

function ResultButtons({ onAnswer }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        onClick={() => onAnswer(true)}
        className="py-5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black shadow-md transition active:scale-95"
      >
        ✅ Superado (+5)
      </button>
      <button
        onClick={() => onAnswer(false)}
        className="py-5 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-black shadow-md transition active:scale-95"
      >
        ❌ No superado
      </button>
    </div>
  )
}

function PlayView({ current, onAnswer }) {
  const { type, data } = current

  if (type === 'truefalse') {
    return (
      <div className="space-y-6">
        <ModalHeader emoji="✅" title="Verdadero o Falso" />
        <p className="text-center text-lg font-bold text-brand-navy leading-snug">
          {data.statement}
        </p>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onAnswer(data.correct === true)}
            className="py-5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-lg shadow-md transition active:scale-95"
          >
            ✅ Verdadero
          </button>
          <button
            onClick={() => onAnswer(data.correct === false)}
            className="py-5 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-black text-lg shadow-md transition active:scale-95"
          >
            ❌ Falso
          </button>
        </div>
      </div>
    )
  }

  if (type === 'song') {
    return (
      <div className="space-y-6">
        <ModalHeader
          emoji="🎵"
          title="Adivina la Canción"
          subtitle="La canción se reproduce manualmente desde el equipo de audio"
        />
        <div className="text-center bg-gradient-to-br from-fuchsia-50 to-indigo-50 border-2 border-fuchsia-200 rounded-3xl p-6">
          <div className="text-6xl mb-3 animate-float">🎵</div>
          <p className="text-xl font-black text-brand-navy">Adivina la canción</p>
        </div>
        <p className="text-center text-sm text-slate-500">
          Registra el resultado cuando la mesa termine de jugar:
        </p>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onAnswer(true)}
            className="py-5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black shadow-md transition active:scale-95"
          >
            ✅ Completado (+5)
          </button>
          <button
            onClick={() => onAnswer(false)}
            className="py-5 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-black shadow-md transition active:scale-95"
          >
            ❌ Equivocado
          </button>
        </div>
      </div>
    )
  }

  if (type === 'traditional') {
    return (
      <div className="space-y-6">
        <ModalHeader
          emoji="🪀"
          title="Juego Tradicional"
          subtitle="La mesa juega este juego en el escenario"
        />
        <div className="text-center bg-gradient-to-br from-rose-50 to-pink-50 border-2 border-pink-200 rounded-3xl p-6">
          <div className="text-6xl mb-2 animate-float">{data.emoji}</div>
          <h3 className="text-2xl font-black text-brand-navy">{data.name}</h3>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">{data.description}</p>
        </div>
        <p className="text-center text-sm text-slate-500">
          Registra el resultado cuando la mesa termine de jugar:
        </p>
        <ResultButtons onAnswer={onAnswer} />
      </div>
    )
  }

  const title = 'Refranes Venezolanos'

  return (
    <div className="space-y-5">
      <ModalHeader emoji="📜" title={title} />
      <p className="text-center text-lg font-bold text-brand-navy italic leading-snug">
        {data.fragment}
      </p>
      <div className="grid gap-3">
        {data.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => onAnswer(idx === data.correct)}
            className="w-full text-left font-bold text-slate-800 bg-slate-50 hover:bg-brand-navy hover:text-white border-2 border-slate-200 rounded-2xl p-4 transition-all flex items-center gap-3"
          >
            <span className="w-7 h-7 rounded-lg bg-slate-200 text-brand-navy text-xs font-black flex items-center justify-center shrink-0">
              {String.fromCharCode(65 + idx)}
            </span>
            <span>{opt}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function ResultView({ current, result, onFinish }) {
  const success = result === 'correct'
  const { type, data } = current

  const answerText =
    type === 'truefalse'
      ? data.correct
        ? 'Verdadero'
        : 'Falso'
      : type === 'traditional'
        ? `${data.emoji} ${data.name}`
        : type === 'song'
          ? 'Adivina la Canción'
          : data.options[data.correct]

  const answerLabel =
    type === 'traditional' ? 'Juego que le tocó' : type === 'song' ? 'Reto que le tocó' : 'Respuesta correcta'

  return (
    <div className="space-y-5 text-center">
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
          success ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
        }`}
      >
        <i className={`fa-solid ${success ? 'fa-circle-check' : 'fa-circle-xmark'} text-3xl`} />
      </div>

      <h3 className={`text-2xl font-black ${success ? 'text-emerald-600' : 'text-red-600'}`}>
        {success ? '¡Comodín Ganado!' : 'Comodín Fallido'}
      </h3>

      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
        <p className="text-[11px] uppercase font-bold text-slate-400">{answerLabel}</p>
        <p className="font-bold text-brand-navy text-lg break-words">{answerText}</p>
      </div>

      <p className="text-sm text-slate-500">
        {success
          ? 'La mesa suma +5 puntos y pasa a la siguiente pregunta.'
          : 'No se suman puntos. La pregunta se salta.'}
      </p>

      <button
        onClick={onFinish}
        className="w-full py-3.5 bg-brand-navy hover:bg-brand-navy-light text-white font-extrabold rounded-xl shadow-lg transition-all"
      >
        Continuar <i className="fa-solid fa-arrow-right ml-1" />
      </button>
    </div>
  )
}

export default function WildcardModal({
  phase,
  current,
  result,
  onStart,
  onAnswer,
  onFinish,
  onCancel,
}) {
  if (!phase || phase === 'idle') return null

  const widthClass = phase === 'suspense' ? 'max-w-3xl' : 'max-w-xl'

  return (
    <div className="fixed inset-0 bg-brand-navy/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        className={`bg-white rounded-3xl w-full ${widthClass} p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[92vh] overflow-y-auto`}
      >
        {phase === 'suspense' && <SuspenseView />}
        {phase === 'ready' && current && (
          <ReadyView current={current} onStart={onStart} onCancel={onCancel} />
        )}
        {phase === 'play' && current && <PlayView current={current} onAnswer={onAnswer} />}
        {phase === 'result' && current && (
          <ResultView current={current} result={result} onFinish={onFinish} />
        )}
      </div>
    </div>
  )
}