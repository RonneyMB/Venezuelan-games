// Contenido de los mini-juegos del COMODÍN de la Trivia 360NET

export const WILDCARD_TYPES = [
  {
    type: 'song',
    title: 'Completar la Canción',
    emoji: '🎵',
    description: 'Identifica la canción venezolana a partir de su verso.',
  },
  {
    type: 'saying',
    title: 'Refranes Venezolanos',
    emoji: '📜',
    description: 'Completa el refrán popular de la forma correcta.',
  },
  {
    type: 'truefalse',
    title: 'Verdadero o Falso',
    emoji: '✅',
    description: 'Decide si la afirmación sobre Venezuela es verdadera o falsa.',
  },
  {
    type: 'traditional',
    title: 'Juego Tradicional',
    emoji: '🪀',
    description: 'La mesa juega un juego tradicional venezolano en el escenario.',
  },
]

// 🎵 Canciones venezolanas: fragmento -> título correcto
export const WILDCARD_SONGS = [
  {
    fragment: '"Yo nací en esta ribera del Arauca vibrador..."',
    options: ['Alma Llanera', 'Caballo Viejo', 'Moliendo Café', 'El Becerrito'],
    correct: 0,
  },
  {
    fragment: '"Cuando el amor llega así de esta manera, uno no se da ni cuenta..."',
    options: ['El Becerrito', 'Caballo Viejo', 'Mi Burrito Sabanero', 'Ansiedad'],
    correct: 1,
  },
  {
    fragment: '"Cuando la tarde languidece, renacen las sombras..."',
    options: ['Luna de Margarita', 'Moliendo Café', 'Alma Llanera', 'Tonada de Luna Llena'],
    correct: 1,
  },
  {
    fragment: '"La vaca Mariposa tuvo un terné, un becerrito lindo como un bebé..."',
    options: ['El Becerrito', 'Mi Burrito Sabanero', 'Caballo Viejo', 'Pajarillo'],
    correct: 0,
  },
  {
    fragment: '"Con mi burrito sabanero voy camino de Belén..."',
    options: ['El Becerrito', 'Mi Burrito Sabanero', 'La Grey Zuliana', 'Tonada de Luna Llena'],
    correct: 1,
  },
  {
    fragment: '"Ansiedad de tenerte en mis brazos, musitando palabras de amor..."',
    options: ['Ansiedad', 'Luna de Margarita', 'Moliendo Café', 'Alma Llanera'],
    correct: 0,
  },
  {
    fragment: '"Tonada de luna llena, canta con tu melodía..."',
    options: ['Tonada de Luna Llena', 'Luna de Margarita', 'Alma Llanera', 'El Becerrito'],
    correct: 0,
  },
  {
    fragment: '"De la selva y la montaña, del llano y de la laguna..."',
    options: ['La Grey Zuliana', 'Alma Llanera', 'Venezuela', 'Moliendo Café'],
    correct: 1,
  },
]

