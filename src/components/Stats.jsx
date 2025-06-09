import { useContext } from "react";
import { mainContext } from "../App";
import { algoList, mazeList } from "../algorithms/AlgorithmLists";
import {
    mazeSpeed as mazeSpeedMap,
    searchSpeed as searchSpeedMap,
} from "../algorithms/Speed";

const mazeSpeedOptions = Object.entries(mazeSpeedMap);
const searchSpeedOptions = Object.entries(searchSpeedMap);

const Stats = () => {
    const c = useContext(mainContext);

    const selectedAlgo = algoList.find((algo) => algo.key === c.algorithms);
    const selectedMaze = mazeList.find((algo) => algo.key === c.maze);

    const getMazeSpeedLabel = () => {
        const entry = mazeSpeedOptions.find(
            (option) => option[1] === c.mazeSpeed
        );
        return entry ? entry[0] : "Average";
    };

    // Helper to get label from value for search speed
    const getSearchSpeedLabel = () => {
        const entry = searchSpeedOptions.find(
            (option) => option[1] === c.searchSpeed
        );
        return entry ? entry[0] : "Average";
    };

    // Toggle maze speed label & value
    const toggleMazeSpeed = () => {
        const currentLabel = getMazeSpeedLabel();
        const index = mazeSpeedOptions.findIndex(
            ([label]) => label === currentLabel
        );
        const nextIndex = (index + 1) % mazeSpeedOptions.length;
        const nextOption = mazeSpeedOptions[nextIndex];
        c.setMazeSpeed(nextOption[1]);
    };

    // Toggle search speed label & value
    const toggleSearchSpeed = () => {
        const currentLabel = getSearchSpeedLabel();
        const index = searchSpeedOptions.findIndex(
            ([label]) => label === currentLabel
        );
        const nextIndex = (index + 1) % searchSpeedOptions.length;
        const nextOption = searchSpeedOptions[nextIndex];
        c.setSearchSpeed(nextOption[1]);
    };

    return (
        <div
            className="w-full h-full p-6 shadow-md rounded-md flex flex-col gap-4"
            style={{ backgroundColor: "var(--color-backgroundBG)" }}
        >
            <h2
                className="text-2xl font-extrabold"
                style={{ color: "#E8E0D1" }}
            >
                Stats
            </h2>

            <div className="w-full py-5 px-6 rounded-lg shadow-inner bg-wallBG">
                <p
                    className="mb-2"
                    style={{ color: "#E8E0D1", fontWeight: 600 }}
                >
                    <span style={{ color: "#E8E0D1", fontWeight: 400 }}>
                        Search Algorithm:
                    </span>{" "}
                    <span>
                        {selectedAlgo ? selectedAlgo.name : "Not Selected"}
                    </span>
                </p>
                {selectedAlgo && (
                    <p
                        className="mb-4 italic text-[#E8E0D1]"
                        style={{ fontWeight: 400 }}
                    >
                        <b>Description:</b> {selectedAlgo.description}
                    </p>
                )}
                <hr className="border-t border-gray-400 my-4" />

                <p className="mb-2 text-[#E8E0D1]" style={{ fontWeight: 600 }}>
                    <span className="font-semibold">
                        Maze & Pattern Algorithm:
                    </span>{" "}
                    <span>
                        {selectedMaze ? selectedMaze.name : "Not Selected"}
                    </span>
                </p>
                {selectedMaze && (
                    <p
                        className="mb-4 italic text-[#E8E0D1]"
                        style={{ fontWeight: 600 }}
                    >
                        Description: {selectedMaze.description}
                    </p>
                )}
                <hr className="border-t border-gray-400 my-4" />
                {c.searchTime && !c.isSearch && (
                    <p style={{ color: "#E8E0D1", fontWeight: 600 }}>
                        Time Taken: {c.searchTime}s
                    </p>
                )}

                {(c.algorithms == "dijkstra" || c.algorithms == "astar") && (
                    <p style={{ color: "#E8E0D1", fontWeight: 600 }}>
                        Path Weight: {c.pathWeight === "" ? "0" : c.pathWeight}
                    </p>
                )}
                <p style={{ color: "#E8E0D1", fontWeight: 600 }}>
                    Path Length: {c.pathLength === "" ? "0" : c.pathLength}
                </p>
            </div>
            <div className="flex flex-col gap-2">
                <button
                    onClick={toggleSearchSpeed}
                    disabled={c.isSearch || c.isMaze}
                    className="px-3 py-1 bg-green-500 hover:bg-green-600 rounded cursor-pointer text-white duration-150"
                >
                    Search Speed: {getSearchSpeedLabel()}
                </button>
                <button
                    onClick={toggleMazeSpeed}
                    disabled={c.isSearch || c.isMaze}
                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 rounded cursor-pointer text-white duration-150"
                >
                    Maze Gen Speed: {getMazeSpeedLabel()}
                </button>

                <button
                    onClick={() => c.setIsNumberOn((prev) => !prev)}
                    disabled={c.isSearch || c.isMaze}
                    className="bg-amber-600 px-4 py-1 rounded cursor-pointer hover:bg-amber-700 duration-150 "
                >
                    Numbers on Grid
                </button>
            </div>
        </div>
    );
};

export default Stats;
