/*
 * Create a list that holds all of your cards
 */
// select the parent element deck
const deck = document.querySelector('.deck');
//add the card to a list of open cards Storing Cards in an Array
let toggledCards = [];
// classList get the class of the event target
deck.addEventListener('click', event => {
	const clickTarget = event.target;
	if (clickTarget.classList.contains('card')) {
		console.log("Im a card");
		toggleCard(clickTarget);
		addToggleCard(clickTarget);
	}
});
//toggling into own function
function toggleCard(clickTarget) {
	//.toggle to turn on or off the classes when our click event fires
	clickTarget.classList.toggle('open');
	clickTarget.classList.toggle('show');
};
//push the clickTarget into the toggledCards array
function addToggleCard(clickTarget) {
	toggledCards.push(clickTarget);
	console.log(toggledCards);
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
