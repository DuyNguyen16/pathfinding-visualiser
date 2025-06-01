import { useContext } from "react";
import { mainContext } from "../App";

const DropDownList = () => {
    const c = useContext(mainContext);

    const handleSelectAlgo = (value) => {
        c.setAlgorithms(value);
    };

    return (
        <div className="bg-backgroundBG border shadow-md rounded p-2">
            {c.algoList.map((value, index) => (
                <button
                    className={`block w-full text-left px-2 py-1 duration-100 cursor-pointer hover:bg-[#9C968C] ${
                        c.algorithms === value ? "bg-[#9C968C]" : ""
                    }`}
                    key={index}
                    onClick={() => handleSelectAlgo(value)}
                >
                    {value}
                </button>
            ))}
        </div>
    );
};

export default DropDownList;
