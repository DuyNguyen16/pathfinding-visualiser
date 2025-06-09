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
            <h2 className="text-2xl font-extrabold">Stats</h2>

            <div className="w-full py-5 px-6 rounded-lg shadow-inner bg-wallBG">
                <p className="mb-2" style={{ fontWeight: 600 }}>
                    <span style={{ fontWeight: 400 }}>Search Algorithm:</span>{" "}
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
                <hr className="border-t border-[#E8E0D1] my-4" />

                <p className="mb-2 text-[#E8E0D1]">
                    <span style={{ fontWeight: 400 }}>
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
                <hr className="border-t border-[#E8E0D1] my-4" />
                {c.searchTime && !c.isSearch && (
                    <p style={{ fontWeight: 400 }}>
                        Time Taken:{" "}
                        <span className="font-extrabold">{c.searchTime}s</span>
                    </p>
                )}

                {(c.algorithms == "dijkstra" || c.algorithms == "astar") && (
                    <p style={{ fontWeight: 400 }}>
                        Path Weight:{" "}
                        <span className="font-extrabold">
                            {c.pathWeight === "" ? "0" : c.pathWeight}
                        </span>
                    </p>
                )}
                <p style={{ fontWeight: 400 }}>
                    Path Length:{" "}
                    <span className="font-extrabold">
                        {c.pathLength === "" ? "0" : c.pathLength}
                    </span>
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

            <hr className="border-t border-[#E8E0D1] mt-2" />

            <div className="mt-1 text-[10px] text-[#e8e0d1] leading-snug space-y-1">
                <p className="text-xl font-extrabold">Credits & Social links</p>
                <div className="flex gap-1 pt-2 text-[15px] flex-col">
                    <a
                        href="https://github.com/DuyNguyen16"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                    >
                        - GitHub
                    </a>
                    <a
                        href="https://www.linkedin.com/in/khanh-duy-nguyen/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                    >
                        - LinkedIn
                    </a>
                </div>
                <hr className="border-t border-[#E8E0D1] my-4 mr-8" />
                <div className="text-[15px]">
                    Icons by{" "}
                    <a
                        href="https://www.flaticon.com/authors/freepik"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                    >
                        Freepik
                    </a>{" "}
                    from{" "}
                    <a
                        href="https://www.flaticon.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                    >
                        Flaticon
                    </a>
                </div>
                <div className="text-[15px]">
                    <a
                        href="https://www.flaticon.com/free-icons/princess"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                    >
                        Princess
                    </a>
                    ,{" "}
                    <a
                        href="https://www.flaticon.com/free-icons/knight"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                    >
                        Knight
                    </a>
                    ,{" "}
                    <a
                        href="https://www.flaticon.com/free-icons/lab"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                    >
                        Lab
                    </a>{" "}
                    icons
                </div>
            </div>
        </div>
    );
};

export default Stats;
