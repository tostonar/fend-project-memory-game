/*
 * Create a list that holds all of your cards
 */
const cards = document.querySelectorAll('li.card');

// convert NodeList to array
let arrayOfCards =  Array.from(cards);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

const deck = document.querySelector('.deck');

// new deck
function createDeck() {
  //shuffle cards
  shuffle(arrayOfCards);
  // clear the deck
  deck.innerHTML = "";
  // loop through each card and create its HTML
  for (const item of arrayOfCards) {
    // add each card's HTML to the page
  	deck.appendChild(item);
  }
}

// add createDeck() to restart button
const restartButton = document.querySelector('.restart > i');
restartButton.addEventListener('click', function(event) {
  if (event.target.nodeName === 'I') {
    createDeck();
  }
});

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 // TODO:   - if the list already has another card, check to see if the two cards match
 // TODO:     + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 // TODO:     + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 // TODO:     + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 // TODO:     + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// display card's symbol
function showCard(card) {
  card.classList.toggle('show');
}

// add card to list of open cards
// TODO: problem - how to remove cards that aren't currently shown
let openCards = [];
function addCard(card) {
  if (card.classList.contains('show')) {
    openCards.push(card);
  }
}

// if list has another card, check to see if they matched
function checkForMatch() {
  if (openCards.length === 2) {
    if (openCards[0].firstElementChild.classList[1] === openCards[1].firstElementChild.classList[1]) {
      console.log("It's a match!")
    } else {
      console.log("It's not a match! Keep looking.")
    }
  }
}

// on click, show card, add card to list
for (const card of cards) {
  card.addEventListener('click', function(event) {
    if (event.target.nodeName === 'LI') {
      showCard(event.target);
    }
    addCard(card);
  });
}
