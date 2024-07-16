
let cards = getRandomCards();
// console.log(cards);

// Trovo la mia lista
let ulElement = document.getElementById('card-list');
// console.log(ulElement);

//Inizializzo le carte che dovrò confrontare
let firstCard = null;
let secondCard = null;
let firstCardID = null;
let secondCardID= null;

let errorCounter = 0;

//Genero le carte
function getRandomCards() {
    // Array vuoto
    const cards = [];

    // Ciclo finché non ho 12 numeri diversi
    while (cards.length < 12) {
        // Genero un numero casuale tra 1 e 12
        const randomNumber = Math.floor(Math.random() * 12) + 1;

        // Se non è già presente lo aggiungo
        if (!cards.includes(randomNumber)) {
            cards.push(randomNumber);
        }
    }
    return cards;
}

// Stampo nella DOM i numeri
function printOnDom() {
    for (let i = 0; i < cards.length; i++) {
        // Creo un nuovo li
        const newLi = document.createElement('li');
        // console.log(newLi);

        // Aggiungo un ID unico
        newLi.id = `${i}`;

        //Voglio che le mie immagini vadano solo da 0 a 5
         let imgIndex= cards[i] % 6;

        // Creo un elemento immagine
        const img = document.createElement('img');
        img.className = 'hidden_card'

        // Imposto l'attributo src dell'immagine
        img.setAttribute('src', `./assets/img/${imgIndex}.png`);

        // Ci scrivo il contenuto dell'array
        //newLi.innerHTML = cards[i];
        newLi.appendChild(img)

        // Aggiungo l'event listener non anonimo
        newLi.addEventListener('click', canYouMatch);

        // Lo appiccico alla ul
        ulElement.append(newLi);
    }
}

// Funzione per gestire il clic su una carta
function canYouMatch(event) {
    const selectedCard = event.target;
    const selectedCardID = event.target.id;

    console.log(selectedCard);
    console.log(selectedCardID);


    if (firstCard === null) {
        firstCard = selectedCard;
        firstCardID = selectedCardID
        console.log('First Card:', firstCard);
        console.log('First Card ID:', firstCardID);
        //document.getElementById(firstCardID).style.color = 'red'
        selectedCard.className = 'show'

    } else if (secondCard === null) {
        secondCard = selectedCard;
        secondCardID = selectedCardID
        console.log('Second Card:', secondCard);
        console.log('Second Card ID:', secondCardID);

        if (matchYourCards()) {
            event.target.style.color = 'red'; 
        } else {
           // document.getElementById(firstCardID).style.color = 'black'
        }
            firstCard = null;
            secondCard = null
            checkedNumber = null
            firstCardID= null
            secondCardID= null

    }
    console.log(errorCounter);
}

//Confronto i valori
function matchYourCards() {

    if (firstCard == secondCard) {
        console.log("true");
        console.log();
        return true
    } else {
        console.log("false");
        //Incremento il contatore degli errori
        errorCounter++
        return false
    }

}


printOnDom();
