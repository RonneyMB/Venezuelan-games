import { useEffect, useState } from 'react'

const ROLL_EMOJIS = ['🎲', '🌀', '🪀']

export default function MatchCard({ match, nameOf, compact = false, revealed = true, rolling = false }) {
  const [rollIndex, setRollIndex] = useState(0)

  useEffect(() => {
    if (!rolling) return
    const id = setInterval(() => setRollIndex((i) => (i + 1) % ROLL_EMOJIS.length), 120)
    return () => clearInterval(id)
  }, [rolling])

  if (!match) return null

  const t1 = nameOf(match.table1)
  const t2 = nameOf(match.table2)
  const done = match.status === 'finished'
  const showGame = revealed && match.game

  const sideClasses = (tableId) => {
    if (!done) return 'border-slate-200 bg-white'
    if (match.tie) return 'border-amber-300 bg-amber-50'
    return match.winner === tableId
      ? 'border-brand-green bg-brand-green/10'
      : 'border-slate-200 bg-slate-50'
  }

  return (
    <div className={`rounded-3xl border-2 border-slate-200 bg-white ${compact ? 'p-4' : 'p-6'} shadow-sm`}>
      {showGame ? (
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className={compact ? 'text-2xl' : 'text-4xl'}>{match.game.emoji}</span>
          <div className="text-center">
            <p className={`font-black text-brand-navy ${compact ? 'text-lg' : 'text-2xl'}`}>
              {match.game.name}
            </p>
            {!compact && <p className="text-xs text-slate-500">{match.game.description}</p>}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-1 mb-4 py-2">
          <span className={`${compact ? 'text-3xl' : 'text-5xl'} ${rolling ? 'animate-spin' : 'animate-pulse'}`}>
            {rolling ? ROLL_EMOJIS[rollIndex] : '🎲'}
          </span>
          <p className={`font-black text-slate-400 uppercase tracking-widest ${compact ? 'text-xs' : 'text-sm'}`}>
            {rolling ? 'Sorteando juego…' : 'Juego por sortear'}
          </p>
        </div>
      )}

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className={`rounded-2xl border-2 px-4 py-3 text-center ${sideClasses(match.table1)}`}>
          <p className={`font-black text-brand-navy ${compact ? 'text-base' : 'text-xl'}`}>{t1}</p>
        </div>
        <span className="font-black text-slate-400 text-sm">VS</span>
        <div className={`rounded-2xl border-2 px-4 py-3 text-center ${sideClasses(match.table2)}`}>
          <p className={`font-black text-brand-navy ${compact ? 'text-base' : 'text-xl'}`}>{t2}</p>
        </div>
      </div>

      {done && (
        <p className="text-center text-xs font-bold mt-3 text-slate-500">
          {match.tie ? '🤝 Empate' : `🏆 Ganó ${nameOf(match.winner)}`}
        </p>
      )}
    </div>
  )
}
