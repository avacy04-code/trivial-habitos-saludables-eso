let equipos = [];
let tiempoTotalRestante = TIEMPO_TOTAL_SEGUNDOS;
let temporizadorTotal = null;
let temporizadorPregunta = null;
let partidaIniciada = false;

let rondaActual = 1;
let turnoEquipo = 0;
let preguntaActualTurno = 0;

function generarCamposEquipos() {
  const contenedor = document.getElementById("camposEquipos");
  const numero = parseInt(document.getElementById("numeroEquipos").value, 10) || 4;
  contenedor.innerHTML = "";

  for (let i = 1; i <= numero; i++) {
    const label = document.createElement("label");
    label.textContent = `Equipo ${i}`;

    const input = document.createElement("input");
    input.type = "text";
    input.id = `nombreEquipo${i}`;
    input.value = `Equipo ${i}`;

    contenedor.appendChild(label);
    contenedor.appendChild(input);
  }
}

function iniciarPartida() {
  const numero = parseInt(document.getElementById("numeroEquipos").value, 10) || 4;
  equipos = [];

  for (let i = 1; i <= numero; i++) {
    const nombre = document.getElementById(`nombreEquipo${i}`)?.value.trim() || `Equipo ${i}`;

    equipos.push({
      id: i,
      nombre,
      puntos: 0,
      retoActual: null,
      preguntaActual: null,
      respuestaBloqueada: true,
      retoUsados: [],
      preguntasUsadas: [],
      mensaje: "Preparado",
      doblePuntuacionDisponible: true,
      congelarTiempoDisponible: true,
      pasarPreguntaDisponible: true,
      robarPuntosDisponible: true,
      doblePuntuacionActiva: false,
      tiempoCongelado: false,
      tiempoPregunta: TIEMPO_POR_PREGUNTA
    });
  }

  partidaIniciada = true;
  tiempoTotalRestante = TIEMPO_TOTAL_SEGUNDOS;
  rondaActual = 1;
  turnoEquipo = 0;
  preguntaActualTurno = 0;

  document.getElementById("panelInicio").classList.add("oculto");
  document.getElementById("panelJuego").classList.remove("oculto");
  document.getElementById("panelFinal").classList.add("oculto");

  iniciarTemporizadorTotal();
  iniciarTurnoEquipoActual();
  renderTodo();
}

function equipoActual() {
  return equipos[turnoEquipo];
}

function iniciarTurnoEquipoActual() {
  const equipo = equipoActual();
  if (!equipo) return;
  preguntaActualTurno = 0;
  asignarNuevoReto(equipo);
  animarCambioTurno();
  renderTodo();
}

function asignarNuevoReto(equipo) {
  equipo.fase = "reto";
  equipo.retoActual = obtenerElementoUnico(retos, equipo.retoUsados, "texto");
  equipo.preguntaActual = null;
  equipo.respuestaBloqueada = true;
  equipo.tiempoPregunta = TIEMPO_POR_PREGUNTA;
  equipo.tiempoCongelado = false;
  equipo.doblePuntuacionActiva = false;
  equipo.mensaje = "Realiza el reto y pulsa “Reto superado”";
}

function asignarNuevaPregunta(equipo) {
  equipo.fase = "pregunta";
  equipo.preguntaActual = obtenerElementoUnico(preguntas, equipo.preguntasUsadas, "pregunta");
  equipo.respuestaBloqueada = false;
  equipo.tiempoPregunta = TIEMPO_POR_PREGUNTA;
  equipo.tiempoCongelado = false;
  equipo.mensaje = `Pregunta ${preguntaActualTurno} de ${PREGUNTAS_POR_TURNO}`;
  iniciarTemporizadorPregunta();
}

function obtenerElementoUnico(lista, usados, clave) {
  const disponibles = lista.filter((_, i) => !usados.includes(i));
  const pool = disponibles.length ? disponibles : lista;
  const elemento = pool[Math.floor(Math.random() * pool.length)];
  const indiceReal = lista.findIndex((x) => x[clave] === elemento[clave]);
  if (!usados.includes(indiceReal)) usados.push(indiceReal);
  return elemento;
}

function iniciarTemporizadorTotal() {
  clearInterval(temporizadorTotal);
  actualizarTiempoTotalUI();

  temporizadorTotal = setInterval(() => {
    tiempoTotalRestante--;
    actualizarTiempoTotalUI();
    if (tiempoTotalRestante <= 0) {
      clearInterval(temporizadorTotal);
      finalizarPartida();
    }
  }, 1000);
}

