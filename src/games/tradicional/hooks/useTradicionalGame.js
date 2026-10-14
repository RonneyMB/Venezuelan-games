import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { TRADITIONAL_GAMES } from '../data/games.js'
import { useConfetti } from '../../../hooks/useConfetti.js'
import { useGlobalScore } from '../../../context/GlobalScoreContext.jsx'

export const WIN_POINTS = 10
export const TIE_POINTS = 5
export const ROUNDS_PER_PAIR = 2

const PERINOLA = TRADITIONAL_GAMES[0]

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5)

/**
 * Genera todos los enfrentamientos posibles (round-robin) repetidos
 * `ROUNDS_PER_PAIR` vueltas y los mezcla. Todos los partidos se juegan
 * directamente con La Perinola (sin sorteo).
 */
function buildMatches(tableIds) {
  const pairs = []
  for (let i = 0; i < tableIds.length; i++) {
    for (let j = i + 1; j < tableIds.length; j++) {
      for (let r = 0; r < ROUNDS_PER_PAIR; r++) {
        pairs.push([tableIds[i], tableIds[j]])
      }
    }
  }
  const ordered = shuffle(pairs)
  return ordered.map((pair, idx) => ({
    id: `m-${idx}`,
    table1: pair[0],
    table2: pair[1],
    game: PERINOLA,
    winner: null,
    tie: false,
    status: 'pending',
  }))
}

const emptyStats = (ids) =>
  Object.fromEntries(ids.map((id) => [id, { played: 0, wins: 0, ties: 0, losses: 0 }]))

export function useTradicionalGame(tables, playSound) {
  const { totals, addPoints } = useGlobalScore()
  const [phase, setPhase] = useState('setup') // setup | playing | finished
  const [matches, setMatches] = useState([])
  const [stats, setStats] = useState({})
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lastResult, setLastResult] = useState(null)
  const [matchPoints, setMatchPoints] = useState({})

  const tablesRef = useRef(tables)
  tablesRef.current = tables

  const { burst, celebrate } = useConfetti()

  const currentMatch = matches[currentIndex] ?? null
  const totalRounds = matches.length
  const roundNumber = Math.min(currentIndex + 1, totalRounds)

  const startTournament = useCallback(() => {
    playSound('click')
    const ids = tablesRef.current.map((t) => t.id)
    const built = buildMatches(ids)
    setMatches(built)
    setStats(emptyStats(ids))
    setCurrentIndex(0)
    setLastResult(null)
    setMatchPoints(built[0] ? { [built[0].table1]: 0, [built[0].table2]: 0 } : {})
    setPhase('playing')
  }, [playSound])

  const addMatchPoint = useCallback(
    (tableId, delta = 1) => {
      setMatchPoints((prev) => {
        const current = prev[tableId] ?? 0
        const next = Math.max(0, current + delta)
        if (next === current) return prev
        return { ...prev, [tableId]: next }
      })
      if (delta > 0) playSound('tick')
    },
    [playSound],
  )

  const applyResult = useCallback(
    (result) => {
      const idx = currentIndex
      const match = matches[idx]
      if (!match || match.status !== 'pending') return

      if (result === 'tie') {
        addPoints(match.table1, TIE_POINTS)
        addPoints(match.table2, TIE_POINTS)
        setStats((prev) => ({
          ...prev,
          [match.table1]: {
            ...prev[match.table1],
            played: prev[match.table1].played + 1,
            ties: prev[match.table1].ties + 1,
          },
          [match.table2]: {
            ...prev[match.table2],
            played: prev[match.table2].played + 1,
            ties: prev[match.table2].ties + 1,
          },
        }))
        setLastResult({ tie: true, table1: match.table1, table2: match.table2 })
      } else if (result !== 'skip') {
        const winner = result
        const loser = match.table1 === winner ? match.table2 : match.table1
        addPoints(winner, WIN_POINTS)
        setStats((prev) => ({
          ...prev,
          [winner]: {
            ...prev[winner],
            played: prev[winner].played + 1,
            wins: prev[winner].wins + 1,
          },
          [loser]: {
            ...prev[loser],
            played: prev[loser].played + 1,
            losses: prev[loser].losses + 1,
          },
        }))
        setLastResult({ tie: false, winner })
        playSound('correct')
        burst()
      } else {
        setLastResult({ skip: true })
      }

      setMatches((prev) =>
        prev.map((m, i) =>
          i === idx
            ? {
                ...m,
                winner: result === 'skip' || result === 'tie' ? null : result,
                tie: result === 'tie',
                status: 'finished',
              }
            : m,
        ),
      )

      if (idx + 1 >= matches.length) {
        setMatchPoints({})
        setPhase('finished')
      } else {
        const next = matches[idx + 1]
        setCurrentIndex(idx + 1)
        setMatchPoints({ [next.table1]: 0, [next.table2]: 0 })
      }
    },
    [currentIndex, matches, playSound, burst, addPoints],
  )

  const resetTournament = useCallback(() => {
    setPhase('setup')
    setMatches([])
    setStats({})
    setCurrentIndex(0)
    setLastResult(null)
    setMatchPoints({})
  }, [])

  useEffect(() => {
    if (phase === 'finished') celebrate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  const ranking = useMemo(() => {
    return tables
      .map((t) => ({
        id: t.id,
        name: t.name,
        score: totals[t.id] ?? 0,
        ...(stats[t.id] ?? { played: 0, wins: 0, ties: 0, losses: 0 }),
      }))
      .sort((a, b) => b.score - a.score || b.wins - a.wins || a.name.localeCompare(b.name))
  }, [tables, totals, stats])

  const champion = ranking[0] ?? null

  return {
    phase,
    matches,
    stats,
    ranking,
    champion,
    currentMatch,
    currentIndex,
    totalRounds,
    roundNumber,
    lastResult,
    matchPoints,
    startTournament,
    addMatchPoint,
    applyResult,
    resetTournament,
  }
}
