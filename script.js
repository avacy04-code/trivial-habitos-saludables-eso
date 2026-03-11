let actual=0
let puntos=0
let contador
let equipoSeleccionado=null

function seleccionarEquipo(i){

equipoSeleccionado=i

alert("Equipo: "+equipos[i].nombre)

actualizarRanking()

}

function mostrarPregunta(){

if(actual>=preguntas.length){

mostrarPodio()

return

}

let p=preguntas[actual]

document.getElementById("pregunta").innerText=p.pregunta

for(let i=0;i<4;i++){

document.getElementById("r"+i).innerText=p.respuestas[i]

}

iniciarTiempo()

}

function responder(opcion){

clearInterval(contador)

let p=preguntas[actual]

if(opcion===p.correcta){

puntos+=10

equipos[equipoSeleccionado].puntos+=10

sonidoAcierto()

comprobarInsignias()

}else{

sonidoError()

}

document.getElementById("puntos").innerText=puntos

actualizarRanking()

actual++

setTimeout(mostrarPregunta,2000)

}

function iniciarTiempo(){

let tiempo=10

let barra=document.getElementById("timer")

contador=setInterval(()=>{

tiempo--

barra.style.width=(tiempo*10)+"%"

if(tiempo<=0){

clearInterval(contador)

actual++

mostrarPregunta()

}

},1000)

}

function comprobarInsignias(){

if(puntos>=30){

document.getElementById("insignias").innerHTML+="🥗 Experto saludable<br>"

}

}

function actualizarRanking(){

equipos.sort((a,b)=>b.puntos-a.puntos)

let html="🏆 Ranking<br>"

equipos.forEach((e,i)=>{

html+=(i+1)+". "+e.nombre+" "+e.puntos+" pts<br>"

})

document.getElementById("ranking").innerHTML=html

}

function mostrarPodio(){

equipos.sort((a,b)=>b.puntos-a.puntos)

document.getElementById("pregunta").innerHTML=

"🥇 "+equipos[0].nombre+"<br>"+
"🥈 "+equipos[1].nombre+"<br>"+
"🥉 "+equipos[2].nombre

}

mostrarPregunta()
