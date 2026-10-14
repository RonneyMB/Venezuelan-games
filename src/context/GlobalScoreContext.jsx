import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'incret-global-scores'

function loadTotals() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        const clean = {}
        for (const [id, value] of Object.entries(parsed)) {
          const n = Number(value)
          if (Number.isFinite(n)) clean[id] = n
        }
        return clean
      }
    }
  } catch {
    /* localStorage no disponible o corrupto */
  }
  return {}
}

const GlobalScoreContext = createContext(null)

export function GlobalScoreProvider({ children }) {
  const [totals, setTotals] = useState(loadTotals)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(totals))
    } catch {
      /* localStorage no disponible */
    }
  }, [totals])

  const totalOf = useCallback((id) => totals[id] ?? 0, [totals])

  const addPoints = useCallback((id, delta) => {
    if (!id || !delta) return
    setTotals((prev) => ({ ...prev, [id]: Math.max(0, (prev[id] ?? 0) + delta) }))
  }, [])

  const resetAll = useCallback(() => setTotals({}), [])

  const value = useMemo(
    () => ({ totals, totalOf, addPoints, resetAll }),
    [totals, totalOf, addPoints, resetAll],
  )

  return <GlobalScoreContext.Provider value={value}>{children}</GlobalScoreContext.Provider>
}

export function useGlobalScore() {
  const ctx = useContext(GlobalScoreContext)
  if (!ctx) throw new Error('useGlobalScore debe usarse dentro de GlobalScoreProvider')
  return ctx
}
