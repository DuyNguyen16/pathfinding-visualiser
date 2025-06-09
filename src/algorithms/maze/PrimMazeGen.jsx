const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getRandomOdd = (limit) => {
    const odd = [];
    for (let i = 1; i < limit; i += 2) odd.push(i);
    return odd[Math.floor(Math.random() * odd.length)];
};

const cloneGrid = (grid) => grid.map((row) => row.map((cell) => [...cell]));

const PrimMazeGen = async (c, speed) => {
    const numRow = c.grid.length;
    const numCol = c.grid[0].length;

    // Initialize entire grid to [1, 1] (walls)
    let newGrid = cloneGrid(c.grid).map((row) =>
        row.map((cell) => {
            if (cell[0] === 2 || cell[0] === 3) {
                return [...cell]; // Preserve start/end
            }
            return [1, 1]; // Set everything else to wall
        })
    );

    c.setGrid(cloneGrid(newGrid));

    const visited = Array.from({ length: numRow }, () =>
        Array(numCol).fill(false)
    );

    const walls = [];

    const startRow = getRandomOdd(numRow);
    const startCol = getRandomOdd(numCol);

    visited[startRow][startCol] = true;
    newGrid[startRow][startCol] = [0, 1];

    const addWalls = (row, col) => {
        const directions = [
            [-2, 0], // Up
            [0, -2], // Left
            [0, 2], // Right
            [2, 0], // Down
        ];

        for (const [dx, dy] of directions) {
            const newRow = row + dx;
            const newCol = col + dy;

            if (
                newRow > 0 &&
                newRow < numRow &&
                newCol > 0 &&
                newCol < numCol &&
                !visited[newRow][newCol]
            ) {
                walls.push([row, col, newRow, newCol]);
            }
        }
    };

    addWalls(startRow, startCol);

    while (walls.length > 0) {
        const index = Math.floor(Math.random() * walls.length);
        const [r1, c1, r2, c2] = walls.splice(index, 1)[0];

        if (!visited[r2][c2]) {
            const wallRow = (r1 + r2) / 2;
            const wallCol = (c1 + c2) / 2;

            const isSpecialCell = (row, col) =>
                newGrid[row][col][0] === 2 || newGrid[row][col][0] === 3;

            newGrid[wallRow][wallCol] = [0, 1];
            visited[wallRow][wallCol] = true;
            // visited[wallRow][wallCol] = true;
            if (isSpecialCell(wallRow, wallCol) || isSpecialCell(r2, c2)) {
                continue;
            }

            newGrid[r2][c2] = [0, 1];
            visited[r2][c2] = true;

            c.setGrid(cloneGrid(newGrid));
            await delay(speed);

            addWalls(r2, c2);
        }
    }
};

export default PrimMazeGen;
