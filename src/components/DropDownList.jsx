import { algoList, mazeList } from "../algorithms/AlgorithmLists";

const DropDownList = ({ c, type, isRunning}) => {
    const handleSelect = (value) => {
        c.setIsMovingEnd(false);
        c.setIsMovingStart(false);
        c.setIsPlacingWeight(false);
        if (type === "algo") {
            c.setAlgorithms(value); // value is the algo key
        } else {
            c.setMaze(value); // value is the maze key
        }
    };

    return (
        <div className="bg-[#F4A259] border shadow-md rounded p-2">
            {type === "algo"
                ? algoList.map((value) => (
                    <button
                        key={value.key}
                        className={`block w-full text-left px-2 py-1 duration-100 cursor-pointer hover:bg-[#C2702D] ${
                            c.algorithms === value.key ? "bg-[#C2702D]" : ""
                        }`}
                        onClick={() => handleSelect(value.key)}
                        disabled={isRunning}
                    >
                        {value.name}
                    </button>
                ))
                : mazeList.map((value) => (
                    <button
                        key={value.key}
                        className={`block w-full text-left px-2 py-1 duration-100 cursor-pointer hover:bg-[#C2702D] ${
                            c.maze === value.key ? "bg-[#C2702D]" : ""
                        }`}
                        onClick={() => handleSelect(value.key)}
                        disabled={isRunning}
                    >
                        {value.name}
                    </button>
                ))}
        </div>
    );
};

export default DropDownList;
