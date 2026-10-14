import { useEffect, useMemo } from 'react'
import { useTables } from '../context/TablesContext.jsx'
import { useSound } from '../hooks/useSound.js'
import { useGameBroadcast } from '../lib/sync.js'
import { useTradicionalGame, ROUNDS_PER_PAIR } from '../games/tradicional/hooks/useTradicionalGame.js'
import MatchCard from '../games/tradicional/components/MatchCard.jsx'
import PositionTable from '../games/tradicional/components/PositionTable.jsx'

export default function TradicionalPage() {
  const { tables } = useTables()
  const { enabled, toggle, play } = useSound(true)
  const game = useTradicionalGame(tables, play)

  const nameOf = useMemo(() => {
    const map = new Map(tables.map((t) => [t.id, t.name]))
    return (id) => map.get(id) ?? '—'
  }, [tables])

  const matchesCount = ((tables.length * (tables.length - 1)) / 2) * ROUNDS_PER_PAIR
  const roundsEach = Math.max(tables.length - 1, 0) * ROUNDS_PER_PAIR

  const { addMatchPoint, currentMatch, phase } = game

  useEffect(() => {
    const onKey = (e) => {
      if (phase !== 'playing' || !currentMatch) return
      const key = e.key.toLowerCase()
      if (key === 'a') {
        e.preventDefault()
        addMatchPoint(currentMatch.table1, 1)
      } else if (key === 'd') {
        e.preventDefault()
        addMatchPoint(currentMatch.table2, 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase, currentMatch, addMatchPoint])

  useGameBroadcast('incret-tradicional-display', {
    ready: true,
    phase: game.phase,
    roundNumber: game.roundNumber,
    totalRounds: game.totalRounds,
    match: game.currentMatch
      ? {
          game: game.currentMatch.game,
          table1: nameOf(game.currentMatch.table1),
          table1Id: game.currentMatch.table1,
          table2: nameOf(game.currentMatch.table2),
          table2Id: game.currentMatch.table2,
          status: game.currentMatch.status,
          winner: game.currentMatch.winner ? nameOf(game.currentMatch.winner) : null,
          tie: game.currentMatch.tie,
        }
      : null,
    matchPoints: game.matchPoints,
    ranking: game.ranking,
    finished: game.phase === 'finished',
    champion: game.champion
      ? { name: game.champion.name, score: game.champion.score }
      : null,
    lastResult: game.lastResult
      ? game.lastResult.tie
        ? { tie: true }
        : game.lastResult.skip
          ? { skip: true }
          : { winner: nameOf(game.lastResult.winner) }
      : null,
  })

  const ScoreControl = ({ tableId, name, keyHint }) => (
    <div className="flex flex-col items-center gap-2 bg-white rounded-2xl border-2 border-slate-200 p-4 shadow-sm">
      <p className="font-black text-brand-navy text-lg leading-tight text-center">{name}</p>
      <p className="font-outfit font-black text-5xl text-brand-green leading-none tabular-nums">
        {game.matchPoints[tableId] ?? 0}
      </p>
      <div className="flex items-center gap-2 mt-1">
        <button
          onClick={() => addMatchPoint(tableId, -1)}
          disabled={(game.matchPoints[tableId] ?? 0) <= 0}
          className="w-11 h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-black text-xl transition disabled:opacity-30 disabled:cursor-not-allowed"
          title="Restar punto"
        >
          −
        </button>
        <button
          onClick={() => addMatchPoint(tableId, 1)}
          className="px-6 h-11 rounded-xl bg-brand-green hover:brightness-95 text-white font-black text-xl transition shadow-md"
          title={`Sumar punto a ${name}`}
        >
          +1
        </button>
      </div>
      <kbd className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
        tecla {keyHint}
      </kbd>
    </div>
  )

  return (
    <div className="flex-1 w-full bg-brand-bg text-brand-navy">
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 pt-5 flex items-center justify-between gap-3 flex-wrap">
        <h2 className="font-outfit font-black text-lg md:text-xl tracking-wide text-brand-navy flex items-center gap-2">
          <span className="text-2xl">🪀</span> TORNEO DE PERINOLA
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              window.open('#/tradicional/display', '_blank', 'noopener')
            }
            className="px-3 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-navy-light transition text-white border border-slate-700 text-xs font-bold flex items-center gap-2"
          >
            <span>📺</span>
            <span className="hidden sm:inline">Abrir Pantalla</span>
          </button>
          <button
            onClick={toggle}
            className="p-2.5 rounded-xl bg-white hover:bg-slate-100 transition text-amber-600 border border-amber-300 text-sm"
            title="Sonido"
          >
            {enabled ? '🔊' : '🔇'}
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 flex flex-col justify-center items-center min-h-[72vh]">
        {game.phase === 'setup' && (
          <section className="glass-panel rounded-3xl p-6 sm:p-10 max-w-2xl w-full text-center shadow-2xl border border-amber-300/40">
            <div className="text-6xl mb-4">🪀</div>
            <h3 className="font-outfit text-3xl sm:text-4xl font-extrabold mb-3">
              Torneo de Perinola
            </h3>
            <p className="text-slate-600 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
              Las mesas se enfrentan <strong>todas contra todas</strong> a{' '}
              <strong>{ROUNDS_PER_PAIR} vueltas</strong> en partidas de Perinola. Los puntos se
              suman al <strong>marcador general</strong> compartido con los demás juegos.
            </p>

            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
              <div className="bg-white rounded-2xl border-2 border-slate-200 p-4">
                <p className="text-xs uppercase font-bold text-slate-500">Mesas</p>
                <p className="font-outfit font-black text-3xl text-brand-navy">{tables.length}</p>
              </div>
              <div className="bg-white rounded-2xl border-2 border-slate-200 p-4">
                <p className="text-xs uppercase font-bold text-slate-500">Partidos</p>
                <p className="font-outfit font-black text-3xl text-brand-navy">{matchesCount}</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {tables.map((t) => (
                <span
                  key={t.id}
                  className="text-xs font-bold px-3 py-1.5 rounded-full bg-brand-navy/5 text-brand-navy border border-slate-200"
                >
                  {t.name}
                </span>
              ))}
            </div>

            <p className="text-xs text-slate-500 mb-6">
              Cada mesa juega <strong>{roundsEach}</strong> partido{roundsEach === 1 ? '' : 's'}.
              Victoria: <strong>+10 pts</strong> · Empate: <strong>+5 pts</strong> al marcador
              general.
            </p>

            <button
              onClick={game.startTournament}
              disabled={tables.length < 2}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-outfit font-black text-lg shadow-xl hover:scale-105 active:scale-95 transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              ▶️ Iniciar Torneo
            </button>
            {tables.length < 2 && (
              <p className="text-xs text-rose-500 font-semibold mt-3">
                Se necesitan al menos 2 mesas para iniciar.
              </p>
            )}
          </section>
        )}

        {game.phase === 'playing' && game.currentMatch && (
          <section className="w-full max-w-5xl grid lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="bg-brand-navy text-white text-xs font-black px-4 py-2 rounded-full uppercase tracking-wider">
                  Partido {game.roundNumber} de {game.totalRounds}
                </span>
                <button
                  onClick={game.resetTournament}
                  className="text-xs font-bold text-slate-500 hover:text-brand-navy transition"
                >
                  ⏹️ Cancelar torneo
                </button>
              </div>

              <MatchCard match={game.currentMatch} nameOf={nameOf} points={game.matchPoints} />

              <div className="grid grid-cols-2 gap-3">
                <ScoreControl
                  tableId={game.currentMatch.table1}
                  name={nameOf(game.currentMatch.table1)}
                  keyHint="A"
                />
                <ScoreControl
                  tableId={game.currentMatch.table2}
                  name={nameOf(game.currentMatch.table2)}
                  keyHint="D"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => game.applyResult(game.currentMatch.table1)}
                  className="px-4 py-5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-outfit font-black text-base shadow-md transition flex flex-col items-center gap-1"
                >
                  <span className="text-xs uppercase opacity-90">Gana</span>
                  <span className="text-lg leading-tight text-center">
                    {nameOf(game.currentMatch.table1)}
                  </span>
                </button>
                <button
                  onClick={() => game.applyResult(game.currentMatch.table2)}
                  className="px-4 py-5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-outfit font-black text-base shadow-md transition flex flex-col items-center gap-1"
                >
                  <span className="text-xs uppercase opacity-90">Gana</span>
                  <span className="text-lg leading-tight text-center">
                    {nameOf(game.currentMatch.table2)}
                  </span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => game.applyResult('tie')}
                  className="px-5 py-3 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-700 font-bold text-sm border border-amber-300 transition"
                >
                  🤝 Empate (+5 c/u)
                </button>
                <button
                  onClick={() => game.applyResult('skip')}
                  className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-sm border border-slate-200 transition"
                >
                  ⏭️ Saltar partido
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white rounded-3xl border-2 border-slate-200 p-5 shadow-sm">
              <PositionTable ranking={game.ranking} />
              <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500">
                <p className="font-semibold mb-1">Juego del torneo</p>
                <p>🪀 La Perinola</p>
              </div>
            </div>
          </section>
        )}

        {game.phase === 'finished' && (
          <section className="glass-panel rounded-3xl p-6 sm:p-10 max-w-2xl w-full text-center shadow-2xl border border-amber-300/40">
            <div className="text-6xl mb-3">🏆</div>
            <h3 className="font-outfit text-3xl sm:text-4xl font-extrabold mb-2">
              ¡Torneo Completado!
            </h3>
            <p className="text-slate-500 text-sm mb-6">Líder del marcador general</p>
            <p className="font-outfit font-black text-4xl text-brand-green mb-8">
              {game.champion?.name}
            </p>

            <div className="mb-8 text-left">
              <PositionTable ranking={game.ranking} />
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <button
                onClick={game.resetTournament}
                className="w-full py-4 rounded-2xl bg-brand-navy hover:bg-brand-navy-light text-white font-outfit font-black text-base shadow-xl hover:scale-105 active:scale-95 transition"
              >
                🔄 Nuevo Torneo
              </button>
              <button
                onClick={game.startTournament}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-outfit font-black text-base shadow-xl hover:scale-105 active:scale-95 transition"
              >
                ⚡ Torneo Rápido
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
