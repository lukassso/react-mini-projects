import React from "react";
import { ROWS, COLS, CELL, BODY, FOOD } from "./const";
import "./style.css";

function Cells({ board, handleKey }) {
  const cells = [];

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const key = COLS * row + col;
      const value = board[key];
      const className =
        value === BODY ? "body-cell" : value === FOOD ? "food-cell" : "cell";

      cells.push(<div className={className} />);
    }
  }
  return (
    <div
      style={{ width: COLS * CELL, height: ROWS * CELL }}
      className="board"
      tabIndex={0}
      onKeyDown={handleKey}
    >
      {cells}
    </div>
  );
}

export default Cells;
