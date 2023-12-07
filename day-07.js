//parse the input
//get each line
const inputSplit = input.split('\n')

//create an object for each hand with cards and bid
let hands = []
for (let i = 0; i < inputSplit.length; i++){
  hands.push({
    cards: inputSplit[i].split(' ')[0],
    bid: parseInt(inputSplit[i].split(' ')[1])
    });
}

//turn cards into an array and swap out letters for numbers to reflect their value
function parseHand(hand) {
  const cardMap = {
    'A': 14,
    'K': 13,
    'Q': 12,
    'J': 11,
    'T': 10
  };

  const parsedHand = hand.split('').map(char => {
    if (cardMap[char] !== undefined) {
      return cardMap[char];
    } else {
      return parseInt(char);
    }
  });

  return parsedHand;
}

//parse each hand
for (const hand of hands){
    hand.cards = parseHand(hand.cards)
}

// determine the hand type for each hand and create an object with cards, bid and hand type
function analyseHand(hand) {
  const numOfEachCard = {};

  hand.cards.forEach(number => {
    numOfEachCard[number] = (numOfEachCard[number] || 0) + 1;
  });

  const cardNumbers = Object.values(numOfEachCard);

  let handType;

  if (cardNumbers.includes(5)) {
    handType = "Five of a kind";
  } else if (cardNumbers.includes(4)) {
    handType = "Four of a kind";
  } else if (cardNumbers.includes(3) && cardNumbers.includes(2)) {
    handType = "Full house";
  } else if (cardNumbers.includes(3)) {
    handType = "Three of a kind";
  } else if (cardNumbers.filter(count => count === 2).length === 2) {
    handType = "Two pair";
  } else if (cardNumbers.includes(2)) {
    handType = "One pair";
  } else {
    handType = "High card";
  }

  return { cards: hand.cards, bid: hand.bid, type: handType }
}

//create object with hand, bid, and type of hand
let cardsWithTypes = []
for (const hand of hands){
    cardsWithTypes.push(analyseHand(hand))
}

// custom sorting function!
function sortHands(hand1, hand2) {
  const typeRankMap = {
    'Five of a kind': 7,
    'Four of a kind': 6,
    'Full house': 5,
    'Three of a kind': 4,
    'Two pair': 3,
    'One pair': 2,
    'High card': 1
  };

  const type1 = typeRankMap[hand1.type];
  const type2 = typeRankMap[hand2.type];

  // put hands in order by type first
  if (type1 !== type2) {
    return type1 - type2;
  }

  // then compare value of each card
  for (let i = 0; i < hand1.cards.length; i++) {
    if (hand1.cards[i] !== hand2.cards[i]) {
      return hand1.cards[i] - hand2.cards[i];
    }
  }
};

// sort hands based on custom sort function
const sortedHands = cardsWithTypes.sort(sortHands)

// rank the cards
for (let i = 0; i < sortedHands.length; i++) {
  sortedHands[i].rank = i + 1;
}

// find sum of bid * rank
let sum = 0;
for (const card of sortedHands) {
    sum += card.rank * card.bid;
}
console.log(`The answer for part 1 is ${sum}`)

// part 2
// swap out J (11) for 1
let handsPart2 = hands
for (const hand of handsPart2) {
  for (let i = 0; i < hand.cards.length; i++){
    if (hand.cards[i] === 11) { hand.cards[i] = 1 };
  }  
}

function analyseHandWithWildcard(hand) {
  const numOfEachCard = {};
  let wildcardCount = 0;
  let handType;

  //deal with all J edge case...!
  if (hand.cards.every(value => value === 1)){
    handType = 'Five of a kind';
    return { cards: hand.cards, bid: hand.bid, type: handType };
  }

  //count Js
  for (let i = 0; i < hand.cards.length; i++){
    const cardNumber = hand.cards[i];
    if (hand.cards[i] === 1){
      wildcardCount++;
    } else {
      numOfEachCard[cardNumber] = (numOfEachCard[cardNumber] || 0) + 1;
    }
  };

  let values = Object.values(numOfEachCard);

  // if wildcard/s are present, add them to whichever card has the highest count
  if (wildcardCount > 0) {
    const max = values.reduce((a, b) => Math.max(a, b), -Infinity); // find the maximum count
    const highestCountCard = Object.keys(numOfEachCard).find(key => numOfEachCard[key] === max); //find the first card with this max count
    numOfEachCard[highestCountCard] += wildcardCount; //add to it the number of wildcards
    values = Object.values(numOfEachCard); //update values array
  }
  if (values.includes(5)) {
    handType = 'Five of a kind';
  } else if (values.includes(4)) {
    handType = 'Four of a kind';
  } else if (values.includes(3) && values.includes(2)) {
    handType = 'Full house';
  } else if (values.includes(3)) {
    handType = 'Three of a kind';
  } else if (values.filter(count => count === 2).length === 2) {
    handType = 'Two pair';
  } else if (values.includes(2)) {
    handType = 'One pair';
  } else {
    handType = 'High card';
  }

  return { cards: hand.cards, bid: hand.bid, type: handType };
}

let cardsWithTypesWildcards = []
for (const hand of hands){
    cardsWithTypesWildcards.push(analyseHandWithWildcard(hand));
}

const sortedHandsWildcards = cardsWithTypesWildcards.sort(sortHands);

// rank the cards
for (let i = 0; i < sortedHandsWildcards.length; i++) {
  sortedHandsWildcards[i].rank = i + 1;
}

// find sum of bid * rank
let sumWildcards = 0;
for (const hand of sortedHandsWildcards) {
    sumWildcards += hand.rank * hand.bid;
}

console.log(`The answer for part 1 is ${sumWildcards}`);