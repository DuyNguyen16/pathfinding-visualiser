const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

// Start on a random odd cell
const getRandomOdd = (limit) => {
    const odd = [];
    for (let i = 1; i < limit; i += 2) odd.push(i);
    return odd[Math.floor(Math.random() * odd.length)];
};

const cloneGrid = (grid) => grid.map((row) => row.map((cell) => [...cell]));

const RandomisedDFS = async (c, speed) => {
    const numRow = c.grid.length;
    const numCol = c.grid[0].length;
    let newGrid = cloneGrid(c.grid);

    const visited = Array.from({ length: numRow }, () =>
        Array(numCol).fill(false)
    );

    const startRow = getRandomOdd(numRow);
    const startCol = getRandomOdd(numCol);

    const dfs = async (row, col, newGrid) => {
        if (visited[row][col]) return;

        const around = [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1],
            [-1, -1],
            [-1, 1],
            [1, -1],
            [1, 1],
        ];

        visited[row][col] = true;

        for (const [x, y] of around) {
            if (visited[row + x][col + y]) continue;
            newGrid[row + x][col + y] = [1, 1];
        }

        c.setGrid(cloneGrid(newGrid));

        for (const [x, y] of around) {
            visited[row + x][col + y] = true;
        }

        await delay(speed);

        const directions = shuffleArray([
            [-2, 0],
            [0, 2],
            [2, 0],
            [0, -2],
        ]);

        for (const [directRow, directCol] of directions) {
            const newRow = row + directRow;
            const newCol = col + directCol;

            if (
                newRow > 0 &&
                newRow < numRow &&
                newCol > 0 &&
                newCol < numCol &&
                !visited[newRow][newCol]
            ) {
                const wallRow = (row + newRow) / 2;
                const wallCol = (col + newCol) / 2;

                newGrid[wallRow][wallCol] = [0, 1];
                c.setGrid(cloneGrid(newGrid));

                await delay(speed);
                await dfs(newRow, newCol, newGrid);
            }
        }
    };

    await dfs(startRow, startCol, newGrid);
};

export default RandomisedDFS;
