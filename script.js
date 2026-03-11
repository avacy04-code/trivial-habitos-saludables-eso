// VARIABLES DEL JUEGO

let actual = 0
let puntos = 0
let contador
let bloqueado = false
let equipoSeleccionado = null



// PREGUNTAS (puedes ampliar hasta 200)

let preguntas = [

{
pregunta:"¿Cuántos minutos de actividad física recomienda la OMS al día?",
respuestas:["30","45","60","90"],
correcta:2
},

{
pregunta:"¿Qué debemos hacer antes de una actividad física intensa?",
respuestas:["Dormir","Calentar","Comer dulces","Nada"],
correcta:1
},

{
pregunta:"¿Qué ejercicio mejora la resistencia?",
respuestas:["Correr","Dormir","Videojuegos","Ver televisión"],
correcta:0
},

{
pregunta:"¿Qué alimento es más saludable?",
respuestas:["Fruta","Bollería","Refrescos","Chucherías"],
correcta:0
}

]



// SELECCIONAR EQUIPO

function seleccionarEquipo(i){

equipoSeleccionado = i

alert("Equipo seleccionado: " + equipos[i].nombre)

actualizarRanking()

}



// MOSTRAR PREGUNTA

function mostrarPregunta(){

if(actual >= preguntas.length){

mostrarPodio()

return

}

let p = preguntas[actual]

document.getElementById("pregunta").innerText = p.pregunta

document.getElementById("timer").style.width = "100%"

for(let i=0;i<4;i++){

document.getElementById("r"+i).innerText = p.respuestas[i]

}

iniciarTiempo()

}



// RESPONDER

function responder(opcion){

if(bloqueado) return

bloqueado = true

clearInterval(contador)

let p = preguntas[actual]

if(opcion === p.correcta){

puntos += 10

if(equipoSeleccionado !== null){

equipos[equipoSeleccionado].puntos += 10

}

if(typeof sonidoAcierto === "function") sonidoAcierto()

comprobarInsignias()

}else{

if(typeof sonidoError === "function") sonidoError()

}

document.getElementById("puntos").innerText = puntos

actualizarRanking()

actual++

setTimeout(()=>{

bloqueado = false

mostrarPregunta()

},2000)

}



// TEMPORIZADOR

function iniciarTiempo(){

clearInterval(contador)

let tiempo = 10

let barra = document.getElementById("timer")

contador = setInterval(()=>{

tiempo--

barra.style.width = (tiempo*10)+"%"

if(tiempo <= 0){

clearInterval(contador)

actual++

mostrarPregunta()

}

},1000)

}



// INSIGNIAS

function comprobarInsignias(){

if(puntos >= 30){

document.getElementById("insignias").innerHTML += "🥗 Experto saludable<br>"

}

if(puntos >= 60){

document.getElementById("insignias").innerHTML += "🏃 Maestro del movimiento<br>"

}

if(puntos >= 100){

document.getElementById("insignias").innerHTML += "🏆 Super atleta<br>"

}

}



// PODIO FINAL

function mostrarPodio(){

equipos.sort((a,b)=>b.puntos-a.puntos)

let html = "<h2>🏆 PODIO FINAL</h2>"

html += "🥇 " + equipos[0].nombre + " - " + equipos[0].puntos + " pts<br>"
html += "🥈 " + equipos[1].nombre + " - " + equipos[1].puntos + " pts<br>"
html += "🥉 " + equipos[2].nombre + " - " + equipos[2].puntos + " pts<br>"

document.getElementById("pregunta").innerHTML = html

if(typeof sonidoVictoria === "function") sonidoVictoria()

}



// INICIAR JUEGO

mostrarPregunta()
