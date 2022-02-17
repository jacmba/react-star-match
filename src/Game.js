import React from "react";
import { useGameState } from "./GameStateHook";
import { PlayAgain } from "./PlayAgain";
import { PlayNumber } from "./PlayNumber";
import { StarsDisplay } from "./StarsDisplay";
import { utils } from "./utils";

export const Game = (props) => {
  const [gameState, setGameState] = useGameState();

  const gameStatus = () => {
    if (gameState.availableNums.length === 0) {
      return "won";
    }

    if (gameState.seconds === 0) {
      return "lost";
    }

    return "active";
  };

  const candidatesAreWrong =
    utils.sum(gameState.candidateNums) > gameState.stars;
  const status = gameStatus();

  const numberStatus = (number) => {
    if (!gameState.availableNums.includes(number)) {
      return "used";
    }

    if (gameState.candidateNums.includes(number)) {
      return candidatesAreWrong ? "wrong" : "candidate";
    }

    return "available";
  };

  const onNumberClick = (number, currentStatus) => {
    if (currentStatus === "used" || status !== "active") {
      return;
    }

    const newCandidateNums =
      currentStatus === "available"
        ? gameState.candidateNums.concat(number)
        : gameState.candidateNums.filter((n) => n !== number);

    setGameState(newCandidateNums);
  };

  const resetGame = () => {
    props.startNewGame();
  };

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {status !== "active" ? (
            <PlayAgain onClick={resetGame} gameStatus={status} />
          ) : (
            <StarsDisplay range={utils.range(1, gameState.stars)} />
          )}
        </div>
        <div className="right">
          {utils.range(1, 9).map((n) => (
            <PlayNumber
              key={n}
              number={n}
              status={numberStatus(n)}
              onClick={onNumberClick}
            />
          ))}
        </div>
      </div>
      <div className="timer">Time Remaining: {gameState.seconds}</div>
    </div>
  );
};
