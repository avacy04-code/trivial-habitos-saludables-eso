let equipos = [];
let tiempoTotalRestante = TIEMPO_TOTAL_SEGUNDOS;
let temporizadorTotal = null;
let partidaIniciada = false;

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
      ronda: 1,
      fase: "reto",
      tiempoPregunta: TIEMPO_POR_PREGUNTA,
      retoActual: "",
      preguntaActual: null,
      respuestaBloqueada: true,
      temporizadorPregunta: null,
      retoUsados: [],
      preguntasUsadas: [],
      finalizado: false,
      mensaje: "Preparado"
    });
  }

  partidaIniciada = true;
  tiempoTotalRestante = TIEMPO_TOTAL_SEGUNDOS;

  document.getElementById("panelInicio").classList.add("oculto");
  document.getElementById("panelJuego").classList.remove("oculto");
  document.getElementById("panelFinal").classList.add("oculto");

  document.getElementById("maxRondasTexto").innerText = TOTAL_RONDAS;
  document.getElementById("totalEquiposTexto").innerText = equipos.length;

  iniciarTemporizadorTotal();
  iniciarEquipos();
  renderTodo();
}

function iniciarEquipos() {
  equipos.forEach((equipo) => {
    asignarNuevoReto(equipo);
  });
}

function asignarNuevoReto(equipo) {
  equipo.fase = "reto";
  equipo.retoActual = obtenerElementoUnico(retos, equipo.retoUsados);
  equipo.preguntaActual = null;
  equipo.respuestaBloqueada = true;
  equipo.tiempoPregunta = TIEMPO_POR_PREGUNTA;
  equipo.mensaje = "Realiza el reto y pulsa “Reto superado”";
}

function asignarNuevaPregunta(equipo) {
  equipo.fase = "pregunta";
  equipo.preguntaActual = obtenerElementoUnico(preguntas, equipo.preguntasUsadas);
  equipo.respuestaBloqueada = false;
  equipo.tiempoPregunta = TIEMPO_POR_PREGUNTA;
  equipo.mensaje = "Responde antes de que se acabe el tiempo";
  iniciarTemporizadorPregunta(equipo.id);
}

