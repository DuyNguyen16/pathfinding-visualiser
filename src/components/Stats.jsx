import { useContext } from "react";
import { mainContext } from "../App";

const Stats = () => {
    const c = useContext(mainContext);

    return (
        <div className="bg-backgroundBG w-full h-full p-4 shadow-md">
            <h2 className="text-xl font-bold">Stats</h2>
            <div className="w-full py-3">
                <p>Search Algorithm: {c.algorithms == "" ? "Not Selected" : c.algorithms}</p>
                <p>Path Length: {c.pathLength == "" ? "0" : c.pathLength}</p>
            </div>
        </div>
    );
};

export default Stats;
