
//- Creao un array al cui interno inserisco 12 numeri in ordine casuale diversi tra loro
function getRandomCards() {
    //Array vuoto
    const cards = [];

    //ciclo finché non ho 12 numeri diversi
    while (cards.length < 12) {
        
        //Genero un numero casuale tra 1 e 12
        const randomNumber = Math.floor(Math.random() * 12) + 1;
        
        //Se non è già presente lo aggiungo
        if (!cards.includes(randomNumber)) {
            cards.push(randomNumber);
        }
    }
    return cards;
}


let cards = getRandomCards()
//console.log(cards); 


//trovo la mia lista
let ulElement = document.getElementById('card-list')
//console.log(ulElement);


//Stampo nella dom i numeri
function printOnDom(){
    for (let i = 0; i < cards.length; i++) {

        //creo un nuovo li
        const newLi = document.createElement('li');
        //console.log(newLi);

        //ci scrivo il contenuto dell'array
        newLi.innerHTML= cards[i]

        //lo appiccico alla ul
        ulElement.append(newLi)

    }
}

printOnDom()