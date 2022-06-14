/*L'utente indica un livello di difficoltà (con un prompt) in base al quale decidiamo il range di numeri possibili del gioco:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.

In seguito attraverso dei prompt l'utente inserisce un numero alla volta finché il gioco non è finito:
se il numero è presente nella lista dei numeri generati, abbiamo calpestato una bomba, il gioco finisce con un messaggio di errore
Altrimenti il gioco va avanti a meno di aver raggiunto il numero massimo di tentativi possibili. In questo caso il gioco finisce con un messaggio di vittoria.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha scelto un numero che non era una bomba.*/

/******************** 
* FASE PREPARATORIA *
*********************/
// [1] chiediamo (con un prompt) il livello desiderato dall'utente
// [2] SE sceglie il livello 
    // 1 : il range di numeri possibili è tra 1 e 100
    // 2 : il range di numeri possibili è tra 1 e 81
    // 3 : il range di numeri possibili è tra 1 e 49
// [3] genero 16 numeri casuali (senza duplicati), che rappresenteranno le bombe, per un range che va da 1 a levelMaxRange (100-81-49)
// [4] mi calcolo il numero massimo di tentativi che l'utente può fare: maxAttempts = levelMaxRange - bombs (numero di bombe, cioé 16)

/******************** 
*    FASE LOGICA    *
*********************/
// FINCHE' il gioco non finisce
    // [1] chiediamo (con dei prompt) all'utente il numero che desidera inserire
    // [2.1] SE il numero è presente in quelli generati casualmente (è una bomba) -> l'utente perde -> faccio finire il gioco + alert 'hai perso' + punteggio
    // [2.2] ALTRIMENTI 
        // SE (il numero non è presente in quelli già dati dall'utente) lo pusho nell'array userNumbers
        // SE l'utente ha raggiunto il numero massimo di tentativi possibili -> l'utente vince -> faccio finire il gioco + alert 'hai vinto' + punteggio

/******************** 
* FASE PREPARATORIA *
*********************/
// [1] chiediamo (con un prompt) il livello desiderato dall'utente
const userLevel = parseInt(prompt('dimmi quale livello preferisci (1-2-3)'))
// console.log(userLevel);

//[2] SE sceglie il livello 
    // 1 : il range di numeri possibili è tra 1 e 100
    // 2 : il range di numeri possibili è tra 1 e 81
    // 3 : il range di numeri possibili è tra 1 e 49
let levelMaxRange;
switch (userLevel) {
    case 1:
        levelMaxRange = 100;
        break;
    case 2:
        levelMaxRange = 81;
        break;
    case 3:
        levelMaxRange = 49;
        break;
}
// console.log(levelMaxRange);

// [3] genero 16 numeri casuali (senza duplicati), che rappresenteranno le bombe, per un range che va da 1 a levelMaxRange (100-81-49)
const totalNumberOfBombs = 16;
const bombs = generateBombs(totalNumberOfBombs, 1, levelMaxRange);
// console.log('bombe', bombs);

// [4] mi calcolo il numero massimo di tentativi che l'utente può fare: maxAttempts = levelMaxRange - bombs (numero di bombe, cioé 16)

const maxAttempts = levelMaxRange - totalNumberOfBombs;

/******************** 
*    FASE LOGICA    *
*********************/
// FINCHE' il gioco non finisce
    // [1] chiediamo (con dei prompt) all'utente il numero che desidera inserire
    // [2.1] SE il numero è presente in quelli generati casualmente (è una bomba) -> l'utente perde -> faccio finire il gioco + alert 'hai perso' + punteggio
    // [2.2] ALTRIMENTI 
        // SE (il numero non è presente in quelli già dati dall'utente) lo pusho nell'array userNumbers
        // SE l'utente ha raggiunto il numero massimo di tentativi possibili -> l'utente vince -> faccio finire il gioco + alert 'hai vinto' + punteggio

const userNumbers = [];
let gaming = true;
while (gaming) {
    // [1] chiediamo (con dei prompt) all'utente il numero che desidera inserire
    const userNumber = parseInt(prompt('dimmi un numero'));

    // [2.1] SE il numero è presente in quelli generati casualmente (è una bomba) -> l'utente perde -> faccio finire il gioco + alert 'hai perso' + punteggio
    if (bombs.includes(userNumber)) {
        gaming = false;
        alert('hai perso');
        alert('punteggio: ' + userNumbers.length)
        // console.log('userNumbers', userNumbers)
    } /* [2.2] ALTRIMENTI */ else {
        // SE (il numero non è presente in quelli già dati dall'utente) lo pusho nell'array userNumbers
        if (!userNumbers.includes(userNumber)) {
            userNumbers.push(userNumber);
        }
        // console.log(userNumbers);

        // SE l'utente ha raggiunto il numero massimo di tentativi possibili -> l'utente vince -> faccio finire il gioco + alert 'hai vinto' + punteggio
        if (userNumbers.length === maxAttempts) {
            gaming = false;
            alert('hai vinto');
            alert('punteggio: ' + userNumbers.length)
        }
    }
}

/******************** 
*     FUNCTIONS     *
*********************/
/* FUNZIONE PER GENERARE NUMERO RANDOM */
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

/* FUNZIONE PER GENERARE LE BOMBE */
// genero un array di n elementi (numeri random)
// numberOfBombs -> numero di bombe che devono essere presenti nell'array (16)
// rangeMin -> range minimo dei numeri random da generare
// rangeMax -> range massimo dei numeri random da generare
// return: array di numeri random con .length < numberOfBombs

function generateBombs (numberOfBombs, rangeMin, rangeMax) {

    // console.log('numero elementi dell\'array', numberOfBombs);
    // console.log('range minimo', rangeMin);
    // console.log('range massimo', rangeMax);

    const randomNumberBombs = [];

    while(randomNumberBombs.length < numberOfBombs) {

        //genero un numero random da rangeMin (1) a rangeMax (che varia in base al livello scelto dall'utente)
        const randomNumber = getRndInteger(rangeMin, rangeMax);

        //pushiamo il numero nell'array solo se non è già presente
        if(!randomNumberBombs.includes(randomNumber)) {
            randomNumberBombs.push(randomNumber);
        }
    }

    return randomNumberBombs;
}