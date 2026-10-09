import GameCard from '../components/GameCard.jsx'
import TablesPanel from '../components/TablesPanel.jsx'

export default function HomePage() {
  return (
    <div className="flex-1 w-full">
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 bg-brand-green/15 text-brand-green text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider border border-brand-green/30">
            <i className="fa-solid fa-trophy text-amber-400" /> Zona de Juegos 360NET
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl font-black text-brand-navy leading-tight">
            Elige tu <span className="text-brand-green">desafío</span> venezolano
          </h1>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            Cuatro juegos interactivos: trivia por mesas, torneo de mímicas, geografía de Venezuela
            y un mini-torneo de juegos tradicionales. Selecciona uno para comenzar.
          </p>
        </div>

        <div className="mb-10">
          <TablesPanel />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <GameCard
            to="/trivia"
            emoji="🎲"
            accent="green"
            title="Trivia Venezolana"
            description="30 preguntas de historia, cultura y comida típica. Las mesas compiten por turnos con un temporizador de 15 segundos por pregunta."
            meta={['Por turnos', '30 preguntas', 'Panel Host']}
          />
          <GameCard
            to="/mimicas"
            emoji="🎭"
            accent="blue"
            title="Torneo de Mímicas"
            description="Cada mesa juega un turno de 7 minutos para adivinar la mayor cantidad de conceptos venezolanos. Gana la mesa con más aciertos."
            meta={['7 min / turno', '+100 palabras', 'Ranking']}
          />
          <GameCard
            to="/capitales"
            emoji="🗺️"
            accent="amber"
            title="Capitales de Venezuela"
            description="Observa el estado resaltado en el mapa e ingresa el nombre de su capital. Modos de práctica libre o contrarreloj de 3 minutos."
            meta={['24 estados', 'Práctica / Contrarreloj', 'Mapa SVG']}
          />
          <GameCard
            to="/tradicional"
            emoji="🪀"
            accent="blue"
            title="Juegos Tradicionales"
            description="Mini-torneo donde las mesas se enfrentan al azar, todas contra todas a 2 vueltas, en juegos tradicionales. Gana la mesa con más puntos."
            meta={['Todos vs Todos', '2 vueltas', 'La Perinola']}
          />
        </div>

        <div className="mt-10 bg-brand-navy rounded-3xl p-6 sm:p-8 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl sm:text-2xl font-black">¿Listo para el reto?</h3>
            <p className="text-slate-300 text-sm mt-2">
              Los puntajes se manejan en vivo. Ideal para eventos, reuniones y dinámicas de equipo de
              360NET, C.A.
            </p>
          </div>
          <i className="fa-solid fa-dice absolute -right-4 -bottom-6 text-brand-green/20 text-9xl" />
        </div>
      </section>
    </div>
  )
}
