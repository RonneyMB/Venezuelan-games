import { useMemo, useState } from 'react'
import { VENEZUELAN_WORDS } from '../data/words.js'

export default function WordBank() {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const term = search.toLowerCase()
    return VENEZUELAN_WORDS.filter(
      (item) =>
        item.word.toLowerCase().includes(term) || item.category.toLowerCase().includes(term),
    )
  }, [search])

  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-brand-navy flex items-center gap-2">
            <i className="fa-solid fa-book-open text-brand-green" />
            <span>Banco de Mímicas Venezolanas (+100 Conceptos)</span>
          </h3>
          <p className="text-xs text-slate-500">
            Lista completa de expresiones, comida, lugares y cultura venezolana incluidos en el juego.
          </p>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar palabra o categoría..."
          className="px-4 py-2 border border-slate-300 rounded-xl text-sm w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-brand-green"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-[500px] overflow-y-auto p-1">
        {filtered.map((item) => (
          <div
            key={item.word}
            className="p-3 bg-slate-50 border border-slate-200 rounded-xl hover:border-brand-green transition-all"
          >
            <span className="text-[10px] font-black uppercase tracking-wider text-brand-green block mb-1">
              {item.category}
            </span>
            <span className="text-xs font-bold text-brand-navy leading-tight block">
              {item.word}
            </span>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-sm text-slate-400 py-6">
            No se encontraron conceptos para "{search}".
          </p>
        )}
      </div>
    </section>
  )
}
