import React, { useState } from "react";
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
//enum catStateKeys {
//  "happy",
//  "guessing",
//  "sat",
//  "boss",
//}
export const catStates = {
  happy: "😸",
  guessing: "🙀",
  sad: "😿",
  boss: "😻",
};

function App() {
  const [difficulty, setDifficulty] = useState<number>(0);
  const [reRenderKey, setReRenderKey] = useState<number>(0);
  const [catState, setCatState] = useState<string>(catStates.happy);
  const difficultyChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDifficulty(parseInt(event.target.value));
    // Whenever the selection changes, this will change the key of the Grid component and therefore it will re-render!!!
    setReRenderKey((key) => ++key);
  };
  const restartHandler = () => {
    setReRenderKey((key) => ++key);
  };
  return (
    <div className="App">
      <label htmlFor="difficultyLevel">Difficulty</label>
      <select value={difficulty} onChange={difficultyChangeHandler} id="difficultyLevel">
        <option value={0}>Easy</option>
        <option value={1}>Medium</option>
        <option value={2}>Hard</option>
      </select>
      <button onClick={restartHandler} className="restart-btn">
        {catState}
      </button>
      <Grid
        height={difficultyLevels[difficulty].height}
				width={difficultyLevels[difficulty].height}
				mines={difficultyLevels[difficulty].mines}
				//This key prop can be used to re-draw the entire Grid component
        key={reRenderKey}
        setCatState={setCatState}
				levelName={difficultyLevels[difficulty].levelName}
      />
    </div>
  );
}

export default App;
