import { useContext } from "react";
import { mainContext } from "../App";
import { algoList, mazeList } from "../algorithms/AlgorithmLists";

const Stats = () => {
    const c = useContext(mainContext);

    const selectedAlgo = algoList.find((algo) => algo.key === c.algorithms);
    const selectedMaze = mazeList.find((algo) => algo.key === c.maze);

    return (
        <div
            className="w-full h-full p-6 shadow-md rounded-md"
            style={{ backgroundColor: "var(--color-backgroundBG)" }}
        >
            <h2
                className="text-2xl font-extrabold mb-6"
                style={{ color: "#E8E0D1" }}
            >
                Stats
            </h2>
            <div
                className="w-full py-5 px-6 rounded-lg shadow-inner"
                style={{ backgroundColor: "var(--color-wallBG)" }}
            >
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
                        className="mb-4 italic"
                        style={{ color: "#E8E0D1", fontWeight: 400 }}
                    >
                        <b>Description:</b> {selectedAlgo.description}
                    </p>
                )}
                <hr className="border-t border-gray-400 my-4" />

                <p
                    className="mb-2"
                    style={{ color: "#E8E0D1", fontWeight: 600 }}
                >
                    <span className="font-semibold">Maze Algorithm:</span>{" "}
                    <span>
                        {selectedMaze ? selectedMaze.name : "Not Selected"}
                    </span>
                </p>
                {selectedMaze && (
                    <p
                        className="mb-4 italic"
                        style={{ color: "#E8E0D1", fontWeight: 600 }}
                    >
                        Description: {selectedMaze.description}
                    </p>
                )}
                <hr className="border-t border-gray-400 my-4" />

                <p style={{ color: "#E8E0D1", fontWeight: 600 }}>
                    Path Length: {c.pathLength === "" ? "0" : c.pathLength}
                </p>
            </div>
        </div>
    );
};

export default Stats;
