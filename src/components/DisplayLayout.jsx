import { useEffect, useState } from 'react'

export function WaitingForHost({ title = 'Esperando conexión con el anfitrión…' }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center p-12">
      <i className="fa-solid fa-tv text-brand-green text-[clamp(4rem,8vw,8rem)] animate-pulse" />
      <h2 className="text-[clamp(2rem,4vw,4rem)] font-black text-brand-navy">{title}</h2>
      <p className="text-xl text-slate-500 max-w-2xl">
        Abre la pantalla desde el panel de gestión del juego con el botón{' '}
        <strong>📺 Abrir Pantalla</strong>.
      </p>
    </div>
  )
}

export default function DisplayLayout({ children }) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {})
    } else {
      document.exitFullscreen?.()
    }
  }

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-brand-bg text-brand-navy relative">
      <main className="flex-1 flex flex-col overflow-hidden min-h-0">{children}</main>

      <button
        onClick={toggleFullscreen}
        title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
        className="fixed bottom-4 right-4 z-50 w-11 h-11 rounded-full bg-brand-navy/50 hover:bg-brand-navy text-white flex items-center justify-center opacity-20 hover:opacity-100 transition"
      >
        <i className={`fa-solid ${isFullscreen ? 'fa-compress' : 'fa-expand'}`} />
      </button>
    </div>
  )
}
