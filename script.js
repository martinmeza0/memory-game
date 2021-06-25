const cartas = document.querySelectorAll('.card');
const aciertos = document.querySelector('.aciertos');
const incorrecto = document.querySelector('.incorrecto');
const cronometro = document.querySelector('.stopwatch');
const button = document.querySelector('#comenzar');

let CartaGirada = false;
//por defecto, el tablero estara bloqueado hasta que se pulse el boton
let TableroBloqueado = true;
let primeraCarta, segundaCarta;
let hayMatch = 0;
let noMatch = 0;

let hours = 0,
    minutes = 0,
    seconds = 0;

let displayHours = 0,
    displayMinutes = 0,
    displaySeconds = 0;

let interval = null;
let stoped = true;


//funcionamiento del reloj
const stopWatch = () => {
    seconds++;

    if (seconds / 60 === 1) {
        seconds = 0;
        minutes++;
        
        if(minutes / 60 === 1) {
            minutes = 0;
            hours++;
        }
    }   

    //Si solo tienen un solo digito (1 a 9), se le añade un 0 adelante del numero
    (seconds < 10) ? displaySeconds = "0"  + seconds.toString() : displaySeconds = seconds;
    (minutes < 10) ? displayMinutes = "0"  + minutes.toString() : displayMinutes = minutes;
    (hours < 10) ? displayHours = "0"  + hours.toString() : displayHours = Hours;
    

    cronometro.innerHTML = `${displayHours}:${displayMinutes}:${displaySeconds}`;
}

// empezar y detener el reloj
const startWatch = () => {
    if (stoped = true) {
        interval = window.setInterval(stopWatch, 1000);
        stoped = false;
        button.disabled = true;
        TableroBloqueado = false;
        return ;
    } 
}

function girarCarta () { 
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
const checkForMatch = () => {
    let Match = primeraCarta.dataset.match === segundaCarta.dataset.match;
    Match ? desabilitarCartas() : esconderCarta();  //Ternary Operator, un simplificador del if,  condition ? expr1(true) : expr2(false)
}

//desabilita las cartas que hayan tenido match
const desabilitarCartas = () =>{
    primeraCarta.removeEventListener('click', girarCarta);
    segundaCarta.removeEventListener('click', girarCarta);
    
    acertadas();
    resetearTablero();
}

//si no hay matching, se giran las cartas denuevo
const esconderCarta = () => {
    TableroBloqueado = true; //bloquea el tablero hasta que se haya completado la funcion
    setTimeout (() => {
        primeraCarta.classList.remove('flip');
        segundaCarta.classList.remove('flip');
        
        resetearTablero();
        desaciertos();
    }, 1500);
}

//Resetea el tablero
const resetearTablero = () => {
    [CartaGirada, TableroBloqueado] = [false, false];
    [primeraCarta, segundaCarta] = [null,null];
}

//si no hay match, se suman los errores
const desaciertos = () => {
    noMatch ++;
    incorrecto.innerHTML = "Jugadas incorrectas: " + noMatch;
}

//si hay par se cuentan puntos
const acertadas = () =>{
    hayMatch ++;
    aciertos.innerHTML = "Jugadas acertadas: " + hayMatch;
    ganaste();
}

const ganaste = () => {
    if (hayMatch === 6) {
        setTimeout(() => {
            alert(`¡Felicidades, tu tiemppo fue de: ${cronometro.innerHTML} !`);
        }, 600)
        TableroBloqueado = true;
        window.clearInterval(interval);
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
button.addEventListener('click', startWatch);
cartas.forEach(carta => carta.addEventListener('click', girarCarta));
    