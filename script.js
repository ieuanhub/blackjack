const suits = ["♠", "♥", "♦", "♣"];
const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const deck = [];

for (const suit of suits) {
    for (const rank of ranks) {
        deck.push({ suit: suit, rank: rank })
        console.log(deck.length)
    }
}

console.log(deck[0]);
console.log(deck[51]);

console.log(deck[0], deck[1]);

// let a = "first";
// let b = "second";
// let c = "cupholder";

// c = a;
// a = b;
// b = c;
// console.log(a,b);

const j = Math.floor(Math.random() * 52);
console.log(j);

const temp = deck[0];
deck[0] = deck[j];
deck[j] = temp;
console.log(deck[0], deck[j]);

console.log(Math.floor(Math.random() * 52));

