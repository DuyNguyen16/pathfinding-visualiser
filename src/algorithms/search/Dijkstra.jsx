const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Dijkstra = async (c, reset) => {
    const numRow = c.grid.length;
    const numCol = c.grid[0].length;

    const distance = Array.from({ length: numRow }, () =>
        Array(numCol).fill(Infinity)
    );
    const prev = Array.from({ length: numRow }, () =>
        Array(numCol).fill([0, 0])
    );

    const rowDirection = [-1, 0, 1, 0];
    const colDirection = [0, 1, 0, -1];

    const compare = (a, b) => a[0] - b[0]; // min-heap based on distance

    const pq = [];
    const [startRow, startCol] = c.startPos;
    const [endRow, endCol] = c.endPos;

    distance[startRow][startCol] = 0;
    pq.push([0, startRow, startCol]);

    while (pq.length > 0) {
        pq.sort(compare);
        const [dist, row, col] = pq.shift();

        if (reset.current) return;
        if (c.grid[row][col][0] === 4) continue;

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
            await delay(1);
        }

        if (row === endRow && col === endCol) break;

        for (let i = 0; i < 4; i++) {
            const neighbourRow = row + rowDirection[i];
            const neighbourCol = col + colDirection[i];

            if (neighbourRow < 0 || neighbourRow >= numRow) continue;
            if (neighbourCol < 0 || neighbourCol >= numCol) continue;
            if (
                c.grid[neighbourRow][neighbourCol][0] === 4 ||
                c.grid[neighbourRow][neighbourCol][0] === 1
            )
                continue;

            const weight = c.grid[neighbourRow][neighbourCol][1];
            const newDist = dist + weight;

            if (newDist < distance[neighbourRow][neighbourCol]) {
                distance[neighbourRow][neighbourCol] = newDist;
                prev[neighbourRow][neighbourCol] = [row, col];
                pq.push([newDist, neighbourRow, neighbourCol]);
            }
        }
    }

    // Reconstruct path
    if (distance[endRow][endCol] !== Infinity) {
        const path = [];
        let row = endRow;
        let col = endCol;
        let totalCost = 0;

        while (!(row === startRow && col === startCol)) {
            path.push([row, col]);

            [row, col] = prev[row][col];
            if (!prev[row] || !prev[row][col]) break;
        }

        for (let i = path.length - 1; i > 0; i--) {
            const [pr, pc] = path[i];
            totalCost += c.grid[row][col][1];

            c.setGrid((prevGrid) => {
                const newGrid = prevGrid.map((r, rowIndex) =>
                    r.map((cell, colIndex) =>
                        rowIndex === pr && colIndex === pc ? [5, cell[1]] : cell
                    )
                );
                return newGrid;
            });

            if (reset.current) return;
            await delay(40);
        }

        c.setPathLength(totalCost - 1);
    }
};

export default Dijkstra;
