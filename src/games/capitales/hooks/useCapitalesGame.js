import { useCallback, useEffect, useRef, useState } from 'react'
import { VENEZUELA_STATES } from '../data/states.js'
import { useTimer } from '../../../hooks/useTimer.js'
import { useConfetti } from '../../../hooks/useConfetti.js'

export const ROUND_DURATION = 30
const TOTAL_STATES = VENEZUELA_STATES.length

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5)

export function useCapitalesGame(playSound) {
  const [screen, setScreen] = useState('start')
  const [mode, setMode] = useState('normal')
  const [queue, setQueue] = useState(VENEZUELA_STATES)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [totalAttempts, setTotalAttempts] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [anim, setAnim] = useState(null)
  const [elapsed, setElapsed] = useState(0)

  const timeoutRef = useRef(null)
  const startTimeRef = useRef(0)
  const endGameRef = useRef(null)
  const handleTimeoutRef = useRef(null)
  const { burst, celebrate } = useConfetti()

  // Timer por ronda (30s), iniciado manualmente por el administrador.
  const roundTimer = useTimer(ROUND_DURATION, {
    onComplete: () => handleTimeoutRef.current?.(),
  })
  const {
    timeLeft: roundTimeLeft,
    running: roundTimerRunning,
    reset: resetTimer,
    pause: pauseTimer,
    resume: resumeTimer,
  } = roundTimer

  const currentState = queue[currentIndex]

  const endGame = useCallback(() => {
    clearTimeout(timeoutRef.current)
    pauseTimer()
    setElapsed(Math.round((Date.now() - startTimeRef.current) / 1000))
    setScreen('results')
  }, [pauseTimer])
  endGameRef.current = endGame

  const markWrong = useCallback(
    (variant) => {
      const state = queue[currentIndex]
      if (!state) return
      setAnswered(true)
      setTotalAttempts((t) => t + 1)
      setStreak(0)
      setFeedback({ variant, stateName: state.name, capital: state.capital })
      setAnim('shake')
      playSound('wrong')
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setAnim(null), 500)
    },
    [queue, currentIndex, playSound],
  )

  const handleTimeout = useCallback(() => {
    if (answered) return
    markWrong('timeout')
    pauseTimer()
  }, [answered, markWrong, pauseTimer])
  handleTimeoutRef.current = handleTimeout

  const nextState = useCallback(() => {
    const next = currentIndex + 1
    if (next >= queue.length) {
      endGameRef.current?.()
      return
    }
    setCurrentIndex(next)
    setFeedback(null)
    setAnswered(false)
    setAnim(null)
    if (mode === 'timed') resetTimer(ROUND_DURATION)
  }, [currentIndex, queue.length, mode, resetTimer])

  const startGame = useCallback(
    (gameMode) => {
      playSound('click')
      setMode(gameMode)
      setQueue(shuffle(VENEZUELA_STATES))
      setCurrentIndex(0)
      setScore(0)
      setStreak(0)
      setTotalAttempts(0)
      setFeedback(null)
      setAnswered(false)
      setAnim(null)
      setElapsed(0)
      startTimeRef.current = Date.now()
      resetTimer(ROUND_DURATION)
      setScreen('game')
    },
    [playSound, resetTimer],
  )

  const markCorrect = useCallback(() => {
    if (answered) return
    const state = queue[currentIndex]
    if (!state) return

    pauseTimer()
    setAnswered(true)
    setTotalAttempts((t) => t + 1)
    setScore((s) => s + 1)
    setStreak((s) => s + 1)
    setFeedback({ variant: 'correct', stateName: state.name, capital: state.capital })
    setAnim('pop')
    playSound('correct')
    burst()
  }, [answered, queue, currentIndex, playSound, burst, pauseTimer])

  const markIncorrect = useCallback(() => {
    if (answered) return
    pauseTimer()
    markWrong('wrong')
  }, [answered, markWrong, pauseTimer])

  const startRoundTimer = useCallback(() => {
    if (answered) return
    resumeTimer()
  }, [answered, resumeTimer])

  const resetRoundTimer = useCallback(() => {
    resetTimer(ROUND_DURATION)
  }, [resetTimer])

  const showStartScreen = useCallback(() => {
    clearTimeout(timeoutRef.current)
    pauseTimer()
    setScreen('start')
  }, [pauseTimer])

  useEffect(() => {
    if (screen === 'results' && score === TOTAL_STATES) celebrate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen])

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  return {
    screen,
    mode,
    total: TOTAL_STATES,
    currentState,
    currentIndex,
    score,
    streak,
    totalAttempts,
    feedback,
    answered,
    anim,
    elapsed,
    roundTimeLeft,
    roundTimerRunning,
    startGame,
    markCorrect,
    markIncorrect,
    nextState,
    startRoundTimer,
    pauseRoundTimer: pauseTimer,
    resetRoundTimer,
    showStartScreen,
  }
}
