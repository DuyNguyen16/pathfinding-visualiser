import React, { useEffect, useState } from "react";
import Grid from "./components/Grid";
import Header from "./components/Header";

const CELL_SIZE = 30;

export const mainContext = React.createContext({});

function App() {
    const [grid, setGrid] = useState([]);

    const [isMovingStart, setIsMovingStart] = useState(false);
    const [isMovingEnd, setIsMovingEnd] = useState(false);
    const [startPos, setStartPos] = useState([0, 0]);
    const [endPos, setEndPos] = useState([0, 0]);
    const [algorithms, setAlgorithms] = useState("");
    const [maze, setMaze] = useState("");

    const algoList = ["Breadth-first Search", "Depth-first Search", "Dijkstra's Algorithm","A* Search"];
    const mazeList  = ["Recursive Division", "Randomised Depth-first Search", "Prim’s Algorithm","Eller’s Algorithm"];

    useEffect(() => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const cols = Math.floor(screenWidth / CELL_SIZE) - 1;
        let rows = Math.floor(screenHeight / CELL_SIZE) - 2;

        if (rows%2 == 0) {
            rows = rows - 1;
        }

        const newGrid = Array.from({ length: rows }, () => Array(cols).fill(0));
        const midRow = Math.floor(rows / 2) - 1;
        const midRowEndCol = Math.floor(cols/1.5);

        newGrid[midRow][Math.floor(cols/4)] = 2;
        newGrid[midRow][midRowEndCol] = 3;

        setEndPos([midRow, midRowEndCol]);
        setStartPos([midRow, Math.floor(cols/4)]);
        setGrid(newGrid);
        console.log(`WIDTH: ${newGrid[0].length}, HEIGHT: ${newGrid.length}\n`);
    }, []);

    // Toggle move node mode
    const toggleMoveStart = () => {
        setIsMovingStart((prev) => !prev);
        setIsMovingEnd(false);
    };

    const toggleMoveEnd = () => {
        setIsMovingEnd((prev) => !prev);
        setIsMovingStart(false);
    };

    const context = {
        grid,
        setGrid,
        isMovingStart,
        setIsMovingStart,
        isMovingEnd,
        setIsMovingEnd,
        startPos,
        setStartPos,
        endPos,
        setEndPos,
        algorithms,
        setAlgorithms,
        maze, 
        setMaze,
        toggleMoveStart,
        toggleMoveEnd,
        algoList,
        mazeList,
    };

    return (
        <mainContext.Provider value={context}>
            <main className="bg-[#DBD3C5] h-screen w-screen flex flex-col">
                <Header/>
                <div className="flex-1 flex justify-center items-center overflow-hidden">
                    <Grid/>
                </div>
            </main>
        </mainContext.Provider>
    );
}

export default App;
