import {
    shuffleArray,
    delay,
    cloneGrid,
    getRandomOdd,
} from "./functions/utils";

const InvertedRDFS = async (c, speed) => {
    const numRow = c.grid.length;
    const numCol = c.grid[0].length;

    // Create a deep copy of the grid to modify
    let newGrid = cloneGrid(c.grid).map((row) =>
        row.map((cell) => {
            if (cell[0] === 2 || cell[0] === 3) {
                return [...cell]; // Preserve start/end
            }
            return [1, 1]; // Set everything else to wall
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

        if (newGrid[row][col][0] !== 2 && newGrid[row][col][0] !== 3) {
            newGrid[row][col] = [0, 1];
            c.setGrid(cloneGrid(newGrid));
        }
        // Mark current cell as visited
        visited[row][col] = true;

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

                if (newGrid[wallRow][wallCol][0] === 2 && newGrid[wallRow][wallCol][0] === 3)
                    continue;

                // Carve passage through the wall
                newGrid[wallRow][wallCol] = [0, 1];
                c.setGrid(cloneGrid(newGrid));

                if (speed !== 0) await delay(speed + 39);
                // Recursively visit the neighbor cell
                await dfs(neighbourRow, neighbourCol, newGrid);
            }
        }
    };

    // Begin the maze generation from the starting cell
    await dfs(startRow, startCol, newGrid);
};

export default InvertedRDFS;
