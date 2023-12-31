function findMaxValue(inputString, color) {
    const regex = new RegExp(`(\\d+)\\s+${color}`, 'g');
    let max = 0;
    let match;

    while ((match = regex.exec(inputString)) !== null) {
        const value = parseInt(match[1]);
        max = Math.max(max, value);
    };
    return max;
};

let gameList = [];
function parseInput(input){
    inputSplit = input.split(/\r?\n/);
    for (const game of inputSplit){
        gameList.push(game.substring(game.indexOf(": ") + 2));
    };
    return gameList;
}

function puzzle1(input){
    parseInput(input);
    let invalidGames = [];
    for (let i = 0; i < gameList.length; i ++) {
        const maxRed = findMaxValue(gameList[i], 'red');
        const maxGreen = findMaxValue(gameList[i], 'green');
        const maxBlue = findMaxValue(gameList[i], 'blue');

        if ((maxRed > 12) && invalidGames.indexOf((i + 1) === -1)) {
            invalidGames.push(i + 1);
        }
        else if ((maxGreen > 13) && invalidGames.indexOf((i + 1) === -1)) {
            invalidGames.push(i + 1);
        }
        else if ((maxBlue > 14) && invalidGames.indexOf((i + 1) === -1)) {
            invalidGames.push(i + 1);
        };
    };

    let sum = 0;
    for (const game of invalidGames){
        sum += parseInt(game);
    };

    return 5050 - sum;
};

function puzzle2(input){
    parseInput(input);
    let sum  = 0;
    for (const game of gameList) {
        sum += findMaxValue(game, 'red') * findMaxValue(game, 'blue') * findMaxValue(game, 'green');
    };
    return sum;
};
