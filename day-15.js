let input = "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7".split(',')
let steps = []

function processStep(step){
  let output = step.split(/=|-/);
  if (step.includes('-')){
    output[1] = '-'
  }
  return output;
}

for (let i = 0; i < input.length; i++){
  steps.push(processStep(input[i]))
}

let boxes = {};

for (let i = 0; i <= 255; i++) {
  boxes[i] = [];
}


function hash (label) {
  let sum = 0;
  for (let i = 0; i < label.length; i++){
    let charCode = label.charCodeAt(i);
    sum += charCode;
    //console.log(sum)
    sum *= 17;
    //console.log(sum)
    sum = sum % 256;
    //console.log(sum)
  }
  return sum;
}


/* // Part 1
let total = 0;
for (let label = 0; label < input.length; label++){
  total += hash(input[label])
}

console.log(total)*/

// Part 2
function fillBoxes(steps, boxes) {
  for (let i = 0; i < steps.length; i++) {
    const boxNumber = hash(steps[i][0]);
    const label = steps[i][0];

  if (steps[i][1] !== '-') {
    const existingLabelIndex = boxes[boxNumber].findIndex(entry => entry[0] === label);
    // check if the label already exists in the box

  if (existingLabelIndex !== -1) { // if the label does already exist
    boxes[boxNumber][existingLabelIndex] = steps[i]; // update it with the new number
  } else {
    boxes[boxNumber].push(steps[i]); // if it doesn't then just push the step
  }
} else {
      boxes[boxNumber] = boxes[boxNumber].filter(entry => entry[0] !== label);
      // if the step has '-', remove the lenses with that label from the box using array.filter()
    }
  }
}

/*To confirm that all of the lenses are installed correctly, add up the focusing power of all
of the lenses. The focusing power of a single lens is the result of multiplying together:
1 + box number
Index in box + 1
Focal length (lens[1]).*/

fillBoxes(steps, boxes);

let totalFocusingPower = 0;
let keysArray = Object.keys(boxes)
for (let number of keysArray){
  if (boxes[number].length > 0){
    for (let lens = 0; lens < boxes[number].length; lens++){
      const focusingPower = (1+parseInt(number))*(lens+1)*(boxes[number][lens][1])
      // console.log(focusingPower)
      totalFocusingPower += focusingPower;
    }
  }
}

console.log(totalFocusingPower)