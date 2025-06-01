import { useContext } from "react";
import { mainContext } from "../App";
import BreadthFirstSearch from "../algorithms/BreadthFirstSearch";

const Header = () => {
    const c = useContext(mainContext);

    const run = BreadthFirstSearch();

    return (
        <div className="bg-backgroundBG px-4 py-2 min-h-10 flex items-center gap-2 justify-between">
            <a href="" className="text-2xl">PathFinder</a>
            {/* <a href="https://www.flaticon.com/free-icons/knight" title="knight icons">Knight icons created by Freepik - Flaticon</a> */}
            <div className="flex gap-2">
                <button 
                    className="bg-[#9C968C] hover:bg-[#79736b] cursor-pointer px-2 py-1"
                    onClick={run}
                >
                    Algorithm
                </button>
                <div className="bg-[#9C968C] hover:bg-[#79736b] cursor-pointer px-2 py-1">
                    Maze & Patterns
                </div>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={c.clearGrid}
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

                <button className="bg-emerald-500 px-4 py-1 hover:bg-emerald-700 transition-colors duration-300 cursor-pointer">
                    Visualise!
                </button>
            </div>
        </div>
    );
};

export default Header;
