// parsing
const inputLines = input.split('\n')

let allSequences = [];
for (let i = 0; i < inputLines.length; i ++) {
    let splitLine = inputLines[i].split(' ');
    for (let i = 0; i < splitLine.length; i++) {
        splitLine[i] = parseInt(splitLine[i]);
    }
    allSequences.push(splitLine);
}

// for part 2 - reverse each sequence
let reversedSequences = [];
for (let i = 0; i < allSequences.length; i++) {
    let currentSeq = allSequences[i].slice();
    let reversedSeq = currentSeq.reverse();
    reversedSequences.push(reversedSeq);
}

// create arrays of differences and add the final element to runningCount to find the next difference for the sequence
function findNextTerm(sequence) {
    let differences = sequence.slice();
    
    let runningCount = 0;
    while (differences.length > 1) {
        const nextDifferences = [];
        for (let i = 1; i < differences.length; i++) {
            nextDifferences.push(differences[i] - differences[i-1]);
        }
        runningCount += nextDifferences[nextDifferences.length - 1];
        differences = nextDifferences;
        //console.log(differences);
    }
    const nextTerm = sequence[sequence.length - 1] + runningCount;
    return nextTerm;
}

let sum = 0;
for (const sequence of allSequences) {
    sum += findNextTerm(sequence);
}

console.log(`The sum of all extrapolated values for part 1 is ${sum}`);

let sumPart2 = 0;
for (const sequence of reversedSequences) {
    sumPart2 += findNextTerm(sequence);
}

console.log(`The sum of all extrapolated values for part 2 is ${sumPart2}`);