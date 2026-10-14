import { useCallback, useEffect, useRef, useState } from 'react'
import { VENEZUELAN_WORDS } from '../data/words.js'
import { useTimer } from '../../../hooks/useTimer.js'
import { useConfetti } from '../../../hooks/useConfetti.js'
import { useGlobalScore } from '../../../context/GlobalScoreContext.jsx'

export const TURN_DURATION = 7 * 60

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5)

export function useMimicasGame(tables) {
  const { totals, addPoints } = useGlobalScore()
  const [tab, setTab] = useState('ranking')
  const [played, setPlayed] = useState(() =>
    Object.fromEntries(tables.map((t) => [t.id, false])),
  )
  const [currentTable, setCurrentTable] = useState(null)
  const [currentTurnScore, setCurrentTurnScore] = useState(0)
  const [currentWord, setCurrentWord] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [lastTurn, setLastTurn] = useState(null)
  const [finished, setFinished] = useState(false)
  const [feedback, setFeedback] = useState(null)

  const unusedRef = useRef(shuffle(VENEZUELAN_WORDS))
  const feedbackTimeout = useRef(null)
  const endTurnRef = useRef(null)
  const tablesRef = useRef(tables)
  tablesRef.current = tables

  const { celebrate } = useConfetti()

  const timer = useTimer(TURN_DURATION, {
    onComplete: () => endTurnRef.current?.(),
  })
  const {
    start: timerStart,
    pause: timerPause,
    resume: timerResume,
    reset: timerReset,
    running: timerRunning,
    timeLeft,
  } = timer

  const nextWord = useCallback(() => {
    if (unusedRef.current.length === 0) unusedRef.current = shuffle(VENEZUELAN_WORDS)
    setCurrentWord(unusedRef.current.pop())
  }, [])

  const flash = useCallback((color) => {
    setFeedback(color)
    clearTimeout(feedbackTimeout.current)
    feedbackTimeout.current = setTimeout(() => setFeedback(null), 200)
  }, [])

  const endTurn = useCallback(() => {
    timerPause()
    if (!currentTable) return
    const allPlayed = tablesRef.current.every(
      (t) => t.id === currentTable || played[t.id],
    )
    setPlayed((prev) => ({ ...prev, [currentTable]: true }))
    setLastTurn({ tableId: currentTable, score: currentTurnScore })
    if (allPlayed) setFinished(true)
    setModalOpen(true)
  }, [timerPause, currentTable, currentTurnScore, played])

  endTurnRef.current = endTurn

  const startNextTurn = useCallback(() => {
    const next = tablesRef.current.find((t) => !played[t.id])
    if (!next) {
      setTab('ranking')
      return
    }
    setCurrentTable(next.id)
    setCurrentTurnScore(0)
    setTab('game')
    nextWord()
    timerStart(TURN_DURATION)
  }, [played, nextWord, timerStart])

  const handleCorrect = useCallback(() => {
    setCurrentTurnScore((s) => s + 1)
    if (currentTable) addPoints(currentTable, 1)
    flash('green')
    nextWord()
  }, [flash, nextWord, currentTable, addPoints])

  const handlePass = useCallback(() => {
    flash('amber')
    nextWord()
  }, [flash, nextWord])

  const handleNextWord = useCallback(() => nextWord(), [nextWord])

  const toggleTimer = useCallback(() => {
    if (timerRunning) timerPause()
    else timerResume()
  }, [timerRunning, timerPause, timerResume])

  const closeTurnModal = useCallback(() => {
    setModalOpen(false)
    setCurrentTable(null)
    setTab('ranking')
  }, [])

  const resetTournament = useCallback(() => {
    if (
      !window.confirm(
        '¿Reiniciar el torneo de mímicas (turnos y palabras)? El marcador general NO se borra.',
      )
    )
      return
    setPlayed(Object.fromEntries(tablesRef.current.map((t) => [t.id, false])))
    setCurrentTable(null)
    setCurrentTurnScore(0)
    setCurrentWord(null)
    setModalOpen(false)
    setLastTurn(null)
    setFinished(false)
    unusedRef.current = shuffle(VENEZUELAN_WORDS)
    timerReset(TURN_DURATION)
    setTab('ranking')
  }, [timerReset])

  const ranking = tables
    .map((t) => ({
      id: t.id,
      name: t.name,
      score: totals[t.id] ?? 0,
      played: Boolean(played[t.id]),
    }))
    .sort((a, b) => b.score - a.score)

  const idsKey = tables.map((t) => t.id).join('|')

  useEffect(() => {
    setPlayed(Object.fromEntries(tablesRef.current.map((t) => [t.id, false])))
    setCurrentTable(null)
    setCurrentTurnScore(0)
    setCurrentWord(null)
    setModalOpen(false)
    setLastTurn(null)
    setFinished(false)
    timerReset(TURN_DURATION)
    setTab('ranking')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey])

  useEffect(() => {
    if (finished) celebrate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished])

  useEffect(() => () => clearTimeout(feedbackTimeout.current), [])

  useEffect(() => {
    const onKey = (e) => {
      if (tab !== 'game' || modalOpen) return
      if (e.key === 'Enter') {
        e.preventDefault()
        handleNextWord()
      } else if (e.key === ' ' || e.key === 'ArrowRight') {
        e.preventDefault()
        handleCorrect()
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault()
        handlePass()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [tab, modalOpen, handleNextWord, handleCorrect, handlePass])

  const champion = finished && ranking[0] ? ranking[0] : null

  return {
    tab,
    setTab,
    scores: totals,
    ranking,
    champion,
    currentTable,
    currentTableName: tables.find((t) => t.id === currentTable)?.name ?? '',
    currentTurnScore,
    currentWord,
    timeLeft,
    timerRunning,
    modalOpen,
    lastTurn,
    finished,
    feedback,
    startNextTurn,
    handleCorrect,
    handlePass,
    handleNextWord,
    toggleTimer,
    closeTurnModal,
    resetTournament,
  }
}
