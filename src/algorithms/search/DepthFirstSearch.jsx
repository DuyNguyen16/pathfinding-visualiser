const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const DepthFirstSearch = async (c, reset) => {
    const visited = Array.from({ length: c.grid.length }, () =>
        Array(c.grid[0].length).fill(false)
    );

    const path = [];
    let found = false;

    const dfs = async (r, col) => {
        if (reset.current || found) return;
        if (visited[r][col]) return;
        visited[r][col] = true;

        
        if (c.grid[r][col][0] !== 2 && c.grid[r][col][0] !== 3) {
            c.setGrid((prevGrid) => {
                const newGrid = prevGrid.map((row, ri) =>
                    row.map((cell, ci) =>
                        ri === r && ci === col ? [4, cell[1]] : cell
                    )
                );
                return newGrid;
            });
            await delay(40);
        }

        path.push([r, col]);

        if (r === c.endPos[0] && col === c.endPos[1]) {
            found = true;
            return;
        }

        const dirRow = [-1, 0, 1, 0];
        const dirCol = [0, 1, 0, -1];

        for (let i = 0; i < 4; i++) {
            const nr = r + dirRow[i];
            const nc = col + dirCol[i];

            if (
                nr < 0 ||
                nr >= c.grid.length ||
                nc < 0 ||
                nc >= c.grid[0].length ||
                visited[nr][nc] ||
                c.grid[nr][nc][0] === 1
            ) {
                continue;
            }

            await dfs(nr, nc);
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
        await delay(40);
    }

    c.setPathLength(count - 1);
};

export default DepthFirstSearch;
