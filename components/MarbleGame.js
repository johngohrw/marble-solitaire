import useSound from "use-sound";
import Cell from "./Cell";
import { useEffect, useState } from "react";
import { levels as levelsBeforeTransform, transformLevels } from "./levels";
import Router from "next/router";
import {
  average,
  getMaxRowLength,
  getNextLevel,
  getValidMoves,
  winCheck,
} from "./utils";

const levels = transformLevels(levelsBeforeTransform);
const initialUndos = 2;
const defaultLevel = levels.easy01;
let progressString;

export default function MarbleGame({
  level,
  devMode,
  soundEffects,
  setLevelProgress,
}) {
  const [restartState, setRestartState] = useState(
    levels[level] || defaultLevel
  );
  const [prevStates, setPrevStates] = useState([]);
  const [state, setState] = useState(levels[level] || defaultLevel);
  const [validMoves, setValidMoves] = useState(
    getValidMoves(levels[level] || defaultLevel)
  );
  const [hist, setHist] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [winState, setWinState] = useState(false);
  const [undoCredits, setUndoCredits] = useState(initialUndos);

  const [playClick] = useSound("./metronome-perc.wav", {
    volume: soundEffects ? 0.45 : 0,
  });
  const [playShuffle] = useSound("./marbleshuffle.mp3", {
    volume: soundEffects ? 0.35 : 0,
  });
  const [playLose] = useSound("./toddlercry.wav", {
    volume: soundEffects ? 0.11 : 0,
  });
  const [playWin] = useSound("./tada.mp3", {
    volume: soundEffects ? 0.55 : 0,
  });
  const [playUndo] = useSound("./swoosh.mp3", {
    volume: soundEffects ? 0.75 : 0,
  });

  // restart if level changes
  useEffect(() => {
    setRestartState(levels[level]);
    setState(levels[level]);
    restartGame(levels[level]);
  }, [level]);

  // get valid moves whenever state changes
  useEffect(() => {
    setValidMoves(getValidMoves(state));
  }, [state]);

  // check win/lose condition when there are no valid moves left
  useEffect(() => {
    if (Object.keys(validMoves).length <= 0) {
      endGame(winCheck(state));
    }
  }, [validMoves]);

  // check if previously made move is a valid move
  useEffect(() => {
    if (hist.length > 1) {
      const from = hist[hist.length - 2];
      const to = hist[hist.length - 1];
      const compareString = `${from[0]},${from[1]}-${to[0]},${to[1]}`;
      if (Object.prototype.hasOwnProperty.call(validMoves, compareString)) {
        makeMove(compareString);
      }
    }
  }, [hist]);

  function makeMove(moveString) {
    setPrevStates([...prevStates, JSON.parse(JSON.stringify(state))]);
    const from = moveString
      .split("-")[0]
      .split(",")
      .map((o) => parseInt(o));
    const to = moveString
      .split("-")[1]
      .split(",")
      .map((o) => parseInt(o));
    const between = [average(from[0], to[0]), average(from[1], to[1])];
    const newState = JSON.parse(JSON.stringify(state));
    // from becomes empty
    newState[from[1]] = newState[from[1]].replaceAt(from[0], " ");
    // inbetween becomes empty
    newState[between[1]] = newState[between[1]].replaceAt(between[0], " ");
    // to becomes a marble
    newState[to[1]] = newState[to[1]].replaceAt(to[0], "o");
    setState(newState);
    playClick();
  }

  function undo() {
    if (prevStates.length > 0) {
      const newState = prevStates[prevStates.length - 1];
      setState(newState);
      setPrevStates(prevStates.slice(0, -1));
      playUndo();
      setUndoCredits(undoCredits - 1);
    } else {
      alert("i can't undo nothin");
    }
  }

  function restartGame(state = null) {
    setState(state || restartState);
    setShowOverlay(false);
    playShuffle();
    if (!devMode) {
      setUndoCredits(initialUndos);
      setPrevStates([]);
    }
  }

  function endGame(win) {
    if (win) {
      setWinState(true);
      playWin();
      const newProgress = getUpdatedLevelCompletionProgress(
        progressString,
        level
      );
      localStorage?.setItem("progress", JSON.stringify(newProgress));
      setLevelProgress(newProgress);
    } else {
      setWinState(false);
      playLose();
    }
    setShowOverlay(true);
  }

  // get latest progress from localStorage
  useEffect(() => {
    progressString = localStorage.getItem("progress");
  }, [level]);

  function getUpdatedLevelCompletionProgress(progString, levelID) {
    const progress = JSON.parse(progString);
    progress[levelID] = true;
    return progress;
  }

  return (
    <>
      <div className="gameContainer">
        <div className="overlay">
          <div className={`overlayInner ${winState && showOverlay && "show"}`}>
            <img
              src="./tada.jpg"
              style={{
                height: "150px",
                width: "150px",
                marginBottom: "1rem",
              }}
            />
            <div style={{ marginBottom: "1rem" }}>You're insane!</div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                className="button"
                style={{ backgroundColor: "#5c5c5c" }}
                onClick={restartGame}
              >
                Start over
              </button>
              <button
                className="button"
                onClick={() => {
                  getNextLevel(level, levels);
                  Router.push(
                    window.location.origin + `?l=` + getNextLevel(level, levels)
                  );
                  restartGame();
                }}
              >
                Next level
              </button>
            </div>
          </div>
          <div className={`overlayInner ${!winState && showOverlay && "show"}`}>
            <img
              src="./yay.jpg"
              style={{
                height: "150px",
                width: "150px",
                marginBottom: "1rem",
              }}
            />
            <div style={{ marginBottom: "1rem" }}>No moves left</div>

            <button className="button" onClick={restartGame}>
              Try again
            </button>
          </div>
        </div>
        <div className="game">
          <div className="grid walls" style={{ userSelect: "none" }}>
            {state.map((row, y) => (
              <div className="gridRow" key={y}>
                {row.split("").map((char, x) => (
                  <Cell
                    showOnlyWalls
                    x={x}
                    y={y}
                    key={`${char}${x}${y}`}
                    char={char}
                  />
                ))}

                {/* fillers */}
                {Array.from(
                  { length: getMaxRowLength(state) - row.length },
                  (v, i) => i
                ).map((i) => (
                  <Cell key={`filler${i}`} char="-" />
                ))}
              </div>
            ))}
          </div>
          <div className="grid">
            {state.map((row, y) => (
              <div className="gridRow" key={y}>
                {row.split("").map((char, x) => (
                  <Cell
                    x={x}
                    y={y}
                    key={`${char}${x}${y}`}
                    char={char}
                    active={
                      hist.length > 0 &&
                      hist[hist.length - 1][0] === x &&
                      hist[hist.length - 1][1] === y
                    }
                    onClick={() => setHist([...hist, [x, y]])}
                  />
                ))}
                {/* fillers */}
                {Array.from(
                  { length: getMaxRowLength(state) - row.length },
                  (v, i) => i
                ).map((i) => (
                  <Cell key={`filler${i}`} char="-" />
                ))}
              </div>
            ))}
          </div>
          <div className="gameOptions">
            <div style={{ flexShrink: "0" }}>
              <button className="button big" onClick={restartGame}>
                Restart
              </button>{" "}
              <button
                style={{ marginLeft: "0.5rem" }}
                className="button big"
                onClick={undo}
                disabled={undoCredits <= 0 || prevStates.length <= 0}
              >
                Undo (x{undoCredits})
              </button>
              {devMode && (
                <>
                  <button
                    style={{ marginLeft: "0.5rem" }}
                    className="button"
                    onClick={undo}
                  >
                    Infinite Undo
                  </button>

                  <button onClick={() => console.log(JSON.stringify(state))}>
                    copy state
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <svg style={{ width: 0, height: 0 }}>
        <filter id="gooey">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
          <feColorMatrix
            values="
        1 0 0 0 0
        0 1 0 0 0
        0 0 1 0 0
        0 0 0 20 -10
        "
          />
        </filter>
      </svg>
      <style jsx>{`
        .gameContainer {
          width: 100%;
          position: relative;
          padding: 0.2rem;
        }
        .game {
          position: relative;
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(52, 52, 53, 0.83);
          z-index: 1;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          color: white;
          transition-duration: 500ms;
          backdrop-filter: blur(2px);

          opacity: ${showOverlay ? 1 : 0};
          user-select: none;
          pointer-events: ${showOverlay ? "auto" : "none"};
        }

        @media (min-width: 680px) {
          .overlay {
            border-radius: 16px;
          }
        }

        .overlayInner {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          pointer-events: none;
          user-select: none;
          opacity: 0;
        }
        .overlayInner.show {
          z-index: 10;
          pointer-events: auto;
          user-select: auto;
          opacity: 1;
        }
        .grid {
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        .gridRow {
          display: flex;
        }
        .walls {
          position: absolute;
          top: 0;
          left: 0;
          filter: url("#gooey");
        }
        .grid:not(.walls) {
        }

        .gameOptions {
          margin-top: 1rem;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-end;
          width: 100%;
        }
      `}</style>
    </>
  );
}
