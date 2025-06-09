import { cloneGrid, delay, shuffleArray } from "./functions/utils";

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

    const shuffledPath = shuffleArray(pathCells)

    for (let i = 0; i < count; i++) {
        const [r, col] = shuffledPath[i];
        newGrid[r][col] = [0, 5];
        c.setGrid(cloneGrid(newGrid));
        if (speed !== 0) await delay(speed);
    }

    c.setGrid(cloneGrid(newGrid));
};

export default RandomWeightPlacement;
