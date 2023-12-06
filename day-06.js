//Part 1
function parseData(input) {
    const lines = input.split('\n');
    const raceTimes = lines[0].trim().split(/\s+/).slice(1).map(Number);
    const currentRecord = lines[1].trim().split(/\s+/).slice(1).map(Number);

    return { raceTimes, currentRecord };
}

const data = parseData(input);
const numberOfRaces = data.raceTimes.length;

function getWinningDistances(raceTime,currentRecord) {
    let winningDistances = [];
    for (let buttonTime = 0; buttonTime < raceTime + 1; buttonTime++) {
        distance = buttonTime * (raceTime - buttonTime);
        if (distance > currentRecord) {
            winningDistances.push(distance);
        }
    }
    return winningDistances;
}

function getNumberOfWinningDistances(raceTime,currentRecord) {
    return getWinningDistances(raceTime,currentRecord).length;
}

let numPossibleWinsForEachRace = [];
for (let i = 0; i < numberOfRaces; i++){
    numPossibleWinsForEachRace.push(
        getNumberOfWinningDistances(data.raceTimes[i], data.currentRecord[i])
    )
}

let multTotal = 1;
for (let i = 0; i < numberOfRaces; i++){
    multTotal *= numPossibleWinsForEachRace[i];
}

console.log(`The solution to part 1 is ${multTotal}`);

// Part 2
const realNumberOfRaces = parseInt(data.raceTimes.join(''));
const realCurrentRecord = parseInt(data.currentRecord.join(''));

function getMinimumButtonTime(raceTime,currentRecord) {
    let minTime = 0;
    for (let buttonTime = 0; buttonTime < raceTime + 1; buttonTime++) {
        distance = buttonTime * (raceTime - buttonTime);
        if (distance > currentRecord) {
            minTime = buttonTime;
            break;
        }
    }
    return minTime;
}

const minButtonTime = getMinimumButtonTime(realNumberOfRaces,realCurrentRecord);

function calculatePossibleWins(minimumButtonTime,numberOfRaces) {
    return ((numberOfRaces+1) - 2*minimumButtonTime);
}

console.log(`The solution to Part 2 is ${calculatePossibleWins(minButtonTime,realNumberOfRaces)}`)