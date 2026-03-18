function obtenerRetoAleatorio(retoUsados = []) {
  const disponibles = retos.filter((_, i) => !retoUsados.includes(i));
  const base = disponibles.length ? disponibles : retos;
  return base[Math.floor(Math.random() * base.length)];
}

function obtenerPreguntaAleatoria(preguntasUsadas = []) {
  const disponibles = preguntas.filter((_, i) => !preguntasUsadas.includes(i));
  const base = disponibles.length ? disponibles : preguntas;
  return base[Math.floor(Math.random() * base.length)];
}
