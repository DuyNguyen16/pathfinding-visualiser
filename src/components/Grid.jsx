import { useState, useEffect, useContext } from "react";
import { mainContext } from "../App";

const CELL_SIZE = 30;

const Grid = () => {
    const c = useContext(mainContext);

    const [isMouseDown, setIsMouseDown] = useState(false);

    // Release mouse anywhere
    useEffect(() => {
        const handleMouseUp = () => setIsMouseDown(false);
        window.addEventListener("mouseup", handleMouseUp);
        return () => window.removeEventListener("mouseup", handleMouseUp);
    }, []);

    // Remove previous node (2) and place node at new location
    const placeNode = (rowIndex, colIndex) => {
        c.setGrid((prevGrid) => {
            let n = 0;
            const cellValue = c.grid[rowIndex][colIndex];

            if (c.isMovingStart) {
                n = 2;
            } else {
                n = 3;
            }

            if (cellValue == 2 || cellValue == 3) {
                c.setIsMovingStart(false);
                c.setIsMovingEnd(false);
                return prevGrid;
            };
            // Find and remove existing node (2)
            const newGrid = prevGrid.map((row) =>
                row.map((cell) => (cell === n ? 0 : cell))
            );

            // Place new node
            if (c.isMovingStart) {
                newGrid[rowIndex][colIndex] = 2;
                c.setIsMovingStart(false); // turn off move mode after placement
            } else if (c.isMovingEnd) {
                newGrid[rowIndex][colIndex] = 3;
                c.setIsMovingEnd(false); // turn off move mode after placement
            }

            return newGrid;
        });
    };

    
    const updateCell = (rowIndex, colIndex) => {
        const cellValue = c.grid[rowIndex][colIndex];
        if (cellValue === 2) {
            // If cell is 2 and not moving node mode, ignore clicks
            if (!c.isMovingStart) return;
            // else if moving node, placeNode logic should be used, so ignore here
            return;
        } else if (cellValue === 3) {
            // If cell is 3 and not moving node mode, ignore clicks
            if (!c.isMovingEnd) return;
            // else if moving node, placeNode logic should be used, so ignore here
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
                                if (c.isMovingStart) {
                                    placeNode(rowIndex, colIndex);
                                } else if (c.isMovingEnd) {
                                    placeNode(rowIndex, colIndex);
                                } else {
                                    updateCell(rowIndex, colIndex);
                                }
                            }}
                            onMouseEnter={() => {
                                if (isMouseDown && !c.isMovingStart) {
                                    updateCell(rowIndex, colIndex);
                                }
                            }}
                            className={`border ${
                                cell === 0
                                    ? "bg-gray-100 border-gray-300"
                                    : cell === 1
                                    ? "bg-black border-black"
                                    : cell === 2
                                    ? "bg-green-500 border-green-700"
                                    : "bg-blue-500 border-blue-500"
                            }`}
                            style={{
                                width: CELL_SIZE,
                                height: CELL_SIZE,
                                transition: "background-color 0.2s",
                                userSelect: "none",
                            }}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Grid;
