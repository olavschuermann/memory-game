/*
 * Create a list that holds all of your cards
 */

let allCards = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-anchor', 'fa-leaf', 
'fa-bicycle', 'fa-diamond', 'fa-bomb', 'fa-leaf', 'fa-bomb', 'fa-bolt', 'fa-bicycle', 'fa-paper-plane-o', 'fa-cube']; 

/* Test shuffle() 
let array = [1, 2, 3, 4, 5];
array = shuffle(array);
console.log(array); */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/* Shuffle allCards */
allCards = shuffle(allCards);
console.log(allCards);

/* Loop through each card and write them in .deck */
/* &nbsp; needed for class="fa(SPACE)cardClass" */

for (card of allCards) {
    const cardHTML = `<li class="card"><i class="fa ${card}"></i></li>`;
/* Elements for cards:     
    <li class="card">
    <i class="fa fa-diamond"></i>
    </li>  
*/
    const deck = document.querySelector('.deck');
    deck.insertAdjacentHTML('afterbegin', cardHTML); 
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 /* Counter for moves */
let moveCounter = 0; 

let cardCounter = 0;

 /* Add event listener for click for deck */
const deck = document.querySelector('.deck');
deck.addEventListener('click', evt => {
    let cardClicked = evt.target;

    /* Check if target clicked is card */
    if (cardClicked.classList.contains('card')) {

        /* No more than 2 cards open */
        if (cardList.length === 2) {
            return;
        } else {
            switchCard(cardClicked);
        }

        /* Start Timer after first click */
        if (moveCounter === 1) {
            startTimer();
        }

        listofOpenCards(cardClicked);        
        
        if (cardList.length === 2) {
            console.log("2 cards");
            checkMatch();
        }
        
        starRating();

    }
})

function switchCard(cardClicked) {
    /* Check if card already open - not toggle then */
    if (cardClicked.classList.contains('show')) {
         return;
    } else {
        cardClicked.classList.toggle('open');
        cardClicked.classList.toggle('show');

         /* Count moves */
        moveCounter = moveCounter +1;
    };

    console.log('Moves: ' + moveCounter);
    document.querySelector(".moves").innerHTML = moveCounter;    
}

/* Push open cards in array (list) */
let cardList = []; 

function listofOpenCards(cardClicked) {
    if (cardList.length === 2) {
       return; 
    } else {
        cardList.push(cardClicked);
        console.log(cardList);
    }
}
    
function checkMatch() {
    if (cardList[0].firstElementChild.className === cardList[1].firstElementChild.className) {
        cardList[0].classList.add('match');
        cardList[1].classList.add('match');
        console.log('This is a match!!!');
        cardList = [];
        cardCounter = cardCounter +2;
        console.log(cardCounter);
        if (cardCounter === 16) {
            endTimer();
            setTimeout(showWinModal, 1200);
        }
    } else {
        /* No match */
        setTimeout(deleteCards, 1500);
        function deleteCards()  {
            cardList[0].classList.toggle('open');
            cardList[0].classList.toggle('show');        
            cardList[1].classList.toggle('open'); 
            cardList[1].classList.toggle('show');                 
            cardList = [];
        }    
    }
}

function showWinModal() {
    let showModal = document.querySelector('.modal-box-bg');
    showModal.classList.toggle('hide');

    let movesModal = document.querySelector('.modal-moves').innerHTML = 'Moves: ' + moveCounter; 
    let starsModal = document.querySelector('.modal-stars').innerHTML = 'Stars: ' + starCount; 
    let timesModal = document.querySelector('.modal-time').innerHTML = 'Time: ' + gameTime + ' seconds'; 

    let buttonModal = document.querySelector('.modal-button').addEventListener('click', resetGame);

    /*alert('Congratulations! You won in:\n' + moveCounter + ' Moves\n' + gameTime + ' seconds\n' + 'You earned: ' + starCount + ' star(s)\n' +
    'Play again? Please click OK ');*/
}

/* Game Timer */

let startTime = 0;
let gameTime = 0;
let liveTime = 0;
let runningTimer = 0;

function startTimer() {
    startTime = Math.round (new Date().getTime() / 1000);

    runningTimer = setInterval(() => {
        liveTime++;
        document.querySelector('.timer').innerHTML = liveTime;
    }, 1000);
}

function endTimer() {
    gameTime = Math.round (new Date().getTime() / 1000) - startTime;
    
    /* Stop timer / interval */
    clearInterval(runningTimer);
    console.log(gameTime);
}

/* Star rating 
up to 20 Moves = 3 stars
21-30 = 2 stars
more than 30 = 1 star */

let starCount = 0;

function starRating() {
    if (moveCounter < 21) {
        starCount = 3;
        console.log('3 stars');
    } else if (moveCounter > 20 && moveCounter < 31) {
        console.log('2 stars');
        starCount = 2;
        let byeStar = document.querySelectorAll('.fa-star');
        let byeStarArray = Array.from(byeStar);
        if (byeStarArray.length > 2) {
            byeStarArray[2].remove('.fa-star');
        }
    } else {
        starCount = 1;
        console.log('1 star');
        let byeStar = document.querySelectorAll('.fa-star');
        let byeStarArray = Array.from(byeStar);        
        if (byeStarArray.length > 1) {
            byeStarArray[1].remove('.fa-star');
        }
    }
}

/* Reset button / Play again */

document.querySelector('.restart').addEventListener('click', resetGame);

function resetGame() {
    console.log('Reset');
    startTime = 0;
    gameTime = 0;
    moveCounter = 0;
    console.log('Moves: ' + moveCounter);
    document.querySelector(".moves").innerHTML = moveCounter;
    location.reload();
}