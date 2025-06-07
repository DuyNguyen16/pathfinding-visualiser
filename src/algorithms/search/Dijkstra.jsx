const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Dijkstra = async (c, reset) => {
    let numRow = c.grid.length;
    let numCol = c.grid[0].length;

    let visited = Array.from({ length: numRow }, () =>
        Array(numCol).fill(false)
    );
    let distance = Array.from({ length: numRow }, () =>
        Array(numCol).fill(Infinity)
    );
    let prev = Array.from({ length: numRow }, () => Array(numCol).fill([0, 0]));

    const rowDir = [-1, 0, 1, 0];
    const colDir = [0, 1, 0, -1];

    const compare = (a, b) => a[0] - b[0]; // compare by distance

    let pq = [];
    let [startR, startC] = c.startPos;
    let [endR, endC] = c.endPos;

    distance[startR][startC] = 0;
    pq.push([0, startR, startC]);

    while (pq.length > 0) {
        pq.sort(compare);
        let [dist, r, col] = pq.shift();

        if (reset.current) return;

        if (visited[r][col]) continue;
        visited[r][col] = true;

        if (c.grid[r][col][0] !== 2 && c.grid[r][col][0] !== 3) {
            c.grid[r][col][0] = 4;
            c.setGrid([...c.grid]);
            await delay(1);
        }

        if (r === endR && col === endC) break;

        for (let i = 0; i < 4; i++) {
            let nr = r + rowDir[i];
            let nc = col + colDir[i];

            if (
                nr < 0 ||
                nr >= numRow ||
                nc < 0 ||
                nc >= numCol ||
                visited[nr][nc] ||
                c.grid[nr][nc][0] === 1
            ) {
                continue;
            }

            let weight = c.grid[nr][nc][1]; // use weight from tuple
            let newDist = dist + weight;

            if (newDist < distance[nr][nc]) {
                distance[nr][nc] = newDist;
                prev[nr][nc] = [r, col];
                pq.push([newDist, nr, nc]);
            }
        }
    }

    // Backtrack to get path
    if (distance[endR][endC] !== Infinity) {
        let path = [];
        let r = endR;
        let col = endC;
        let count = 0;

        while (!(r === startR && col === startC)) {
            path.push([r, col]);
            count += 1;
            [r, col] = prev[r][col];
        }

        for (let i = path.length - 1; i > 0; i--) {
            let [pr, pc] = path[i];
            c.grid[pr][pc][0] = 5;
            c.setGrid([...c.grid]);
            await delay(40);
        }

        c.setPathLength(count - 1);
    }
};

export default Dijkstra;
