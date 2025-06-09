const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const BreadthFirstSearch = async (c, reset, speed) => {
    const numRow = c.grid.length;
    const numCol = c.grid[0].length;
    let found = false;

    // Visited grid to track visited cells
    const visited = Array.from({ length: numRow }, () =>
        Array(numCol).fill(false)
    );

    // Previous cell tracking for path reconstruction
    const prev = Array.from({ length: numRow }, () =>
        Array(numCol).fill([0, 0])
    );

    // Directions: up, right, down, left
    const directions = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1],
    ];

    // BFS uses a queue, not a heap
    const queue = [];

    // Start from the start position
    queue.push([c.startPos[0], c.startPos[1]]);
    visited[c.startPos[0]][c.startPos[1]] = true;

    // BFS main loop
    while (queue.length > 0 && !found) {
        const [currentRow, currentCol] = queue.shift();

        for (let i = 0; i < 4; i++) {
            const neighbourRow = currentRow + directions[i][0];
            const neighbourCol = currentCol + directions[i][1];

            if (neighbourRow < 0 || neighbourRow >= numRow) continue;
            if (neighbourCol < 0 || neighbourCol >= numCol) continue;
            if (visited[neighbourRow][neighbourCol]) continue;
            if (c.grid[neighbourRow][neighbourCol][0] === 1) continue;

            // Mark visited and save path
            queue.push([neighbourRow, neighbourCol]);
            visited[neighbourRow][neighbourCol] = true;
            prev[neighbourRow][neighbourCol] = [currentRow, currentCol];

            // Handle user cancel/reset
            if (reset.current) return;

            // If end is found, stop
            if (neighbourRow === c.endPos[0] && neighbourCol === c.endPos[1]) {
                found = true;
                break;
            }

            // Visualize visiting node
            c.setGrid((prevGrid) => {
                const newGrid = prevGrid.map((row, rowIndex) =>
                    row.map((cell, colIndex) =>
                        rowIndex === neighbourRow && colIndex === neighbourCol
                            ? [4, cell[1]] // Mark as visited
                            : cell
                    )
                );
                return newGrid;
            });

            await delay(speed);
        }
    }

    // If end was reached, reconstruct and animate path
    if (found) {
        const path = [];
        let [x, y] = c.endPos;
        let count = 0;

        // Backtrack from end to start
        while (!(x === c.startPos[0] && y === c.startPos[1])) {
            path.push([x, y]);
            [x, y] = prev[x][y];
        }

        // Animate the path
        for (let i = path.length - 1; i > 0; i--) {
            count++;
            const [r, col] = path[i];
            c.setGrid((prevGrid) => {
                const newGrid = prevGrid.map((row, rowIndex) =>
                    row.map((cell, colIndex) =>
                        rowIndex === r && colIndex === col
                            ? [5, cell[1]] // Mark as part of path
                            : cell
                    )
                );
                return newGrid;
            });

            await delay(speed);
        }

        c.setPathLength(count);
    }
};

export default BreadthFirstSearch;
