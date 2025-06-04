const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const RecursiveDivision = async (c) => {
    const rows = c.grid.length;
    const cols = c.grid[0].length;

    // Top and bottom walls
    for (let i = 0; i < cols; i++) {
        if (c.grid[0][i] !== 2 && c.grid[0][i] !== 3) {
            c.grid[0][i] = 1;
        }
        if (c.grid[rows - 1][i] !== 2 && c.grid[rows - 1][i] !== 3) {
            c.grid[rows - 1][i] = 1;
        }
        c.setGrid([...c.grid]);
        await delay(40);
    }

    // Left and right walls
    for (let j = 1; j < rows - 1; j++) {
        if (c.grid[j][0] !== 2 && c.grid[j][0] !== 3) {
            c.grid[j][0] = 1;
        }
        if (c.grid[j][cols - 1] !== 2 && c.grid[j][cols - 1] !== 3) {
            c.grid[j][cols - 1] = 1;
        }
        c.setGrid([...c.grid]);
        await delay(40);
    }

    await divide(c, 1, 1, cols - 2, rows - 2);
};

const divide = async (c, x, y, width, height) => {
    if (width <= 2 || height <= 2) return;
    let potentialWalls = [];
    let potentialDoor = [];

    if (width > height) {
        for (let i = x; i < x + width; i++) {
            if (i % 2 == 0) {
                potentialWalls.push(i);
            }
        }

        for (let j = y; j < y + height; j++) {
            if (j % 2 !== 0) {
                potentialDoor.push(j);
            }
        }

        const randomX =
            potentialWalls[Math.floor(Math.random() * potentialWalls.length)];
        const randomY =
            potentialDoor[Math.floor(Math.random() * potentialDoor.length)];
        const wallX = randomX;

        for (let j = y; j < y + height; j++) {
            if (j == randomY || c.grid[j][wallX] == 2 || c.grid[j][wallX] == 3)
                continue;
            c.grid[j][wallX] = 1;
            c.setGrid([...c.grid]);
            await delay(40);
        }

        divide(c, x, y, wallX - x, height); // Left
        divide(c, wallX + 1, y, x + width - wallX - 1, height); // Right
    } else {
        for (let i = y; i < y + height; i++) {
            if (i % 2 == 0) {
                potentialWalls.push(i);
            }
        }

        for (let j = x; j < x + width; j++) {
            if (j % 2 !== 0) {
                potentialDoor.push(j);
            }
        }

        const randomY =
            potentialWalls[Math.floor(Math.random() * potentialWalls.length)];
        const randomX =
            potentialDoor[Math.floor(Math.random() * potentialDoor.length)];
        const wallX = randomY;

        for (let j = x; j < x + width; j++) {
            if (j == randomX || c.grid[wallX][j] == 2 || c.grid[wallX][j] == 3)
                continue;
            c.grid[wallX][j] = 1;
            c.setGrid([...c.grid]);
            await delay(40);
        }

        divide(c, x, y, width, wallX - y); // Top
        divide(c, x, wallX + 1, width, y + height - wallX - 1); // Bottom
    }
};

export default RecursiveDivision;
