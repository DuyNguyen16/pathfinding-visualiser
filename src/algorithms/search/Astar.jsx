const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Astar = async (c, reset) => {
    const numRow = c.grid.length;
    const numCol = c.grid[0].length;

    const distance = Array.from({ length: numRow }, () =>
        Array(numCol).fill(Infinity)
    );

    const prev = Array.from({ length: numRow }, () =>
        Array.from({ length: numCol }, () => null)
    );

    const rowDirection = [0, 1, 0, -1];
    const colDirection = [1, 0, -1, 0];

    const compare = (a, b) => a[0] - b[0];

    const pq = [];
    const [startR, startC] = c.startPos;
    const [endR, endC] = c.endPos;

    distance[startR][startC] = 0;
    pq.push([0, startR, startC]);

    while (pq.length > 0) {
        pq.sort(compare);
        const [_, row, col] = pq.shift();

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

        if (row === endR && col === endC) break;

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
                c.grid[neighbourRow][neighbourCol][0] === 1 ||
                c.grid[neighbourRow][neighbourCol][0] === 4
            )
                continue;

            const weight = c.grid[neighbourRow][neighbourCol][1];
            const newCost = weight;

            if (newCost < distance[neighbourRow][neighbourCol]) {
                distance[neighbourRow][neighbourCol] = newCost;
                prev[neighbourRow][neighbourCol] = [row, col];

                const heuristic =
                    Math.abs(endR - neighbourRow) +
                    Math.abs(endC - neighbourCol);

                pq.push([newCost + heuristic, neighbourRow, neighbourCol]);
                
            }
        }

    }

    // Reconstruct path if reachable
    let count = 0
    if (distance[endR][endC] !== Infinity) {
        const path = [];
        let r = endR;
        let col = endC;
        let totalCost = 0;

        while (!(r === startR && col === startC)) {
            path.push([r, col]);

            [r, col] = prev[r][col];
            if (!prev[r] || !prev[r][col]) break;
        }

        for (let i = path.length - 1; i > 0; i--) {
            const [pr, pc] = path[i];
            totalCost += c.grid[r][col][1];

            c.setGrid((prevGrid) => {
                const newGrid = prevGrid.map((row, rowIndex) =>
                    row.map((cell, colIndex) =>
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

export default Astar;
