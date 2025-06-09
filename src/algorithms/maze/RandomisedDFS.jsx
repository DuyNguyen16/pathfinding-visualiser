const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

const RandomisedDFS = async (c, speed) => {
    const numRow = c.grid.length;
    const numCol = c.grid[0].length;

    const visited = Array.from({ length: numRow }, () =>
        Array(numCol).fill(false)
    );

    // Start on a random odd cell
    const getRandomOdd = (limit) => {
        const odd = [];
        for (let i = 1; i < limit; i += 2) odd.push(i);
        return odd[Math.floor(Math.random() * odd.length)];
    };

    const startRow = getRandomOdd(numRow);
    const startCol = getRandomOdd(numCol);

    // dawwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
    const dfs = async (row, col) => {
        if (visited[row][col]) return;
        visited[row][col] = true;

        // mark current cell as path
        c.setGrid((prevGrid) => {
            const newGrid = prevGrid.map((r) => r.slice());
            newGrid[row][col] = [0, 10];
            return newGrid;
        });

        await delay(speed);

        const directions = shuffleArray([
            [-2, 0],
            [0, 2],
            [2, 0],
            [0, -2],
        ]);

        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;

            if (
                newRow > 0 &&
                newRow < numRow &&
                newCol > 0 &&
                newCol < numCol &&
                !visited[newRow][newCol]
            ) {
                const wallRow = (row + newRow) / 2;
                const wallCol = (col + newCol) / 2;

                c.setGrid((prevGrid) => {
                    const newGrid = prevGrid.map((r) => r.slice());
                    newGrid[wallRow][wallCol] = [0, 10];
                    return newGrid;
                });

                await delay(speed);
                await dfs(newRow, newCol);
            }
        }
    };

    await dfs(1, 1);
};

export default RandomisedDFS;
