const inputLines = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`.split('\n')

/*
//part 1 parsing
let puzzles = [];
for (let i = 0; i < inputLines.length; i++){
    let puzzle = inputLines[i].split(' ')[0];
    const groupSizes = inputLines[i].split(' ')[1];
    const groupSizeArray = groupSizes.split(',').map(Number);
    puzzles.push([puzzle, groupSizeArray]);
};
*/

// part 2 parsing
let puzzles = []
for (let i = 0; i < inputLines.length; i++){
    let puzzle = inputLines[i].split(' ')[0];
    const groupSizes = inputLines[i].split(' ')[1];
    const groupSizeArray = groupSizes.split(',').map(Number);

    const expandedPuzzle = Array.from({ length: 5 }, () => puzzle + '?').join('');
    
    let expandedGroupSize = []
    for (let i = 0; i < 5; i++){
        expandedGroupSize.push(groupSizeArray);
    };

    puzzles.push([expandedPuzzle.slice(0,-1), expandedGroupSize.flat()]);
};

function findSolutions(puzzle, groupSizes, groupCounter = 0) {
    if (!puzzle.length) {
        return !groupSizes.length && !groupCounter;
    }
    
    let numSolutions = 0;
    const possibleChars = puzzle[0] === '?' ? ['.', '#'] : [ puzzle[0] ];

    for (const char of possibleChars) {
        if (char === '#') {
            numSolutions += findSolutionsMemo(puzzle.slice(1), groupSizes, groupCounter + 1);
        } else {
            if (groupCounter) {
                if (groupSizes.length && groupSizes[0] === groupCounter) {
                    numSolutions += findSolutionsMemo(puzzle.slice(1), groupSizes.slice(1));
                } 
            } else {
                numSolutions += findSolutionsMemo(puzzle.slice(1), groupSizes);
            }
        }
    }
    return numSolutions;
}

function memoize(func) {
    const cache = {};

    return function(...args) {
        const key = JSON.stringify(args);

        if (key in cache) {
            console.log(`Fetching ${key}`)
            return cache[key];
        }

    const result = func.apply(this, args);
    cache[key] = result;

    return result;
  };
}

const findSolutionsMemo = memoize(findSolutions);

let sum = 0;
for (let i = 0; i < puzzles.length; i ++){
    sum += findSolutionsMemo(puzzles[i][0] + '.', puzzles[i][1]);
    console.log(`Calculating, current sum is ${sum}, on puzzle ${i+1} of 1000`);
}
console.log(`Sum of possible solutions is ${sum}`);
