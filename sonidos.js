function beep(frecuencia, duracion) {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    const contexto = new AudioContextClass();
    const oscilador = contexto.createOscillator();
    const ganancia = contexto.createGain();

    oscilador.type = "sine";
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
  beep(700, 180);
}

function sonidoError() {
  beep(250, 220);
}

function sonidoReto() {
  beep(500, 180);
}

function sonidoVictoria() {
  beep(900, 350);
}
