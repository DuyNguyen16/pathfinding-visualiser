import { cloneGrid, delay } from "./functions/utils";

const RecursiveDivision = async (c, speed) => {
    const rows = c.grid.length;
    const cols = c.grid[0].length;

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

    // Top and bottom walls
    for (let i = 0; i < cols; i++) {
        if (![2, 3].includes(newGrid[0][i][0])) {
            newGrid[0][i][0] = 1;
        }
        if (![2, 3].includes(newGrid[rows - 1][i][0])) {
            newGrid[rows - 1][i][0] = 1;
        }
        c.setGrid(cloneGrid(newGrid));
        if (speed !== 0) await delay(speed);
    }

    // Left and right walls
    for (let j = 1; j < rows - 1; j++) {
        if (![2, 3].includes(newGrid[j][0][0])) {
            newGrid[j][0][0] = 1;
        }
        if (![2, 3].includes(newGrid[j][cols - 1][0])) {
            newGrid[j][cols - 1][0] = 1;
        }
        c.setGrid(cloneGrid(newGrid));
        if (speed !== 0) await delay(speed);
    }

    await divide(c, newGrid, 1, 1, cols - 2, rows - 2, speed);
};

// Recursive division function
const divide = async (c, grid, x, y, width, height, speed) => {
    if (width <= 2 || height <= 2) return;

    if (width <= height) {
        let possibleYs = [];
        for (let i = y + 1; i < y + height; i += 2) {
            possibleYs.push(i);
        }

        let possibleDoors = [];
        for (let i = x; i < x + width; i += 2) {
            possibleDoors.push(i);
        }

        const wallY = possibleYs[Math.floor(Math.random() * possibleYs.length)];
        const doorX =
            possibleDoors[Math.floor(Math.random() * possibleDoors.length)];

        for (let i = x; i < x + width; i++) {
            if (i === doorX || [2, 3].includes(grid[wallY][i][0])) continue;
            grid[wallY][i][0] = 1;
            c.setGrid(cloneGrid(grid));
            if (speed !== 0) await delay(speed);
        }

        await divide(c, grid, x, y, width, wallY - y, speed); // Top section
        await divide(
            c,
            grid,
            x,
            wallY + 1,
            width,
            y + height - wallY - 1,
            speed
        ); // Bottom section
    } else {
        let possibleXs = [];
        for (let i = x + 1; i < x + width; i += 2) {
            possibleXs.push(i);
        }

        let possibleDoors = [];
        for (let i = y; i < y + height; i += 2) {
            possibleDoors.push(i);
        }

        const wallX = possibleXs[Math.floor(Math.random() * possibleXs.length)];
        const doorY =
            possibleDoors[Math.floor(Math.random() * possibleDoors.length)];

        for (let i = y; i < y + height; i++) {
            if (i === doorY || [2, 3].includes(grid[i][wallX][0])) continue;
            grid[i][wallX][0] = 1;
            c.setGrid(cloneGrid(grid));
            if (speed !== 0) await delay(speed + 39);
        }

        await divide(c, grid, x, y, wallX - x, height, speed); // Left section
        await divide(
            c,
            grid,
            wallX + 1,
            y,
            x + width - wallX - 1,
            height,
            speed
        ); // Right section
    }
};

export default RecursiveDivision;