function actualizarTiempoTotalUI() {
  const min = Math.floor(tiempoTotalRestante / 60);
  const seg = tiempoTotalRestante % 60;
  document.getElementById("tiempoTotal").innerText =
    String(min).padStart(2, "0") + ":" + String(seg).padStart(2, "0");
}

function iniciarTemporizadorPregunta() {
  clearInterval(temporizadorPregunta);

  temporizadorPregunta = setInterval(() => {
    const equipo = equipoActual();
    if (!equipo || equipo.fase !== "pregunta") return;
    if (equipo.tiempoCongelado) return;

    equipo.tiempoPregunta--;

    if (equipo.tiempoPregunta <= 5 && equipo.tiempoPregunta > 0) {
      if (typeof sonidoTiempo === "function") sonidoTiempo();
    }

    renderTodo();

    if (equipo.tiempoPregunta <= 0) {
      clearInterval(temporizadorPregunta);
      equipo.respuestaBloqueada = true;
      equipo.mensaje = `⏰ Tiempo agotado. Correcta: ${equipo.preguntaActual.respuestas[equipo.preguntaActual.correcta]}`;
      flashError();
      setTimeout(() => siguientePreguntaOTurno(), 900);
    }
  }, 1000);
}

function renderTodo() {
  const equipo = equipoActual();
  if (!equipo) return;

  document.getElementById("rondaActualTexto").innerText = `${rondaActual}/${TOTAL_RONDAS}`;
  document.getElementById("equipoActualTexto").innerText = equipo.nombre;
  document.getElementById("nombreEquipoTurno").innerText = equipo.nombre;
  document.getElementById("puntosEquipoTurno").innerText = equipo.puntos;
  document.getElementById("rondaEquipoTurno").innerText = `${rondaActual}/${TOTAL_RONDAS}`;
  document.getElementById("preguntaTurnoTexto").innerText = `${preguntaActualTurno}/${PREGUNTAS_POR_TURNO}`;
  document.getElementById("tiempoPreguntaTexto").innerText =
    equipo.fase === "pregunta" ? `${equipo.tiempoPregunta}s` : "-";
  document.getElementById("mensajeTurno").innerText = equipo.mensaje;

  actualizarLider();
  actualizarRanking();
  actualizarEstadoGeneral();

  if (equipo.fase === "reto") {
    document.getElementById("faseActualTexto").innerText = "🎯 RETO";
    document.getElementById("categoriaActual").innerText = equipo.retoActual.categoria;
    document.getElementById("contenidoActual").innerHTML = `
      <img src="${equipo.retoActual.imagen}" class="imagen" alt="Reto">
      ${equipo.retoActual.texto}
    `;
    document.getElementById("botonesReto").style.display = "block";
    document.getElementById("botonesRespuesta").innerHTML = "";
    document.getElementById("comodinesBox").style.display = "none";
    document.getElementById("contenedorBarraTiempo").style.display = "none";
  } else {
    const porcentaje = Math.max(0, (equipo.tiempoPregunta / TIEMPO_POR_PREGUNTA) * 100);

    document.getElementById("faseActualTexto").innerText = "❓ PREGUNTA";
    document.getElementById("categoriaActual").innerText = equipo.preguntaActual.categoria;
    document.getElementById("contenidoActual").innerHTML = `
      <img src="${equipo.preguntaActual.imagen}" class="imagen" alt="Pregunta">
      ${equipo.preguntaActual.pregunta}
    `;
    document.getElementById("barraTiempoActual").style.width = `${porcentaje}%`;
    document.getElementById("contenedorBarraTiempo").style.display = "block";
    document.getElementById("botonesReto").style.display = "none";
    document.getElementById("comodinesBox").style.display = "grid";

    document.getElementById("botonesRespuesta").innerHTML =
      equipo.preguntaActual.respuestas.map((r, i) => `
        <button
          class="respuesta-btn ${claseColor(i)}"
          onclick="responderPregunta(${i})"
          ${equipo.respuestaBloqueada ? "disabled" : ""}
        >${r}</button>
      `).join("");
  }
}

function claseColor(i) {
  return ["rojo", "azul", "amarillo", "verde"][i] || "azul";
}

function superarReto() {
  const equipo = equipoActual();
  if (!equipo) return;

  equipo.puntos += PUNTOS_RETO;
  equipo.mensaje = `✅ Reto superado. +${PUNTOS_RETO} puntos`;
  if (typeof sonidoReto === "function") sonidoReto();
  flashAcierto();

  setTimeout(() => {
    preguntaActualTurno = 1;
    asignarNuevaPregunta(equipo);
    renderTodo();
  }, 600);

  renderTodo();
}

