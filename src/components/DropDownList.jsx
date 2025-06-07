import { algoList, mazeList } from "../algorithms/AlgorithmLists";

const DropDownList = ({ c, type, isRunning }) => {
    const handleSelect = (value) => {
        if (type === "algo") {
            c.setAlgorithms(value); // value is the algo key
        } else {
            c.setMaze(value); // value is the maze key
        }
    };

    return (
        <div className="bg-backgroundBG border shadow-md rounded p-2">
            {type === "algo"
                ? algoList.map((value) => (
                    <button
                        key={value.key}
                        className={`block w-full text-left px-2 py-1 duration-100 cursor-pointer hover:bg-[#9C968C] ${
                            c.algorithms === value.key ? "bg-[#9C968C]" : ""
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
                        className={`block w-full text-left px-2 py-1 duration-100 cursor-pointer hover:bg-[#9C968C] ${
                            c.maze === value.key ? "bg-[#9C968C]" : ""
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
