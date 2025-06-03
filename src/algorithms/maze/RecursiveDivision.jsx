const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const RecursiveDivision = async (c) => {
    for (let i = 0; i < c.grid[0].length; i++) {
        c.grid[0][i] = 1;
        c.grid[c.grid.length - 1][i] = 1;
        c.setGrid([...c.grid])
        await delay(40);
    }

    for (let j = 1; j < c.grid.length - 1; j++) {
        c.grid[j][0] = 1;
        c.grid[j][c.grid[0].length - 1] = 1;
        c.setGrid([...c.grid])
        await delay(40);
    }

    
};

const divide = () => {
    
};

export default RecursiveDivision;
