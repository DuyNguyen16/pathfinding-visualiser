const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const BreadthFirstSearch = async (c, reset) => {
    let queue = [];
    let numRow = c.grid.length;
    let numCol = c.grid[0].length;
    let found = false;

    const visited = Array.from({ length: numRow }, () =>
        Array(numCol).fill(false)
    );
    let prev = Array.from({ length: numRow }, () => Array(numCol).fill([0, 0]));

    let row = [-1, 0, 1, 0];
    let col = [0, 1, 0, -1];

    queue.push([c.startPos[0], c.startPos[1]]);
    visited[c.startPos[0]][c.startPos[1]] = true;

    while (queue.length !== 0 && !found) {
        let currentNode = queue.shift();

        for (let i = 0; i < 4; i++) {
            let neigbourRow = currentNode[0] + row[i];
            let neigbourCol = currentNode[1] + col[i];

            if (neigbourRow < 0 || neigbourRow >= numRow) continue;
            if (neigbourCol < 0 || neigbourCol >= numCol) continue;
            if (visited[neigbourRow][neigbourCol]) continue;
            if (c.grid[neigbourRow][neigbourCol][0] === 1) continue;

            queue.push([neigbourRow, neigbourCol]);
            visited[neigbourRow][neigbourCol] = true;
            prev[neigbourRow][neigbourCol] = [currentNode[0], currentNode[1]];

            if (reset.current) return;

            if (neigbourRow === c.endPos[0] && neigbourCol === c.endPos[1]) {
                found = true;
                break;
            }

            c.setGrid((prevGrid) => {
                const newGrid = prevGrid.map((row, r) =>
                    row.map((cell, col) =>
                        r === neigbourRow && col === neigbourCol
                            ? [4, cell[1]]
                            : cell
                    )
                );
                return newGrid;
            });

            await delay(1);
        }
    }

    if (found) {
        let path = [];
        let s = c.endPos[0];
        let m = c.endPos[1];
        let count = 0;

        while (!(s === c.startPos[0] && m === c.startPos[1])) {
            path.push([s, m]);
            count += 1;
            [s, m] = prev[s][m];
        }

        for (let i = path.length - 1; i > 0; i--) {
            c.setGrid((prevGrid) => {
                const newGrid = prevGrid.map((row, r) =>
                    row.map((cell, col) =>
                        r === path[i][0] && col === path[i][1]
                            ? [5, cell[1]]
                            : cell
                    )
                );
                return newGrid;
            });

            await delay(40);
        }

        c.setPathLength(count - 1);
    }
};

export default BreadthFirstSearch;
