import { useEffect, useState } from 'react'
import { MANUAL_WILDCARD_TYPES, WILDCARD_TYPES } from '../data/wildcards.js'

const SUSPENSE_EMOJIS = ['🎲', '🌀', '🪀']

const TYPE_META = Object.fromEntries(WILDCARD_TYPES.map((t) => [t.type, t]))

const isManual = (type) => MANUAL_WILDCARD_TYPES.includes(type)

function SongBlock() {
  return (
    <div className="shrink-0 flex flex-col items-center gap-4 lg:gap-6 text-center">
      <div className="text-[clamp(4rem,min(12vw,20vh),10rem)] animate-float leading-none">🎵</div>
      <h3 className="text-[clamp(2.2rem,min(7vw,12vh),6rem)] font-black text-brand-navy leading-none break-words">
        Adivina la Canción
      </h3>
      <p className="text-[clamp(1rem,min(2.2vw,4vh),2rem)] text-slate-500 font-bold leading-relaxed max-w-4xl">
        La canción se reproduce ahora. La mesa debe adivinarla.
      </p>
    </div>
  )
}

function TraditionalBlock({ current }) {
  const { data } = current
  return (
    <div className="shrink-0 text-center">
      <div className="text-[clamp(3.5rem,min(10vw,18vh),9rem)] animate-float leading-none">{data.emoji}</div>
      <h3 className="text-[clamp(2rem,min(6vw,10vh),5.5rem)] font-black text-brand-navy leading-none mt-4">
        {data.name}
      </h3>
      <p className="text-[clamp(1rem,min(2vw,3.6vh),1.7rem)] text-slate-600 max-w-4xl mx-auto mt-4 leading-relaxed break-words">
        {data.description}
      </p>
    </div>
  )
}

function PromptBlock({ current }) {
  const { type, data } = current
  if (type === 'truefalse') {
    return (
      <p className="text-[clamp(1.2rem,min(3vw,5.5vh),2.6rem)] font-black text-brand-navy text-center leading-snug max-w-6xl break-words">
        {data.statement}
      </p>
    )
  }
  return (
    <p className="text-[clamp(1.2rem,min(3vw,5.5vh),2.6rem)] font-bold italic text-brand-navy text-center leading-snug max-w-6xl break-words">
      {data.fragment}
    </p>
  )
}

