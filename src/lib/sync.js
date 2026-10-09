import { useEffect, useState } from 'react'

/**
 * Lado HOST: emite el estado hacia las ventanas de proyección.
 * Usa BroadcastChannel (tiempo real) + localStorage (estado inicial/persistencia).
 * Solo emite cuando el contenido cambia (comparación por serialización).
 */
export function useGameBroadcast(channelName, state) {
  const serialized = JSON.stringify(state)

  useEffect(() => {
    let channel = null
    try {
      channel = new BroadcastChannel(channelName)
    } catch {
      channel = null
    }

    try {
      localStorage.setItem(channelName, serialized)
    } catch {
      /* localStorage no disponible */
    }

    channel?.postMessage({ type: 'state', state: JSON.parse(serialized) })
    return () => channel?.close()
  }, [channelName, serialized])
}

/**
 * Lado DISPLAY: recibe el estado emitido por el host.
 * Devuelve null hasta que llegue el primer estado.
 */
export function useGameDisplay(channelName) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(channelName)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    let channel = null
    try {
      channel = new BroadcastChannel(channelName)
    } catch {
      channel = null
    }

    const handleMessage = (event) => {
      if (event.data?.type === 'state') setState(event.data.state)
    }

    const handleStorage = (event) => {
      if (event.key === channelName && event.newValue) {
        try {
          setState(JSON.parse(event.newValue))
        } catch {
          /* dato inválido */
        }
      }
    }

    channel?.addEventListener('message', handleMessage)
    window.addEventListener('storage', handleStorage)

    return () => {
      channel?.removeEventListener('message', handleMessage)
      window.removeEventListener('storage', handleStorage)
      channel?.close()
    }
  }, [channelName])

  return state
}
