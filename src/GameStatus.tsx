type GameStatusProps = {
  isGameOver: boolean;
  isGameWon: boolean;
};

const GameStatus = ({
  isGameOver,
  isGameWon,
}: GameStatusProps): JSX.Element => {
  return (
    <>
      {isGameOver ? (
        isGameWon ? (
          <p>🎉You won 🎉</p>
        ) : (
          <p>GAME OVER!!!!💣</p>
        )
      ) : null}
    </>
  );
};

export default GameStatus;