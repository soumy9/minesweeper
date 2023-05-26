type GameStatsProps = {
  isGameOver: boolean;
  clicks: number;
  cellsLeft: number;
  flagsCount: number;
  isGameWon: boolean;
};

const GameStats: React.FC<GameStatsProps> = ({
  isGameOver,
  clicks,
  cellsLeft,
  flagsCount,
  isGameWon,
}) => {
  return (
    <div className="game-stats">
      <p className="info-cell">Clicks: {clicks}</p>
      <p className="info-cell">Cells Left: {cellsLeft}</p>
      <p className="info-cell">Flags left: {flagsCount}</p>
    </div>
  );
};

export default GameStats;
