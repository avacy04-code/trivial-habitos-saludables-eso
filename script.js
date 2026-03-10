let preguntas=[

{
pregunta:"¿Cuántos minutos de actividad física se recomiendan al día?",
respuestas:["20","30","60","120"],
correcta:2,
reto:"🏃 RETO: 20 jumping jacks en equipo"
},

{
pregunta:"¿Qué músculo trabaja más en una sentadilla?",
respuestas:["Bíceps","Cuádriceps","Tríceps","Abdominales"],
correcta:1,
reto:"🏋️ RETO: 15 sentadillas correctamente"
},

{
pregunta:"¿Qué debemos hacer antes de hacer ejercicio?",
respuestas:["Dormir","Calentar","Comer chucherías","Sentarse"],
correcta:1,
reto:"🔥 RETO: 30 segundos de carrera en el sitio"
},

{
pregunta:"¿Cuál mejora la resistencia?",
respuestas:["Caminar","Correr","Estirarse","Dormir"],
correcta:1,
reto:"🏃‍♂️ RETO: circuito rápido alrededor del gimnasio"
}

]

let actual=0
let puntos=0
let tiempo=10

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

document.getElementById("reto").innerText=p.reto

}

document.getElementById("puntos").innerText=puntos

actual++

setTimeout(()=>{
document.getElementById("reto").innerText=""
if(actual<preguntas.length){
mostrarPregunta()
}else{
document.getElementById("pregunta").innerText="🎉 Juego terminado"
}
},4000)

}

function iniciarTiempo(){

tiempo=10

let contador=setInterval(()=>{

tiempo--

document.getElementById("tiempo").innerText=tiempo

if(tiempo==0){

clearInterval(contador)

actual++

if(actual<preguntas.length){
mostrarPregunta()
}

}

},1000)

}

mostrarPregunta()
