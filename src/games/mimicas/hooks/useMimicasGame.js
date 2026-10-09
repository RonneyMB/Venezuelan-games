import { useCallback, useEffect, useRef, useState } from 'react'
import { VENEZUELAN_WORDS } from '../data/words.js'
import { useTimer } from '../../../hooks/useTimer.js'
import { useConfetti } from '../../../hooks/useConfetti.js'

export const TURN_DURATION = 7 * 60

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5)

export function useMimicasGame(tables) {
  const [tab, setTab] = useState('ranking')
  const [scores, setScores] = useState(() => Object.fromEntries(tables.map((t) => [t.id, null])))
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
      (t) => t.id === currentTable || scores[t.id] !== null,
    )
    setScores((prev) => ({ ...prev, [currentTable]: currentTurnScore }))
    setLastTurn({ tableId: currentTable, score: currentTurnScore })
    if (allPlayed) setFinished(true)
    setModalOpen(true)
  }, [timerPause, currentTable, currentTurnScore, scores])

  endTurnRef.current = endTurn

  const startNextTurn = useCallback(() => {
    const next = tablesRef.current.find((t) => scores[t.id] === null)
    if (!next) {
      setTab('ranking')
      return
    }
    setCurrentTable(next.id)
    setCurrentTurnScore(0)
    setTab('game')
    nextWord()
    timerStart(TURN_DURATION)
  }, [scores, nextWord, timerStart])

  const handleCorrect = useCallback(() => {
    setCurrentTurnScore((s) => s + 1)
    flash('green')
    nextWord()
  }, [flash, nextWord])

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
    if (!window.confirm('¿Estás seguro de que deseas reiniciar todo el torneo de 360NET?')) return
    setScores(Object.fromEntries(tablesRef.current.map((t) => [t.id, null])))
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
    .map((t) => ({ id: t.id, name: t.name, score: scores[t.id] }))
    .sort((a, b) => (b.score ?? -1) - (a.score ?? -1))

  const idsKey = tables.map((t) => t.id).join('|')

  useEffect(() => {
    setScores(Object.fromEntries(tablesRef.current.map((t) => [t.id, null])))
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
    scores,
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
