function obtenerRetoAleatorio(retoUsados = []) {
  const disponibles = retos.filter((_, i) => !retoUsados.includes(i));
  const base = disponibles.length ? disponibles : retos;
  const reto = base[Math.floor(Math.random() * base.length)];
  return reto;
}

function obtenerPreguntaAleatoria(preguntasUsadas = []) {
  const disponibles = preguntas.filter((_, i) => !preguntasUsadas.includes(i));
  const base = disponibles.length ? disponibles : preguntas;
  const pregunta = base[Math.floor(Math.random() * base.length)];
  return pregunta;
}
