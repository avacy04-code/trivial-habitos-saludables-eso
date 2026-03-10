let preguntas=[

{

pregunta:"¿Cuántos minutos de actividad física se recomiendan al día?",

respuestas:["20","30","60","120"],

correcta:2

},

{

pregunta:"¿Qué debemos hacer antes de hacer ejercicio?",

respuestas:["Dormir","Calentar","Comer dulces","Nada"],

correcta:1

},

{

pregunta:"¿Qué mejora la resistencia?",

respuestas:["Correr","Dormir","Videojuegos","Comer pizza"],

correcta:0

}

]

let actual=0

let puntos=0

function mostrarPregunta(){

let p=preguntas[actual]

document.getElementById("pregunta").innerText=p.pregunta

for(let i=0;i<4;i++){

document.getElementById("r"+i).innerText=p.respuestas[i]

}

iniciarTiempo()

}

function responder(opcion){

let p=preguntas[actual]

if(opcion===p.correcta){

puntos+=10

sonidoAcierto()

comprobarInsignias()

}else{

sonidoError()

}

document.getElementById("puntos").innerText=puntos

actual++

setTimeout(()=>{

if(actual<preguntas.length){

mostrarPregunta()

}else{

document.getElementById("pregunta").innerText="Juego terminado"

}

},3000)

}

function iniciarTiempo(){

let tiempo=10

let barra=document.getElementById("timer")

let contador=setInterval(()=>{

tiempo--

barra.style.width=(tiempo*10)+"%"

if(tiempo<=0){

clearInterval(contador)

actual++

if(actual<preguntas.length){

mostrarPregunta()

}

}

},1000)

}

mostrarPregunta()
