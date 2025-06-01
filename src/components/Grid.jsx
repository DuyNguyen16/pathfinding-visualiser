import { useState, useEffect, useContext } from "react";
import { mainContext } from "../App";
import knightIcon from "../assets/knight.png";
import princessIcon from "../assets/princess.png";


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
            let n = 0;
            const cellValue = c.grid[rowIndex][colIndex];

            if (c.isMovingStart) {
                n = 2;
            } else {
                n = 3;
            }

            if (cellValue === 2 || cellValue === 3) {
                c.setIsMovingStart(false);
                c.setIsMovingEnd(false);
                return prevGrid;
            }

            const newGrid = prevGrid.map((row) =>
                row.map((cell) => (cell === n ? 0 : cell))
            );

            if (c.isMovingStart) {
                newGrid[rowIndex][colIndex] = 2;
                c.setStartPos([rowIndex, colIndex]);
                c.setIsMovingStart(false);
            } else if (c.isMovingEnd) {
                newGrid[rowIndex][colIndex] = 3;
                c.setEndPos([rowIndex, colIndex]);
                c.setIsMovingEnd(false);
            }

            return newGrid;
        });
    };

    const updateCell = (rowIndex, colIndex) => {
        const cellValue = c.grid[rowIndex][colIndex];
        if ((cellValue === 2 && !c.isMovingStart) || (cellValue === 3 && !c.isMovingEnd)) {
            return;
        }

        c.setGrid((prevGrid) =>
            prevGrid.map((row, rIdx) =>
                row.map((cell, cIdx) =>
                    rIdx === rowIndex && cIdx === colIndex
                        ? cell === 0
                            ? 1
                            : 0
                        : cell
                )
            )
        );
    };

    return (
        <div className="flex flex-col select-none">
            {c.grid.map((row, rowIndex) => (
                <div key={rowIndex} className="flex">
                    {row.map((cell, colIndex) => (
                        <div
                            key={colIndex}
                            onMouseDown={() => {
                                setIsMouseDown(true);
                                if (c.isMovingStart || c.isMovingEnd) {
                                    placeNode(rowIndex, colIndex);
                                } else {
                                    updateCell(rowIndex, colIndex);
                                }
                            }}
                            onMouseEnter={() => {
                                if (isMouseDown && !c.isMovingStart && !c.isMovingEnd) {
                                    updateCell(rowIndex, colIndex);
                                }
                            }}
                            className={`border border-gray-300 ${
                                cell === 0
                                    ? "bg-gray-100"
                                    : cell === 1
                                    ? "bg-[#260F01]"
                                    : cell === 2 
                                    ? "bg-gray-100"
                                    : cell === 3
                                    ? "bg-gray-100"
                                    : cell === 4
                                    ? "bg-[#8C6D51]"
                                    :"bg-[#BFA98E]"
                            }`}
                            style={{
                                width: CELL_SIZE,
                                height: CELL_SIZE,
                                transition: "background-color 0.2s",
                                userSelect: "none",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            {cell === 2 && (
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

                            
                            {cell === 3 && (
                                <img
                                    src={princessIcon}
                                    alt="princess"
                                    style={{
                                        width: "80%",
                                        height: "80%",
                                        objectFit: "contain",
                                    }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Grid;
