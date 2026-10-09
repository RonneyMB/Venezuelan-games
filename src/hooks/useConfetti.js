import { useCallback } from 'react'
import confetti from 'canvas-confetti'

const BRAND_COLORS = ['#0E1B3E', '#75C124', '#F59E0B']

export function useConfetti() {
  const burst = useCallback((options = {}) => {
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 }, ...options })
  }, [])

  const celebrate = useCallback((options = {}) => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: BRAND_COLORS,
      ...options,
    })
  }, [])

  return { burst, celebrate, confetti }
}
