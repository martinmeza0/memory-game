const cards = document.querySelectorAll('.card');

let FlippedCard = false;
let LockBoard = false;
let firstCard, secondCard;

function FlipCard(){
    if(LockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');  //agrega la clase flip a los div.card que no tengan esta clase
    
    if (!FlippedCard) {
        //1° Click
        FlippedCard = true;
        firstCard = this;
        
        return; // if == true, return detendra la ejecucion de la funcion (2° Click), caso contrario, se ejecutara dicha funcion
    }
    //2° Click
    FlippedCard = false;
    secondCard = this;
    //Matching
    checkForMatch();
}

//si hay matching, las cartas quedan deshabilitadas
function checkForMatch(){
    let Match = firstCard.dataset.match === secondCard.dataset.match;
    Match ? disableCards() : unFlipCards();  //Ternary Operator, un simplificador del if,  condition ? expr1(true) : expr2(false)
}

//desabilita las cartas que hayan tenido match
function disableCards(){
    firstCard.removeEvenListener('click', FlipCard);
    secondCard.removeEvenListener('click', FlipCard);

    resetBoard();
}

//si no hay matching, se giran las cartas denuevo
function unFlipCards() {
    LockBoard = true; //bloquea el tablero hasta que se haya completado la funcion
    setTimeout (() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        
        resetBoard();
    }, 1500);
}

//Resetea el tablero
function resetBoard(){
    [FlippedCard, LockBoard] = [false, false];
    [firstCard, secondCard] = [null,null];
}

//reparte las cartas aleatoriamente
(function shuffleCards(){
    cards.forEach(card => {
        let RandomPos = Math.floor(Math.random()*12);
        card.style.order = RandomPos;
    });
})();

//por cada carta clickeada, se llamara a la funcion flipcard (girar carta)
cards.forEach(card => card.addEventListener('click', FlipCard));
    