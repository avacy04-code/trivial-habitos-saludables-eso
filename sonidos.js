let sonidoCorrecto=new Audio("sonidos/correcto.mp3")

let sonidoIncorrecto=new Audio("sonidos/incorrecto.mp3")

let sonidoReto=new Audio("sonidos/reto.mp3")

function sonidoAcierto(){

sonidoCorrecto.play()

}

function sonidoError(){

sonidoIncorrecto.play()

}

function sonidoRetoActivo(){

sonidoReto.play()

}
