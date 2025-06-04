import { useContext, useEffect, useRef, useState } from "react";
import { mainContext } from "../App";
import DropDownList from "./DropDownList";
import BreadthFirstSearch from "../algorithms/search/BreadthFirstSearch";
import RecursiveDivision from "../algorithms/maze/RecursiveDivision";

const Header = () => {
    const c = useContext(mainContext);
    const [showAlgoDropdown, setShowAlgoDropdown] = useState(false);
    const [showMazeDropdown, setShowMazeDropdown] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [isMaze, setIsMaze] = useState(false);
    const resetRef = useRef(false);

    const clearGrid = () => {
        c.setGrid((prevGrid) =>
            prevGrid.map((row, rIdx) =>
                row.map((cell, cIdx) =>
                    rIdx === c.startPos[0] && cIdx === c.startPos[1]
                        ? 2
                        : rIdx === c.endPos[0] && cIdx === c.endPos[1]
                        ? 3
                        : 0
                )
            )
        );
    };

    const stopVisual = () => {
        c.setGrid((prevGrid) =>
            prevGrid.map((row, rIdx) =>
                row.map((cell, cIdx) => {
                    if (rIdx === c.startPos[0] && cIdx === c.startPos[1])
                        return 2;
                    if (rIdx === c.endPos[0] && cIdx === c.endPos[1]) return 3;
                    return cell === 1 ? 1 : 0;
                })
            )
        );
    };

    const handleVisualise = async () => {
        setShowAlgoDropdown(false);
        setShowMazeDropdown(false);
        setIsRunning(true);
        c.setPathLength(0);
        resetRef.current = false;

        switch (c.algorithms) {
            case "Breadth-first Search":
                await BreadthFirstSearch(c, resetRef, c.pathLength);
                break;
            default:
                console.warn("No algorithm selected or matched.");
        }

        setIsRunning(false);
    };

    useEffect(() => {
        const runMaze = async () => {
            setIsMaze(true);
            setShowAlgoDropdown(false);
            setShowMazeDropdown(false);

            switch (c.maze) {
                case "Recursive Division":
                    await RecursiveDivision(c);
                    break;
                default:
                    console.warn("No maze selected.");
            }

            setIsMaze(false);
        };

        if (c.maze) runMaze();
    }, [c.maze]);

    return (
        <div className="bg-backgroundBG px-4 py-2 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
            <a
                href="#"
                className="text-lg lg:text-2xl font-semibold text-center lg:text-left"
            >
                PathFinder
            </a>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 relative text-xs sm:text-sm">
                <button
                    className="bg-[#9C968C] hover:bg-[#79736b] px-2 py-1 rounded"
                    onClick={() => {
                        setShowAlgoDropdown((prev) => !prev);
                        setShowMazeDropdown(false);
                    }}
                >
                    Algorithm ▼
                </button>
                {showAlgoDropdown && (
                    <div className="absolute top-6 sm:top-full left-0 z-10 mt-1">
                        <DropDownList
                            c={c}
                            type={"algo"}
                            isRunning={isRunning}
                        />
                    </div>
                )}

                <button
                    className="bg-[#9C968C] hover:bg-[#79736b] px-2 py-1 rounded"
                    onClick={() => {
                        setShowMazeDropdown((prev) => !prev);
                        setShowAlgoDropdown(false);
                    }}
                >
                    Maze & Patterns ▼
                </button>
                {showMazeDropdown && (
                    <div className="absolute top-full sm:left-26 left-0 z-10 mt-1 w-48">
                        <DropDownList c={c} type={"maze"} isRunning={isMaze} />
                    </div>
                )}
            </div>

            <div className="flex flex-wrap justify-center lg:justify-end gap-2 text-xs sm:text-sm">
                <button
                    onClick={() => {
                        clearGrid();
                        c.setMaze("");
                    }}
                    className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
                    disabled={isRunning || isMaze}
                >
                    Clear
                </button>

                <button
                    onClick={c.toggleMoveStart}
                    className={`px-3 py-1 rounded ${
                        c.isMovingStart
                            ? "bg-yellow-400 hover:bg-yellow-500"
                            : "bg-gray-400 hover:bg-gray-500"
                    }`}
                    disabled={isRunning || isMaze}
                >
                    {c.isMovingStart ? "Place Start: ON" : "Move Start"}
                </button>

                <button
                    onClick={c.toggleMoveEnd}
                    className={`px-3 py-1 rounded ${
                        c.isMovingEnd
                            ? "bg-yellow-400 hover:bg-yellow-500"
                            : "bg-gray-400 hover:bg-gray-500"
                    }`}
                    disabled={isRunning || isMaze}
                >
                    {c.isMovingEnd ? "Place End: ON" : "Move End"}
                </button>

                {!isRunning ? (
                    <button
                        disabled={!c.algorithms || isMaze}
                        onClick={handleVisualise}
                        className={`px-3 py-1 rounded ${
                            c.algorithms
                                ? "bg-emerald-500 hover:bg-emerald-700"
                                : "bg-gray-400 cursor-not-allowed"
                        }`}
                    >
                        Visualise!
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            resetRef.current = true;
                            stopVisual();
                        }}
                        className="bg-red-500 hover:bg-red-700 px-3 py-1 rounded text-white"
                    >
                        Stop!
                    </button>
                )}
            </div>
        </div>
    );
};

export default Header;
