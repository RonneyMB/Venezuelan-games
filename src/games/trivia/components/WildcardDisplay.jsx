import { useEffect, useState } from 'react'
import { WILDCARD_TYPES } from '../data/wildcards.js'

const SUSPENSE_EMOJIS = ['🎲', '🌀', '🪀']

const CARD_STYLES = {
  song: 'bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-600',
  saying: 'bg-gradient-to-br from-amber-400 via-orange-500 to-red-500',
  truefalse: 'bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600',
  traditional: 'bg-gradient-to-br from-rose-400 via-pink-500 to-purple-600',
}

function SelectView() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-12 p-8 lg:p-12">
      <div className="text-center space-y-4">
        <div className="w-32 h-32 rounded-3xl bg-amber-100 text-amber-500 flex items-center justify-center text-7xl mx-auto animate-sparkle">
          🃏
        </div>
        <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-black text-brand-navy">
          ¡Comodín en Juego!
        </h2>
        <p className="text-2xl text-slate-500">La mesa está eligiendo un mini-juego…</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-6xl">
        {WILDCARD_TYPES.map((item, index) => (
          <div
            key={item.type}
            style={{ animationDelay: `${index * 0.1}s` }}
            className={`relative overflow-hidden rounded-[2rem] p-10 text-white text-center shadow-2xl animate-card-in ${CARD_STYLES[item.type]}`}
          >
            <div className="relative z-10 flex flex-col items-center gap-5">
              <span
                className="text-8xl animate-float"
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                {item.emoji}
              </span>
              <h3 className="text-3xl lg:text-4xl font-black leading-tight">{item.title}</h3>
              <p className="text-lg text-white/85 leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PromptBlock({ current }) {
  const { type, data } = current
  if (type === 'truefalse') {
    return (
      <p className="text-[clamp(1.8rem,4vw,4rem)] font-black text-brand-navy text-center leading-snug max-w-6xl">
        {data.statement}
      </p>
    )
  }
  return (
    <p className="text-[clamp(1.8rem,4vw,4rem)] font-bold italic text-brand-navy text-center leading-snug max-w-6xl">
      {data.fragment}
    </p>
  )
}

function OptionsBlock({ current, reveal }) {
  const { type, data } = current

  if (type === 'truefalse') {
    return (
      <div className="grid grid-cols-2 gap-6 lg:gap-8 w-full max-w-4xl">
        {[
          { label: '✅ Verdadero', value: true },
          { label: '❌ Falso', value: false },
        ].map((opt) => {
          const isCorrect = reveal && data.correct === opt.value
          return (
            <div
              key={opt.label}
              className={`rounded-3xl border-4 py-12 text-center text-[clamp(1.5rem,3vw,3rem)] font-black transition-colors ${
                isCorrect
                  ? 'bg-emerald-500 border-emerald-700 text-white'
                  : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              {opt.label}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 w-full max-w-6xl">
      {data.options.map((opt, idx) => {
        const isCorrect = reveal && idx === data.correct
        return (
          <div
            key={idx}
            className={`flex items-center gap-5 rounded-3xl border-2 p-6 lg:p-7 ${
              isCorrect
                ? 'bg-emerald-500 border-emerald-700 text-white'
                : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            <span
              className={`w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center text-3xl lg:text-4xl font-black shrink-0 ${
                isCorrect ? 'bg-white/20 text-white' : 'bg-slate-100 text-brand-navy'
              }`}
            >
              {String.fromCharCode(65 + idx)}
            </span>
            <span className="text-[clamp(1.1rem,2.2vw,2.1rem)] font-bold leading-snug">{opt}</span>
          </div>
        )
      })}
    </div>
  )
}

function Header({ emoji, title }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-6xl">{emoji}</span>
      <h2 className="text-[clamp(2rem,4vw,4rem)] font-black text-brand-navy">{title}</h2>
    </div>
  )
}

function TraditionalBlock({ current }) {
  const { data } = current
  return (
    <div className="text-center">
      <div className="text-[clamp(6rem,14vw,14rem)] animate-float leading-none">{data.emoji}</div>
      <h3 className="text-[clamp(3rem,8vw,8rem)] font-black text-brand-navy leading-none mt-4">
        {data.name}
      </h3>
      <p className="text-[clamp(1.2rem,2.4vw,2.2rem)] text-slate-600 max-w-4xl mx-auto mt-6 leading-relaxed">
        {data.description}
      </p>
    </div>
  )
}

function PlayView({ current }) {
  if (current.type === 'traditional') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-10 p-8 lg:p-12">
        <Header emoji="🪀" title="Juego Tradicional" />
        <TraditionalBlock current={current} />
        <p className="text-[clamp(1.2rem,2vw,2rem)] text-slate-500 font-bold">
          La mesa juega este juego en el escenario
        </p>
      </div>
    )
  }

  const title = current.type === 'song' ? 'Completar la Canción' : 'Refranes Venezolanos'
  const emoji = current.type === 'song' ? '🎵' : current.type === 'truefalse' ? '✅' : '📜'

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-10 p-8 lg:p-12">
      <Header emoji={emoji} title={title} />
      <PromptBlock current={current} />
      <OptionsBlock current={current} reveal={false} />
    </div>
  )
}

function ResultView({ current, result }) {
  const success = result === 'correct'

  if (current.type === 'traditional') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-8 p-8 lg:p-12">
        <div className="flex items-center gap-6">
          <div
            className={`w-24 h-24 rounded-full flex items-center justify-center ${
              success ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
            }`}
          >
            <i
              className={`fa-solid ${success ? 'fa-circle-check' : 'fa-circle-xmark'} text-[clamp(3rem,5vw,5rem)]`}
            />
          </div>
          <p
            className={`text-[clamp(2rem,4vw,4rem)] font-black leading-tight ${
              success ? 'text-emerald-600' : 'text-red-600'
            }`}
          >
            {success ? '¡Comodín Ganado! +5 pts' : 'Comodín Fallido'}
          </p>
        </div>
        <TraditionalBlock current={current} />
      </div>
    )
  }

  const title = current.type === 'song' ? 'Completar la Canción' : 'Refranes Venezolanos'
  const emoji = current.type === 'song' ? '🎵' : current.type === 'truefalse' ? '✅' : '📜'

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-8 p-8 lg:p-12">
      <div className="flex items-center gap-6">
        <div
          className={`w-24 h-24 rounded-full flex items-center justify-center ${
            success ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
          }`}
        >
          <i
            className={`fa-solid ${success ? 'fa-circle-check' : 'fa-circle-xmark'} text-[clamp(3rem,5vw,5rem)]`}
          />
        </div>
        <div>
          <p
            className={`text-[clamp(2rem,4vw,4rem)] font-black leading-tight ${
              success ? 'text-emerald-600' : 'text-red-600'
            }`}
          >
            {success ? '¡Comodín Ganado! +5 pts' : 'Comodín Fallido'}
          </p>
          <p className="text-xl text-slate-500">{title}</p>
        </div>
      </div>

      <PromptBlock current={current} />
      <OptionsBlock current={current} reveal />
    </div>
  )
}

