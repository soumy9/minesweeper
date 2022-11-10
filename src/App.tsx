import React, { useEffect, useState } from "react";
import MineSweeper from "./minesweeper";
import "./App.css";
import Grid from "./Grid";

interface DifficultyLevel {
  levelName: string;
  height: number;
  width: number;
  mines: number;
}

const difficultyLevels: DifficultyLevel[] = [
  {
    levelName: "easy",
    height: 7,
    width: 7,
    mines: 10,
  },
  {
    levelName: "medium",
    height: 10,
    width: 10,
    mines: 30,
  },
  {
    levelName: "hard",
    height: 15,
    width: 15,
    mines: 70,
  },
];

function App() {
  const [difficulty, setDifficulty] = useState<number>(0);
	//const [height,setHeight]=useState<number>(0);
	//const [width,setwidth]=useState<number>(0);
	//const [mines,setmines]=useState<number>(0);
  const difficultyChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDifficulty(parseInt(event.target.value));
  };
  return (
    <div className="App">
      <label>Difficulty</label>
      <select value={difficulty} onChange={difficultyChangeHandler}>
        <option value={0}>Easy</option>
        <option value={1}>Medium</option>
        <option value={2}>Hard</option>
      </select>
      <Grid {...difficultyLevels[difficulty]} />
    </div>
  );
}

export default App;
