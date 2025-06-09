import {
    shuffleArray,
    delay,
    cloneGrid,
    getRandomOdd,
} from "./functions/utils";

const RandomisedDFS = async (c, speed) => {
    const numRow = c.grid.length;
    const numCol = c.grid[0].length;

    // Create a deep copy of the grid to modify
        let newGrid = cloneGrid(c.grid).map((row) =>
        row.map((cell) => {
            if (cell[0] === 2 || cell[0] === 3) {
                return [...cell]; // Preserve start/end
            }
            return [0, 1]; // Set everything else to wall
        })
    );

    c.setGrid(cloneGrid(newGrid));

    // Track which cells have been visited
    const visited = Array.from({ length: numRow }, () =>
        Array(numCol).fill(false)
    );

    // Choose a random odd cell as the starting point
    const startRow = getRandomOdd(numRow);
    const startCol = getRandomOdd(numCol);

    const dfs = async (row, col, newGrid) => {
        if (visited[row][col]) return;

        // Offsets to set the surrounding 8 neighboring cells as walls
        const aroundWalls = [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1],
            [-1, -1],
            [-1, 1],
            [1, -1],
            [1, 1],
        ];

        // Mark current cell as visited
        visited[row][col] = true;

        // Set surrounding cells to walls (ensuring isolation of paths)
        for (const [x, y] of aroundWalls) {
            if (visited[row + x][col + y]) continue;
            newGrid[row + x][col + y] = [1, 1];
            visited[row + x][col + y] = true;
        }

        c.setGrid(cloneGrid(newGrid));

        if (speed !== 0) await delay(speed);

        const directions = shuffleArray([
            [-2, 0],
            [0, 2],
            [2, 0],
            [0, -2],
        ]);

        // Explore each unvisited neighbor recursively
        for (const [directionRow, directionCol] of directions) {
            const neighbourRow = row + directionRow;
            const neighbourCol = col + directionCol;

            // Check if neighbor is within bounds and unvisited
            if (
                neighbourRow > 0 &&
                neighbourRow < numRow &&
                neighbourCol > 0 &&
                neighbourCol < numCol &&
                !visited[neighbourRow][neighbourCol]
            ) {
                // Compute position of wall between current cell and neighbor
                const wallRow = (row + neighbourRow) / 2;
                const wallCol = (col + neighbourCol) / 2;

                // Carve passage through the wall
                newGrid[wallRow][wallCol] = [0, 1];
                c.setGrid(cloneGrid(newGrid));

                if (speed !== 0) await delay(speed);
                // Recursively visit the neighbor cell
                await dfs(neighbourRow, neighbourCol, newGrid);
            }
        }
    };

    // Begin the maze generation from the starting cell
    await dfs(startRow, startCol, newGrid);
};

export default RandomisedDFS;
