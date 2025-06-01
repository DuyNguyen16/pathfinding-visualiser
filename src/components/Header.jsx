import { useContext, useRef, useState } from "react";
import { mainContext } from "../App";
import DropDownList from "./DropDownList";
import BreadthFirstSearch from "../algorithms/BreadthFirstSearch";

const Header = () => {
    const c = useContext(mainContext);
    const [showDropdown, setShowDropdown] = useState(false);
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
                row.map((cell, cIdx) =>
                    rIdx === c.startPos[0] && cIdx === c.startPos[1]
                        ? 2
                        : rIdx === c.endPos[0] && cIdx === c.endPos[1]
                        ? 3
                        : c.grid[rIdx][cIdx] === 1
                        ? 1
                        : 0
                )
            )
        );
    };

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };

    const handleVisualise = async () => {
        setShowDropdown(false);
        c.setRunning(true);
        resetRef.current = false; 
        
        switch (c.algorithms) {
            case "Breadth-first Search":
                await BreadthFirstSearch(c, resetRef);
                break;
            case "Depth-first Search":
                // import and call DepthFirstSearch()
                break;
            case "Dijkstra's Algorithm":
                // import and call Dijkstra()
                break;
            case "A* Search":
                // import and call AStar()
                break;
            default:
                console.warn("No algorithm selected or matched.");
        }
        c.setRunning(false);
    };

    const handleReset = () => {
        resetRef.current = true;
        stopVisual();
    };

    return (
        <div className="bg-backgroundBG px-4 py-2 min-h-10 flex items-center gap-2 justify-between">
            <a href="" className="text-2xl">
                PathFinder
            </a>

            <div className="flex gap-2 relative">
                <button
                    className="bg-[#9C968C] hover:bg-[#79736b] cursor-pointer px-2 py-1 duration-100"
                    onClick={toggleDropdown}
                >
                    Algorithm ▼
                </button>

                {showDropdown && (
                    <div className="absolute top-12 left-0 z-10 ">
                        <DropDownList />
                    </div>
                )}

                <div className="bg-[#9C968C] hover:bg-[#79736b] cursor-pointer px-2 py-1 duration-100">
                    Maze & Patterns
                </div>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={clearGrid}
                    className="bg-red-500 px-4 py-1 hover:bg-red-700 transition-colors duration-300 cursor-pointer"
                >
                    Clear
                </button>

                <button
                    onClick={c.toggleMoveStart}
                    className={`px-4 py-1 cursor-pointer transition-colors duration-300 ${
                        c.isMovingStart
                            ? "bg-yellow-400 hover:bg-yellow-500"
                            : "bg-gray-400 hover:bg-gray-500"
                    }`}
                >
                    {c.isMovingStart ? "Place Start: ON" : "Move Start"}
                </button>

                <button
                    onClick={c.toggleMoveEnd}
                    className={`px-4 py-1 cursor-pointer transition-colors duration-300 ${
                        c.isMovingEnd
                            ? "bg-yellow-400 hover:bg-yellow-500"
                            : "bg-gray-400 hover:bg-gray-500"
                    }`}
                >
                    {c.isMovingEnd ? "Place End: ON" : "Move End"}
                </button>

                {c.running == false ? (
                    <button
                        disabled={!c.algorithms}
                        className={`px-4 py-1 transition-colors duration-300 cursor-pointer ${
                            c.algorithms
                                ? "bg-emerald-500 hover:bg-emerald-700"
                                : "bg-gray-400 cursor-not-allowed"
                        }`}
                        onClick={handleVisualise}
                    >
                        Visualise!
                    </button>
                ) : (
                    <button
                        className={`px-4 py-1 transition-colors duration-300 cursor-pointer ${"bg-red-500 hover:bg-red-700"}`}
                        onClick={handleReset}
                    >
                        Stop!
                    </button>
                )}
            </div>
        </div>
    );
};

export default Header;
