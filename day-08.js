// parse the input
const inputLines = input.split('\n');
const instructions = inputLines[0].split('');

let nodes = [];
for (let i = 2; i < inputLines.length; i++){
    nodes.push({
        node: inputLines[i].slice(0,3),
        elements: inputLines[i].slice(7,-1).split(', ')
    })
}

// find path length from AAA
function findPathLength(){
    let currentNode = 'AAA' // start at AAA
    let count = 0;
    let i = 0;
    while (currentNode != 'ZZZ') {
        // locate the object with the current node
        currentObject = nodes.find(item => item.node === currentNode);
        let currentNodeElements = currentObject.elements;
        
        // update currentNode to the next node based on left/right
        if (instructions[i] === 'L') {
            currentNode = currentNodeElements[0];
        } else if (instructions[i] === 'R') {
            currentNode = currentNodeElements[1]
        }

        i = (i + 1) % instructions.length; // iterate through array, go back to start if needed
        count++;

        if (currentNode === 'ZZZ') {
            return count; // break once appropriate node is found
        }
    }
}

//find path length from anywhere
function findPathLengthFrom(startingNode){
    let currentNode = startingNode
    let count = 0;
    let i = 0;
    while (currentNode[2] != 'Z') {
        // locate the object with the current node
        currentObject = nodes.find(item => item.node === currentNode);
        let currentNodeElements = currentObject.elements;
        
        // update currentNode to the next node based on left/right
        if (instructions[i] === 'L') {
            currentNode = currentNodeElements[0];
        } else if (instructions[i] === 'R') {
            currentNode = currentNodeElements[1]
        }
        
        //console.log(currentNode);
        i = (i + 1) % instructions.length; // iterate through array, go back to start if needed
        count++;
        //console.log(count)

        if (currentNode[2] === 'Z') {
            return count;
        }
    }
}

// check path lengths for all nodes ending in A
let counts = []
for (let i = 0; i < nodes.length; i++ ) {
    if (nodes[i].node[2] === 'A'){
    counts.push(findPathLengthFrom(nodes[i].node));
    }
}

// find the lowest common multiple of all counts to find the minimum number of steps
function findLCMOfArray(...numbers) {
  const greatestCommonDivisor = (x, y) => (!y ? x : greatestCommonDivisor(y, x % y)); //recursively find GCD
  const lowestCommonMultiple = (x, y) => (x * y) / greatestCommonDivisor(x, y);
  return [...numbers].reduce((a, b) => lowestCommonMultiple(a, b));
};

console.log(findLCMOfArray(...counts))
// that's a lot of steps!