/*
 * Create a list that holds all of your cards
 */
// select the parent element deck
const deck = document.querySelector('.deck');
//add the card to a list of open cards Storing Cards in an Array
let toggledCards = [];
// initialize moves
let moves = 0;
// holds the state of clock whether its on or off
let clockOff = true;
// initial value of time
let time = 0;
// as global variable
let clockId;
// classList get the class of the event target
// set event listener to deck and its child
deck.addEventListener('click', event => {
	const clickTarget = event.target;
	if (isClickValid(clickTarget)) {
		if (clockOff) {
			startClock();
			clockOff = false;
		}
		// console.log("Im a card");
		toggleCard(clickTarget);
		addToggleCard(clickTarget);
		if (toggledCards.length ===2) {
			console.log('2 cards!');
			checkForMatch(clickTarget);
			addMove();
			checkScore();
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
// change moves in html
function addMove() {
	moves++;
	const movesText = document.querySelector('.moves');
	movesText.innerHTML = moves;
}
// check stars and remove
function checkScore() {
	if (moves ===12 || moves ===20) {
		// removeStar();
		hideStar();
	}
}
// function handles removing a star from dom
function hideStar() {
	const starList = document.querySelectorAll('.stars li');
	for (star of starList) {
		if (star.style.display !== 'none') {
			star.style.display = 'none';
			break;
		}
	}
}
// hideStar();// two stars
// hideStar();// one star
function startClock() {
	clockId = setInterval(() => {
		time++;
		// console.log('1 second has passed');
		displayTime();
		console.log(time);
	}, 1000);
}
// startClock();
// every new second of interval function need to display the current time in score HTML
function displayTime() {
	const minutes = Math.floor(time / 60);
	const seconds = time % 60;
	const clock = document.querySelector('.clock');
	console.log(clock);
	if (seconds < 10) {
		clock.innerHTML = `${minutes}:0${seconds}`;
	} else {
		clock.innerHTML = `${minutes}:${seconds}`;
	}
}
// function stop the clock using clearInterval()
function stopClock() {
	clearInterval(clockId);
}
// function to toggle the hide class
function toggleModal() {
	const modal = document.querySelector('.modal_background');
	modal.classList.toggle('hide');
}
// toggleModal() // open modal
// toggleModal() // close modal

// function to change stats in modal
function writeModalStats() {
	const timeStat = document.querySelector('.modal_time');
	const clockTime = document.querySelector('.clock').innerHTML;
	const movesStat = document.querySelector('.modal_moves');
	const starsStat = document.querySelector('.modal_stars');
	const stars = getStars();
	// console.log(clockTime);
	timeStat.innerHTML = `Time = ${clockTime}`;
	movesStat.innerHTML = `Moves = ${moves}`;
	starsStat.innerHTML = `Stars = ${stars}`;
}
// get current number of stars
function getStars() {
	stars = document.querySelectorAll('.stars li');
	starCount = 0;
	for (star of stars) {
		if (star.style.display !== 'none') {
			starCount++;
		}
	}
	console.log(starCount); // 2
	return starCount;
}

// Modal tests
time = 121;
displayTime();// 2:01
moves = 12;
checkScore();// 2 stars

writeModalStats(); // write stats to modal
toggleModal();// open modal

