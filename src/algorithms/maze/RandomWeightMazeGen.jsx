const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const cloneGrid = (grid) => grid.map((row) => row.map((cell) => [...cell]));

const RandomWeightPlacement = async (c, speed, density = 0.2) => {
    const numRow = c.grid.length;
    const numCol = c.grid[0].length;

    let newGrid = cloneGrid(c.grid);

    const pathCells = [];
    for (let row = 0; row < numRow; row++) {
        for (let col = 0; col < numCol; col++) {
            const [type, _] = newGrid[row][col];
            if (type === 0) pathCells.push([row, col]);
        }
    }

    const count = Math.floor(pathCells.length * density);

    // Shuffle
    for (let i = pathCells.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pathCells[i], pathCells[j]] = [pathCells[j], pathCells[i]];
    }

    for (let i = 0; i < count; i++) {
        const [r, col] = pathCells[i]; // renamed here to 'col' instead of 'c'
        newGrid[r][col] = [0, 5];
        c.setGrid(cloneGrid(newGrid)); // correctly call c.setGrid here
        await delay(speed);
    }

    c.setGrid(cloneGrid(newGrid));
};

export default RandomWeightPlacement;
