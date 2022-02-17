import React, { useState, useEffect } from "react";
import { PlayAgain } from "./PlayAgain";
import { PlayNumber } from "./PlayNumber";
import { StarsDisplay } from "./StarsDisplay";
import { utils } from "./utils";

export const Game = (props) => {
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  const [candidateNums, setCandidateNums] = useState([]);
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    if (seconds > 0 && availableNums.length > 0) {
      const timer = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  });

  const gameStatus = () => {
    if (availableNums.length === 0) {
      return "won";
    }

    if (seconds === 0) {
      return "lost";
    }

    return "active";
  };

  const candidatesAreWrong = utils.sum(candidateNums) > stars;
  const status = gameStatus();

  const numberStatus = (number) => {
    if (!availableNums.includes(number)) {
      return "used";
    }

    if (candidateNums.includes(number)) {
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
        ? candidateNums.concat(number)
        : candidateNums.filter((n) => n !== number);

    if (utils.sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums);
    } else {
      const newAvailableNums = availableNums.filter(
        (n) => !newCandidateNums.includes(n)
      );
      setStars(utils.randomSumIn(newAvailableNums, 9));
      setAvailableNums(newAvailableNums);
      setCandidateNums([]);
    }
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
            <StarsDisplay range={utils.range(1, stars)} />
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
      <div className="timer">Time Remaining: {seconds}</div>
    </div>
  );
};
