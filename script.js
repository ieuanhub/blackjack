// creating a deck of cards

const suits = ["♠", "♥", "♦", "♣"];                                                         // spades, hearts, diamonds, clubs
const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];           // ace, 2-10, jack, queen, king
const deck = [];                                                                            // empty array to hold the deck of cards

for (const suit of suits) {                                                                 // loop through each suit
    for (const rank of ranks) {                                                             // loop through each rank
        deck.push({ suit: suit, rank: rank });                                              // push an object with the suit and rank into the deck array
    }
}

// shuffling the deck

for (let i = 0; i < deck.length; i++) {                                                     // loop through each card in the deck, (i is the index of the current card, deck.length is the total number of cards in the deck, i++ increases the index by 1 each time the loop runs, eg, if the deck has 52 cards, the loop will run 52 times, with i starting at 0 and ending at 51)
    const j = Math.floor(Math.random() * deck.length);                                      // generate a random index between 0 and the length of the deck (deck.length is 52, so j will be a random number between 0 and 51, math.floor rounds the number down to the nearest whole number, so if Math.random() generates 0.5, j will be 0, if Math.random() generates 0.9, j will be 0, if Math.random() generates 1.5, j will be 1, etc)
    const temp = deck[i];                                                                   // store the current card in a temporary variable
    deck[i] = deck[j];                                                                      // replace the current card with the card at the random index   
    deck[j] = temp;                                                                         // replace the card at the random index with the current card
}

// drawing two cards for the player

const playerHand = [];                                                                      // empty array to hold the player's hand
const card = deck.pop();                                                                    // remove the last card from the deck and store it in a variable
playerHand.push(card);                                                                      // add the card to the player's hand
const card2 = deck.pop();                                                                   // remove the last card from the deck and store it in a variable
playerHand.push(card2);                                                                     // add the card to the player's hand

console.log(playerHand);                                                                    // log the player's hand to the console
console.log(deck.length);                                                                   // log the number of cards left in the deck to the console

// drawing two cards for the dealer

const dealerHand = [];                                                                      // empty array to hold the dealer's hand
const dealerCard = deck.pop();                                                              // remove the last card from the deck and store it in a variable
dealerHand.push(dealerCard);                                                                // add the card to the dealer's hand
const dealerCard2 = deck.pop();                                                             // remove the last card from the deck and store it in a variable
dealerHand.push(dealerCard2);                                                               // add the card to the dealer's hand

console.log(dealerHand);                                                                    // log the dealer's hand to the console
console.log(deck.length);                                                                   // log the number of cards left in the deck to the console                                 

function dealCard(hand) {                                                                   // function to deal a card to a hand
  hand.push(deck.pop());                                                                    // remove the last card from the deck and add it to the hand
}

// value of the cards

function cardValue(card) {                                                                  // function to get the value of a card
  if (card.rank === "A") {                                                                  // if the card is an ace, return 11
    return 11;
  }
  else if (["J", "Q", "K"].includes(card.rank)) {                                           // if the card is a jack, queen, or king, return 10
  return 10;
}
else {
    return Number(card.rank);                                                               // if the card is a number, return the number
}
}

// value of the hand

function handValue(hand) {                                                                  // function to get the value of a hand
  let total = 0;                                                                            // variable to hold the total value of the hand
  let aces = 0;                                                                             // variable to hold the number of aces in the hand

  for (const card of hand) {                                                                // loop through each card in the hand
    total = total + cardValue(card);                                                        // add the value of the card to the total
    if (card.rank === "A") {                                                                // if the card is an ace, increment the number of aces
        aces++;                                                                             // increment the number of aces
    }
}
    while (total > 21 && aces > 0) {                                                        // while the total is greater than 21 and there are aces in the hand
        total -= 10;                                                                        // subtract 10 from the total (counting the ace as 1 instead of 11)
        aces--;                                                                             // decrement the number of aces
    }
    return total;                                                                           // return the total value of the hand
}
console.log(playerHand);                                                                    // log the player's hand to the console
console.log(handValue(playerHand));                                                         // log the value of the player's hand to the console
console.log(handValue([{ suit: "♠", rank: "A" }, { suit: "♥", rank: "A" }]));               // log the value of a hand with two aces to the console

// bust check 

function isBust(hand) {
    return handValue(hand) > 21;
}
console.log(isBust(playerHand));    
console.log(isBust([{ suit: "♠", rank: "6" }, { suit: "♥", rank: "9" }, { suit: "♦", rank: "8" }]));  