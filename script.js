let equipos = [];
let turno = 0;
let ronda = 1;
let preguntaTurno = 0;
let tiempoPregunta = 20;
let timer = null;

function generarCamposEquipos(){
  let n = numeroEquipos.value;
  camposEquipos.innerHTML="";
  for(let i=0;i<n;i++){
    camposEquipos.innerHTML+=`<input id="eq${i}" value="Equipo ${i+1}">`;
  }
}

function iniciarPartida(){
  equipos=[];
  let n=numeroEquipos.value;

  for(let i=0;i<n;i++){
    equipos.push({
      nombre:document.getElementById("eq"+i).value,
      puntos:0,
      comodin50:true,
      doble:true,
      congelar:true,
      pasar:true
    });
  }

  panelInicio.classList.add("oculto");
  panelJuego.classList.remove("oculto");

  iniciarTurno();
}

function iniciarTurno(){
  let eq=equipos[turno];
  nombreEquipoTurno.innerText=eq.nombre;
  equipoActualTexto.innerText=eq.nombre;
  mostrarReto();
}

function mostrarReto(){
  let eq=equipos[turno];
  let r=retos[Math.floor(Math.random()*retos.length)];
  eq.reto=r;
  contenidoActual.innerText=r.texto;
}

function superarReto(){
  let eq=equipos[turno];
  eq.puntos+=PUNTOS_RETO;
  preguntaTurno=0;
  siguientePregunta();
}

function siguientePregunta(){
  let eq=equipos[turno];

  if(preguntaTurno>=5){
    siguienteEquipo();
    return;
  }

  let p=preguntas[Math.floor(Math.random()*preguntas.length)];
  eq.p=p;

  contenidoActual.innerText=p.pregunta;

  botonesRespuesta.innerHTML=p.respuestas.map((r,i)=>
    `<button class="respuesta-btn" onclick="responder(${i})">${r}</button>`
  ).join("");

  iniciarTimer();

  preguntaTurno++;
}

function iniciarTimer(){
  tiempoPregunta=TIEMPO_POR_PREGUNTA;
  clearInterval(timer);

  timer=setInterval(()=>{
    tiempoPregunta--;
    barraTiempo.style.width=(tiempoPregunta/TIEMPO_POR_PREGUNTA*100)+"%";

    if(tiempoPregunta<=0){
      clearInterval(timer);
      siguientePregunta();
    }
  },1000);
}

function responder(i){
  let eq=equipos[turno];
  clearInterval(timer);

  if(i===eq.p.correcta){
    eq.puntos+=PUNTOS_PREGUNTA;
    sonidoAcierto();
  }else{
    sonidoError();
  }

  setTimeout(siguientePregunta,800);
}

/* COMODINES */

function usar50(){
  let eq=equipos[turno];
  if(!eq.comodin50) return;

  eq.comodin50=false;

  let botones=document.querySelectorAll(".respuesta-btn");
  let correcta=eq.p.correcta;

  let malas=[];
  botones.forEach((b,i)=>{
    if(i!==correcta) malas.push(b);
  });

  malas.sort(()=>0.5-Math.random());
  malas.slice(0,2).forEach(b=>b.style.display="none");
}

function usarDoble(){ }
function usarCongelar(){ }
function usarPasar(){ }

/* SIGUIENTE */

function siguienteEquipo(){
  turno++;

  if(turno>=equipos.length){
    turno=0;
    ronda++;
  }

  if(ronda>10){
    final();
    return;
  }

  iniciarTurno();
}

function final(){
  panelJuego.classList.add("oculto");
  panelFinal.classList.remove("oculto");

  let ganador=equipos.sort((a,b)=>b.puntos-a.puntos)[0];
  ganadorFinal.innerText=ganador.nombre+" gana";
}

generarCamposEquipos();
