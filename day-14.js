let platform = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`.split('\n').map(row => row.split('')); // convert each row to array for sliding

function rollNorth (platform) {
    let sliding = true;

    while (sliding) {
        let moveCount = 0;

        for (let row = 1; row < platform.length; row++) {
            for (let col = 0; col < platform[0].length; col++) {
                if (platform[row][col] === 'O' && platform[row - 1][col] === '.') {
                    platform[row][col] = '.';
                    platform[row - 1][col] = 'O';
                    moveCount++;
                    // console.log(moveCount)
                }
            }
        }

        if (moveCount === 0) { // no more possible moves
            sliding = false; // quit the loop
        }
    }
    return platform;
}

function calculateLoad (platform) {
    let load = 0;

    for (let row = 0; row < platform.length; row ++){
        for (let col = 0; col < platform[0].length; col++){
            if (platform[row][col] === 'O'){
                load += platform.length - row;
            }
        }
    }
    return load;
}

// part 2 - west, south and east
function rollWest (platform) {
    let sliding = true;

    while (sliding) {
        let moveCount = 0;

        for (let row = 0; row < platform.length; row++) {
            for (let col = 1; col < platform[0].length; col++) {
                if (platform[row][col] === 'O' && platform[row][col - 1] === '.') {
                    platform[row][col] = '.';
                    platform[row][col -1] = 'O';
                    moveCount++;
                    // console.log(moveCount)
                }
            }
        }

        if (moveCount === 0) { // no more possible moves
            sliding = false; // quit the loop
        }
    }
    return platform;
}

function rollSouth (platform) {
    let sliding = true;

    while (sliding) {
        let moveCount = 0;

        for (let row = platform.length - 2; row >= 0; row--) { // last row won't move
            for (let col = 0; col < platform[0].length; col++) {
                if (platform[row][col] === 'O' && platform[row + 1][col] === '.') {
                    platform[row][col] = '.';
                    platform[row + 1][col] = 'O';
                    moveCount++;
                    // console.log(moveCount)
                }
            }
        }

        if (moveCount === 0) { // no more possible moves
            sliding = false; // quit the loop
        }
    }
    return platform;
}

function rollEast (platform) {
    let sliding = true;

    while (sliding) {
        let moveCount = 0;

        for (let row = 0; row < platform.length; row++) {
            for (let col = platform[0].length - 2; col >= 0 ; col--) { // last column won't move
                if (platform[row][col] === 'O' && platform[row][col + 1] === '.') {
                    platform[row][col] = '.';
                    platform[row][col + 1] = 'O';
                    moveCount++;
                    // console.log(moveCount)
                }
            }
        }

        if (moveCount === 0) { // no more possible moves
            sliding = false; // quit the loop
        }
    }
    return platform;
}

function processPlatform(platform) {
    let cache = [];
    let rolled = platform;

    for (let i = 0; i <= 1000000000; i++) {
        // do a complete cycle:
        rolled = rollNorth(rolled);
        rolled = rollWest(rolled);
        rolled = rollSouth(rolled);
        rolled = rollEast(rolled);

        // cache the platform state
        currentState = JSON.stringify(rolled);

        // cache the state after each cycle
        if (cache.indexOf(currentState) === -1) {
            cache.push(currentState);
        } else {
            const lastIndex = cache.lastIndexOf(currentState);
            console.log(`Last start of cycle at ${lastIndex}`);
            const cycleLength = (i - lastIndex);
            console.log(`Cycle length: ${cycleLength}`);
            const correctIndex = lastIndex + ((1000000000 - i - 1) % cycleLength);
            console.log(correctIndex)
            return cache[correctIndex];
        }
    }
}

const rolled = JSON.parse(processPlatform(platform));
console.log(calculateLoad(rolled))