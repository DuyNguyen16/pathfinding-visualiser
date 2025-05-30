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
    const [algorithms, setAlgorithms] = useState(["Breadth-first Search"]);

    useEffect(() => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const cols = Math.floor(screenWidth / CELL_SIZE) - 1;
        const rows = Math.floor(screenHeight / CELL_SIZE) - 2;

        const newGrid = Array.from({ length: rows }, () => Array(cols).fill(0));
        const midRow = Math.floor(rows / 2) - 1;
        const midRowEndCol = cols - 6;
        newGrid[midRow][4] = 2;
        newGrid[midRow][midRowEndCol] = 3;
        setEndPos([midRow, midRowEndCol]);
        setStartPos([midRow, 4]);
        setGrid(newGrid);
    }, []);

    const clearGrid = () => {
        setGrid((prevGrid) =>
            prevGrid.map((row, rIdx) =>
                row.map((cell, cIdx) =>
                    rIdx === startPos[0] && cIdx === startPos[1]
                        ? 2
                        : rIdx === endPos[0] && cIdx === endPos[1]
                        ? 3
                        : 0
                )
            )
        );
    };

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
        toggleMoveStart,
        toggleMoveEnd,
        clearGrid,
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