function obtenerElementoUnico(lista, usados) {
  const disponibles = lista.filter((_, i) => !usados.includes(i));
  const pool = disponibles.length ? disponibles : lista;
  const elemento = pool[Math.floor(Math.random() * pool.length)];
  const indiceReal = lista.findIndex((x) => JSON.stringify(x) === JSON.stringify(elemento));

  if (!usados.includes(indiceReal)) {
    usados.push(indiceReal);
  }

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

function iniciarTemporizadorPregunta(equipoId) {
  const equipo = equipos.find(e => e.id === equipoId);
  if (!equipo || equipo.finalizado) return;

  clearInterval(equipo.temporizadorPregunta);

  equipo.temporizadorPregunta = setInterval(() => {
    equipo.tiempoPregunta--;
    renderTodo();

    if (equipo.tiempoPregunta <= 0) {
      clearInterval(equipo.temporizadorPregunta);
      equipo.respuestaBloqueada = true;
      equipo.mensaje = `⏰ Tiempo agotado. Correcta: ${equipo.preguntaActual.respuestas[equipo.preguntaActual.correcta]}`;
      avanzarEquipo(equipo, false, true);
    }
  }, 1000);
}

function renderTodo() {
  renderTableroEquipos();
  actualizarRanking();
  actualizarEstadoGeneral();
}

function renderTableroEquipos() {
  const tablero = document.getElementById("tableroEquipos");
  tablero.className = "tablero-equipos tablero-" + equipos.length;

  let html = "";

  equipos.forEach((equipo) => {
    html += `
      <section class="tarjeta-equipo">
        <h2>${equipo.nombre}</h2>

        <div class="meta-equipo">
          <div class="meta-item">
            <span class="mini-etiqueta">Puntos</span>
            ${equipo.puntos}
          </div>
          <div class="meta-item">
            <span class="mini-etiqueta">Ronda</span>
            ${Math.min(equipo.ronda, TOTAL_RONDAS)}/${TOTAL_RONDAS}
          </div>
          <div class="meta-item">
            <span class="mini-etiqueta">Tiempo</span>
            ${equipo.fase === "pregunta" && !equipo.finalizado ? equipo.tiempoPregunta + "s" : "-"}
          </div>
        </div>

        <div class="fase-equipo">
          ${equipo.finalizado ? "🏁 Finalizado" : equipo.fase === "reto" ? "🎯 RETO" : "❓ PREGUNTA"}
        </div>

        <div class="contenido-equipo">
          ${equipo.finalizado
            ? "Este equipo ya ha completado todas sus rondas."
            : equipo.fase === "reto"
              ? equipo.retoActual
              : equipo.preguntaActual.pregunta}
        </div>

        ${
          equipo.finalizado
            ? ""
            : equipo.fase === "reto"
              ? `
                <div class="acciones">
                  <button class="btn principal" onclick="superarReto(${equipo.id})">✅ Reto superado</button>
                  <button class="btn secundario" onclick="cambiarReto(${equipo.id})">🔄 Cambiar reto</button>
                </div>
              `
              : `
                <div class="respuestas-equipo">
                  ${equipo.preguntaActual.respuestas.map((r, i) => `
                    <button
                      class="respuesta-btn ${claseColor(i)}"
                      onclick="responderEquipo(${equipo.id}, ${i})"
                      ${equipo.respuestaBloqueada ? "disabled" : ""}
                      id="eq${equipo.id}_r${i}"
                    >
                      ${r}
                    </button>
                  `).join("")}
                </div>
              `
        }

        <div class="mensaje-equipo">${equipo.mensaje}</div>
      </section>
    `;
  });

  tablero.innerHTML = html;
}

function claseColor(i) {
  return ["rojo", "azul", "amarillo", "verde"][i] || "azul";
}

function superarReto(equipoId) {
  const equipo = equipos.find(e => e.id === equipoId);
  if (!equipo || equipo.finalizado) return;

  equipo.puntos += PUNTOS_RETO;
  equipo.mensaje = `✅ Reto superado. +${PUNTOS_RETO} puntos`;
  if (typeof sonidoReto === "function") sonidoReto();

  setTimeout(() => {
    asignarNuevaPregunta(equipo);
    renderTodo();
  }, 400);

  renderTodo();
}

function cambiarReto(equipoId) {
  const equipo = equipos.find(e => e.id === equipoId);
  if (!equipo || equipo.finalizado) return;

  asignarNuevoReto(equipo);
  renderTodo();
}

function responderEquipo(equipoId, opcion) {
  const equipo = equipos.find(e => e.id === equipoId);
  if (!equipo || equipo.finalizado || equipo.fase !== "pregunta" || equipo.respuestaBloqueada) return;

  clearInterval(equipo.temporizadorPregunta);
  equipo.respuestaBloqueada = true;

  const correcta = equipo.preguntaActual.correcta;

  if (opcion === correcta) {
    equipo.puntos += PUNTOS_PREGUNTA;
    equipo.mensaje = `✅ Correcta. +${PUNTOS_PREGUNTA} puntos`;
    if (typeof sonidoAcierto === "function") sonidoAcierto();
    avanzarEquipo(equipo, true, false);
  } else {
    equipo.mensaje = `❌ Incorrecta. Correcta: ${equipo.preguntaActual.respuestas[correcta]}`;
    if (typeof sonidoError === "function") sonidoError();
    avanzarEquipo(equipo, false, false);
  }

  renderTodo();
}

function avanzarEquipo(equipo, acierto, agotadoTiempo) {
  setTimeout(() => {
    if (equipo.ronda >= TOTAL_RONDAS) {
      equipo.finalizado = true;
      equipo.fase = "final";
      equipo.mensaje = "🏁 Ha completado todas las rondas";
      renderTodo();
      comprobarFinGlobal();
      return;
    }

    equipo.ronda++;
    asignarNuevoReto(equipo);
    renderTodo();
  }, agotadoTiempo ? 1200 : 1000);
}

function actualizarRanking() {
  const clasificacion = [...equipos].sort((a, b) => b.puntos - a.puntos);

  let html = "";
  clasificacion.forEach((equipo, i) => {
    html += `<div>${i + 1}. ${equipo.nombre} — <strong>${equipo.puntos} pts</strong></div>`;
  });

  document.getElementById("ranking").innerHTML = html;
}

function actualizarEstadoGeneral() {
  let html = "";

  equipos.forEach((equipo) => {
    const estado = equipo.finalizado
      ? "Finalizado"
      : equipo.fase === "reto"
        ? "En reto"
        : "En pregunta";

    html += `<div>${equipo.nombre}: ${estado} · ronda ${Math.min(equipo.ronda, TOTAL_RONDAS)}/${TOTAL_RONDAS}</div>`;
  });

  document.getElementById("estadoGeneral").innerHTML = html;
}

function comprobarFinGlobal() {
  const todosFinalizados = equipos.every(e => e.finalizado);
  if (todosFinalizados) {
    finalizarPartida();
  }
}

function finalizarPartida() {
  partidaIniciada = false;
  clearInterval(temporizadorTotal);

  equipos.forEach((equipo) => {
    clearInterval(equipo.temporizadorPregunta);
  });

  document.getElementById("panelJuego").classList.add("oculto");
  document.getElementById("panelFinal").classList.remove("oculto");

  const clasificacion = [...equipos].sort((a, b) => b.puntos - a.puntos);

  let html = "";
  if (clasificacion[0]) html += `<div>🥇 ${clasificacion[0].nombre} — ${clasificacion[0].puntos} pts</div>`;
  if (clasificacion[1]) html += `<div>🥈 ${clasificacion[1].nombre} — ${clasificacion[1].puntos} pts</div>`;
  if (clasificacion[2]) html += `<div>🥉 ${clasificacion[2].nombre} — ${clasificacion[2].puntos} pts</div>`;

  html += `<hr>`;
  clasificacion.forEach((equipo, i) => {
    html += `<div>${i + 1}. ${equipo.nombre} — ${equipo.puntos} puntos</div>`;
  });

  document.getElementById("podioFinal").innerHTML = html;

  if (typeof sonidoVictoria === "function") {
    sonidoVictoria();
  }
}

function reiniciarJuego() {
  clearInterval(temporizadorTotal);

  equipos.forEach((equipo) => {
    clearInterval(equipo.temporizadorPregunta);
  });

  document.getElementById("panelFinal").classList.add("oculto");
  document.getElementById("panelJuego").classList.add("oculto");
  document.getElementById("panelInicio").classList.remove("oculto");
}

generarCamposEquipos();
