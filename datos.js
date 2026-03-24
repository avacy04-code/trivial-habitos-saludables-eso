const TOTAL_RONDAS = 10;
const PREGUNTAS_POR_TURNO = 5;
const TIEMPO_TOTAL_SEGUNDOS = 1800; // 30 minutos
const TIEMPO_POR_PREGUNTA = 20;
const TIEMPO_POR_RETO = 45;
const PUNTOS_RETO = 20;
const PUNTOS_PREGUNTA = 10;

const retos = [
  { texto: "Colocad correctamente a una persona inconsciente que respira en posición lateral de seguridad.", imagen: "img/pls.jpg", categoria: "Emergencias" },
  { texto: "Representad cómo comprobar si una persona responde y respira con normalidad.", imagen: "img/rcp.jpg", categoria: "RCP" },
  { texto: "Simulad una llamada correcta al 112 indicando lugar, qué ocurre y estado de la víctima.", imagen: "img/112.jpg", categoria: "Emergencias" },
  { texto: "Representad cómo actuar ante una hemorragia externa aplicando presión directa.", imagen: "img/hemorragia.jpg", categoria: "Hemorragias" },
  { texto: "Simulad qué hacer ante una quemadura leve usando agua y protección adecuada.", imagen: "img/quemadura.jpg", categoria: "Quemaduras" },
  { texto: "Explicad cómo proteger la zona antes de socorrer a una persona herida.", imagen: "img/botiquin.jpg", categoria: "Emergencias" },
  { texto: "Representad qué hacer ante una posible lipotimia en clase o en el patio.", imagen: "img/botiquin.jpg", categoria: "Emergencias" },
  { texto: "Explicad qué hacer si sospecháis una fractura y cómo evitar empeorarla.", imagen: "img/fractura.jpg", categoria: "Traumatismos" },
  { texto: "Simulad la actuación básica ante un esguince usando reposo y frío protegido.", imagen: "img/esguince.jpg", categoria: "Traumatismos" },
  { texto: "Representad qué hacer ante una convulsión sin poner en peligro a la persona.", imagen: "img/convulsion.jpg", categoria: "Emergencias" }
];

const preguntas = [
  {
    pregunta: "¿Qué número debemos llamar en una emergencia en España?",
    respuestas: ["061", "112", "091", "010"],
    correcta: 1,
    imagen: "img/112.jpg",
    categoria: "Emergencias"
  },
  {
    pregunta: "Antes de ayudar, lo primero es...",
    respuestas: ["Asegurar la zona", "Mover a la víctima", "Dar agua", "Gritar"],
    correcta: 0,
    imagen: "img/botiquin.jpg",
    categoria: "Emergencias"
  },
  {
    pregunta: "Si una persona está inconsciente pero respira, debemos ponerla en...",
    respuestas: ["Posición lateral de seguridad", "Boca abajo", "De pie", "Sentada"],
    correcta: 0,
    imagen: "img/pls.jpg",
    categoria: "Emergencias"
  },
  {
    pregunta: "Ante una hemorragia externa, lo más correcto es...",
    respuestas: ["Presionar la herida", "Echar colonia", "Esperar", "Mover la herida"],
    correcta: 0,
    imagen: "img/hemorragia.jpg",
    categoria: "Hemorragias"
  },
  {
    pregunta: "Si una persona no responde y no respira con normalidad, hay que...",
    respuestas: ["Dar comida", "Llamar al 112 y comenzar RCP si se sabe", "Sentarla", "Taparla y esperar"],
    correcta: 1,
    imagen: "img/rcp.jpg",
    categoria: "RCP"
  },
  {
    pregunta: "En una quemadura leve, lo correcto es...",
    respuestas: ["Poner mantequilla", "Aplicar hielo directo", "Enfriar con agua", "Echar pasta de dientes"],
    correcta: 2,
    imagen: "img/quemadura.jpg",
    categoria: "Quemaduras"
  },
  {
    pregunta: "Si sospechamos una fractura, conviene...",
    respuestas: ["Mover la zona", "Inmovilizar y pedir ayuda", "Hacer correr", "Masajear fuerte"],
    correcta: 1,
    imagen: "img/fractura.jpg",
    categoria: "Traumatismos"
  },
  {
    pregunta: "La secuencia básica en primeros auxilios es...",
    respuestas: ["Proteger, avisar y socorrer", "Correr, mover y gritar", "Mirar y marcharse", "Socorrer, proteger y avisar"],
    correcta: 0,
    imagen: "img/botiquin.jpg",
    categoria: "Emergencias"
  },
  {
    pregunta: "Si alguien se marea, una actuación adecuada es...",
    respuestas: ["Sentarlo o tumbarlo y vigilar", "Hacerle correr", "Dejarle solo", "Darle refresco a la fuerza"],
    correcta: 0,
    imagen: "img/botiquin.jpg",
    categoria: "Emergencias"
  },
  {
    pregunta: "¿Qué información hay que dar al 112?",
    respuestas: ["Lugar, qué ha ocurrido y estado de la persona", "Solo el nombre", "Solo la edad", "Nada"],
    correcta: 0,
    imagen: "img/112.jpg",
    categoria: "Emergencias"
  },
  {
    pregunta: "Ante una convulsión, debemos...",
    respuestas: ["Sujetarlo con fuerza", "Meter algo en la boca", "Retirar objetos peligrosos y vigilar", "Darle agua"],
    correcta: 2,
    imagen: "img/convulsion.jpg",
    categoria: "Emergencias"
  },
  {
    pregunta: "Una norma básica al ayudar es...",
    respuestas: ["No ponerse en peligro", "Mover siempre a la víctima", "Hacerlo todo deprisa", "No avisar"],
    correcta: 0,
    imagen: "img/herida.jpg",
    categoria: "Emergencias"
  },
  {
    pregunta: "En una hemorragia nasal, conviene...",
    respuestas: ["Cabeza hacia atrás", "Presionar la nariz hacia delante", "Tumbar boca arriba", "Meter papel muy al fondo"],
    correcta: 1,
    imagen: "img/hemorragia.jpg",
    categoria: "Hemorragias"
  },
  {
    pregunta: "Ante un golpe fuerte en una articulación, puede ayudar...",
    respuestas: ["Aplicar frío protegido", "Aplicar fuego", "Seguir jugando", "Masajear muy fuerte"],
    correcta: 0,
    imagen: "img/esguince.jpg",
    categoria: "Traumatismos"
  },
  {
    pregunta: "Si una persona inconsciente respira, lo correcto es...",
    respuestas: ["Dejarla sola", "Posición lateral de seguridad", "Sentarla", "Moverla mucho"],
    correcta: 1,
    imagen: "img/pls.jpg",
    categoria: "Emergencias"
  },
  {
    pregunta: "Ante una quemadura, nunca debemos...",
    respuestas: ["Enfriar con agua", "Aplicar pasta de dientes", "Proteger la zona", "Retirar anillos si es posible"],
    correcta: 1,
    imagen: "img/quemadura.jpg",
    categoria: "Quemaduras"
  }
];
