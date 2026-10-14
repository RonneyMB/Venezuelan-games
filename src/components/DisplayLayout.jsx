import { useEffect, useState } from 'react'

export function WaitingForHost({ title = 'Esperando conexión con el anfitrión…' }) {
  return (
    <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-4 lg:gap-6 text-center p-6 lg:p-12 overflow-hidden">
      <i className="fa-solid fa-tv text-brand-green text-[clamp(3rem,min(8vw,14vh),7rem)] animate-pulse" />
      <h2 className="text-[clamp(1.5rem,min(4vw,7vh),3.4rem)] font-black text-brand-navy">{title}</h2>
      <p className="text-base lg:text-xl text-slate-500 max-w-2xl">
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
      <main className="flex-1 min-h-0 w-full min-w-0 flex flex-col overflow-hidden">{children}</main>

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