import React, { useEffect, useState } from "react";
import MineSweeper from "./minesweeper";
import './App.css';

function App() {
  const ms = new MineSweeper(5, 5, 3);
  const [grid, setGrid] = useState<number[][]>(ms.grid);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isGameWon, setIsGameWon] = useState<boolean>(false);
  const [clicks, setClick] = useState<number>(0);
  const [cellsLeft, setCellsLeft] = useState(22);
  function visitNeighbors(
    row: number,
    col: number,
    grid: number[][]
    //cellsLeft: number
  ): void {
    // visit all its neighbours
    const neighbours: number[][] = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
    let nearbyMines: number = 0;
    const safeNb: number[][] = [];
    for (const nb of neighbours) {
      const nextRow = row + nb[0];
      const nextCol = col + nb[1];
      if (
        nextRow < 0 ||
        nextRow >= grid.length ||
        nextCol < 0 ||
        nextCol >= grid[0].length
      )
        continue;
      if (grid[nextRow][nextCol] === Number.POSITIVE_INFINITY) {
        nearbyMines++;
      } else if (grid[nextRow][nextCol] === 0) {
        const newCell = [nextRow, nextCol];
        safeNb.push(newCell);
      }
    }
    if (nearbyMines === 0) {
      // no mines in its neighbours
      grid[row][col] = Number.NEGATIVE_INFINITY;
      setCellsLeft((cellsLeft) => --cellsLeft);
      // go to its neighbours
      for (const nb of safeNb) {
        if (grid[nb[0]][nb[1]] === 0) visitNeighbors(nb[0], nb[1], grid);
      }
    } else {
      grid[row][col] = nearbyMines;
      setCellsLeft((cellsLeft) => --cellsLeft);
    }
  }
  const cellClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    if (isGameOver || isGameWon) return;
    const target: HTMLElement = event.currentTarget;
    const r = parseInt(target.getAttribute("data-row") || "");
    const c = parseInt(target.getAttribute("data-col") || "");
    if (grid[r][c] === Number.POSITIVE_INFINITY) {
      setIsGameOver(true);
    } else if (grid[r][c] === 0) {
      setClick((click) => ++click);
      setGrid((grid) => {
        visitNeighbors(r, c, grid);
        return [...grid];
      });
    }
  };
  useEffect(() => {
    if (cellsLeft === 0) setIsGameWon(true);
  }, [cellsLeft]);
  return (
    <div className="App">
      <p>Clicks: {clicks}</p>
      <p>Cells Left: {cellsLeft}</p>
      {isGameOver ? <p>GAME OVER!!!!💣</p> : null}
      {isGameWon ? <p>🎉You won 🎉</p> : null}
      <div className="grid">
        {grid.map((row, r) => {
          return (
            <div className="row" key={`row-${r}`}>
              {row.map((col, c) => {
                return (
                  <button
									className="cell"
                    key={`col-${c}`}
                    data-row={r}
                    data-col={c}
                    onClick={cellClickHandler}
                  >
                    {col === Number.NEGATIVE_INFINITY
                      ? "_ "
                      : col === Number.POSITIVE_INFINITY
                      ? isGameWon || isGameOver
                        ? "💣"
                        : "0 "
                      : col}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
