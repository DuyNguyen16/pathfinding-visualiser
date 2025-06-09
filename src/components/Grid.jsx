import { useState, useEffect, useContext } from "react";
import { mainContext } from "../App";
import knightIcon from "../assets/knight.png";
import princessIcon from "../assets/princess.png";
import weightIcon from "../assets/weight.png";

const CELL_SIZE = 30;

const Grid = () => {
    const c = useContext(mainContext);
    const [isMouseDown, setIsMouseDown] = useState(false);

    useEffect(() => {
        const handleMouseUp = () => setIsMouseDown(false);
        window.addEventListener("mouseup", handleMouseUp);
        return () => window.removeEventListener("mouseup", handleMouseUp);
    }, []);

    const placeNode = (rowIndex, colIndex) => {
        c.setGrid((prevGrid) => {
            let n = c.isMovingStart ? 2 : 3;
            const cellValue = prevGrid[rowIndex][colIndex][0];

            if (cellValue === 2 || cellValue === 3) {
                c.setIsMovingStart(false);
                c.setIsMovingEnd(false);
                return prevGrid;
            }

            const newGrid = prevGrid.map((row) =>
                row.map(([cellState, weight]) =>
                    cellState === n ? [0, weight] : [cellState, weight]
                )
            );

            const oldWeight = prevGrid[rowIndex][colIndex][1];

            if (c.isMovingStart) {
                newGrid[rowIndex][colIndex] = [2, oldWeight];
                c.setStartPos([rowIndex, colIndex]);
                c.setIsMovingStart(false);
                return newGrid;
            } else if (c.isMovingEnd) {
                newGrid[rowIndex][colIndex] = [3, oldWeight];
                c.setEndPos([rowIndex, colIndex]);
                c.setIsMovingEnd(false);
                return newGrid;
            } else if (c.isPlacingWeight) {
                if (
                    prevGrid[rowIndex][colIndex][0] !== 2 &&
                    prevGrid[rowIndex][colIndex][0] !== 3
                ) {
                    const newGridCopy = prevGrid.map((row) =>
                        row.map((cell) => [...cell])
                    );
                    newGridCopy[rowIndex][colIndex] = [0, 5];

                    return newGridCopy;
                }
                return prevGrid;
            }
            return newGrid;
        });
    };

    const updateCell = (rowIndex, colIndex) => {
        const cellValue = c.grid[rowIndex][colIndex][0];

        if (
            (cellValue === 2 && !c.isMovingStart) ||
            (cellValue === 3 && !c.isMovingEnd)
        ) {
            return;
        }

        c.setGrid((prevGrid) =>
            prevGrid.map((row, rIdx) =>
                row.map(([cellState, weight], cIdx) =>
                    rIdx === rowIndex && cIdx === colIndex
                        ? [cellState === 0 ? 1 : 0, weight]
                        : [cellState, weight]
                )
            )
        );
    };

    return (
        <div
            className="flex flex-col select-none"
            style={{ width: "fit-content" }}
        >
            {c.grid.map((row, rowIndex) => (
                <div key={rowIndex} className="flex">
                    {row.map((cell, colIndex) => (
                        <div
                            key={colIndex}
                            onMouseDown={() => {
                                setIsMouseDown(true);
                                if (
                                    c.isMovingStart ||
                                    c.isMovingEnd ||
                                    c.isPlacingWeight
                                ) {
                                    placeNode(rowIndex, colIndex);
                                } else {
                                    updateCell(rowIndex, colIndex);
                                }
                            }}
                            onMouseEnter={() => {
                                if (
                                    isMouseDown &&
                                    !c.isMovingStart &&
                                    !c.isMovingEnd &&
                                    !c.isPlacingWeight
                                ) {
                                    updateCell(rowIndex, colIndex);
                                }
                            }}
                            className={`${
                                cell[0] === 0
                                    ? "bg-gray-100 border border-gray-300" // empty state 0
                                    : cell[0] === 1
                                    ? "bg-[#260F01]" // wall state 1
                                    : cell[0] === 2
                                    ? "bg-[#BFA98E] border border-gray-300" // start state 2
                                    : cell[0] === 3
                                    ? "bg-[#BFA98E] border border-gray-300" // end state 3
                                    : cell[0] === 4
                                    ? "bg-[#80BF6F] border border-gray-300" // finding state 4
                                    : "bg-[#BFA98E] border border-gray-300" // path state 5
                            }`}
                            style={{
                                width: CELL_SIZE,
                                height: CELL_SIZE,
                                transition: "background-color 0.2s",
                                userSelect: "none",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                position: "relative",
                            }}
                        >
                            {cell[0] === 2 && (
                                <img
                                    src={knightIcon}
                                    alt="Knight"
                                    style={{
                                        width: "80%",
                                        height: "80%",
                                        objectFit: "contain",
                                    }}
                                />
                            )}
                            {cell[0] === 3 && (
                                <img
                                    src={princessIcon}
                                    alt="Princess"
                                    style={{
                                        width: "80%",
                                        height: "80%",
                                        objectFit: "contain",
                                    }}
                                />
                            )}

                            {cell[1] === 5 && (
                                <img
                                    src={weightIcon}
                                    alt="Princess"
                                    style={{
                                        width: "80%",
                                        height: "80%",
                                        objectFit: "contain",
                                    }}
                                />
                            )}

                            {(cell[0] !== 1 && c.isNumberOn)  && (
                                <span
                                    style={{
                                        position: "absolute",
                                        bottom: "2px",
                                        right: "2px",
                                        backgroundColor: "white",
                                        borderRadius: "2px",
                                        fontSize: "0.6rem",
                                        padding: "1px 3px",
                                        opacity: 0.8,
                                        color: "black",
                                    }}
                                >
                                    {cell[1]}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Grid;
