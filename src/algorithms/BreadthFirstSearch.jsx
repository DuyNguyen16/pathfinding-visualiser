import { useContext } from "react";
import { mainContext } from "../App";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const BreadthFirstSearch = () => {
    const c = useContext(mainContext);
    
    return async () => {
        let queue = [];
        let numRow = c.grid.length;
        let numCol = c.grid[0].length;
        let found = false;

        const visited = Array.from({length : numRow}, () => Array(numCol).fill(false));
        let prev = Array.from({length : numRow}, () => Array(numCol).fill([0, 0]));

        let row = [-1, 0, 1, 0];
        let col = [0, 1, 0, -1];
        
        queue.push([c.startPos[0], c.startPos[1]]);
        visited[c.startPos[0]][c.startPos[1]] = true;
        
        while (queue.length != 0 && found == false) {
            let currentNode = queue.shift();

            for (let i = 0; i < 4; i++) {
                let neigbourRow = currentNode[0] + row[i];
                let neigbourCol = currentNode[1] + col[i];
                
                if (neigbourRow < 0 || neigbourRow >= numRow) continue;
                if (neigbourCol < 0 || neigbourCol >= numCol) continue;
                if (visited[neigbourRow][neigbourCol]) continue;
                if (c.grid[neigbourRow][neigbourCol] === 1) continue;
                
                queue.push([neigbourRow, neigbourCol]);
                visited[neigbourRow][neigbourCol] = true;
                prev[neigbourRow][neigbourCol] = [currentNode[0], currentNode[1]];
                
                if (neigbourRow == c.endPos[0] && neigbourCol == c.endPos[1]) {
                    found = true;
                    break;
                };

                c.grid[neigbourRow][neigbourCol] = 4;
                c.setGrid([...c.grid]);
                await delay(1);

            }
        }
        
        if (found) {
            let path = [];

            let s = c.endPos[0];
            let m = c.endPos[1];

            while (true) {
                let temp = s;
                s = prev[s][m][0];
                m = prev[temp][m][1];

                path.push([s, m]);
                if (s === c.startPos[0] && m === c.startPos[1]) break;
            }

            for (let i = path.length - 2; i >= 0; i--) {
                c.grid[path[i][0]][path[i][1]] = 5;
                c.setGrid([...c.grid]);

                await delay(40);
            }
        }
    }
}

export default BreadthFirstSearch