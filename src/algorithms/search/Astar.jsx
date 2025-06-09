import Heap from "heap-js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Astar = async (c, reset, speed) => {
    const numRow = c.grid.length;
    const numCol = c.grid[0].length;

    // store the shortest distance from start to [ith, jth] cell
    const distance = Array.from({ length: numRow }, () =>
        Array(numCol).fill(Infinity)
    );

    // array to store visited cell
    const visited = Array.from({ length: numRow }, () =>
        Array(numCol).fill(false)
    );

    // To reconstruct the path later
    const prev = Array.from({ length: numRow }, () =>
        Array.from({ length: numCol }, () => null)
    );

    const [startR, startC] = c.startPos;
    const [endR, endC] = c.endPos;

    // astar heuristic
    const heuristic = (r, c) => Math.abs(endR - r) + Math.abs(endC - c);

    // piority queue
    const heap = new Heap((a, b) => a[0] - b[0]);
    distance[startR][startC] = 0;
    heap.push([0, startR, startC]);

    const directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];

    while (!heap.isEmpty()) {
        const [_, row, col] = heap.pop();

        if (reset.current) return;
        if (visited[row][col]) continue;
        visited[row][col] = true;

        // Update visual
        if (c.grid[row][col][0] !== 2 && c.grid[row][col][0] !== 3) {
            c.setGrid((prevGrid) =>
                prevGrid.map((r, rIdx) =>
                    r.map((cell, cIdx) =>
                        rIdx === row && cIdx === col ? [4, cell[1]] : cell
                    )
                )
            );
            await delay(speed);
        }

        if (row === endR && col === endC) break;

        // Loop through ech neighbours
        for (const [directionX, directionY] of directions) {
            const neighbourRow = row + directionX;
            const neighbourCol = col + directionY;

            if (neighbourRow < 0 || neighbourRow >= numRow) continue;
            if (neighbourCol < 0 || neighbourCol >= numCol) continue;
            if (visited[neighbourRow][neighbourCol]) continue;
            if (c.grid[neighbourRow][neighbourCol][0] === 1) continue;

            const weight = c.grid[neighbourRow][neighbourCol][1];
            // calculate the distance from start to currentCell
            const newDist = distance[row][col] + weight;

            // check if the new distance is smaller than saved distance
            if (newDist < distance[neighbourRow][neighbourCol]) {
                distance[neighbourRow][neighbourCol] = newDist;
                prev[neighbourRow][neighbourCol] = [row, col];
                heap.push([
                    newDist + heuristic(neighbourRow, neighbourCol),
                    neighbourRow,
                    neighbourCol,
                ]);
            }
        }
    }

    // Path reconstruction
    if (distance[endR][endC] !== Infinity) {
        const path = [];
        let row = endR;
        let col = endC;
        let weightCost = 0;
        let pathLength = 0;

        while (!(row === startR && col === startC)) {
            path.push([row, col]);
            [row, col] = prev[row][col];
            if (!prev[row] || !prev[row][col]) break;
        }

        for (let i = path.length - 1; i > 0; i--) {
            const [pr, pc] = path[i];
            weightCost += c.grid[pr][pc][1];
            pathLength++;

            c.setGrid((prevGrid) =>
                prevGrid.map((row, rIdx) =>
                    row.map((cell, cIdx) =>
                        rIdx === pr && cIdx === pc ? [5, cell[1]] : cell
                    )
                )
            );
            if (reset.current) return;
            await delay(speed);
        }

        c.setPathWeight(weightCost);
        c.setPathLength(pathLength);
    }
};

export default Astar;
