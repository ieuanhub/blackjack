const suits = ["♠", "♥", "♦", "♣"];
const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const deck = [];

for (const suit of suits) {
    for (const rank of ranks) {
        deck.push({ suit: suit, rank: rank });
    }
}

for (let i = 0; i < deck.length; i++) {
    const j = Math.floor(Math.random() * deck.length);
    const temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
}

const playerHand = [];
const card = deck.pop();
playerHand.push(card);
const card2 = deck.pop();
playerHand.push(card2);

console.log(playerHand);
console.log(deck.length);