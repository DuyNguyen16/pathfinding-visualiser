import Heap from "heap-js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Dijkstra = async (c, reset, speed) => {
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
    const prev = Array.from({ length: numRow }, () => Array(numCol).fill(null));

    // Possible directions: right, down, left, up
    const directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];

    // Priority queue
    const pq = new Heap((a, b) => a[0] - b[0]);

    const [startRow, startCol] = c.startPos;
    const [endRow, endCol] = c.endPos;

    // Start position distance is 0
    distance[startRow][startCol] = 0;
    pq.push([0, startRow, startCol]);

    // Main Dijkstra loop
    while (pq.length > 0) {
        const [_, row, col] = pq.pop();


        if (reset.current) return;

        // Skip already visited cells
        if (visited[row][col]) continue;
        visited[row][col] = true;

        // Visual update for visited cell
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

        // Stop if reached the end node
        if (row === endRow && col === endCol) break;

        // Explore all valid neighbors
        for (const [directionX, directionY] of directions) {
            const neighbourRow = row + directionX;
            const neighbourCol = col + directionY;

            if (neighbourRow < 0 || neighbourRow >= numRow) continue;
            if (neighbourCol < 0 || neighbourCol >= numCol) continue;
            if (visited[neighbourRow][neighbourCol]) continue;
            if (c.grid[neighbourRow][neighbourCol][0] === 1) continue;

            // Calculate distance from start to current cell
            const weight = c.grid[neighbourRow][neighbourCol][1];
            const newDist = distance[row][col] + weight;

            // If found a shorter path to neighbor, update
            if (newDist < distance[neighbourRow][neighbourCol]) {
                distance[neighbourRow][neighbourCol] = newDist;
                prev[neighbourRow][neighbourCol] = [row, col];
                pq.push([newDist, neighbourRow, neighbourCol]);
            }
        }
    }

    // Reconstruct and animate the path if reachable
    if (distance[endRow][endCol] !== Infinity) {
        const path = [];
        let row = endRow;
        let col = endCol;
        let weightCost = 0;
        let pathLength = 0;

        // Backtrack from end node to start using 'prev'
        while (!(row === startRow && col === startCol)) {
            path.push([row, col]);
            [row, col] = prev[row][col];
            if (!prev[row] || !prev[row][col]) break;
        }

        // Animate path from start to end (reverse order)
        for (let i = path.length - 1; i > 0; i--) {
            const [pr, pc] = path[i];

            weightCost += c.grid[pr][pc][1];
            pathLength += 1;

            // Mark cell as part of the final path
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

        // Set final path metrics in context/state
        c.setPathWeight(weightCost);
        c.setPathLength(pathLength);
    }
};

export default Dijkstra;