function cambiarRetoActual() {
  const equipo = equipoActual();
  if (!equipo) return;
  asignarNuevoReto(equipo);
  renderTodo();
}

function responderPregunta(opcion) {
  const equipo = equipoActual();
  if (!equipo || equipo.fase !== "pregunta" || equipo.respuestaBloqueada) return;

  clearInterval(temporizadorPregunta);
  equipo.respuestaBloqueada = true;

  const correcta = equipo.preguntaActual.correcta;
  const multiplicador = equipo.doblePuntuacionActiva ? 2 : 1;

  if (opcion === correcta) {
    const puntosGanados = PUNTOS_PREGUNTA * multiplicador;
    equipo.puntos += puntosGanados;
    equipo.mensaje = `✅ Correcta. +${puntosGanados} puntos`;
    if (typeof sonidoAcierto === "function") sonidoAcierto();
    flashAcierto();
  } else {
    equipo.mensaje = `❌ Incorrecta. Correcta: ${equipo.preguntaActual.respuestas[correcta]}`;
    if (typeof sonidoError === "function") sonidoError();
    flashError();
  }

  equipo.doblePuntuacionActiva = false;
  renderTodo();

  setTimeout(() => siguientePreguntaOTurno(), 1000);
}

function siguientePreguntaOTurno() {
  const equipo = equipoActual();
  if (!equipo) return;

  if (preguntaActualTurno < PREGUNTAS_POR_TURNO) {
    preguntaActualTurno++;
    asignarNuevaPregunta(equipo);
    renderTodo();
  } else {
    pasarAlSiguienteEquipo();
  }
}

function pasarAlSiguienteEquipo() {
  clearInterval(temporizadorPregunta);

  turnoEquipo++;

  if (turnoEquipo >= equipos.length) {
    turnoEquipo = 0;
    rondaActual++;
  }

  if (rondaActual > TOTAL_RONDAS) {
    finalizarPartida();
    return;
  }

  iniciarTurnoEquipoActual();
}

function usarDoblePuntuacion() {
  const equipo = equipoActual();
  if (!equipo || !equipo.doblePuntuacionDisponible || equipo.fase !== "pregunta" || equipo.respuestaBloqueada) return;

  equipo.doblePuntuacionDisponible = false;
  equipo.doblePuntuacionActiva = true;
  equipo.mensaje = "✨ Doble puntuación activada";
  if (typeof sonidoComodin === "function") sonidoComodin();
  renderTodo();
}

function usarCongelarTiempo() {
  const equipo = equipoActual();
  if (!equipo || !equipo.congelarTiempoDisponible || equipo.fase !== "pregunta" || equipo.respuestaBloqueada) return;

  equipo.congelarTiempoDisponible = false;
  equipo.tiempoCongelado = true;
  equipo.mensaje = "⏸ Tiempo congelado durante 5 segundos";
  if (typeof sonidoComodin === "function") sonidoComodin();
  renderTodo();

  setTimeout(() => {
    equipo.tiempoCongelado = false;
    equipo.mensaje = "⏱ El tiempo vuelve a correr";
    renderTodo();
  }, 5000);
}

function usarPasarPregunta() {
  const equipo = equipoActual();
  if (!equipo || !equipo.pasarPreguntaDisponible || equipo.fase !== "pregunta" || equipo.respuestaBloqueada) return;

  equipo.pasarPreguntaDisponible = false;
  equipo.doblePuntuacionActiva = false;
  clearInterval(temporizadorPregunta);
  equipo.mensaje = "⏭ Pregunta pasada sin penalización";
  if (typeof sonidoComodin === "function") sonidoComodin();
  renderTodo();

  setTimeout(() => siguientePreguntaOTurno(), 700);
}

function usarRobarPuntos() {
  const equipo = equipoActual();
  if (!equipo || !equipo.robarPuntosDisponible) return;

  const victimas = equipos.filter(e => e.id !== equipo.id && e.puntos > 0);
  if (!victimas.length) {
    equipo.mensaje = "💥 No hay equipos a los que robar";
    renderTodo();
    return;
  }

  const victima = victimas.sort((a, b) => b.puntos - a.puntos)[0];
  const robo = Math.min(PUNTOS_ROBO, victima.puntos);

  victima.puntos -= robo;
  equipo.puntos += robo;
  equipo.robarPuntosDisponible = false;
  equipo.mensaje = `💥 Has robado ${robo} puntos a ${victima.nombre}`;
  if (typeof sonidoComodin === "function") sonidoComodin();
  flashAcierto();
  renderTodo();
}

