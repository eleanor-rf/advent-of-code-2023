// manually inspected the input to find S
// console.log(inputRows[128][88]) // found it! and it's an |

// part 2 - create empty matrix
const numRows = 140;
const numCols = 140;
const coords = [];
for (let i = 0; i < numRows; i ++){
    const row = [];
    for (let j = 0; j < numCols; j++){
        row.push(0);
    }
    coords.push(row);
}

let pos = { row: 127, column: 88};
// starting above S at 127,88 which is also |, and heading North
let looping = true;
let direction = 'North'
let count = 0;

// traverse the pipes with this huge while loop
// keep track of current position and direction
while (looping === true) {
    coords[pos.row][pos.column] = 1;

    if (pos.row === 128 && pos.column === 88){
        looping = false;
    }
    if (inputRows[pos.row][pos.column] === 'L'){
        if (direction === 'West') {
            pos.row-=1
            direction = 'North'
        } else if (direction === 'South') {
            pos.column+=1
            direction = 'East'
        }
    } else if (inputRows[pos.row][pos.column] === 'J'){
        if (direction === 'South'){
            pos.column-=1
            direction = 'West'
        } else if (direction === 'East'){
            pos.row-=1
            direction = 'North'
        }
    } else if (inputRows[pos.row][pos.column] === '7'){
        if (direction === 'East'){
            pos.row+=1
            direction = 'South'
        } else if (direction === 'North') {
            pos.column-=1
            direction = 'West'
        }
    } else if (inputRows[pos.row][pos.column] === 'F'){
        if (direction === 'North') {
            pos.column+=1
            direction = 'East'
        } else if (direction === 'West') {
            pos.row+=1
            direction = 'South'
        }
    } else if (inputRows[pos.row][pos.column] === '-'){
        if (direction === 'East'){
            pos.column += 1
        } else if (direction === 'West'){
            pos.column -= 1
        }
    } else if (inputRows[pos.row][pos.column] === '|'){
        if (direction === 'North'){
            pos.row -= 1;
        } else if (direction === 'South'){
            pos.row += 1
        }
    }
    count++
}

console.log(`For Part 1, steps to the farthest point is ${count / 2}`);

let tilesInside = 0;

for (let row = 0; row < inputRows.length; row++) {
    let unpaired = false;

    for (let col = 0; col < inputRows[0].length; col++) {
        if (coords[row][col] === 1) { // if the coord is part of the loop
            if ('|JL'.indexOf(inputRows[row][col]) !== -1) {
                unpaired = !unpaired; // toggle true/false depending on parity
                // J cancels F, L cancels 7
                // pipe is cancelled by pipe
            }
        } else {
            tilesInside += unpaired; // if parity is ODD i.e. TRUE, add 1 to the count
            // if it is EVEN (false), add 0 to the count
        }
    }
}

console.log(`For Part 2, there are ${tilesInside} tiles inside the loop.`);
