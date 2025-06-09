import { getRandomOdd, delay, cloneGrid } from "./functions/utils";

const Prims = async (c, speed) => {
    const numRow = c.grid.length;
    const numCol = c.grid[0].length;

    // Initialize entire grid to [1, 1] (walls) except for start and end cell
    let newGrid = cloneGrid(c.grid).map((row) =>
        row.map((cell) => {
            if (cell[0] === 2 || cell[0] === 3) {
                return [...cell]; // Preserve start/end
            }
            return [1, 1]; // Set everything else to wall
        })
    );

    c.setGrid(cloneGrid(newGrid));

    // Visited grid to track visited cells
    const visited = Array.from({ length: numRow }, () =>
        Array(numCol).fill(false)
    );

    const walls = [];

    const startRow = getRandomOdd(numRow);
    const startCol = getRandomOdd(numCol);

    visited[startRow][startCol] = true;
    newGrid[startRow][startCol] = [0, 1];

    const addCellWalls = (row, col) => {
        const directions = [
            [-2, 0], // Up
            [0, -2], // Left
            [0, 2], // Right
            [2, 0], // Down
        ];

        for (const [directionX, directionY] of directions) {
            const neighbourRow = row + directionX;
            const neighbourCol = col + directionY;

            if (
                neighbourRow > 0 &&
                neighbourRow < numRow &&
                neighbourCol > 0 &&
                neighbourCol < numCol &&
                !visited[neighbourRow][neighbourCol]
            ) {
                walls.push([row, col, neighbourRow, neighbourCol]);
            }
        }
    };

    // Initialise wall list with the starting cell
    addCellWalls(startRow, startCol);

    while (walls.length > 0) {
        // Pick a random wall from the list
        const index = Math.floor(Math.random() * walls.length);
        const [r1, c1, r2, c2] = walls.splice(index, 1)[0];

        // Only proceed if the neighbor cell hasn't been visited
        if (!visited[r2][c2]) {
            const wallRow = (r1 + r2) / 2;
            const wallCol = (c1 + c2) / 2;

            const isSpecialCell = (row, col) =>
                newGrid[row][col][0] === 2 || newGrid[row][col][0] === 3;

            newGrid[wallRow][wallCol] = [0, 1];
            visited[wallRow][wallCol] = true;

            if (isSpecialCell(wallRow, wallCol) || isSpecialCell(r2, c2)) {
                continue;
            }
            // Remove the wall (convert to passage)
            newGrid[r2][c2] = [0, 1];
            visited[r2][c2] = true;

            // Update the grid visually
            c.setGrid(cloneGrid(newGrid));
            if (speed !== 0) await delay(speed);
            
            // Add the neighbor's walls to the wall list
            addCellWalls(r2, c2);
        }
    }
};

export default Prims;
