const cards = document.querySelectorAll('.card');
let openCards = [];
let moves = 0;
const displayMoves = document.querySelector('.moves');
const star = '<li><i class="fa fa-star"></i></li>';
let stars = document.querySelectorAll('.fa-star');
let timer;
/*
 * Create a list that holds all of your cards
 */


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
    // remove match class
    item.classList.remove('match');
  }
  // reset timer and moves and stars
  timer = null;
  document.getElementById("seconds").innerText = '0';
  moves = 0;
  displayMoves.textContent = `${moves}`;
  document.querySelector('.stars').innerHTML = star.repeat(3);
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
 //    - if the list already has another card, check to see if the two cards match
 //      + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 //      + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 //      + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 //      + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 // currently just using window.alert; so basic
 //          maybe create a modal, or dialog html element
 //      timer must start when first card is clicked, and stop when all cards are matched, and be displayed in message with final score, and start over when reset button is clicked    timer: try setInterval()
//  deal with stars, like 3 stars for 20 moves or less, 2 stars for 21-25, and 1 star for 26+ moves
//  new problem - with restart, moves need to go back to 0, stars need to start at 3 showing, and cards need to be hidden(remove match class)
 */


// display card
function showCard(card) {
  card.classList.add('show', 'open');
}

// add card to list of open cards
function addCard(card) {
  openCards.push(card);
}

// if cards match, lock in position
function cardMatch(card) {
  card.classList.add('match');
  card.classList.remove('open');
  card.classList.remove('show');
}

// if cards don't match, hide cards
function hideCard(card) {
  card.classList.remove('open', 'show');
}

// increment moves and display
function increaseCount() {
  moves += 1;
  displayMoves.textContent = `${moves}`;
}

// stars

function displayStars() {
  stars = document.querySelectorAll('.fa-star');
  if (moves > 25) {
    // show 1 star
    stars[0].remove();
    stars[1].remove();
  } else if (moves > 20 && moves < 26) {
    // show 2 stars
    stars[0].remove();

  }
  stars = document.querySelectorAll('.fa-star');
}

// timer


function startTimer() {
  let seconds = 0;
  // check to see if timer already exists and prevent timer from restarting with every click
  if (!timer) {
    timer = setInterval(function() {
	  seconds ++;
	  document.getElementById("seconds").innerText = seconds % 60;
    document.getElementById("minutes").innerText = parseInt(seconds / 60);
    }, 1000);
  }
}

function stopTimer() {
  clearInterval(timer);
}

// when game is over
function gameOver(array) {

  // if all cards have match class then
  let didYouWin = array.every(function (e) {
    return e.classList.contains('match');
  });
  return didYouWin;
}



cards.forEach(function(card) {
  card.addEventListener('click', function(event) {
    if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
      addCard(card);
      showCard(card);
      startTimer();

      if (openCards.length >= 2) {
        // Check if cards match
        if (openCards[0].dataset.card === openCards[1].dataset.card) {
          openCards.forEach(function(card) {
            cardMatch(card);
          });
          openCards = [];
        } else {
          // If cards don't match
          setTimeout(function() {
            openCards.forEach(function(card) {
              hideCard(card);
            });
            openCards = [];
          }, 1000);
        }
        increaseCount();
      }


      if (gameOver(arrayOfCards)) {
        displayStars();
        stopTimer();
        let gameTime = document.getElementById("seconds").innerText;
        setTimeout(function() {
          window.alert(`Congratulations!! You won with only ${moves} moves in ${gameTime} seconds, so you get ${stars.length} star(s)!! Would you like to play again?`);
        }, 500);
      }
    }
  });
});
