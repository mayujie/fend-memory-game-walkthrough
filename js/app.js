/*
 * Create a list that holds all of your cards
 */
// select the parent element deck
const deck = document.querySelector('.deck');
//add the card to a list of open cards Storing Cards in an Array
let toggledCards = [];
// classList get the class of the event target
// set event listener to deck and its child
deck.addEventListener('click', event => {
	const clickTarget = event.target;
	if (isClickValid(clickTarget
	)) {
		// console.log("Im a card");
		toggleCard(clickTarget);
		addToggleCard(clickTarget);
		if (toggledCards.length ===2) {
			console.log('2 cards!');
			checkForMatch(clickTarget);
		}
	}
});
//check card state before run event listener
function isClickValid(clickTarget) {
	return (
		clickTarget.classList.contains('card') && 
		!clickTarget.classList.contains('match') &&
		toggledCards.length < 2 && 
		!toggledCards.includes(clickTarget)
	);
}
//toggling into own function
function toggleCard(card) {
	//.toggle to turn on or off the classes when our click event fires
	card.classList.toggle('open');
	card.classList.toggle('show');
};
//push the clickTarget into the toggledCards array
function addToggleCard(clickTarget) {
	toggledCards.push(clickTarget);
	console.log(toggledCards);
}
//Checking for Match
function checkForMatch() {
	if (toggledCards[0].firstElementChild.className === 
		toggledCards[1].firstElementChild.className
	) {
		console.log("Match!");
		toggledCards[0].classList.toggle('match');
		toggledCards[1].classList.toggle('match');
		toggledCards = [];
	} else {
		setTimeout(() => {
			console.log("Not a match!");		
			toggleCard(toggledCards[0]);
			toggleCard(toggledCards[1]);
			toggledCards = [];
		}, 1000);
	}
}
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Fisher-Yates (aka Knuth) Shuffle
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
};

//function handle shuffling the deck
function shuffleDeck() {
	const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
	console.log('Cards to shuffle', cardsToShuffle);
	const shuffledCards = shuffle(cardsToShuffle);
	console.log('Shuffked cards', shuffledCards);
	//const cd = [...cardsToShuffle];
	//console.log(cd);
	for (card of shuffledCards) {
		deck.appendChild(card);
	}
}
shuffleDeck();
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