function SuspenseView() {
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setCycle((c) => c + 1), 280)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-10 p-8 lg:p-12">
      <div className="text-[clamp(6rem,14vw,14rem)] animate-sparkle leading-none">🎲</div>
      <p className="text-[clamp(2.5rem,5vw,5rem)] font-black text-brand-navy animate-pulse text-center">
        Sorteando un juego...
      </p>
      <div className="flex gap-8">
        {SUSPENSE_EMOJIS.map((emoji, i) => (
          <span
            key={emoji}
            className={`text-[clamp(3rem,7vw,7rem)] transition-all duration-200 ${
              cycle % SUSPENSE_EMOJIS.length === i
                ? 'scale-125 opacity-100'
                : 'scale-90 opacity-40'
            }`}
          >
            {emoji}
          </span>
        ))}
      </div>
      <p className="text-[clamp(1.2rem,2vw,2rem)] text-slate-500 font-bold">
        ¡Prepárense para el reto!
      </p>
    </div>
  )
}

export default function WildcardDisplay({ phase, current, result }) {
  if (phase === 'select') return <SelectView />
  if (phase === 'suspense') return <SuspenseView />
  if (phase === 'play' && current) return <PlayView current={current} />
  if (phase === 'result' && current) return <ResultView current={current} result={result} />
  return null
}
