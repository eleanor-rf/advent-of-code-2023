const regex = /(\d+(?:\s+\d+)*)\s*\|\s*(\d+(?:\s+\d+)*)/;
const inputSplit = input.split('\n');

function findCommonValues(input){
    // split input into 2 arrays and find the common values
    const match = input.match(regex);
    const winningNumbers = match[1].split(/\s+/).map(Number);
    const numbersIHave = match[2].split(/\s+/).map(Number);
    return winningNumbers.filter(number => numbersIHave.includes(number));
}

function twoToPowerOfMatches(input){
    const commonNumbers = findCommonValues(input)
    
    // return 2^(matches-1) or 0 if there aren't any matches
    if (commonNumbers.length === 0) {
        return 0;
    } else {
        return Math.pow(2,(commonNumbers.length - 1));
    }
}

let pointSum = 0;
for (let i = 0; i < inputSplit.length; i++) {
  pointSum += twoToPowerOfMatches(inputSplit[i]);
}
console.log(`For puzzle 1, the points total is ${pointSum}`);

function findNumberOfMatches(input){
    const commonNumbers = findCommonValues(input)

    //return the number of common values
    return commonNumbers.length;
}

let numberInfo = [];
    for (let i = 0; i < inputSplit.length; i++){
        numberInfo.push({
        card: i+1,
        copies: 1,
        matches: findNumberOfMatches(inputSplit[i])
        });
    }

for (let i = 0; i < numberInfo.length; i++) {
    if (numberInfo[i]['matches'] > 0){
        for (let j = 0; j < numberInfo[i]['matches']; j++) {
        numberInfo[i+j+1]['copies'] += numberInfo[i]['copies'];
        }
    }
}

let sum = 0;
for (let i = 0; i < numberInfo.length; i++){
    sum += numberInfo[i]['copies'];
}

console.log(`For puzzle 2, the total number of cards is ${sum}`);