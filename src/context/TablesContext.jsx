import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'incret-tables'

const uid = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `t-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

const makeTable = (name) => ({ id: uid(), name })

const defaultTables = () => [
  makeTable('Mesa 1'),
  makeTable('Mesa 2'),
  makeTable('Mesa 3'),
  makeTable('Mesa 4'),
]

function loadTables() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
          .filter((t) => t && t.id && t.name)
          .map((t) => ({ id: String(t.id), name: String(t.name) }))
      }
    }
  } catch {
    /* localStorage no disponible o corrupto */
  }
  return defaultTables()
}

const TablesContext = createContext(null)

export function TablesProvider({ children }) {
  const [tables, setTables] = useState(loadTables)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tables))
    } catch {
      /* localStorage no disponible */
    }
  }, [tables])

  const addTable = useCallback((name) => {
    setTables((prev) => {
      const trimmed = name?.trim()
      const nextName = trimmed || `Mesa ${prev.length + 1}`
      return [...prev, makeTable(nextName)]
    })
  }, [])

  const removeTable = useCallback((id) => {
    setTables((prev) => (prev.length > 1 ? prev.filter((t) => t.id !== id) : prev))
  }, [])

  const renameTable = useCallback((id, name) => {
    setTables((prev) => prev.map((t) => (t.id === id ? { ...t, name } : t)))
  }, [])

  const resetTables = useCallback(() => setTables(defaultTables()), [])

  const value = { tables, addTable, removeTable, renameTable, resetTables }

  return <TablesContext.Provider value={value}>{children}</TablesContext.Provider>
}

export function useTables() {
  const ctx = useContext(TablesContext)
  if (!ctx) throw new Error('useTables debe usarse dentro de TablesProvider')
  return ctx
}
