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
}

export default MineSweeper;
