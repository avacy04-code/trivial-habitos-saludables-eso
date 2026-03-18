function beep(frecuencia, duracion, tipo = "sine") {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    const contexto = new AudioContextClass();
    const oscilador = contexto.createOscillator();
    const ganancia = contexto.createGain();

    oscilador.type = tipo;
    oscilador.frequency.value = frecuencia;
    oscilador.connect(ganancia);
    ganancia.connect(contexto.destination);

    ganancia.gain.setValueAtTime(0.08, contexto.currentTime);
    oscilador.start();

    setTimeout(() => {
      oscilador.stop();
      contexto.close();
    }, duracion);
  } catch (e) {
    console.log("Audio no disponible");
  }
}

function sonidoAcierto() {
  beep(700, 120);
  setTimeout(() => beep(900, 140), 100);
}

function sonidoError() {
  beep(220, 250, "square");
}

function sonidoReto() {
  beep(500, 120);
  setTimeout(() => beep(650, 140), 110);
}

function sonidoVictoria() {
  beep(700, 120);
  setTimeout(() => beep(900, 120), 120);
  setTimeout(() => beep(1100, 200), 240);
}

function sonidoTiempo() {
  beep(280, 90, "triangle");
}

function sonidoComodin() {
  beep(480, 100);
  setTimeout(() => beep(760, 120), 100);
}
