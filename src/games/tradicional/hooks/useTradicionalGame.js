import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { TRADITIONAL_GAMES } from '../data/games.js'
import { useConfetti } from '../../../hooks/useConfetti.js'

export const WIN_POINTS = 10
export const TIE_POINTS = 5
export const ROUNDS_PER_PAIR = 2

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5)

/**
 * Genera todos los enfrentamientos posibles (round-robin) repetidos
 * `ROUNDS_PER_PAIR` vueltas y los mezcla. Al ser "todos contra todos" se
 * garantiza que cada mesa juegue al menos una vez (y ROUNDS_PER_PAIR veces
 * contra cada rival).
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
    game: null,
    winner: null,
    tie: false,
    status: 'pending',
  }))
}

const emptyScores = (ids) => Object.fromEntries(ids.map((id) => [id, 0]))
const emptyStats = (ids) =>
  Object.fromEntries(ids.map((id) => [id, { played: 0, wins: 0, ties: 0, losses: 0 }]))

export function useTradicionalGame(tables, playSound) {
  const [phase, setPhase] = useState('setup') // setup | playing | finished
  const [matches, setMatches] = useState([])
  const [scores, setScores] = useState({})
  const [stats, setStats] = useState({})
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lastResult, setLastResult] = useState(null)
  const [matchPhase, setMatchPhase] = useState('reveal') // reveal | playing
  const [rolling, setRolling] = useState(false)

  const tablesRef = useRef(tables)
  tablesRef.current = tables

  const revealTimeoutRef = useRef(null)
  const rollIntervalRef = useRef(null)

  const { burst, celebrate } = useConfetti()

  const currentMatch = matches[currentIndex] ?? null
  const totalRounds = matches.length
  const roundNumber = Math.min(currentIndex + 1, totalRounds)

  const clearTimers = useCallback(() => {
    clearTimeout(revealTimeoutRef.current)
    clearInterval(rollIntervalRef.current)
  }, [])

  const startTournament = useCallback(() => {
    playSound('click')
    clearTimers()
    const ids = tablesRef.current.map((t) => t.id)
    setMatches(buildMatches(ids))
    setScores(emptyScores(ids))
    setStats(emptyStats(ids))
    setCurrentIndex(0)
    setLastResult(null)
    setMatchPhase('reveal')
    setRolling(false)
    setPhase('playing')
  }, [playSound, clearTimers])

  const revealGame = useCallback(() => {
    if (matchPhase !== 'reveal' || rolling) return
    const idx = currentIndex
    const match = matches[idx]
    if (!match) return

    setRolling(true)
    rollIntervalRef.current = setInterval(() => playSound('tick'), 140)

    revealTimeoutRef.current = setTimeout(() => {
      clearInterval(rollIntervalRef.current)
      const game = TRADITIONAL_GAMES[Math.floor(Math.random() * TRADITIONAL_GAMES.length)]
      setMatches((prev) => prev.map((m, i) => (i === idx ? { ...m, game } : m)))
      setRolling(false)
      setMatchPhase('playing')
      playSound('correct')
      burst()
    }, 3000)
  }, [matchPhase, rolling, currentIndex, matches, playSound, burst])

  const applyResult = useCallback(
    (result) => {
      const idx = currentIndex
      const match = matches[idx]
      if (!match || match.status !== 'pending') return

      if (result === 'tie') {
        setScores((prev) => ({
          ...prev,
          [match.table1]: (prev[match.table1] ?? 0) + TIE_POINTS,
          [match.table2]: (prev[match.table2] ?? 0) + TIE_POINTS,
        }))
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
        setScores((prev) => ({ ...prev, [winner]: (prev[winner] ?? 0) + WIN_POINTS }))
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
        setPhase('finished')
      } else {
        setCurrentIndex(idx + 1)
        setMatchPhase('reveal')
        setRolling(false)
      }
    },
    [currentIndex, matches, playSound, burst],
  )

  const resetTournament = useCallback(() => {
    clearTimers()
    setPhase('setup')
    setMatches([])
    setScores({})
    setStats({})
    setCurrentIndex(0)
    setLastResult(null)
    setMatchPhase('reveal')
    setRolling(false)
  }, [clearTimers])

  useEffect(() => () => clearTimers(), [clearTimers])

  useEffect(() => {
    if (phase === 'finished') celebrate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  const ranking = useMemo(() => {
    return tables
      .map((t) => ({
        id: t.id,
        name: t.name,
        score: scores[t.id] ?? 0,
        ...(stats[t.id] ?? { played: 0, wins: 0, ties: 0, losses: 0 }),
      }))
      .sort((a, b) => b.score - a.score || b.wins - a.wins || a.name.localeCompare(b.name))
  }, [tables, scores, stats])

  const champion = ranking[0] && ranking[0].score > 0 ? ranking[0] : ranking[0] ?? null

  return {
    phase,
    matches,
    scores,
    stats,
    ranking,
    champion,
    currentMatch,
    currentIndex,
    totalRounds,
    roundNumber,
    lastResult,
    matchPhase,
    rolling,
    startTournament,
    revealGame,
    applyResult,
    resetTournament,
  }
}
