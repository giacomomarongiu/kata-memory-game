
let cards = getRandomCards();
// console.log(cards);

// Trovo la mia lista
let ulElement = document.getElementById('card-list');
// console.log(ulElement);

//Inizializzo le carte che dovrò confrontare
let firstCard = null;
let secondCard = null;
let firstCardID = null;
let secondCardID = null;

let goalsCounter = 0;
let errorCounter = 0;
errorsCounter()


//Genero le carte
function getRandomCards(n) {
    if (n==null) {
        n=12
    } 
    // Array vuoto
    const cards = [];

    // Ciclo finché non ho 12 numeri diversi
    while (cards.length < n) {
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

        //Voglio che le mie immagini vadano solo da 0 a 5 (6 diverse immagini che si ripetono)
        let imgIndex = cards[i] % 6;

        // Creo un elemento immagine
        const img = document.createElement('img');
        // Appena stampato lo nascondo
        newLi.className = 'hidden_card'

        // Imposto l'attributo src dell'immagine
        img.setAttribute('src', `./assets/img/${imgIndex}.png`);

        // Ci scrivo il contenuto dell'array
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
    // const selectedCardID = event.target.id;
    //console.log(selectedCard);
    //console.log(selectedCardID);

    // Se non ho una carta selezionata
    if (firstCard === null) {

        //Assegno il valore del target a firstCard
        firstCard = selectedCard;
        //console.log('First Card:', firstCard);

        //Lo mostro
        firstCard.className = 'show'

    } else if (secondCard === null) {
        //In caso contrario lo assegno a secondCard
        secondCard = selectedCard;

        // Lo mostro
        //console.log('Second Card:', secondCard);

        //Faccio il confronto grazie alla funzione di Match
        if (matchYourCards()) {
            //Se sono uguali assegno la classe show 
            secondCard.className = 'show'

            firstCard.className = 'goal'
            secondCard.className = 'goal'

            //Reset delle carte selezionate
            firstCard = null;
            secondCard = null;
        } else {
            console.log(secondCard);
            // In caso contrario la mostro
            secondCard.className = 'show'
            firstCard.className = 'error'
            secondCard.className = 'error'

            //Dopo un secondo copro entrambe
            setTimeout(() => {
                firstCard.className = 'hidden_card'
                secondCard.className = 'hidden_card'

                //Reset delle carte selezionate
                firstCard = null;
                secondCard = null;
            }, 1000);
        }

    }
    successPage()
    console.log(errorCounter);
}

//Confronto i valori
function matchYourCards() {

    if (firstCard.innerHTML == secondCard.innerHTML) {
        goalsCounter++
        console.log("true", goalsCounter);
        return true
    } else {
        console.log("false");
        //Incremento il contatore degli errori
        errorCounter++
        errorsCounter()
        return false
    }

}

function errorsCounter() {
    let errorsElement = document.getElementById('errors_number')
    errorsElement.innerHTML = ''
    errorsElement.innerHTML = errorCounter
}

function successPage() {
    if (goalsCounter == (cards.length/2)) {
        console.log('Entra qui');
        let successPage = document.getElementsByClassName('modal_success')[0];
        successPage.classList.add('show_modal'); 
        createStars()
    }
}

function createStars() {
    const numStars = 40;
    const container = document.querySelector('.modal_content'); 

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.innerHTML = '<i class="fa-regular fa-star"></i>'
        star.classList.add('star');
        container.appendChild(star);

        // Calcola le coordinate x e y per posizionare la stellina in modo casuale all'interno del contenitore
        const x = Math.random() * container.clientWidth;
        const y = Math.random() * container.clientHeight;

        // Imposta le coordinate della stellina
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
    }
}

printOnDom();


// Seleziona i bottoni
const btn6 = document.getElementById('btn6');
const btn12 = document.getElementById('btn12');
const btn18 = document.getElementById('btn18');

// Aggiungi event listener per ciascun bottone
btn6.addEventListener('click', function () {
    // Ottieni e stampa il contenuto del bottone
    const content = this.textContent.trim(); // .trim() rimuove spazi bianchi all'inizio e alla fine
    console.log(`Hai selezionato: ${content}`);
    cards = getRandomCards(Number(content))
    ulElement.innerHTML = ''
    printOnDom();
});

btn12.addEventListener('click', function () {
    const content = this.textContent.trim();
    console.log(`Hai selezionato: ${content}`);
    cards = getRandomCards(Number(content))
    ulElement.innerHTML=''
    printOnDom();
});

btn18.addEventListener('click', function () {
    const content = this.textContent.trim();
    console.log(`Hai selezionato: ${content}`);

});
