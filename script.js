// PREGUNTAS DEL JUEGO

let preguntas = [

{
pregunta: "¿Cuántos minutos de actividad física se recomiendan al día?",
respuestas: ["20", "30", "60", "120"],
correcta: 2
},

{
pregunta: "¿Qué debemos hacer antes de hacer ejercicio?",
respuestas: ["Dormir", "Calentar", "Comer dulces", "Nada"],
correcta: 1
},

{
pregunta: "¿Qué actividad mejora la resistencia?",
respuestas: ["Correr", "Dormir", "Videojuegos", "Ver televisión"],
correcta: 0
},

{
pregunta: "¿Qué alimento es más saludable?",
respuestas: ["Fruta", "Chucherías", "Refrescos", "Bollería"],
correcta: 0
}

]

// VARIABLES DEL JUEGO

let actual = 0
let puntos = 0



// MOSTRAR PREGUNTA

function mostrarPregunta(){

let p = preguntas[actual]

document.getElementById("pregunta").innerText = p.pregunta

for(let i=0;i<4;i++){

document.getElementById("r"+i).innerText = p.respuestas[i]

}

iniciarTiempo()

}



// RESPONDER PREGUNTA

function responder(opcion){

let p = preguntas[actual]

if(opcion === p.correcta){

puntos = puntos + 10

sonidoAcierto()

comprobarInsignias()

}else{

sonidoError()

}

document.getElementById("puntos").innerText = puntos

actual++

setTimeout(function(){

if(actual < preguntas.length){

mostrarPregunta()

}else{

document.getElementById("pregunta").innerText = "🎉 Juego terminado"

}

},3000)

}



// TEMPORIZADOR VISUAL

function iniciarTiempo(){

let tiempo = 10

let barra = document.getElementById("timer")

let contador = setInterval(function(){

tiempo--

barra.style.width = (tiempo*10) + "%"

if(tiempo <= 0){

clearInterval(contador)

actual++

if(actual < preguntas.length){

mostrarPregunta()

}

}

},1000)

}



// SISTEMA DE INSIGNIAS

function comprobarInsignias(){

if(puntos >= 30){

document.getElementById("insignias").innerHTML += "🥗 Experto en hábitos saludables<br>"

}

if(puntos >= 60){

document.getElementById("insignias").innerHTML += "🏃 Maestro del movimiento<br>"

}

if(puntos >= 100){

document.getElementById("insignias").innerHTML += "🏆 Super atleta saludable<br>"

}

}



// INICIAR JUEGO

mostrarPregunta()
