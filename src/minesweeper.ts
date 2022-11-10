class MineSweeper {
  grid: number[][];
  cellsLeft: number;

  constructor(height: number, width: number, mines: number) {
    this.grid = [];
    for (let r = 0; r < height; r++) {
      this.grid.push([]);
      for (let c = 0; c < width; c++) {
        this.grid[r].push(0);
      }
    }
    //this.grid=new Array(width).fill(new Array(height).fill(0));
    this.cellsLeft = width * height - mines;
    this.generateGrid(height, width, mines);
  }

  printGrid(): void {
    const displayGrid: string[][] = [];
    for (let r = 0; r < this.grid.length; r++) {
      displayGrid.push([]);
      for (let c = 0; c < this.grid[0].length; c++) {
        if (this.grid[r][c] === Number.NEGATIVE_INFINITY) {
          displayGrid[r].push("_ ");
        } else if (this.grid[r][c] === Number.POSITIVE_INFINITY) {
          displayGrid[r].push("0 ");
        } else {
          displayGrid[r].push(this.grid[r][c] + " ");
        }
      }
    }
    for (let i = 0; i < displayGrid.length; i++) {
      console.log(displayGrid[i].join(""));
    }
  }

  private generateGrid(height: number, width: number, mines: number): void {
    while (mines > 0) {
      const randomRow: number = Math.floor(height * Math.random());
      const randomCol: number = Math.floor(width * Math.random());
      if (this.grid[randomRow][randomCol] === 0) {
        this.grid[randomRow][randomCol] = Number.POSITIVE_INFINITY;
        mines--;
      }
    }
  }

  //visitCell(row: number, col: number): boolean {
  //  if (this.grid[row][col] === Number.POSITIVE_INFINITY) {
  //    //a mine here
  //    return false;
  //  }
  //  if (this.grid[row][col] === 0) this.visitNeighbors(row, col);
  //  return true;
  //}

  //visitNeighbors(row: number, col: number,grid:number[][]): void {
  //  // visit all its neighbours
  //  const neighbours: number[][] = [
  //    [-1, -1],
  //    [-1, 0],
  //    [-1, 1],
  //    [0, -1],
  //    [0, 1],
  //    [1, -1],
  //    [1, 0],
  //    [1, 1],
  //  ];
  //  let nearbyMines: number = 0;
  //  const safeNb: number[][] = [];
  //  for (const nb of neighbours) {
  //    const nextRow = row + nb[0];
  //    const nextCol = col + nb[1];
  //    if (
  //      nextRow < 0 ||
  //      nextRow >= grid.length ||
  //      nextCol < 0 ||
  //      nextCol >= grid[0].length
  //    )
  //      continue;
  //    if (grid[nextRow][nextCol] === Number.POSITIVE_INFINITY) {
  //      nearbyMines++;
  //    } else if (grid[nextRow][nextCol] === 0) {
  //      const newCell = [nextRow, nextCol];
  //      safeNb.push(newCell);
  //    }
  //  }
  //  if (nearbyMines === 0) {
  //    // no mines in its neighbours
  //    grid[row][col] = Number.NEGATIVE_INFINITY;
  //    this.cellsLeft--;
  //    // go to its neighbours
  //    for (const nb of safeNb) {
  //      if (grid[nb[0]][nb[1]] === 0) this.visitNeighbors(nb[0], nb[1], grid);
  //    }
  //  } else {
  //    grid[row][col] = nearbyMines;
  //    this.cellsLeft--;
  //  }
  //}
}

export default MineSweeper;