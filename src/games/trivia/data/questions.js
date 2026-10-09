// Banco de preguntas de la Trivia Venezolana 360NET (30 preguntas)
export const TRIVIA_QUESTIONS = [
  // CATEGORY 1: HISTORIA DE VENEZUELA
  {
    category: 'Historia de Venezuela',
    question: '¿En qué año se firmó el Acta de la Declaración de la Independencia de Venezuela?',
    options: ['1810', '1811', '1821', '1830'],
    correct: 1,
    explanation:
      'El Acta de la Independencia de Venezuela se firmó el 5 de julio de 1811, declarando la separación definitiva de la Corona Española.',
  },
  {
    category: 'Historia de Venezuela',
    question: '¿Cuál batalla selló definitivamente la independencia de Venezuela en 1821?',
    options: ['Batalla de Boyacá', 'Batalla de Pichincha', 'Batalla de Carabobo', 'Batalla de Ayacucho'],
    correct: 2,
    explanation:
      'La Batalla de Carabobo, librada el 24 de junio de 1821, fue la acción militar decisiva para la independencia del país.',
  },
  {
    category: 'Historia de Venezuela',
    question: "¿Quién es conocido como el 'Gran Mariscal de Ayacucho'?",
    options: ['Francisco de Miranda', 'Antonio José de Sucre', 'Rafael Urdaneta', 'José Antonio Páez'],
    correct: 1,
    explanation:
      'Antonio José de Sucre recibió el título de Gran Mariscal de Ayacucho tras su heroica victoria en Perú en 1824.',
  },
  {
    category: 'Historia de Venezuela',
    question: '¿En qué ciudad nació el Libertador Simón Bolívar?',
    options: ['Caracas', 'Valencia', 'Maracaibo', 'Ciudad Bolívar'],
    correct: 0,
    explanation: 'Simón Bolívar nació en Caracas el 24 de julio de 1783.',
  },
  {
    category: 'Historia de Venezuela',
    question: '¿Cuál fue el primer nombre dado a la ciudad de Caracas al momento de su fundación en 1567?',
    options: [
      'Santiago de León de Caracas',
      'Nuestra Señora de la Asunción',
      'San Francisco de Caracas',
      'Nueva Córdoba',
    ],
    correct: 0,
    explanation:
      'Diego de Losada la fundó con el nombre oficial de Santiago de León de Caracas el 25 de julio de 1567.',
  },
  {
    category: 'Historia de Venezuela',
    question: '¿Qué ilustre venezolano trajo la primera imprenta y la bandera tricolor a Venezuela en 1806?',
    options: ['Simón Rodríguez', 'Francisco de Miranda', 'Andrés Bello', 'José María Vargas'],
    correct: 1,
    explanation:
      'Francisco de Miranda trajo la primera imprenta al país y diseñó el pabellón tricolor en la expedición del Leander.',
  },
  {
    category: 'Historia de Venezuela',
    question: '¿En qué año ocurrió la Batalla Naval del Lago de Maracaibo?',
    options: ['1811', '1821', '1823', '1830'],
    correct: 2,
    explanation:
      'El 24 de julio de 1823 se libró la Batalla Naval del Lago de Maracaibo, expulsando al último reducto español.',
  },

  // CATEGORY 2: CULTURA GENERAL Y GEOGRAFÍA DE VENEZUELA
  {
    category: 'Cultura General',
    question: '¿Cuál es la caída de agua más alta del mundo, ubicada en el Estado Bolívar?',
    options: ['Salto Kukenan', 'Salto Ángel (Kerepakupai Vená)', 'Cataratas del Iguazú', 'Salto Aponguao'],
    correct: 1,
    explanation:
      'El Salto Ángel en el Parque Nacional Canaima es la cascada más alta del planeta con 979 metros de altura.',
  },
  {
    category: 'Cultura General',
    question: "¿En qué estado se encuentra el fenómeno meteorológico conocido como el 'Relámpago del Catatumbo'?",
    options: ['Falcón', 'Zulia', 'Mérida', 'Sucre'],
    correct: 1,
    explanation: 'El Relámpago del Catatumbo ocurre en la cuenca del Lago de Maracaibo, Estado Zulia.',
  },
  {
    category: 'Cultura General',
    question: '¿Cuál es el árbol nacional de Venezuela?',
    options: ['El Araguaney', 'El Samán', 'La Ceiba', 'El Bucare'],
    correct: 0,
    explanation:
      'El Araguaney (Handroanthus chrysanthus) fue declarado Árbol Nacional el 29 de mayo de 1948.',
  },
  {
    category: 'Cultura General',
    question: '¿Cuál es el ave nacional de Venezuela?',
    options: ['El Guacamayo Azul', 'El Turpial', 'El Colibrí', 'El Cóndor'],
    correct: 1,
    explanation:
      'El Turpial (Icterus icterus) fue proclamado Ave Nacional de Venezuela el 23 de mayo de 1958.',
  },
  {
    category: 'Cultura General',
    question: '¿Cuál es la flor nacional de Venezuela?',
    options: ['La Rosa', 'La Orquídea (Flor de Mayo)', 'El Girasol', 'La Cayenne'],
    correct: 1,
    explanation: 'La Orquídea Cattleya mossiae fue declarada Flor Nacional el 23 de mayo de 1951.',
  },
  {
    category: 'Cultura General',
    question: '¿En qué estado venezolano se ubica la histórica ciudad de Calabozo?',
    options: ['Cojedes', 'Guárico', 'Apure', 'Barinas'],
    correct: 1,
    explanation:
      'Calabozo es una importante e histórica ciudad colonial del Estado Guárico.',
  },
  {
    category: 'Cultura General',
    question: '¿Cómo se llama el instrumento musical de cuatro cuerdas típico del folclore venezolano?',
    options: ['Maraca', 'Cuatro', 'Bandola', 'Requinto'],
    correct: 1,
    explanation: 'El Cuatro venezolano es el instrumento emblemático de la música folclórica del país.',
  },

  // CATEGORY 3: COMIDA TÍPICA VENEZOLANA
  {
    category: 'Comida Típica',
    question: '¿Cuáles son los 4 ingredientes principales del Pabellón Criollo tradicional?',
    options: [
      'Arroz, carne mechada, caraotas negras y tajadas',
      'Arroz, pollo, lentejas y papas',
      'Carne asada, yuca, queso y aguacate',
      'Arepa, chicharrón, queso mano y mantequilla',
    ],
    correct: 0,
    explanation:
      'El Pabellón Criollo se compone tradicionalmente de arroz blanco, carne mechada, caraotas negras y tajadas de plátano maduro.',
  },
  {
    category: 'Comida Típica',
    question: '¿Cómo se le conoce popularmente a la arepa rellena con pollo desmechado, mayonesa y aguacate?',
    options: ['La Pelúa', 'La Catira', 'Reina Pepiada', 'Sifrina'],
    correct: 2,
    explanation:
      "La 'Reina Pepiada' fue creada en los años 50 en honor a Susana Duijm, primera Miss Mundo venezolana.",
  },
  {
    category: 'Comida Típica',
    question: '¿De qué ingrediente principal está hecha la Cachapa tradicional llanera?',
    options: ['Harina de trigo', 'Maíz tierno (choclo)', 'Yuca amarga', 'Plátano verde'],
    correct: 1,
    explanation:
      'La cachapa se elabora con masa de maíz tierno molido y dulce, cocinada a la plancha o budare.',
  },
  {
    category: 'Comida Típica',
    question: '¿Qué plato tradicional no puede faltar en la cena navideña venezolana?',
    options: ['Hallaca', 'Mondongo', 'Pisillo de Chigüire', 'Sancocho'],
    correct: 0,
    explanation:
      'La Hallaca es el plato navideño por excelencia en Venezuela, envuelta en hojas de plátano.',
  },
  {
    category: 'Comida Típica',
    question: '¿Cuál es la bebida dulce elaborada a base de arroz, leche y canela muy popular en Venezuela?',
    options: ['Carato de acupe', 'Chicha de arroz', 'Tizana', 'Papelón con limón'],
    correct: 1,
    explanation:
      'La Chicha venezolana de arroz es una bebida espesa y dulce que se sirve con hielo, leche condensada y canela.',
  },
  {
    category: 'Comida Típica',
    question: '¿Qué pasapalos rellenos de queso en masa de harina son indispensables en todas las fiestas venezolanas?',
    options: ['Empanaditas', 'Pastelitos', 'Tequeños', 'Mandocas'],
    correct: 2,
    explanation: 'El Tequeño es el pasapalo estrella de la gastronomía y las fiestas en Venezuela.',
  },

  // CATEGORY 4: DATOS CURIOSOS DE VENEZUELA
  {
    category: 'Datos Curiosos',
    question: '¿Cuál es el teleférico de pasajeros más alto y segundo más largo del mundo?',
    options: [
      'Teleférico de Caracas',
      'Teleférico Mukumbarí de Mérida',
      'Teleférico de Puerto Plata',
      'Teleférico de Quito',
    ],
    correct: 1,
    explanation:
      'El Teleférico Mukumbarí de Mérida alcanza los 4.765 metros sobre el nivel del mar en la estación Pico Espejo.',
  },
  {
    category: 'Datos Curiosos',
    question: '¿Qué importante científico venezolano inventó el bisturí de diamante?',
    options: ['Jacinto Convit', 'Humberto Fernández-Morán', 'Marcel Roche', 'Baruj Benacerraf'],
    correct: 1,
    explanation:
      'Dr. Humberto Fernández-Morán inventó el bisturí de diamante y contribuyó al desarrollo de la microscopía electrónica.',
  },
  {
    category: 'Datos Curiosos',
    question: '¿Qué médico venezolano desarrolló la vacuna contra la lepra?',
    options: [
      'Dr. Jacinto Convit',
      'Dr. José María Vargas',
      'Dr. José Gregorio Hernández',
      'Dr. Luis Razetti',
    ],
    correct: 0,
    explanation:
      'El Dr. Jacinto Convit es reconocido mundialmente por desarrollar la vacuna contra la lepra y la leishmaniasis.',
  },
  {
    category: 'Datos Curiosos',
    question: '¿Cuál es el lago más grande de Sudamérica ubicado en territorio venezolano?',
    options: ['Lago de Valencia', 'Lago de Maracaibo', 'Lago Titicaca', 'Embalse del Guri'],
    correct: 1,
    explanation: 'El Lago de Maracaibo, con más de 13.000 km², es el lago más grande de Sudamérica.',
  },
  {
    category: 'Datos Curiosos',
    question:
      '¿En qué parque nacional venezolano se encuentran las formaciones geológicas más antiguas del planeta (Tepuyes)?',
    options: [
      'Parque Nacional Henri Pittier',
      'Parque Nacional Canaima',
      'Parque Nacional Mochima',
      'Parque Nacional el Ávila',
    ],
    correct: 1,
    explanation:
      'Los tepuyes del Parque Nacional Canaima pertenecen al Escudo Guayanés, con más de 2.000 millones de años.',
  },

  // CATEGORY 5: ADIVINANZAS FOLCLÓRICAS Y DICHOS POPULARES
  {
    category: 'Adivinanzas y Dichos',
    question:
      "Adivinanza: 'Tengo verde el caparazón, roja la barriga y semillas negras en el corazón'. ¿Qué soy?",
    options: ['La Patilla (Sandía)', 'El Mango', 'La Guayaba', 'El Aguacate'],
    correct: 0,
    explanation: '¡La Patilla! Fruta muy fresca y popular en los llanos de Venezuela.',
  },
  {
    category: 'Adivinanzas y Dichos',
    question: "¿Qué significa el refrán venezolano: 'Tarde piaste pajarito'?",
    options: [
      'Llegar a tiempo a un evento',
      'Arrepentirse o reaccionar cuando ya es muy tarde',
      'Tener hambre por la tarde',
      'Comprar un ave de corral',
    ],
    correct: 1,
    explanation:
      'Se usa popularmente cuando alguien intenta remediar o disculparse por algo cuando el daño ya está hecho.',
  },
  {
    category: 'Adivinanzas y Dichos',
    question:
      "Adivinanza Llanera: 'Canta en la mata, no tiene pico, tiene cuatro patas y no es un mico'. ¿Qué es?",
    options: ['El Chigüire', 'La Rana / Charrascada', 'La Chigarra / Cigarra', 'La Grilla / Chigarra'],
    correct: 2,
    explanation: 'La chigarra (cigarra) muy célebre en la literatura y fauna de los llanos.',
  },
  {
    category: 'Adivinanzas y Dichos',
    question: "¿Qué significa en Venezuela la expresión popular: 'Estar chivo que no da leche'?",
    options: [
      'Estar muy alegre',
      'Estar de mal humor o atravesado',
      'Tener mucho dinero',
      'Estar cansado',
    ],
    correct: 1,
    explanation: 'Significa estar de mal genio, intratable o poco dispuesto a colaborar.',
  },
  {
    category: 'Adivinanzas y Dichos',
    question: "¿A qué se refiere un venezolano cuando dice que alguien es 'Más criollo que la arepa'?",
    options: [
      'Que es muy autóctono, propio y auténtico de Venezuela',
      'Que le gusta cocinar',
      'Que es de la capital',
      'Que es madrugador',
    ],
    correct: 0,
    explanation:
      'Es la máxima expresión para resaltar que algo o alguien posee una identidad 100% venezolana.',
  },
]