function OptionsBlock({ current, reveal }) {
  const { type, data } = current

  if (type === 'truefalse') {
    return (
      <div className="grid grid-cols-2 gap-4 lg:gap-6 w-full max-w-4xl shrink-0">
        {[
          { label: '✅ Verdadero', value: true },
          { label: '❌ Falso', value: false },
        ].map((opt) => {
          const isCorrect = reveal && data.correct === opt.value
          return (
            <div
              key={opt.label}
              className={`rounded-3xl border-4 py-6 lg:py-10 text-center text-[clamp(1.1rem,min(2.4vw,4.5vh),2.2rem)] font-black transition-colors ${
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 w-full max-w-6xl shrink-0">
      {data.options.map((opt, idx) => {
        const isCorrect = reveal && idx === data.correct
        return (
          <div
            key={idx}
            className={`flex items-center gap-5 rounded-3xl border-2 p-3 lg:p-5 ${
              isCorrect
                ? 'bg-emerald-500 border-emerald-700 text-white'
                : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            <span
              className={`w-10 h-10 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center text-xl lg:text-3xl font-black shrink-0 ${
                isCorrect ? 'bg-white/20 text-white' : 'bg-slate-100 text-brand-navy'
              }`}
            >
              {String.fromCharCode(65 + idx)}
            </span>
            <span className="text-[clamp(0.95rem,min(1.8vw,3.2vh),1.6rem)] font-bold leading-snug">{opt}</span>
          </div>
        )
      })}
    </div>
  )
}

function Header({ emoji, title }) {
  return (
    <div className="shrink-0 flex items-center gap-3">
      <span className="text-4xl lg:text-6xl">{emoji}</span>
      <h2 className="text-[clamp(1.4rem,min(3.4vw,6vh),3rem)] font-black text-brand-navy">{title}</h2>
    </div>
  )
}

function ReadyView({ current }) {
  const meta = TYPE_META[current.type] ?? {}
  const manual = isManual(current.type)

  return (
    <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-4 lg:gap-6 p-4 lg:p-8 overflow-hidden text-center">
      <div className="shrink-0 text-[clamp(4rem,min(11vw,20vh),10rem)] animate-float leading-none">
        {meta.emoji}
      </div>
      <p className="shrink-0 text-[clamp(1rem,min(2vw,3.5vh),1.75rem)] font-black uppercase tracking-widest text-brand-green">
        ¡Te tocó este reto!
      </p>
      <h2 className="shrink-0 text-[clamp(2rem,min(5.5vw,9.5vh),5rem)] font-black text-brand-navy leading-none break-words">
        {current.type === 'traditional' ? current.data?.name : meta.title}
      </h2>

      {manual && current.type === 'traditional' && (
        <p className="shrink-0 text-[clamp(0.95rem,min(2vw,3.4vh),1.6rem)] text-slate-600 max-w-4xl leading-relaxed break-words">
          {current.data?.description}
        </p>
      )}

      <p className="shrink-0 text-[clamp(1rem,min(1.8vw,3.2vh),1.6rem)] text-slate-500 font-bold">
        El anfitrión pulse <span className="text-brand-navy">Continuar</span> para ejecutar el reto
      </p>
    </div>
  )
}

function PlayView({ current }) {
  if (current.type === 'traditional') {
    return (
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-4 lg:gap-6 p-4 lg:p-8 overflow-hidden">
        <Header emoji="🪀" title="Juego Tradicional" />
        <TraditionalBlock current={current} />
        <p className="text-[clamp(1rem,min(1.8vw,3.2vh),1.6rem)] text-slate-500 font-bold shrink-0">
          La mesa juega este juego en el escenario
        </p>
      </div>
    )
  }

  if (current.type === 'song') {
    return (
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-4 lg:gap-6 p-4 lg:p-8 overflow-hidden">
        <Header emoji="🎵" title="Adivina la Canción" />
        <SongBlock />
      </div>
    )
  }

  const title = 'Refranes Venezolanos'
  const emoji = current.type === 'truefalse' ? '✅' : '📜'

  return (
    <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-4 lg:gap-6 p-4 lg:p-8 overflow-hidden">
      <Header emoji={emoji} title={title} />
      <PromptBlock current={current} />
      <OptionsBlock current={current} reveal={false} />
    </div>
  )
}

function ResultBadge({ success }) {
  return (
    <div
      className={`w-16 h-16 lg:w-24 lg:h-24 rounded-full flex items-center justify-center shrink-0 ${
        success ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
      }`}
    >
      <i
        className={`fa-solid ${success ? 'fa-circle-check' : 'fa-circle-xmark'} text-[clamp(2rem,min(4vw,7vh),3.6rem)]`}
      />
    </div>
  )
}

function ResultView({ current, result }) {
  const success = result === 'correct'
  const manual = isManual(current.type)

  const headline = success ? '¡Comodín Ganado! +5 pts' : 'Comodín Fallido'
  const headlineClass = success ? 'text-emerald-600' : 'text-red-600'

  if (manual) {
    return (
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-3 lg:gap-5 p-4 lg:p-8 overflow-hidden">
        <div className="shrink-0 flex items-center gap-5">
          <ResultBadge success={success} />
          <p className={`text-[clamp(1.4rem,min(3.4vw,6vh),3rem)] font-black leading-tight ${headlineClass}`}>
            {headline}
          </p>
        </div>
        {current.type === 'song' ? <SongBlock /> : <TraditionalBlock current={current} />}
      </div>
    )
  }

  const title = current.type === 'truefalse' ? 'Verdadero o Falso' : 'Refranes Venezolanos'
  const emoji = current.type === 'truefalse' ? '✅' : '📜'

  return (
    <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-3 lg:gap-5 p-4 lg:p-8 overflow-hidden">
      <div className="shrink-0 flex items-center gap-5">
        <ResultBadge success={success} />
        <div>
          <p className={`text-[clamp(1.4rem,min(3.4vw,6vh),3rem)] font-black leading-tight ${headlineClass}`}>
            {headline}
          </p>
          <p className="text-sm lg:text-xl text-slate-500 shrink-0">{title}</p>
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
    <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-4 lg:gap-6 p-4 lg:p-8 overflow-hidden">
      <div className="shrink-0 text-[clamp(4rem,min(10vw,18vh),9rem)] animate-sparkle leading-none">🎲</div>
      <p className="text-[clamp(1.6rem,min(4vw,7vh),3.4rem)] font-black text-brand-navy animate-pulse text-center shrink-0">
        Sorteando un juego...
      </p>
      <div className="shrink-0 flex gap-4 lg:gap-6">
        {SUSPENSE_EMOJIS.map((emoji, i) => (
          <span
            key={emoji}
            className={`text-[clamp(2rem,min(5vw,9vh),4.5rem)] transition-all duration-200 ${
              cycle % SUSPENSE_EMOJIS.length === i
                ? 'scale-125 opacity-100'
                : 'scale-90 opacity-40'
            }`}
          >
            {emoji}
          </span>
        ))}
      </div>
      <p className="text-[clamp(1rem,min(1.8vw,3.2vh),1.6rem)] text-slate-500 font-bold shrink-0">
        ¡Prepárense para el reto!
      </p>
    </div>
  )
}

export default function WildcardDisplay({ phase, current, result }) {
  if (phase === 'suspense') return <SuspenseView />
  if (phase === 'ready' && current) return <ReadyView current={current} />
  if (phase === 'play' && current) return <PlayView current={current} />
  if (phase === 'result' && current) return <ResultView current={current} result={result} />
  return null
}