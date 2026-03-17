const TOTAL_RONDAS = 10;
const TIEMPO_TOTAL_SEGUNDOS = 600;
const TIEMPO_POR_PREGUNTA = 20;
const PUNTOS_RETO = 20;
const PUNTOS_PREGUNTA = 10;

const retos = [
  "Colocad correctamente a una persona inconsciente que respira en posición lateral de seguridad.",
  "Representad cómo comprobar si una persona responde y respira con normalidad.",
  "Simulad una llamada correcta al 112 indicando lugar, qué ocurre y estado de la víctima.",
  "Representad cómo actuar ante una hemorragia externa aplicando presión directa.",
  "Simulad qué hacer ante una quemadura leve usando agua y protección adecuada.",
  "Explicad cómo proteger la zona antes de socorrer a una persona herida.",
  "Representad qué hacer ante una posible lipotimia en clase o en el patio.",
  "Explicad qué hacer si sospecháis una fractura y cómo evitar empeorarla.",
  "Simulad la actuación básica ante un esguince usando reposo y frío protegido.",
  "Representad qué información importante hay que dar a emergencias al pedir ayuda.",
  "Escenificad la conducta correcta ante una persona que tiene dificultad para respirar.",
  "Simulad la actuación adecuada ante una convulsión sin poner en peligro a la víctima."
];

const preguntas = [
  {
    pregunta: "¿Qué número debemos llamar en una emergencia en España?",
    respuestas: ["061", "112", "091", "010"],
    correcta: 1
  },
  {
    pregunta: "Antes de ayudar, lo primero es...",
    respuestas: ["Asegurar la zona", "Mover a la víctima", "Dar agua", "Gritar"],
    correcta: 0
  },
  {
    pregunta: "Si una persona está inconsciente pero respira, debemos ponerla en...",
    respuestas: ["Posición lateral de seguridad", "Boca abajo", "De pie", "Sentada"],
    correcta: 0
  },
  {
    pregunta: "Ante una hemorragia externa, lo más correcto es...",
    respuestas: ["Presionar la herida", "Echar colonia", "Esperar", "Mover la herida"],
    correcta: 0
  },
  {
    pregunta: "Si una persona no responde y no respira con normalidad, hay que...",
    respuestas: ["Dar comida", "Llamar al 112 y comenzar RCP si se sabe", "Sentarla", "Taparla y esperar"],
    correcta: 1
  },
  {
    pregunta: "En una quemadura leve, lo correcto es...",
    respuestas: ["Poner mantequilla", "Aplicar hielo directo", "Enfriar con agua", "Echar pasta de dientes"],
    correcta: 2
  },
  {
    pregunta: "Si sospechamos una fractura, conviene...",
    respuestas: ["Mover la zona", "Inmovilizar y pedir ayuda", "Hacer correr", "Masajear fuerte"],
    correcta: 1
  },
  {
    pregunta: "La secuencia básica en primeros auxilios es...",
    respuestas: ["Proteger, avisar y socorrer", "Correr, mover y gritar", "Mirar y marcharse", "Socorrer, proteger y avisar"],
    correcta: 0
  },
  {
    pregunta: "Si alguien se marea, una actuación adecuada es...",
    respuestas: ["Sentarlo o tumbarlo y vigilar", "Hacerle correr", "Dejarle solo", "Darle refresco a la fuerza"],
    correcta: 0
  },
  {
    pregunta: "¿Qué información hay que dar al 112?",
    respuestas: ["Lugar, qué ha ocurrido y estado de la persona", "Solo el nombre", "Solo la edad", "Nada"],
    correcta: 0
  },
  {
    pregunta: "Ante una convulsión, debemos...",
    respuestas: ["Sujetarlo con fuerza", "Meter algo en la boca", "Retirar objetos peligrosos y vigilar", "Darle agua"],
    correcta: 2
  },
  {
    pregunta: "Si una persona tiene una herida pequeña, es mejor...",
    respuestas: ["Lavarse las manos y limpiarla", "Echar arena", "Tocarla mucho", "No hacer nada"],
    correcta: 0
  },
  {
    pregunta: "Ante un posible atragantamiento grave, hay que...",
    respuestas: ["Esperar", "Dar agua", "Actuar de inmediato y pedir ayuda", "Tumbarlo sin más"],
    correcta: 2
  },
  {
    pregunta: "Una norma básica al ayudar es...",
    respuestas: ["No ponerse en peligro", "Mover siempre a la víctima", "Hacerlo rápido sin pensar", "No avisar a nadie"],
    correcta: 0
  },
  {
    pregunta: "Si hay posible lesión de cuello o espalda, lo mejor es...",
    respuestas: ["Evitar mover a la persona salvo peligro", "Sentarla", "Levantarla rápido", "Hacerla caminar"],
    correcta: 0
  },
  {
    pregunta: "En una hemorragia nasal, conviene...",
    respuestas: ["Cabeza hacia atrás", "Presionar la nariz suavemente hacia delante", "Tumbar boca arriba", "Meter papel muy al fondo"],
    correcta: 1
  },
  {
    pregunta: "Ante un golpe fuerte en una articulación, puede ayudar...",
    respuestas: ["Aplicar frío protegido", "Aplicar fuego", "Seguir jugando", "Masajear muy fuerte"],
    correcta: 0
  },
  {
    pregunta: "¿Qué material ayuda a proteger una herida?",
    respuestas: ["Gasa limpia", "Tierra", "Perfume", "Papel sucio"],
    correcta: 0
  },
  {
    pregunta: "La RCP debe iniciarse cuando la persona...",
    respuestas: ["Respira normal", "No responde y no respira normal", "Está dormida", "Tiene calor"],
    correcta: 1
  },
  {
    pregunta: "En primeros auxilios escolares, lo más importante es...",
    respuestas: ["Actuar con seguridad y sentido común", "Mover siempre al herido", "No avisar a nadie", "Correr mucho"],
    correcta: 0
  }
];
