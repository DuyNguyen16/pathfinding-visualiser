const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let found = false;
let path = [];

const isSame = (a, b) => a[0] === b[0] && a[1] === b[1];

export const DepthFirstSearch = async (c, reset) => {
    found = false;
    path = [];

    let v = c.startPos;
    await dfs(c, v, reset);

    let count = 0;
    for (let i = 1; i < path.length - 1; i++) {
        count += 1;
        if (reset.current) return;
        const [r, col] = path[i];
        c.grid[r][col] = 5;
        c.setGrid([...c.grid]);
        await delay(1);
    }

    c.setPathLength(count);
};

const dfs = async (c, v, reset) => {
    if (reset.current) return;
    const [row, col] = v;

    const directionRow = [-1, 0, 1, 0]; // up, right, down, left
    const directionCol = [0, 1, 0, -1];

    path.push(v);

    for (let i = 0; i < 4; i++) {
        if (reset.current || found) return;

        const neigbourRow = row + directionRow[i];
        const neigbourCol = col + directionCol[i];

        // Bounds check
        if (
            neigbourRow < 0 ||
            neigbourRow >= c.grid.length ||
            neigbourCol < 0 ||
            neigbourCol >= c.grid[0].length
        ) {
            continue;
        }

        const cell = c.grid[neigbourRow][neigbourCol];

        // Skip walls and visited
        if (cell === 4 || cell === 2 || cell == 1) continue;

        // Found the end
        if (cell === 3) {
            found = true;
            path.push([neigbourRow, neigbourCol]);
            return;
        }

        // Visit the cell
        c.grid[neigbourRow][neigbourCol] = 4;
        c.setGrid([...c.grid]);
        await delay(40);

        await dfs(c, [neigbourRow, neigbourCol], reset);
    }

    if (!found && isSame(path.at(-1), v) && !isSame(v, c.endPos)) {
        path.pop();
    }
};

export default DepthFirstSearch;