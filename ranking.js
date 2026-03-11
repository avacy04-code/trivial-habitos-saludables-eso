let equipos = [

{nombre:"Dragón", puntos:0},
{nombre:"Tigre", puntos:0},
{nombre:"Águila", puntos:0},
{nombre:"Tiburón", puntos:0}

]

function actualizarRanking(){

equipos.sort((a,b)=>b.puntos-a.puntos)

let html="🏆 RANKING<br>"

equipos.forEach((e,i)=>{

html+= (i+1)+". "+e.nombre+" - "+e.puntos+" pts<br>"

})

document.getElementById("ranking").innerHTML=html

}
