let preguntas = [

{
categoria:"🥗 Alimentación",
pregunta:"¿Cuál es el desayuno más saludable?",
respuestas:["Bollería","Refresco","Fruta y tostada","Chucherías"],
correcta:2,
reto:"🍎 Reto: Diseña en grupo un desayuno saludable."
},

{
categoria:"🏃 Actividad física",
pregunta:"¿Cuántos minutos de ejercicio se recomiendan al día?",
respuestas:["15","30","60","120"],
correcta:2,
reto:"🏃 Reto: 30 segundos de saltos en el sitio."
},

{
categoria:"📱 Pantallas",
pregunta:"¿Qué es recomendable antes de dormir?",
respuestas:[
"Usar móvil",
"Ver series",
"Apagar pantallas",
"Jugar videojuegos"
],
correcta:2,
reto:"📵 Reto: Anota cuánto tiempo usas el móvil al día."
},

{
categoria:"😴 Sueño",
pregunta:"¿Cuántas horas debería dormir un adolescente?",
respuestas:["5","6","8-10","12"],
correcta:2,
reto:"😴 Reto: Escribe 3 hábitos para dormir mejor."
}

]

let actual = 0
let puntos = 0

mostrarPregunta()

function mostrarPregunta(){

let p = preguntas[actual]

document.getElementById("categoria").innerText = p.categoria
document.getElementById("pregunta").innerText = p.pregunta

for(let i=0;i<4;i++){
document.getElementById("r"+i).innerText = p.respuestas[i]
}

let progreso = (actual/preguntas.length)*100
document.getElementById("progreso").style.width = progreso+"%"

document.getElementById("puntos").innerText = "Puntos: "+puntos
}

function responder(opcion){

let p = preguntas[actual]

if(opcion === p.correcta){

puntos++

document.getElementById("mensaje").innerHTML="✅ Correcto"
document.getElementById("reto").innerHTML=p.reto

}else{

document.getElementById("mensaje").innerHTML="❌ Incorrecto"
document.getElementById("reto").innerHTML="Reto sorpresa del profesor"

}

actual++

if(actual<preguntas.length){

setTimeout(()=>{
document.getElementById("mensaje").innerHTML=""
document.getElementById("reto").innerHTML=""
mostrarPregunta()
},4000)

}else{

document.querySelector(".tarjeta").innerHTML=
"<h2>🎉 Misión completada</h2><p>Puntuación: "+puntos+"</p>"

}

}
