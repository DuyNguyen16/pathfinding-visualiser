import React, { useEffect, useState } from "react";
import Grid from "./components/Grid";
import Header from "./components/Header";
import Stats from "./components/Stats";

const CELL_SIZE = 30;

export const mainContext = React.createContext({});

const getOdd = (n) => (n % 2 === 0 ? n - 1 : n);

const createGrid = (rows, cols, startPos, endPos) => {
    const grid = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => [0, 1])
    );
    grid[startPos[0]][startPos[1]][0] = 2;
    grid[endPos[0]][endPos[1]][0] = 3;
    return grid;
};

function App() {
    const [grid, setGrid] = useState([]);

    const [isMovingStart, setIsMovingStart] = useState(false);
    const [isMovingEnd, setIsMovingEnd] = useState(false);
    const [startPos, setStartPos] = useState([0, 0]);
    const [endPos, setEndPos] = useState([0, 0]);
    const [isPlacingWeight, setIsPlacingWeight] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [isMaze, setIsMaze] = useState(false);

    // Stats
    const [algorithms, setAlgorithms] = useState("");
    const [maze, setMaze] = useState("");
    const [pathLength, setPathLength] = useState(0);
    const [isNumberOn, setIsNumberOn] = useState(false);
    const [mazeSpeed, setMazeSpeed] = useState(1);
    const [searchSpeed, setSearchSpeed] = useState(1);

    const toggleMoveStart = () => {
        setIsMovingStart((prev) => !prev);
        setIsMovingEnd(false);
    };

    const toggleMoveEnd = () => {
        setIsMovingEnd((prev) => !prev);
        setIsMovingStart(false);
    };

    const togglePlacingWeight = () => {
        setIsPlacingWeight((prev) => !prev);
        setIsMovingStart(false);
        setIsMovingEnd(false);
    };

    const initializeGrid = () => {
        const isMobile = window.innerWidth < 768;
        const gridWidthRatio = isMobile ? 1 : 0.8;
        const cols = getOdd(
            Math.floor((window.innerWidth * gridWidthRatio) / CELL_SIZE)
        );
        const rows = Math.floor((window.innerHeight - 50) / CELL_SIZE);

        const middleRow = Math.floor(rows / 2);
        const startCol = isMobile ? 1 : 5;
        const safeStart = [middleRow, startCol];

        const safeEnd = [middleRow, Math.max(0, cols - 5)];

        setStartPos(safeStart);
        setEndPos(safeEnd);
        setGrid(createGrid(rows, cols, safeStart, safeEnd));
    };

    useEffect(() => {
        initializeGrid();
        window.addEventListener("resize", initializeGrid);
        return () => window.removeEventListener("resize", initializeGrid);
    }, []);

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
        pathLength,
        setPathLength,
        isPlacingWeight,
        setIsPlacingWeight,
        togglePlacingWeight,
        isNumberOn,
        setIsNumberOn,
        mazeSpeed,
        setMazeSpeed,
        searchSpeed,
        setSearchSpeed,
        isSearch,
        setIsSearch,
        isMaze,
        setIsMaze,
    };

    return (
        <mainContext.Provider value={context}>
            <main className="bg-[#DBD3C5] min-h-screen w-screen flex flex-col">
                <Header />
                <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                    <div className="md:w-4/5 w-full flex justify-center items-center overflow-auto">
                        <Grid />
                    </div>
                    <div className="md:w-1/5 w-full border-t md:border-t-0 md:border-l border-gray-300 p-2">
                        <Stats />
                    </div>
                </div>
            </main>
        </mainContext.Provider>
    );
}

export default App;
