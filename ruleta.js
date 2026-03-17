function obtenerRetoAleatorio() {
  const indice = Math.floor(Math.random() * retos.length);
  return retos[indice];
}
