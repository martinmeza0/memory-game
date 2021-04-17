const cartas = document.querySelectorAll('.card');
const aciertos = document.querySelector('.aciertos');
const incorrecto = document.querySelector('.incorrecto');
const cronometro = document.querySelector('.cronometro');

let CartaGirada = false;
let TableroBloqueado = false;
let primeraCarta, segundaCarta;
let hayMatch = 0;
let noMatch = 0;
let hours = `00`,
    minutes = `00`,
    seconds = `00`,
    chronometerCall;


function girarCarta(){
    if(TableroBloqueado) return;
    if(this === primeraCarta) return;

    this.classList.add('flip');  //agrega la clase flip a los div.card que no tengan esta clase
    
    if (!CartaGirada) {
        //1° Click
        CartaGirada = true;
        primeraCarta = this;
        
        return; // if == true, return detendra la ejecucion de la funcion (2° Click), caso contrario, se ejecutara dicha funcion
    }
    //2° Click
    CartaGirada = false;
    segundaCarta = this;
    //Matching
    checkForMatch();
}

//si hay matching, las cartas quedan deshabilitadas
function checkForMatch(){
    let Match = primeraCarta.dataset.match === segundaCarta.dataset.match;
    Match ? desabilitarCartas() : esconderCarta();  //Ternary Operator, un simplificador del if,  condition ? expr1(true) : expr2(false)
}

//desabilita las cartas que hayan tenido match
function desabilitarCartas(){
    primeraCarta.removeEventListener('click', girarCarta);
    segundaCarta.removeEventListener('click', girarCarta);
    
    acertadas();
    resetearTablero();
}

//si no hay matching, se giran las cartas denuevo
function esconderCarta() {
    TableroBloqueado = true; //bloquea el tablero hasta que se haya completado la funcion
    setTimeout (() => {
        primeraCarta.classList.remove('flip');
        segundaCarta.classList.remove('flip');
        
        resetearTablero();
        desaciertos();
    }, 1500);
}

//Resetea el tablero
function resetearTablero(){
    [CartaGirada, TableroBloqueado] = [false, false];
    [primeraCarta, segundaCarta] = [null,null];
}

//si no hay match, se suman los errores
function desaciertos(){
    noMatch ++;
    incorrecto.innerHTML = "Jugadas incorrectas: " + noMatch;
}

//si hay par se cuentan puntos
function acertadas(){
    hayMatch ++;
    aciertos.innerHTML = "Jugadas acertadas: " + hayMatch;
    ganaste();
}

function ganaste() {
    if (hayMatch === 6) {
        setTimeout(() => {
            alert("¡Felicidades, has ganado!");
        }, 600)
        TableroBloqueado = true;
    }
} 
//reparte las cartas aleatoriamente
(function repartirCartas(){
    cartas.forEach(carta => {
        let RandomPos = Math.floor(Math.random()*12);
        carta.style.order = RandomPos;
    });
})();

//por cada carta clickeada, se llamara a la funcion flipcard (girar carta)
cartas.forEach(carta => carta.addEventListener('click', girarCarta));
    