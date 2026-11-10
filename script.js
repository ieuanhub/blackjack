// blackjack game - javascript version
// creating a deck of cards

const suits = ["♠", "♥", "♦", "♣"];                                                         // spades, hearts, diamonds, clubs
const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];           // ace, 2-10, jack, queen, king

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
        const j = Math.floor(Math.random() * deck.length);                                  // pick a random position from 0 to deck.length - 1 (Math.random() is 0 up to just under 1, times 52, rounded down)
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

// adding currency for the player to bet with

function isValidBet(bet, balance) {                                                          // function to check if a bet is valid
    if (isNaN(bet)) {                                                                        // if the bet is not a number
        return false;                                                                        // return false
    }
    if (bet <= 0) {
        return false;
    }
    if (bet > balance) {
        return false;
    }
    return true;
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

// playing one full round

function playRound() {                                                                      // function to play one full round
    const deck = createDeck();                                                              // build a fresh deck for this round
    shuffle(deck);                                                                          // shuffle it

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
}

playRound();                                                                                // start a round