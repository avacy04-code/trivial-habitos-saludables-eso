let equipoSeleccionado=null

let ranking=[

{nombre:"Dragón",puntos:0},

{nombre:"Tigre",puntos:0},

{nombre:"Águila",puntos:0},

{nombre:"Tiburón",puntos:0}

]

function seleccionarEquipo(i){

equipoSeleccionado=i

alert("Equipo seleccionado: "+ranking[i].nombre)

}

function actualizarRanking(){

let html="<h2>Ranking</h2>"

ranking.sort((a,b)=>b.puntos-a.puntos)

ranking.forEach(e=>{

html+="<p>"+e.nombre+" : "+e.puntos+"</p>"

})

document.getElementById("ranking").innerHTML=html

}