function actualizarRanking() {
  const clasificacion = [...equipos].sort((a, b) => b.puntos - a.puntos);
  let html = "";

  clasificacion.forEach((equipo, i) => {
    const icono = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : "🔹";
    html += `<div>${icono} ${equipo.nombre} — <strong>${equipo.puntos} pts</strong></div>`;
  });

  document.getElementById("ranking").innerHTML = html;
}

function actualizarEstadoGeneral() {
  let html = "";

  equipos.forEach((equipo, i) => {
    const estado = i === turnoEquipo
      ? (equipo.fase === "reto" ? "Jugando reto" : "Jugando preguntas")
      : "Esperando";

    html += `<div>${equipo.nombre}: ${estado} · ${equipo.puntos} pts</div>`;
  });

  document.getElementById("estadoGeneral").innerHTML = html;
}

function actualizarLider() {
  if (!equipos.length) return;
  const lider = [...equipos].sort((a, b) => b.puntos - a.puntos)[0];
  document.getElementById("liderActual").innerText = `${lider.nombre} (${lider.puntos} pts)`;
}

function reiniciarJuego() {
  clearInterval(temporizadorTotal);
  clearInterval(temporizadorPregunta);
  document.getElementById("panelFinal").classList.add("oculto");
  document.getElementById("panelJuego").classList.add("oculto");
  document.getElementById("panelInicio").classList.remove("oculto");
  detenerConfeti();
}

function finalizarPartida() {
  partidaIniciada = false;
  clearInterval(temporizadorTotal);
  clearInterval(temporizadorPregunta);

  document.getElementById("panelJuego").classList.add("oculto");
  document.getElementById("panelFinal").classList.remove("oculto");

  const clasificacion = [...equipos].sort((a, b) => b.puntos - a.puntos);
  const ganador = clasificacion[0];

  document.getElementById("ganadorFinal").innerHTML =
    ganador ? `👑 GANADOR: ${ganador.nombre} con ${ganador.puntos} puntos` : "";

  let html = "";
  if (clasificacion[0]) html += `<div>🥇 ${clasificacion[0].nombre} — ${clasificacion[0].puntos} pts</div>`;
  if (clasificacion[1]) html += `<div>🥈 ${clasificacion[1].nombre} — ${clasificacion[1].puntos} pts</div>`;
  if (clasificacion[2]) html += `<div>🥉 ${clasificacion[2].nombre} — ${clasificacion[2].puntos} pts</div>`;
  html += "<hr>";
  clasificacion.forEach((equipo, i) => {
    html += `<div>${i + 1}. ${equipo.nombre} — ${equipo.puntos} puntos</div>`;
  });

  document.getElementById("podioFinal").innerHTML = html;

  if (typeof sonidoVictoria === "function") sonidoVictoria();
  lanzarConfeti();
}

function flashAcierto() {
  const el = document.getElementById("flashAcierto");
  el.classList.remove("oculto", "visible");
  void el.offsetWidth;
  el.classList.add("visible");
}

function flashError() {
  const el = document.getElementById("flashError");
  el.classList.remove("oculto", "visible");
  void el.offsetWidth;
  el.classList.add("visible");
}

function animarCambioTurno() {
  const tarjeta = document.getElementById("zonaTurnoActual");
  tarjeta.classList.remove("cambio-turno");
  void tarjeta.offsetWidth;
  tarjeta.classList.add("cambio-turno");
}

let confetiAnimacion = null;
function lanzarConfeti() {
  const canvas = document.getElementById("confetiCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const piezas = Array.from({ length: 160 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * -canvas.height,
    w: 8 + Math.random() * 10,
    h: 10 + Math.random() * 14,
    dx: -2 + Math.random() * 4,
    dy: 2 + Math.random() * 5,
    color: ["#ef4444", "#3b82f6", "#22c55e", "#facc15", "#a855f7"][Math.floor(Math.random() * 5)]
  }));

  function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    piezas.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      if (p.y > canvas.height) p.y = -20;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.w, p.h);
    });
    confetiAnimacion = requestAnimationFrame(animar);
  }

  animar();
}

function detenerConfeti() {
  if (confetiAnimacion) cancelAnimationFrame(confetiAnimacion);
  const canvas = document.getElementById("confetiCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

generarCamposEquipos();
