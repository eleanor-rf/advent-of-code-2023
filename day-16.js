//parse input
const raw = String.raw`.|...\....
|.-.\.....
.....|-...
........|.
..........
.........\
..../.\\..
.-.-/..|..
.|....-|.\
..//.|....`;

const contraption = raw.replace(/\\/g, '7').split('\n');
for (let i = 0; i < contraption.length; i++) {
    contraption[i] = contraption[i].split('');
}

function traverse(map, row = 0, column = 0, direction = 'right', travelling = true, visited = new Set()) {
    const isValidMove = (r, c) => r >= 0 && r < map.length && c >= 0 && c < map[row].length;

    while (travelling){
        if (!isValidMove(row,column) || visited.has(`row: ${row}, column: ${column}, direction: ${direction}`)) {
            travelling = false;
            continue;
        }

        visited.add(`row: ${row}, column: ${column}, direction: ${direction}`);

        const cell = map[row][column];

        if (cell === '/') {
            switch (direction) {
              case 'up':
                direction = 'right';
                break;
              case 'down':
                direction = 'left';
                break;
              case 'left':
                direction = 'down';
                break;
              case 'right':
                direction = 'up';
                break;
            }
        } else if (cell === '7') {
            switch (direction) {
              case 'up':
                direction = 'left';
                break;
              case 'down':
                direction = 'right';
                break;
              case 'left':
                direction = 'up';
                break;
              case 'right':
                direction = 'down';
                break;
            }
        } else if (cell === '-' && (direction === "down" || direction === "up")) {
            return traverse(map, row, column+1, 'right', true, visited), traverse(map, row, column-1, 'left', true, visited);
        } else if (cell === '|' && (direction === "right" || direction ==="left")) {
            return traverse(map, row-1, column, 'up', true, visited), traverse(map, row+1, column, 'down', true, visited);
        }

        if (direction === 'right') column++;
        else if (direction === 'left') column--;
        else if (direction === 'up') row--;
        else if (direction === 'down') row++;
    }

    return visited;
}

const visited = traverse(contraption);

const uniquePositions = new Set();

for (const entry of visited) {
  const row = parseInt(entry.split(', column:')[0].split('row: ')[1], 10);
  const column = parseInt(entry.split(', direction:')[0].split('column: ')[1], 10);

  const positionString = `row: ${row}, column: ${column}`;
  uniquePositions.add(positionString);
}

console.log(uniquePositions.size)

