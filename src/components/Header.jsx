import { useContext, useEffect, useRef, useState } from "react";
import { mainContext } from "../App";
import DropDownList from "./DropDownList";
import BreadthFirstSearch from "../algorithms/search/BreadthFirstSearch";
import RecursiveDivision from "../algorithms/maze/RecursiveDivision";
import DepthFirstSearch from "../algorithms/search/DepthFirstSearch";
import Dijkstra from "../algorithms/search/Dijkstra";
import Astar from "../algorithms/search/Astar";

const Header = () => {
    const c = useContext(mainContext);
    const [showAlgoDropdown, setShowAlgoDropdown] = useState(false);
    const [showMazeDropdown, setShowMazeDropdown] = useState(false);
    const resetRef = useRef(false);

    const clearGrid = () => {
        c.setGrid((prevGrid) =>
            prevGrid.map((row, rIdx) =>
                row.map((node, cIdx) => {
                    if (rIdx === c.startPos[0] && cIdx === c.startPos[1])
                        return [2, node[1]];
                    if (rIdx === c.endPos[0] && cIdx === c.endPos[1])
                        return [3, node[1]];
                    return [0, 1];
                })
            )
        );
    };

    const clearPath = () => {
        c.setGrid((prevGrid) =>
            prevGrid.map((row, rIdx) =>
                row.map(([state, weight], cIdx) => {
                    if (rIdx === c.startPos[0] && cIdx === c.startPos[1])
                        return [2, weight];
                    if (rIdx === c.endPos[0] && cIdx === c.endPos[1])
                        return [3, weight];
                    return state === 4 || state === 5
                        ? [0, weight]
                        : [state, weight];
                })
            )
        );
    };

    const handleVisualise = async () => {
        c.setIsMovingEnd(false);
        c.setIsMovingStart(false);
        c.setIsPlacingWeight(false);

        clearPath();

        setShowAlgoDropdown(false);
        setShowMazeDropdown(false);
        c.setIsSearch(true);

        c.setPathLength(0);
        resetRef.current = false;

        switch (c.algorithms) {
            case "bfs":
                await BreadthFirstSearch(c, resetRef, c.searchSpeed);
                break;
            case "dfs":
                await DepthFirstSearch(c, resetRef, c.searchSpeed);
                break;
            case "dijkstra":
                await Dijkstra(c, resetRef, c.searchSpeed);
                break;
            case "astar":
                await Astar(c, resetRef, c.searchSpeed);
                break;
            default:
                console.warn("No algorithm selected or matched.");
        }

        c.setIsSearch(false);
    };

    useEffect(() => {
        const runMaze = async () => {
            c.setIsMaze(true);
            setShowAlgoDropdown(false);
            setShowMazeDropdown(false);

            switch (c.maze) {
                case "recursive-division":
                    await RecursiveDivision(c, c.mazeSpeed);
                    break;
                default:
                    console.warn("No maze selected.");
            }

            c.setIsMaze(false);
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
                    className="bg-[#9C968C] hover:bg-[#79736b] px-2 py-1 rounded cursor-pointer"
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
                            isRunning={c.isSearch}
                        />
                    </div>
                )}

                <button
                    className="bg-[#9C968C] hover:bg-[#79736b] px-2 py-1 rounded cursor-pointer"
                    onClick={() => {
                        setShowMazeDropdown((prev) => !prev);
                        setShowAlgoDropdown(false);
                    }}
                    disabled={c.isSearch}
                >
                    Maze & Patterns ▼
                </button>
                {showMazeDropdown && (
                    <div className="absolute top-full sm:left-26 left-0 z-10 mt-1 w-48">
                        <DropDownList c={c} type={"maze"} isRunning={c.isMaze} />
                    </div>
                )}
            </div>

            <div className="flex flex-wrap justify-center lg:justify-end gap-2 text-xs sm:text-sm">
                <button
                    onClick={() => {
                        clearPath();
                    }}
                    className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded cursor-pointer"
                    disabled={c.isSearch || c.isMaze}
                >
                    Clear Path
                </button>
                <button
                    onClick={() => {
                        clearGrid();
                        c.setMaze("");
                    }}
                    className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded cursor-pointer"
                    disabled={c.isSearch || c.isMaze}
                >
                    Clear Grid
                </button>

                <button
                    onClick={c.toggleMoveStart}
                    className={`px-3 py-1 rounded cursor-pointer ${
                        c.isMovingStart
                            ? "bg-yellow-400 hover:bg-yellow-500"
                            : "bg-gray-400 hover:bg-gray-500"
                    }`}
                    disabled={c.isSearch || c.isMaze}
                >
                    {c.isMovingStart ? "Place Start: ON" : "Move Start"}
                </button>

                <button
                    onClick={c.toggleMoveEnd}
                    className={`px-3 py-1 rounded cursor-pointer ${
                        c.isMovingEnd
                            ? "bg-yellow-400 hover:bg-yellow-500"
                            : "bg-gray-400 hover:bg-gray-500"
                    }`}
                    disabled={c.isSearch || c.isMaze}
                >
                    {c.isMovingEnd ? "Place End: ON" : "Move End"}
                </button>

                {(c.algorithms == "dijkstra" || c.algorithms == "astar") && (
                    <button
                        onClick={c.togglePlacingWeight}
                        className={`px-3 py-1 rounded cursor-pointer ${
                            c.isPlacingWeight
                                ? "bg-yellow-400 hover:bg-yellow-500"
                                : "bg-gray-400 hover:bg-gray-500"
                        }`}
                        disabled={c.isSearch || c.isMaze}
                    >
                        {c.isPlacingWeight
                            ? "Place Weight: ON"
                            : "Place Weight"}
                    </button>
                )}

                {!c.isSearch ? (
                    <button
                        disabled={!c.algorithms || c.isMaze}
                        onClick={handleVisualise}
                        className={`px-3 py-1 rounded ${
                            c.algorithms
                                ? "bg-emerald-500 hover:bg-emerald-700 cursor-pointer"
                                : "bg-gray-400 cursor-not-allowed"
                        }`}
                    >
                        Visualise!
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            resetRef.current = true;
                            clearPath();
                        }}
                        className="bg-red-500 hover:bg-red-700 px-3 py-1 rounded text-white cursor-pointer"
                    >
                        Stop!
                    </button>
                )}
            </div>
        </div>
    );
};

export default Header;
