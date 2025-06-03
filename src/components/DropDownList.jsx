const DropDownList = ({ c, type }) => {
    const handleSelect = (value) => {
        if (type == "algo") {
            c.setAlgorithms(value);
        } else {
            c.setMaze(value);
        }
    };

    return (
        <div className="bg-backgroundBG border shadow-md rounded p-2">
            {type == "algo"
                ? c.algoList.map((value, index) => (
                    <button
                        className={`block w-full text-left px-2 py-1 duration-100 cursor-pointer hover:bg-[#9C968C] ${
                            c.algorithms === value ? "bg-[#9C968C]" : ""
                        }`}
                        key={index}
                        onClick={() => handleSelect(value)}
                    >
                        {value}
                    </button>
                ))
                : c.mazeList.map((value, index) => (
                    <button
                        className={`block w-full text-left px-2 py-1 duration-100 cursor-pointer hover:bg-[#9C968C] ${
                            c.maze === value ? "bg-[#9C968C]" : ""
                        }`}
                        key={index}
                        onClick={() => handleSelect(value)}
                    >
                        {value}
                    </button>
                ))}
        </div>
    );
};

export default DropDownList;
