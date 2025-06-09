const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const DepthFirstSearch = async (c, reset, speed) => {
    const numRow = c.grid.length;
    const numCol = c.grid[0].length;
    const path = [];
    let found = false;

    const visited = Array.from({ length: c.grid.length }, () =>
        Array(c.grid[0].length).fill(false)
    );

    const dfs = async (row, col) => {
        if (reset.current || found) return;
        if (visited[row][col]) return;
        visited[row][col] = true;

        // update grid visual
        if (c.grid[row][col][0] !== 2 && c.grid[row][col][0] !== 3) {
            c.setGrid((prevGrid) => {
                const newGrid = prevGrid.map((r, rowIndex) =>
                    r.map((cell, colIndex) =>
                        rowIndex === row && colIndex === col
                            ? [4, cell[1]]
                            : cell
                    )
                );
                return newGrid;
            });
            await delay(speed);
        }

        path.push([row, col]);

        if (row === c.endPos[0] && col === c.endPos[1]) {
            found = true;
            return;
        }

        // Directions: up, right, down, left
        const directions = [
            [-1, 0],
            [0, 1],
            [1, 0],
            [0, -1],
        ];

        // Loop through each neighbours
        for (let i = 0; i < 4; i++) {
            const neighbourRow = row + directions[i][0];
            const neighbourCol = col + directions[i][1];

            if (neighbourRow < 0 || neighbourRow >= numRow) continue;
            if (neighbourCol < 0 || neighbourCol >= numCol) continue;
            if (visited[neighbourRow][neighbourCol]) continue;
            if (c.grid[neighbourRow][neighbourCol][0] === 1) continue;

            await dfs(neighbourRow, neighbourCol);
            if (found) return;
        }

        if (!found) {
            path.pop();
        }
    };

    await dfs(c.startPos[0], c.startPos[1]);

    // Draw final path
    let count = 0;
    for (let i = 1; i < path.length - 1; i++) {
        if (reset.current) return;
        const [r, col] = path[i];

        c.setGrid((prevGrid) => {
            const newGrid = prevGrid.map((row, ri) =>
                row.map((cell, ci) =>
                    ri === r && ci === col ? [5, cell[1]] : cell
                )
            );
            return newGrid;
        });

        count++;
        await delay(speed);
    }

    c.setPathLength(count);
};

export default DepthFirstSearch;
