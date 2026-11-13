// blackjack game - javascript version
// setting up the cards and the money

const suits = ["♠", "♥", "♦", "♣"];                                                         // spades, hearts, diamonds, clubs
const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];           // ace, 2-10, jack, queen, king
const chips = [10, 50, 100, 200, 500, 1000, 2000, 5000, 10000,                              // chip values in pence (10p up to £10,000)
    20000, 50000, 100000, 200000, 500000, 1000000];
let balance = 0;                                                                            // the player's money in pence, set when they deposit

// creating a deck of cards

function createDeck() {                                                                     // function to build a fresh 52 card deck
    const deck = [];                                                                        // empty array to hold the deck of cards

    for (const suit of suits) {                                                             // loop through each suit
        for (const rank of ranks) {                                                         // loop through each rank
            deck.push({ suit: suit, rank: rank });                                          // push an object with the suit and rank into the deck array
        }
    }

    return deck;                                                                            // hand the finished deck back to whoever called the function
}

// shuffling the deck

function shuffle(deck) {                                                                    // function to shuffle a deck
    for (let i = 0; i < deck.length; i++) {                                                 // loop through every position in the deck (i is the current position)
        const j = Math.floor(Math.random() * deck.length);                                  // pick a random position from 0 to deck.length - 1
        const temp = deck[i];                                                               // store the current card in a temporary variable
        deck[i] = deck[j];                                                                  // replace the current card with the card at the random position
        deck[j] = temp;                                                                     // put the stored card into the random position
    }
}

// dealing a card

function dealCard(deck, hand) {                                                             // function to deal a card from a deck to a hand
    hand.push(deck.pop());                                                                  // remove the last card from the deck and add it to the hand
}

// value of the cards

function cardValue(card) {                                                                  // function to get the value of a card
    if (card.rank === "A") {                                                                // if the card is an ace, return 11
        return 11;
    }
    else if (["J", "Q", "K"].includes(card.rank)) {                                         // if the card is a jack, queen, or king, return 10
        return 10;
    }
    else {
        return Number(card.rank);                                                           // if the card is a number, return the number
    }
}

// value of the hand

function handValue(hand) {                                                                  // function to get the value of a hand
    let total = 0;                                                                          // variable to hold the total value of the hand
    let aces = 0;                                                                           // variable to hold the number of aces in the hand

    for (const card of hand) {                                                              // loop through each card in the hand
        total = total + cardValue(card);                                                    // add the value of the card to the total
        if (card.rank === "A") {                                                            // if the card is an ace, increment the number of aces
            aces++;                                                                         // increment the number of aces
        }
    }
    while (total > 21 && aces > 0) {                                                        // while the total is over 21 and there are aces counted as 11
        total -= 10;                                                                        // subtract 10 from the total (counting the ace as 1 instead of 11)
        aces--;                                                                             // one fewer ace left to turn into a 1
    }
    return total;                                                                           // return the total value of the hand
}

// bust check - check to see if a hand has gone over 21

function isBust(hand) {                                                                     // function to check if a hand is bust
    return handValue(hand) > 21;                                                            // true if the hand is worth more than 21
}

// blackjack check - check to see if a hand is a natural blackjack

function isBlackjack(hand) {                                                                // function to check if a hand is a natural blackjack
    return hand.length === 2 && handValue(hand) === 21;                                     // return true if the hand has 2 cards and is worth 21
}

// money - the game stores money in pence (whole numbers) and only shows pounds on screen

function formatMoney(pence) {                                                               // function to turn pence into a pounds string for display
    return "£" + (pence / 100).toFixed(2);                                                  // divide by 100 for pounds, and show exactly 2 decimal places
}

function poundsToPence(pounds) {                                                            // function to turn what the player types (pounds) into pence
    return Math.round(pounds * 100);                                                        // multiply by 100, and round to remove tiny decimal errors
}

