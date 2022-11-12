import React, { useEffect, useState } from "react";
import MineSweeper from "./minesweeper";
import "./App.css";
import { catStates } from "./App";
const Grid = (props: {
  height: number;
  width: number;
  mines: number;
  levelName: string;
  setCatState: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { height, width, mines, levelName, setCatState } = props;
  console.log({ props });
  const [grid, setGrid] = useState<number[][]>([]);
  console.log({ grid });
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isGameWon, setIsGameWon] = useState<boolean>(false);
  const [clicks, setClick] = useState<number>(0);
  const [cellsLeft, setCellsLeft] = useState(width * height - mines);
  const [flagsCount, setFlagsCount] = useState<number>(mines);
  const [flagPositions, setFlagPositions] = useState<Set<string>>(
    new Set<string>()
  );
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
  const isCellClickable = (row: number, col: number): boolean => {
    if (
      grid[row][col] === Number.NEGATIVE_INFINITY ||
      (grid[row][col] > 0 && grid[row][col] !== Number.POSITIVE_INFINITY)
    )
      return false;
    return true;
  };
  useEffect(() => {
    const ms = new MineSweeper(height, width, mines);
    setGrid(ms.grid);
  }, [height, mines, width]);
  useEffect(() => {
    setCatState(catStates.happy);
  }, [setCatState]);
  const cellClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    if (isGameOver) return;
    const target: HTMLElement = event.currentTarget;
    const r = parseInt(target.getAttribute("data-row") || "");
    const c = parseInt(target.getAttribute("data-col") || "");
    if (grid[r][c] === Number.POSITIVE_INFINITY) {
      setIsGameOver(true);
      setCatState(catStates.sad);
    } else if (grid[r][c] === 0) {
      setClick((click) => ++click);
      setGrid((grid) => {
        visitNeighbors(r, c, grid);
        return [...grid];
      });
    }
  };
  const placeFlagHandler = (row: number, col: number) => {
    setFlagPositions((flagPositions) => {
      if (flagPositions.has(`${row},${col}`)) {
        flagPositions.delete(`${row},${col}`);
      } else {
        //dont place flags if 0 flags are left, also don't update the state in this case
        if (flagPositions.size === mines) return flagPositions;
        flagPositions.add(`${row},${col}`);
      }
      //return a new set so that state reference is updated
      return new Set(flagPositions);
    });
  };
  const mouseDownHandler = (r: number, c: number) => {
    if (isCellClickable(r,c)) setCatState(catStates.guessing);
  };
  const mouseUpHandler = () => {
    if (isGameOver) {
      if (isGameWon) {
        setCatState(catStates.boss);
      } else {
        setCatState(catStates.sad);
      }
    } else {
      setCatState(catStates.happy);
    }
  };
  useEffect(() => {
    console.log("flagPositions set was updated");
  }, [flagPositions]);
  useEffect(() => {
    if (cellsLeft === 0) {
      setIsGameWon(true);
      setIsGameOver(true);
      setCatState(catStates.boss);
    }
    setFlagPositions((flagPositions) => {
      const newFlagPos = new Set<string>();
      for (const pos of Array.from(flagPositions.keys())) {
        const [row, col] = pos.split(",").map((str) => parseInt(str));

        if (
          grid[row][col] === Number.NEGATIVE_INFINITY ||
          (grid[row][col] > 0 && grid[row][col] !== Number.POSITIVE_INFINITY)
        ) {
        } else {
          //keep flag at this cell
          newFlagPos.add(pos);
        }
      }
      return newFlagPos;
    });
  }, [cellsLeft, flagsCount, grid, setCatState]);
  useEffect(() => {
    console.log("flagPositions");
    setFlagsCount(mines - flagPositions.size);
  }, [mines, flagPositions]);
  return (
    <div className="Grid">
      <div>
        <h1>Level: {levelName}</h1>
        <p>Clicks: {clicks}</p>
        <p>Cells Left: {cellsLeft}</p>
        <p>Flags left: {flagsCount}</p>
        {isGameOver ? (
          isGameWon ? (
            <p>🎉You won 🎉</p>
          ) : (
            <p>GAME OVER!!!!💣</p>
          )
        ) : null}
      </div>
      <div className="grid">
        {grid.map((row, r) => {
          return (
            <div className="row" key={`row-${r}`}>
              {row.map((col, c) => {
                return (
                  <button
                    className={`cell ${
                      isGameOver
                        ? "uncovered"
                        : col === Number.NEGATIVE_INFINITY ||
                          (col > 0 && col !== Number.POSITIVE_INFINITY)
                        ? "uncovered"
                        : "covered"
                    } ${
                      isGameOver &&
                      col === Number.POSITIVE_INFINITY &&
                      (flagPositions.has(r + "," + c)
                        ? "mine-found"
                        : "mine-not-found")
                    } ${
                      isGameOver &&
                      flagPositions.has(r + "," + c) &&
                      col !== Number.POSITIVE_INFINITY &&
                      "wrong-flag"
                    }`}
                    key={`col-${c}`}
                    data-row={r}
                    data-col={c}
                    onClick={(e) => {
                      if (flagPositions.has(`${r},${c}`)) return;
                      cellClickHandler(e);
                    }}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      if (col === Number.NEGATIVE_INFINITY) return;
                      placeFlagHandler(r, c);
                    }}
                    onMouseDown={() => {
                      mouseDownHandler(r, c);
                    }}
                    onMouseUp={mouseUpHandler}
                  >
                    {col > 0 && col < Number.POSITIVE_INFINITY ? col : null}
                    {col === Number.POSITIVE_INFINITY && isGameOver && "💣"}
                    {col === Number.POSITIVE_INFINITY &&
                      flagPositions.has(`${r},${c}`) &&
                      "🚩"}
                    {col === 0
                      ? flagPositions.has(`${r},${c}`)
                        ? "🚩"
                        : ""
                      : ""}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Grid;
