export const PlayAgain = (props) => (
  <div className="game-done">
    <div className={`message ${props.gameStatus}`}>
      {props.gameStatus === "lost" ? "Game Over" : "Winner!"}
    </div>
    <button onClick={props.onClick}>Play Again</button>
  </div>
);