// 📜 Refranes venezolanos: primera mitad -> complemento correcto
export const WILDCARD_SAYINGS = [
  {
    fragment: 'Camarón que se duerme...',
    options: [
      'se lo lleva la corriente',
      'pierde su camino',
      'no encuentra el mar',
      'se queda en la orilla',
    ],
    correct: 0,
  },
  {
    fragment: 'A quien madruga...',
    options: ['Dios le ayuda', 'el sol lo saluda', 'nadie lo despierta', 'el café lo espera'],
    correct: 0,
  },
  {
    fragment: 'Del dicho al hecho...',
    options: ['hay mucho trecho', 'no hay distancia', 'todo es perfecto', 'falta un trecho'],
    correct: 0,
  },
  {
    fragment: 'Más vale pájaro en mano...',
    options: ['que ciento volando', 'que dos volando', 'que paloma en el aire', 'que nada volando'],
    correct: 0,
  },
  {
    fragment: 'Al mal tiempo...',
    options: ['buena cara', 'buen abrigo', 'mejor esperar', 'poca ropa'],
    correct: 0,
  },
  {
    fragment: 'Quien mucho abarca...',
    options: ['poco aprieta', 'mucho gana', 'nada suelta', 'todo lo pierde'],
    correct: 0,
  },
  {
    fragment: 'En boca cerrada...',
    options: ['no entran moscas', 'no salen palabras', 'no hay secretos', 'no hay mentiras'],
    correct: 0,
  },
  {
    fragment: 'Más vale tarde...',
    options: ['que nunca', 'que temprano', 'que solo', 'que triste'],
    correct: 0,
  },
  {
    fragment: 'Cuando el río suena...',
    options: ['piedras trae', 'agua lleva', 'algo se acerca', 'el mar espera'],
    correct: 0,
  },
  {
    fragment: 'A buen entendedor...',
    options: [
      'pocas palabras bastan',
      'largas frases convienen',
      'buenos consejos sobran',
      'ninguna palabra falta',
    ],
    correct: 0,
  },
  {
    fragment: 'Ojos que no ven...',
    options: [
      'corazón que no siente',
      'la vida no comprende',
      'la mente no recuerda',
      'el alma no despierta',
    ],
    correct: 0,
  },
  {
    fragment: 'A caballo regalado...',
    options: [
      'no se le mira el diente',
      'no se le exige galope',
      'no se le pone silla',
      'no se le cambia el freno',
    ],
    correct: 0,
  },
  {
    fragment: 'El que con lobos anda...',
    options: ['a aullar se enseña', 'de noche se pierde', 'pronto se cansa', 'tarde regresa'],
    correct: 0,
  },
  {
    fragment: 'Dime de qué presumes...',
    options: [
      'y te diré de qué careces',
      'y sabré lo que vales',
      'y conozco tu pasado',
      'y adivino tu fortuna',
    ],
    correct: 0,
  },
]

// ✅ Verdadero o Falso sobre Venezuela
export const WILDCARD_TRUE_FALSE = [
  {
    statement: 'El Salto Ángel, la caída de agua más alta del mundo, está en el estado Bolívar.',
    correct: true,
  },
  { statement: 'La capital de Venezuela es Valencia.', correct: false },
  { statement: 'El cuatro venezolano es un instrumento de cuatro cuerdas.', correct: true },
  { statement: 'Venezuela tiene 20 estados.', correct: false },
  { statement: 'El turpial es el ave nacional de Venezuela.', correct: true },
  { statement: 'La orquídea es la flor nacional de Venezuela.', correct: true },
  { statement: 'El lago de Maracaibo es el lago más grande de Sudamérica.', correct: true },
  { statement: 'El araguaney es el árbol nacional de Venezuela.', correct: true },
  { statement: 'La bandera de Venezuela tiene 5 estrellas.', correct: false },
  {
    statement: 'El joropo es un género musical típico de los llanos venezolanos.',
    correct: true,
  },
  { statement: 'El Ávila también es conocido como Waraira Repano.', correct: true },
  {
    statement: 'La arepa venezolana se prepara principalmente con harina de trigo.',
    correct: false,
  },
  { statement: 'Venezuela limita con Chile.', correct: false },
  { statement: 'El lago Titicaca se encuentra en Venezuela.', correct: false },
]

// 🪀 Juegos tradicionales venezolanos (se juegan físicamente en el escenario)
export const WILDCARD_TRADITIONAL_GAMES = [
  {
    name: 'La Perinola',
    emoji: '🎲',
    description:
      'La mesa debe hacer girar la perinola sobre la mesa. Para superarlo, debe caer en "Toma todas" o "Toma 2".',
  },
]

export function pickWildcard(type, usedRef) {
  const pool =
    type === 'song'
      ? WILDCARD_SONGS
      : type === 'saying'
        ? WILDCARD_SAYINGS
        : type === 'traditional'
          ? WILDCARD_TRADITIONAL_GAMES
          : WILDCARD_TRUE_FALSE

  const used = usedRef.current[type] ?? []
  let available = pool.filter((item) => !used.includes(item))

  if (available.length === 0) {
    usedRef.current[type] = []
    available = pool
  }

  const item = available[Math.floor(Math.random() * available.length)]
  usedRef.current[type] = [...usedRef.current[type], item]
  return item
}
