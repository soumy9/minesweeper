const GameStats = (props:{
	isGameOver:boolean;
	levelName:string;
	clicks:number;
	cellsLeft:number;
	flagsCount:number;
	isGameWon:boolean;
}) => {
	const {isGameOver,levelName,clicks,cellsLeft,flagsCount,isGameWon}=props;
  return (
    <div className="game-stats">
      <h1>Level: {levelName}</h1>
      <p>Clicks: {clicks}</p>
      <p>Cells Left: {cellsLeft}</p>
      <p>Flags left: {flagsCount}</p>
      {isGameOver ? (
        isGameWon ? (
          <p>ðYou won ð</p>
        ) : (
          <p>GAME OVER!!!!ð£</p>
        )
      ) : null}
    </div>
  );
};

export default GameStats;