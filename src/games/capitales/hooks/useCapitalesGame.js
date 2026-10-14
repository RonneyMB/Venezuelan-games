import { useCallback, useEffect, useState } from 'react'
import { VENEZUELA_STATES } from '../data/states.js'
import { useConfetti } from '../../../hooks/useConfetti.js'
import { useGlobalScore } from '../../../context/GlobalScoreContext.jsx'

export const POINTS_PER_CORRECT = 10

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5)

export function useCapitalesGame(tables, playSound) {
  const { totals, addPoints } = useGlobalScore()
  const [screen, setScreen] = useState('start') // start | game | results
  const [queue, setQueue] = useState(VENEZUELA_STATES)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [feedback, setFeedback] = useState(null) // { variant, stateName, capital, tableName }
  const [answered, setAnswered] = useState(false)

  const { burst, celebrate } = useConfetti()

  const currentState = queue[currentIndex]
  const total = VENEZUELA_STATES.length

  const startGame = useCallback(() => {
    playSound('click')
    setQueue(shuffle(VENEZUELA_STATES))
    setCurrentIndex(0)
    setFeedback(null)
    setAnswered(false)
    setScreen('game')
  }, [playSound])

  const awardTable = useCallback(
    (tableId, tableName) => {
      if (answered) return
      const state = queue[currentIndex]
      if (!state) return
      addPoints(tableId, POINTS_PER_CORRECT)
      setAnswered(true)
      setFeedback({
        variant: 'correct',
        stateName: state.name,
        capital: state.capital,
        tableName,
      })
      playSound('correct')
      burst()
    },
    [answered, queue, currentIndex, addPoints, playSound, burst],
  )

  const reveal = useCallback(() => {
    if (answered) return
    const state = queue[currentIndex]
    if (!state) return
    setAnswered(true)
    setFeedback({ variant: 'reveal', stateName: state.name, capital: state.capital })
    playSound('wrong')
  }, [answered, queue, currentIndex, playSound])

  const nextState = useCallback(() => {
    const next = currentIndex + 1
    if (next >= queue.length) {
      setScreen('results')
      return
    }
    setCurrentIndex(next)
    setFeedback(null)
    setAnswered(false)
  }, [currentIndex, queue.length])

  const showStartScreen = useCallback(() => {
    setFeedback(null)
    setAnswered(false)
    setScreen('start')
  }, [])

  useEffect(() => {
    if (screen === 'results') celebrate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen])

  const ranking = tables
    .map((t) => ({ id: t.id, name: t.name, score: totals[t.id] ?? 0 }))
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))

  const leader = ranking[0] ?? null

  return {
    screen,
    total,
    currentState,
    currentIndex,
    feedback,
    answered,
    ranking,
    leader,
    startGame,
    awardTable,
    reveal,
    nextState,
    showStartScreen,
  }
}
