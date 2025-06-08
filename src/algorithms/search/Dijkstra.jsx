const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Dijkstra = async (c, reset, speed) => {
    const numRow = c.grid.length;
    const numCol = c.grid[0].length;

    const distance = Array.from({ length: numRow }, () =>
        Array(numCol).fill(Infinity)
    );

    const visited = Array.from({ length: numRow }, () =>
        Array(numCol).fill(false)
    );

    const prev = Array.from({ length: numRow }, () => Array(numCol).fill(null));

    const rowDirection = [-1, 0, 1, 0];
    const colDirection = [0, 1, 0, -1];

    const compare = (a, b) => a[0] - b[0];

    const pq = [];
    const [startRow, startCol] = c.startPos;
    const [endRow, endCol] = c.endPos;

    distance[startRow][startCol] = 0;
    pq.push([0, startRow, startCol]);

    while (pq.length > 0) {
        pq.sort(compare);
        const [_, row, col] = pq.shift();

        if (reset.current) return;
        if (visited[row][col]) continue;
        visited[row][col] = true;

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

        if (row === endRow && col === endCol) break;

        for (let i = 0; i < 4; i++) {
            const neighbourRow = row + rowDirection[i];
            const neighbourCol = col + colDirection[i];

            if (
                neighbourRow < 0 ||
                neighbourRow >= numRow ||
                neighbourCol < 0 ||
                neighbourCol >= numCol
            )
                continue;

            if (
                visited[neighbourRow][neighbourCol] ||
                c.grid[neighbourRow][neighbourCol][0] === 1
            )
                continue;

            const weight = c.grid[neighbourRow][neighbourCol][1];
            const newDist = distance[row][col] + weight;

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
            totalCost += c.grid[pr][pc][1];

            c.setGrid((prevGrid) => {
                const newGrid = prevGrid.map((r, rowIndex) =>
                    r.map((cell, colIndex) =>
                        rowIndex === pr && colIndex === pc ? [5, cell[1]] : cell
                    )
                );
                return newGrid;
            });

            if (reset.current) return;
            await delay(speed);
        }

        c.setPathLength(totalCost - 1);
    }
};

export default Dijkstra;
