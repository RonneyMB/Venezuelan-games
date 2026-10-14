import { useCallback, useEffect, useRef, useState } from 'react'
import { TRIVIA_QUESTIONS } from '../data/questions.js'
import { pickWildcard, pickWildcardType } from '../data/wildcards.js'
import { useTimer } from '../../../hooks/useTimer.js'
import { useGlobalScore } from '../../../context/GlobalScoreContext.jsx'

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5)
export const WILDCARDS_PER_TABLE = 3
export const QUESTION_TIME = 10
export const ROUNDS_PER_TABLE = 6

export function useTriviaGame(tables, playSound) {
  const tableIds = tables.map((t) => t.id)
  const { totals, addPoints } = useGlobalScore()

  // Mazo de preguntas: se sacan al azar. Las respondidas quedan descartadas;
  // las no respondidas (tiempo agotado o comodín) vuelven al mazo.
  const deckRef = useRef(shuffle(TRIVIA_QUESTIONS))
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [answeredCount, setAnsweredCount] = useState(0)
  const [turnCount, setTurnCount] = useState(0)
  const [timedOut, setTimedOut] = useState(false)

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
  const [wildcardPhase, setWildcardPhase] = useState('idle') // idle | suspense | ready | play | result
  const [currentWildcard, setCurrentWildcard] = useState(null)
  const [wildcardResult, setWildcardResult] = useState(null) // 'correct' | 'incorrect' | null

  const totalTurnos = tableIds.length * ROUNDS_PER_TABLE

  const distributionRef = useRef([])
  const answeredRef = useRef(false)
  const tablesRef = useRef(tables)
  const usedWildcardsRef = useRef({ saying: [], truefalse: [], traditional: [] })
  const wildcardResumeRef = useRef(false)
  const suspenseTimeoutRef = useRef(null)
  const lastWildcardTypeRef = useRef(null)
  // Marca si la pregunta del turno en curso no fue respondida (debe volver al mazo).
  const noAnswerRef = useRef(false)

  answeredRef.current = answered
  tablesRef.current = tables

  const resetDistribution = useCallback(() => {
    distributionRef.current = shuffle(tablesRef.current.map((t) => t.id))
  }, [])

  const nextTurn = useCallback(() => {
    if (distributionRef.current.length === 0) resetDistribution()
    return distributionRef.current.shift()
  }, [resetDistribution])

  const drawFromDeck = useCallback(() => {
    // Guarda: si el mazo se agota (p. ej. más mesas de las previstas), se recicla.
    if (deckRef.current.length === 0) deckRef.current = shuffle(TRIVIA_QUESTIONS)
    const idx = Math.floor(Math.random() * deckRef.current.length)
    return deckRef.current.splice(idx, 1)[0]
  }, [])

  const returnToDeck = useCallback((question) => {
    if (!question) return
    const at = Math.floor(Math.random() * (deckRef.current.length + 1))
    deckRef.current.splice(at, 0, question)
  }, [])

  const handleTimeout = useCallback(() => {
    if (answeredRef.current) return
    playSound('wrong')
    // Agotó el tiempo: la pregunta NO cuenta como respondida y vuelve al mazo.
    noAnswerRef.current = true
    setSelected(null)
    setAnswered(true)
    setTimedOut(true)
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

  // Inicia el turno de una mesa con una pregunta sacada del mazo.
  const startTurn = useCallback(() => {
    clearTimeout(suspenseTimeoutRef.current)
    setActiveTable(nextTurn())
    setCurrentQuestion(drawFromDeck())
    setTurnCount((c) => c + 1)
    setSelected(null)
    setAnswered(false)
    setTimedOut(false)
    setPhase('ready')
    setWildcardPhase('idle')
    setCurrentWildcard(null)
    setWildcardResult(null)
    timerReset(QUESTION_TIME)
  }, [nextTurn, drawFromDeck, timerReset])

  const finishGame = useCallback(() => {
    const ids = tablesRef.current.map((t) => t.id)
    let best = ids[0] ?? null
    ids.forEach((id) => {
      if (best !== null && (totals[id] ?? 0) > (totals[best] ?? 0)) best = id
    })
    setWinner(best)
    setFinished(true)
  }, [totals])

  // Avanza al siguiente turno. Si la pregunta en curso no fue respondida,
  // regresa al mazo. La partida termina al completar las rondas previstas.
  const advance = useCallback(() => {
    if (noAnswerRef.current) {
      // No fue respondida (tiempo agotado o comodín): vuelve al mazo.
      returnToDeck(currentQuestion)
      noAnswerRef.current = false
    } else {
      setAnsweredCount((c) => c + 1)
    }

    if (turnCount >= totalTurnos) {
      finishGame()
      return
    }
    startTurn()
  }, [currentQuestion, returnToDeck, turnCount, totalTurnos, finishGame, startTurn])

  const restart = useCallback(() => {
    clearTimeout(suspenseTimeoutRef.current)
    deckRef.current = shuffle(TRIVIA_QUESTIONS)
    const ids = tablesRef.current.map((t) => t.id)
    resetDistribution()
    setAnsweredCount(0)
    setTurnCount(0)
    setTimedOut(false)
    noAnswerRef.current = false
    setWildcards(Object.fromEntries(ids.map((id) => [id, WILDCARDS_PER_TABLE])))
    usedWildcardsRef.current = { saying: [], truefalse: [], traditional: [] }
    lastWildcardTypeRef.current = null
    setWildcardPhase('idle')
    setCurrentWildcard(null)
    setWildcardResult(null)
    setWinner(null)
    setFinished(false)
    if (ids.length === 0) {
      setActiveTable(null)
      setCurrentQuestion(null)
      return
    }
    startTurn()
  }, [resetDistribution, startTurn])

  const idsKey = tableIds.join('|')

  const selectOption = useCallback(
    (idx) => {
      if (answeredRef.current) return
      timerPause()
      const q = currentQuestion
      if (!q) return
      const isCorrect = idx === q.correct
      noAnswerRef.current = false
      setSelected(idx)
      setAnswered(true)
      if (isCorrect) {
        playSound('correct')
        addPoints(activeTable, 10)
      } else {
        playSound('wrong')
      }
    },
    [timerPause, currentQuestion, activeTable, playSound, addPoints],
  )

  const nextQuestion = useCallback(() => {
    advance()
  }, [advance])

  // --- Acciones del comodín ---
  // El mini-juego se sortea automáticamente. El administrador lo ejecuta
  // pulsando "Continuar" en la fase 'ready'.
  const drawWildcard = useCallback(() => {
    const type = pickWildcardType(lastWildcardTypeRef.current)
    lastWildcardTypeRef.current = type
    const data = pickWildcard(type, usedWildcardsRef)
    setCurrentWildcard({ type, data })
    setWildcardPhase('ready')
  }, [])

  const openWildcard = useCallback(() => {
    if (answeredRef.current) return
    if ((wildcards[activeTable] ?? 0) <= 0) return
    wildcardResumeRef.current = isRunning
    timerPause()
    setWildcardResult(null)
    setCurrentWildcard(null)
    setWildcardPhase('suspense')
    clearTimeout(suspenseTimeoutRef.current)
    suspenseTimeoutRef.current = setTimeout(drawWildcard, 3000)
  }, [wildcards, activeTable, timerPause, isRunning, drawWildcard])

  const cancelWildcard = useCallback(() => {
    clearTimeout(suspenseTimeoutRef.current)
    setWildcardPhase('idle')
    setCurrentWildcard(null)
    setWildcardResult(null)
    if (!answeredRef.current && wildcardResumeRef.current) timerResume()
  }, [timerResume])

  const startWildcardGame = useCallback(() => {
    if (wildcardPhase !== 'ready') return
    setWildcardPhase('play')
  }, [wildcardPhase])

  const answerWildcard = useCallback(
    (isCorrect) => {
      setWildcards((w) => ({ ...w, [activeTable]: Math.max(0, (w[activeTable] ?? 0) - 1) }))
      setWildcardResult(isCorrect ? 'correct' : 'incorrect')
      if (isCorrect) {
        playSound('correct')
        addPoints(activeTable, 5)
      } else {
        playSound('wrong')
      }
      setWildcardPhase('result')
    },
    [activeTable, playSound, addPoints],
  )

  // Al terminar el comodín la pregunta NO fue respondida: vuelve al mazo.
  const finishWildcard = useCallback(() => {
    clearTimeout(suspenseTimeoutRef.current)
    setWildcardPhase('idle')
    setCurrentWildcard(null)
    setWildcardResult(null)
    noAnswerRef.current = true
    advance()
  }, [advance])

  const adjustScore = useCallback(
    (tableId, delta) => {
      addPoints(tableId, delta)
    },
    [addPoints],
  )

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
    currentQuestion,
    answeredCount,
    turnCount,
    totalTurnos,
    timedOut,
    scores: totals,
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
    startWildcardGame,
    answerWildcard,
    finishWildcard,
  }
}