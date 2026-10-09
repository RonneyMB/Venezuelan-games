import { Link, Outlet, useLocation } from 'react-router-dom'

export default function Layout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-brand-navy">
      <header className="bg-brand-navy text-white shadow-lg sticky top-0 z-50 border-b-4 border-brand-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-4 group">
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                360NET, C.A.
              </h1>
              <div className="flex flex-wrap items-center gap-x-3 text-xs text-slate-300 font-medium mt-0.5">
                <span className="bg-brand-navy-light px-2 py-0.5 rounded text-brand-green font-mono font-bold border border-brand-green/30">
                  RIF: J-41234591-5
                </span>
              </div>
            </div>
          </Link>

          {!isHome ? (
            <Link
              to="/"
              className="bg-brand-navy-light hover:bg-slate-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 border border-slate-700 shrink-0"
            >
              <i className="fa-solid fa-arrow-left" />
              <span>Volver al Menú</span>
            </Link>
          ) : (
            <span className="text-xs font-bold text-slate-300 flex items-center gap-2 shrink-0">
              <i className="fa-solid fa-gamepad text-brand-green" /> Zona de Juegos
            </span>
          )}
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      <footer className="bg-brand-navy text-slate-400 py-4 text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="font-bold text-white">360NET, C.A.</span>
            <span className="text-brand-green font-mono">RIF: J-41234591-5</span>
          </div>
          <p>© 2026 360NET - Zona de Juegos Institucional</p>
        </div>
      </footer>
    </div>
  )
}