function isValidAmount(pence) {                                                             // function to check an amount of money is allowed (used for deposits and bets)
    if (isNaN(pence)) {                                                                     // if it's not a number
        return false;
    }
    if (!Number.isInteger(pence)) {                                                         // if it's not a whole number of pence
        return false;
    }
    if (pence <= 0) {                                                                       // if it's 0 or less
        return false;
    }
    if (pence % chips[0] !== 0) {                                                           // if it can't be made from chips (the smallest chip is 10p, % gives the remainder)
        return false;
    }
    return true;                                                                            // nothing was wrong, so the amount is allowed
}

function isValidBet(bet, balance) {                                                         // function to check if a bet is valid
    if (!isValidAmount(bet)) {                                                              // the bet must be a valid amount of money
        return false;
    }
    if (bet > balance) {                                                                    // and the player can't bet more than they have
        return false;
    }
    return true;
}

// asking the player how much money they want to play with

function askForDeposit() {                                                                  // function to ask for a starting amount
    let answer = prompt("How much do you want to deposit?");                                // ask once (the answer is text)
    if (answer === null) {                                                                  // if they pressed Cancel
        return null;                                                                        // no deposit
    }
    let deposit = poundsToPence(Number(answer));                                            // turn the text into a number, then into pence

    while (!isValidAmount(deposit)) {                                                       // while the deposit is NOT valid
        alert("Invalid amount. Please enter pounds, e.g. 50 or 12.50");                     // tell the player
        answer = prompt("How much do you want to deposit?");                                // ask again and overwrite answer
        if (answer === null) {                                                              // if they pressed cancel
            return null;
        }
        deposit = poundsToPence(Number(answer));                                            // convert the new answer
    }

    return deposit;                                                                         // hand the valid deposit (in pence) back
}

// asking the player for a valid bet

function askForBet(balance) {                                                               // function to ask the player for a valid bet
    let answer = prompt("How much do you want to bet? You have " + formatMoney(balance));   // ask once (the answer is text)
    if (answer === null) {                                                                  // if they pressed Cancel
        return null;                                                                        // no bet, which means they want to stop
    }
    let bet = poundsToPence(Number(answer));                                                // turn the text into a number, then into pence

    while (!isValidBet(bet, balance)) {                                                     // while the bet is NOT valid
        alert("Invalid bet. Enter an amount in £ up to " + formatMoney(balance));           // tell the player the bet was invalid
        answer = prompt("How much do you want to bet? You have " + formatMoney(balance));   // ask again and overwrite answer
        if (answer === null) {                                                              // if they pressed Cancel
            return null;
        }
        bet = poundsToPence(Number(answer));                                                // convert the new answer
    }

    return bet;                                                                             // hand the valid bet (in pence) back
}

// asking the player hit or stand

function hitOrStand(answer, deck, hand) {                                                   // function to act on the player's answer
    if (answer === "hit") {                                                                 // if the player typed hit
        dealCard(deck, hand);                                                               // deal them a card
        console.log(hand);                                                                  // show their hand
        console.log(handValue(hand));                                                       // show what it's worth
    }
    else if (answer === "stand") {                                                          // if the player typed stand
        console.log("You chose to stand.");
    }
    else {                                                                                  // anything else (including Cancel)
        console.log("Invalid input. Please enter 'hit' or 'stand'.");
    }
}

// winner check - check to see who won the game

function getResult(playerHand, dealerHand) {                                                // function to work out the winner
    if (isBust(playerHand)) {                                                               // player busted, so the dealer wins whatever happens
        return "You busted! Dealer wins.";
    }
    else if (isBust(dealerHand)) {                                                          // dealer busted, so the player wins
        return "Dealer busted. You win!";
    }
    else if (handValue(playerHand) > handValue(dealerHand)) {                               // player has the higher total
        return "You win!";
    }
    else if (handValue(dealerHand) > handValue(playerHand)) {                               // dealer has the higher total
        return "Dealer wins.";
    }
    else {                                                                                  // same total
        return "Push.";
    }
}

