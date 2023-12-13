const input = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`.split('\n\n');

let patterns = []
for (let i = 0; i < input.length; i ++){
    patterns.push(input[i].split('\n'));
}

function transpose(a) {
    return Object.keys(a[0]).map(function(c) {
        return a.map(function(r) { return r[c]; }).join('');
    });
}

function findSymmetry(array) {
    let seriesLength = array.length;

    for (let i = 0; i < seriesLength - 1; i++){
        // let symmetric = true;
        let up = i;
        let down = i+1;
        let smudges = 0;

        while ((up >= 0) && (down < seriesLength)) {
            if (array[up] !== array[down]){
            /*symmetric = false;
            break;*/
                for (let j = 0; j < array[up].length; j++){
                    if (array[up][j] !== array[down][j]){
                        smudges++
                    }
                }
            }
            up--
            down++
        }
    // part 1 - return the rows/cols before line of symmetry
    /*if (symmetric === true){
        return i+1;}*/
    
    // part 2 - return the same if smudge was fixed
        if (smudges === 1){ // if there was exactly 1 difference between the rows then that is THE smudge making a new reflection line valid
        return i+1;
        }
    }
    return null;
}

let sum = 0;
// To summarize your pattern notes, add up the number of columns to the left of each vertical line of reflection; to that, also add 100 multiplied by the number of rows above each horizontal line of reflection.
for (let i = 0; i < patterns.length; i++) {
    sum += (findSymmetry(patterns[i])*100 + findSymmetry(transpose(patterns[i])));
}

console.log(sum);