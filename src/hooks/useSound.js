import { useCallback, useRef, useState } from 'react'

/**
 * Web Audio API sound synthesizer hook.
 * Tipos soportados: 'correct', 'wrong', 'tick', 'click'.
 */
export function useSound(defaultEnabled = true) {
  const [enabled, setEnabled] = useState(defaultEnabled)
  const ctxRef = useRef(null)
  const enabledRef = useRef(defaultEnabled)
  enabledRef.current = enabled

  const getCtx = useCallback(() => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!ctxRef.current) {
      ctxRef.current = new AudioCtx()
    }
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume()
    }
    return ctxRef.current
  }, [])

  const play = useCallback(
    (type) => {
      if (!enabledRef.current) return
      try {
        const ctx = getCtx()
        const now = ctx.currentTime

        if (type === 'correct') {
          ;[523.25, 659.25, 783.99].forEach((freq, i) => {
            const osc = ctx.createOscillator()
            const gain = ctx.createGain()
            osc.type = 'sine'
            osc.frequency.value = freq
            osc.connect(gain)
            gain.connect(ctx.destination)
            gain.gain.setValueAtTime(0.12, now + i * 0.08)
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.3)
            osc.start(now + i * 0.08)
            osc.stop(now + i * 0.08 + 0.3)
          })
        } else if (type === 'wrong') {
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.type = 'sawtooth'
          osc.frequency.setValueAtTime(200, now)
          osc.frequency.exponentialRampToValueAtTime(110, now + 0.3)
          osc.connect(gain)
          gain.connect(ctx.destination)
          gain.gain.setValueAtTime(0.15, now)
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3)
          osc.start(now)
          osc.stop(now + 0.3)
        } else if (type === 'tick') {
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.type = 'sine'
          osc.frequency.setValueAtTime(600, now)
          osc.connect(gain)
          gain.connect(ctx.destination)
          gain.gain.setValueAtTime(0.05, now)
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05)
          osc.start(now)
          osc.stop(now + 0.05)
        } else if (type === 'click') {
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.type = 'sine'
          osc.frequency.setValueAtTime(450, now)
          osc.frequency.exponentialRampToValueAtTime(800, now + 0.05)
          osc.connect(gain)
          gain.connect(ctx.destination)
          gain.gain.setValueAtTime(0.1, now)
          gain.gain.linearRampToValueAtTime(0.01, now + 0.05)
          osc.start(now)
          osc.stop(now + 0.05)
        }
      } catch {
        /* audio no disponible */
      }
    },
    [getCtx],
  )

  const toggle = useCallback(() => setEnabled((v) => !v), [])

  return { enabled, toggle, play }
}
