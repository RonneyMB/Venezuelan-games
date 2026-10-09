import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Countdown timer hook.
 *
 * @param {number} initial  Duración inicial en segundos.
 * @param {{ onComplete?: Function, onTick?: (timeLeft:number)=>void }} options
 */
export function useTimer(initial, options = {}) {
  const { onComplete, onTick } = options
  const [timeLeft, setTimeLeft] = useState(initial)
  const [running, setRunning] = useState(false)

  const initialRef = useRef(initial)
  const onCompleteRef = useRef(onComplete)
  const onTickRef = useRef(onTick)

  initialRef.current = initial
  onCompleteRef.current = onComplete
  onTickRef.current = onTick

  useEffect(() => {
    if (!running) return
    if (timeLeft <= 0) {
      setRunning(false)
      onCompleteRef.current?.()
      return
    }
    const id = setTimeout(() => {
      const next = timeLeft - 1
      onTickRef.current?.(next)
      setTimeLeft(next)
    }, 1000)
    return () => clearTimeout(id)
  }, [running, timeLeft])

  const start = useCallback((from) => {
    if (typeof from === 'number') setTimeLeft(from)
    setRunning(true)
  }, [])

  const pause = useCallback(() => setRunning(false), [])
  const resume = useCallback(() => setRunning(true), [])
  const reset = useCallback((to) => {
    setRunning(false)
    setTimeLeft(typeof to === 'number' ? to : initialRef.current)
  }, [])
  const setTime = useCallback((value) => setTimeLeft(value), [])

  return { timeLeft, running, start, pause, resume, reset, setTime }
}
