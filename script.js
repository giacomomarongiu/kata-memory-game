
let cards = getRandomCards();

// Trovo la mia lista
let ulElement = document.getElementById('card-list');


//Inizializzo le carte che dovrò confrontare
let firstCard = null;
let secondCard = null;
let goalsCounter = 0;
let errorCounter = 0;

//Inizializzo il conto degli errori
errorsCounter()


//Genero le carte
function getRandomCards(n) {
    if (n == null) {
        n = 12
    }
    // Array vuoto
    const cards = [];

    // Ciclo finché non ho 12 numeri diversi
    while (cards.length < n) {
        // Genero un numero casuale tra 1 e 12
        const randomNumber = Math.floor(Math.random() * n) + 1;

        // Se non è già presente lo aggiungo
        if (!cards.includes(randomNumber)) {
            cards.push(randomNumber);
        }
    }
    return cards;
}

// Stampo nella DOM i numeri
function printOnDom() {
    if (cards.length > 12) {
        hiddenClass = 'hidden_card hard-mode'
    } else {
        hiddenClass = 'hidden_card'
    }
    for (let i = 0; i < cards.length; i++) {
        // Creo un nuovo li
        const newLi = document.createElement('li');
        // console.log(newLi);

        // Aggiungo un ID unico
        newLi.id = `${i}`;

        //Voglio che le mie immagini vadano solo da 0 a 5 (6 diverse immagini che si ripetono)
        //console.log(cards.length);
        let imgIndex = cards[i] % (cards.length / 2);

        // Creo un elemento immagine
        const img = document.createElement('img');
        // Appena stampato lo nascondo
        newLi.className = hiddenClass

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
    let hardMode = ''
    if (cards.length > 12) {
        hardMode = 'hard-mode'
    }

    const selectedCard = event.target;
    const selectedImg = event.target;
    // Se non ho una carta selezionata
    if (firstCard === null) {
        console.log(selectedCard);
        //Assegno il valore del target a firstCard
        firstCard = selectedCard;

        //Lo mostro
        firstCard.className = `show ${hardMode}`

    } else if ((secondCard === null) && (selectedCard.parentElement != firstCard) && (selectedCard.id != firstCard.id)) {
        console.log(selectedCard.parentElement);
        //In caso contrario lo assegno a secondCard
        secondCard = selectedCard;
        console.log(firstCard);
        //Faccio il confronto grazie alla funzione di Match
        if (matchYourCards()) {
            //Se sono uguali assegno la classe show 
            secondCard.className = `show ${hardMode}`
            firstCard.className = `goal  ${hardMode}`
            secondCard.className = `goal  ${hardMode}`

            //Reset delle carte selezionate
            firstCard = null;
            secondCard = null;
        } else {
            // In caso contrario la mostro
            secondCard.className = `show ${hardMode}`
            firstCard.className = `error  ${hardMode}`
            secondCard.className = `error  ${hardMode}`

            //Dopo un secondo copro entrambe
            setTimeout(() => {
                firstCard.className = hiddenClass
                secondCard.className = hiddenClass

                //Reset delle carte selezionate
                firstCard = null;
                secondCard = null;
            }, 1000);
        }

    } else {
        firstCard.className = `error  ${hardMode}`
        //Dopo un secondo copro entrambe
        setTimeout(() => {
            firstCard.className = hiddenClass

            //Reset delle carte selezionate
            firstCard = null;
            secondCard = null;
        }, 1000);

    }
    successPage()
}

//Confronto i valori
function matchYourCards() {

    if (firstCard.querySelector('img').src === secondCard.querySelector('img').src) {
        goalsCounter++
        firstCard.removeEventListener('click', canYouMatch);
        secondCard.removeEventListener('click', canYouMatch);
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



btn18.addEventListener('click', function () {
    const content = this.textContent.trim();
    console.log(`Hai selezionato: ${content}`);
    cards = getRandomCards(Number(content))
    ulElement.innerHTML = ''
    printOnDom();
});





function errorsCounter() {
    let errorsElement = document.getElementById('errors_number')
    errorsElement.innerHTML = ''
    errorsElement.innerHTML = errorCounter
}

function successPage() {
    if (goalsCounter == (cards.length / 2)) {
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