// payout check - work out how much the balance changes

function getPayout(playerHand, dealerHand, bet) {                                           // function to work out the change in money (in pence)
    if (isBust(playerHand)) {                                                               // player busted
        return -bet;                                                                        // they lose their bet (the minus makes it negative)
    }
    else if (isBust(dealerHand)) {                                                          // dealer busted
        return bet;                                                                         // they win their bet
    }
    else if (handValue(playerHand) > handValue(dealerHand)) {                               // player has the higher total
        return bet;                                                                         // they win their bet
    }
    else if (handValue(dealerHand) > handValue(playerHand)) {                               // dealer has the higher total
        return -bet;                                                                        // they lose their bet
    }
    else {                                                                                  // same total
        return 0;                                                                           // push, so the balance doesn't change
    }
}

// playing one full round

function playRound() {                                                                      // function to play one full round (returns false if the player quit)
    const deck = createDeck();                                                              // build a fresh deck for this round
    shuffle(deck);                                                                          // shuffle it

    const bet = askForBet(balance);                                                         // ask the player for a valid bet and store it
    if (bet === null) {                                                                     // if they cancelled the bet
        return false;                                                                       // stop the round, and tell the game they quit
    }
    console.log("Bet:", formatMoney(bet), "Balance:", formatMoney(balance));                // show the bet and the balance

    const playerHand = [];                                                                  // empty array to hold the player's hand
    const dealerHand = [];                                                                  // empty array to hold the dealer's hand

    dealCard(deck, playerHand);                                                             // deal two cards to the player
    dealCard(deck, playerHand);
    dealCard(deck, dealerHand);                                                             // deal two cards to the dealer
    dealCard(deck, dealerHand);

    console.log("Your hand:", playerHand, handValue(playerHand));                           // show the player's hand and its value
    console.log("Dealer's first card:", dealerHand[0]);                                     // show only one of the dealer's cards, like a real game

    // player's turn

    let standing = false;                                                                   // has the player stood yet?

    while (!standing && !isBust(playerHand)) {                                              // keep going until they stand or bust
        const answer = prompt("Hit or stand?");                                             // ask the player
        hitOrStand(answer, deck, playerHand);                                               // act on their answer
        if (answer === "stand") {                                                           // if they stood
            standing = true;                                                                // end the player's turn
        }
    }

    // dealer's turn - the dealer must hit until their hand is 17 or higher

    while (handValue(dealerHand) < 17) {                                                    // while the dealer is under 17
        dealCard(deck, dealerHand);                                                         // deal the dealer a card
    }

    console.log("Dealer's hand:", dealerHand, handValue(dealerHand));                       // show the dealer's final hand
    console.log("player:", handValue(playerHand), "dealer:", handValue(dealerHand));        // show both totals
    console.log(getResult(playerHand, dealerHand));                                         // show who won

    const payout = getPayout(playerHand, dealerHand, bet);                                  // work out how much the balance changes
    balance = balance + payout;                                                             // add it to the balance (a loss is a negative number)
    console.log("Change:", formatMoney(payout), "Balance:", formatMoney(balance));          // show the change and the new balance

    return true;                                                                            // the round finished normally
}

// the game - deposit, then keep playing rounds until the player runs out of money or quits

function startGame() {                                                                      // function to run the whole game
    const deposit = askForDeposit();                                                        // ask how much they want to play with
    if (deposit === null) {                                                                 // if they cancelled
        return;                                                                             // nothing to play with, so stop
    }
    balance = deposit;                                                                      // their deposit becomes their balance

    while (balance > 0) {                                                                   // keep going while they have money
        const finished = playRound();                                                       // play a round (true if it finished, false if they quit)
        if (!finished) {                                                                    // if they quit
            break;                                                                          // leave the loop
        }
    }

    console.log("Game over. You finished with", formatMoney(balance));                      // show what they ended with
}

// startGame();                                                                             // start the game