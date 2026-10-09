import { useCallback, useEffect, useRef, useState } from 'react'
import { TRIVIA_QUESTIONS } from '../data/questions.js'
import { pickWildcard } from '../data/wildcards.js'
import { useTimer } from '../../../hooks/useTimer.js'

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5)
export const WILDCARDS_PER_TABLE = 3
export const QUESTION_TIME = 10

export function useTriviaGame(tables, playSound) {
  const tableIds = tables.map((t) => t.id)

  const [queue, setQueue] = useState(TRIVIA_QUESTIONS)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [scores, setScores] = useState(() => Object.fromEntries(tableIds.map((id) => [id, 0])))
  const [activeTable, setActiveTable] = useState(tableIds[0] ?? null)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [showHost, setShowHost] = useState(false)
  const [finished, setFinished] = useState(false)
  const [winner, setWinner] = useState(null)
  const [phase, setPhase] = useState('ready') // 'ready' | 'answering'

  // --- Comodín ---
  const [wildcards, setWildcards] = useState(() =>
    Object.fromEntries(tableIds.map((id) => [id, WILDCARDS_PER_TABLE])),
  )
  const [wildcardPhase, setWildcardPhase] = useState('idle') // idle | select | play | result
  const [currentWildcard, setCurrentWildcard] = useState(null)
  const [wildcardResult, setWildcardResult] = useState(null) // 'correct' | 'incorrect' | null

  const distributionRef = useRef([])
  const answeredRef = useRef(false)
  const tablesRef = useRef(tables)
  const usedWildcardsRef = useRef({ song: [], saying: [], truefalse: [], traditional: [] })
  const wildcardResumeRef = useRef(false)
  const suspenseTimeoutRef = useRef(null)
  answeredRef.current = answered
  tablesRef.current = tables

  const currentQuestion = queue[currentIndex]

  const resetQueue = useCallback(() => {
    distributionRef.current = shuffle(tablesRef.current.map((t) => t.id))
  }, [])

  const nextTurn = useCallback(() => {
    if (distributionRef.current.length === 0) resetQueue()
    return distributionRef.current.shift()
  }, [resetQueue])

  const handleTimeout = useCallback(() => {
    if (answeredRef.current) return
    playSound('wrong')
    setSelected(null)
    setAnswered(true)
  }, [playSound])

  const timer = useTimer(QUESTION_TIME, {
    onTick: (t) => {
      if (t <= 3 && t > 0) playSound('tick')
    },
    onComplete: handleTimeout,
  })

  const { start: timerStart, pause: timerPause, resume: timerResume, reset: timerReset, running: isRunning, timeLeft } = timer

  const startTimer = useCallback(() => {
    if (answeredRef.current) return
    setPhase('answering')
    timerStart(QUESTION_TIME)
  }, [timerStart])

  const goToQuestion = useCallback(
    (index) => {
      clearTimeout(suspenseTimeoutRef.current)
      const table = nextTurn()
      setActiveTable(table)
      setCurrentIndex(index)
      setSelected(null)
      setAnswered(false)
      setPhase('ready')
      setWildcardPhase('idle')
      setCurrentWildcard(null)
      setWildcardResult(null)
      timerReset(QUESTION_TIME)
    },
    [nextTurn, timerReset],
  )

  const restart = useCallback(() => {
    clearTimeout(suspenseTimeoutRef.current)
    const ids = tablesRef.current.map((t) => t.id)
    resetQueue()
    setQueue(shuffle(TRIVIA_QUESTIONS))
    setScores(Object.fromEntries(ids.map((id) => [id, 0])))
    setWildcards(Object.fromEntries(ids.map((id) => [id, WILDCARDS_PER_TABLE])))
    usedWildcardsRef.current = { song: [], saying: [], truefalse: [], traditional: [] }
    setWildcardPhase('idle')
    setCurrentWildcard(null)
    setWildcardResult(null)
    setWinner(null)
    setFinished(false)
    if (ids.length === 0) {
      setActiveTable(null)
      return
    }
    goToQuestion(0)
  }, [resetQueue, goToQuestion])

  const idsKey = tableIds.join('|')

  const selectOption = useCallback(
    (idx) => {
      if (answeredRef.current) return
      timerPause()
      const q = queue[currentIndex]
      if (!q) return
      const isCorrect = idx === q.correct
      setSelected(idx)
      setAnswered(true)
      if (isCorrect) {
        playSound('correct')
        setScores((s) => ({ ...s, [activeTable]: (s[activeTable] ?? 0) + 10 }))
      } else {
        playSound('wrong')
      }
    },
    [timerPause, queue, currentIndex, activeTable, playSound],
  )

  const nextQuestion = useCallback(() => {
    const nextIndex = currentIndex + 1
    if (nextIndex >= queue.length) {
      const entries = Object.entries(scores)
      let best = entries[0]
      entries.forEach((entry) => {
        if (entry[1] > best[1]) best = entry
      })
      setWinner(best?.[0] ?? null)
      setFinished(true)
      return
    }
    goToQuestion(nextIndex)
  }, [currentIndex, queue.length, scores, goToQuestion])

  // --- Acciones del comodín ---
  const openWildcard = useCallback(() => {
    if (answeredRef.current) return
    if ((wildcards[activeTable] ?? 0) <= 0) return
    wildcardResumeRef.current = isRunning
    timerPause()
    setWildcardResult(null)
    setWildcardPhase('select')
  }, [wildcards, activeTable, timerPause, isRunning])

  const cancelWildcard = useCallback(() => {
    clearTimeout(suspenseTimeoutRef.current)
    setWildcardPhase('idle')
    setCurrentWildcard(null)
    setWildcardResult(null)
    if (!answeredRef.current && wildcardResumeRef.current) timerResume()
  }, [timerResume])

  const selectWildcardGame = useCallback((type) => {
    setWildcardResult(null)
    if (type === 'traditional') {
      setCurrentWildcard({ type, data: null })
      setWildcardPhase('suspense')
      clearTimeout(suspenseTimeoutRef.current)
      suspenseTimeoutRef.current = setTimeout(() => {
        const data = pickWildcard(type, usedWildcardsRef)
        setCurrentWildcard({ type, data })
        setWildcardPhase('play')
      }, 3000)
      return
    }
    const data = pickWildcard(type, usedWildcardsRef)
    setCurrentWildcard({ type, data })
    setWildcardPhase('play')
  }, [])

  const answerWildcard = useCallback(
    (isCorrect) => {
      setWildcards((w) => ({ ...w, [activeTable]: Math.max(0, (w[activeTable] ?? 0) - 1) }))
      setWildcardResult(isCorrect ? 'correct' : 'incorrect')
      if (isCorrect) {
        playSound('correct')
        setScores((s) => ({ ...s, [activeTable]: (s[activeTable] ?? 0) + 5 }))
      } else {
        playSound('wrong')
      }
      setWildcardPhase('result')
    },
    [activeTable, playSound],
  )

  const finishWildcard = useCallback(() => {
    clearTimeout(suspenseTimeoutRef.current)
    setWildcardPhase('idle')
    setCurrentWildcard(null)
    setWildcardResult(null)
    nextQuestion()
  }, [nextQuestion])

  const adjustScore = useCallback((tableId, delta) => {
    setScores((s) => ({ ...s, [tableId]: Math.max(0, (s[tableId] ?? 0) + delta) }))
  }, [])

  const forceTurn = useCallback((tableId) => {
    setActiveTable(tableId)
    setShowHost(false)
  }, [])

  const togglePause = useCallback(() => {
    if (isRunning) timerPause()
    else timerResume()
  }, [isRunning, timerPause, timerResume])

  useEffect(() => {
    restart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey, restart])

  useEffect(() => () => clearTimeout(suspenseTimeoutRef.current), [])

  return {
    queue,
    currentIndex,
    currentQuestion,
    scores,
    activeTable,
    selected,
    answered,
    showHost,
    setShowHost,
    finished,
    winner,
    timeLeft,
    isRunning,
    phase,
    startTimer,
    restart,
    selectOption,
    nextQuestion,
    adjustScore,
    forceTurn,
    togglePause,
    // comodín
    wildcards,
    wildcardsRemaining: wildcards[activeTable] ?? 0,
    wildcardPhase,
    currentWildcard,
    wildcardResult,
    openWildcard,
    cancelWildcard,
    selectWildcardGame,
    answerWildcard,
    finishWildcard,
  }
}
