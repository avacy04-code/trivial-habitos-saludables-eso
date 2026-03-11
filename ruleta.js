let retos=[

"10 burpees",
"15 sentadillas",
"30 segundos plancha",
"20 jumping jacks",
"equilibrio 20 segundos",
"carrera hasta la pared y volver",
"10 flexiones",
"20 saltos de comba"

]

let girando=false

function girarRuleta(){

if(girando) return

girando=true

let ruleta=document.getElementById("ruleta")

let grados=Math.floor(Math.random()*360)+1440

ruleta.style.transform="rotate("+grados+"deg)"

setTimeout(()=>{

let sector=Math.floor((grados%360)/45)

let reto=retos[sector]

document.getElementById("reto").innerText="🎯 RETO: "+reto

girando=false

},4000)

}
