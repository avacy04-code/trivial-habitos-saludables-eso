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
pregunta:"¿Qué actividad mejora la resistencia?",
respuestas:["Correr","Dormir","Videojuegos","Ver televisión"],
correcta:0
}
]

let actual=0
let puntos=0
let contador
let bloqueado=false

function mostrarPregunta(){

if(actual>=preguntas.length) return

let p=preguntas[actual]

document.getElementById("pregunta").innerText=p.pregunta
document.getElementById("timer").style.width="100%"

for(let i=0;i<4;i++){
document.getElementById("r"+i).innerText=p.respuestas[i]
}

iniciarTiempo()
}

function responder(opcion){

if(bloqueado) return
bloqueado=true

let p=preguntas[actual]

if(opcion===p.correcta){

puntos+=10

if(typeof sonidoAcierto==="function") sonidoAcierto()

comprobarInsignias()

}else{

if(typeof sonidoError==="function") sonidoError()

}

document.getElementById("puntos").innerText=puntos

actual++

setTimeout(()=>{

bloqueado=false

if(actual<preguntas.length){
mostrarPregunta()
}else{
document.getElementById("pregunta").innerHTML="🏆 Juego terminado<br>Puntuación: "+puntos
}

},3000)

}

function iniciarTiempo(){

clearInterval(contador)

let tiempo=10
let barra=document.getElementById("timer")

contador=setInterval(()=>{

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

function comprobarInsignias(){

if(puntos>=30){
document.getElementById("insignias").innerHTML+="🥗 Experto saludable<br>"
}

if(puntos>=60){
document.getElementById("insignias").innerHTML+="🏃 Maestro del movimiento<br>"
}

}

mostrarPregunta()
