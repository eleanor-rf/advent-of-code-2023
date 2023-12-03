inputSplit = input.split(/\r?\n/);

// regex test if a character is a special character
// won't match 'undefined' - takes care of bug when number is at start/end of row
function isSpecial(str){
 return /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/g.test(str);
}

function isTouchingASymbol(array,row,column,length) {
    // check the row above, if it exists
    if (row != 0) {
        for (let i = column - 1; i < column + length + 1; i++){
            if (isSpecial(array[row-1][i])) {
                return true; // there is a special character above, on diagonal or directly
            }
        }
    }
    // check the row below, if it exists
    if (row != (array.length - 1)) {
        for (let i = column - 1; i < column + length + 1; i++) {
            if (isSpecial(array[row+1][i])) {
                return true; //there is a special char below, on diagonal or directly
            }
        }
    }
    // check the column to the left, if it exists
    if (column != 0) {
        if (isSpecial(array[row][column-1])) {
            return true; //there is a special char directly to the left
        }
    }
    // check the column to the right, if it exists
    if (column != (array[row].length - 1)) {
        if (isSpecial(array[row][column+length])) {
            return true; //there is a special char directly to the right
        }
    }
    return false;
}

// find all the numbers in the input by their row, start column, and length
function findNumberStartAndLength(input) {
    let data = [];
    for (let row = 0; row < input.length; row++) {
        let startColumn = -1;
        let length = 0;

        for (let column = 0; column < input[row].length+1; column++) {
            const currentChar = input[row][column];

            // if the current char is a number, record start position and start counting 'length' from the current index
            if (!isNaN(parseInt(currentChar))) {
                if (startColumn === -1) {
                    startColumn = column;
                }
                length++;
            } else {
                if (startColumn !== -1) {
                    // found the end of the number, now push its position and length to result array
                    data.push({
                        row: row,
                        column: startColumn,
                        length: length,
                    });
                    startColumn = -1;
                    length = 0;
                }
            }
        }
    }
    return data;
}

let numberList = findNumberStartAndLength(inputSplit);
// check all of the found numbers and if they are touching a symbol, push to the engineParts array
let engineParts = [];
for (const data of numberList) {
    if(isTouchingASymbol(inputSplit,data['row'],data['column'],data['length']) === true) {
        engineParts.push(inputSplit[data['row']].substring(data['column'],data['column'] + data['length']));
    }
}

// sum of valid engine part numbers
sum = 0;
for (const part of engineParts){
    sum += parseInt(part);
}
