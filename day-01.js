inputSplit = input.split(/\r?\n/)

/* // Puzzle 1
let numberArray = [];

for (let i = 0; i < inputSplit.length; i++){
  for (let j = 0; j < (inputSplit[i].length); j++){
    if (/[0-9]/.test(inputSplit[i][j])) {
      numberArray.push(inputSplit[i][j]);
      break;
    };
  };
  for (let j = (inputSplit[i].length); j > -1; j--){
    if (/[0-9]/.test(inputSplit[i][j])) {
      numberArray[i] += inputSplit[i][j];
      break;
    };
  };
};

let sum  = 0;

for (const number of numberArray) {
  sum += parseInt(number);
};*/

// Puzzle 2
// map
let wordToNumber = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9"
};

// find matches in each input string
let matchedArray = []
for (i = 0; i < inputSplit.length; i ++) {
  const string = inputSplit[i];
  const reg = /one|two|three|four|five|six|seven|eight|nine|[0-9]/gi;
  let matches = [], found;
  while (found = reg.exec(string)) {
    matches.push(found[0]);
    reg.lastIndex = found.index+1;
  }
  matchedArray.push(matches);
}

// for each nested array get the first and last number, combine and push to numbersArray
let currentNumber = "";
let numbersArray = [];
for (const match of matchedArray) {
  // take the first value. if it's in wordToNumber then convert it, otherwise dont. add to temporary string variable currentNumber
  // take the last value. if it's in wordTonumber then convert it, otherwise dont. add to temporary string variable currentNumber
  if (wordToNumber.hasOwnProperty(match[0])) {
    currentNumber += (wordToNumber[match[0]]);
    } else {
    currentNumber += match[0];
  };
  if (wordToNumber.hasOwnProperty(match[match.length - 1])) {
    currentNumber += (wordToNumber[match[match.length - 1]]);
    } else {
    currentNumber += match[match.length - 1];
  };
  numbersArray.push(parseInt(currentNumber));
  currentNumber = "";
};

let sum = 0;
for (const number of numbersArray) {
  sum += number;
};


