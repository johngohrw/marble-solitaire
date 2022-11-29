import useSound from "use-sound";
import Cell from "./Cell";
import { useEffect, useState } from "react";
import { levels } from "./levels";
import { average, getValidMoves, winCheck } from "./utils";

export default function MarbleGame({ level }) {
  const [restartState, setRestartState] = useState(
    levels[level] || levels.classic
  );
  const [state, setState] = useState(levels[level] || levels.classic);
  const [validMoves, setValidMoves] = useState(
    getValidMoves(levels[level] || levels.classic)
  );
  const [hist, setHist] = useState([]);
  const [overlayMessage, setOverlayMessage] = useState("message");
  const [showOverlay, setShowOverlay] = useState(false);

  const [playClick] = useSound("./click-perc.wav", { volume: 0.25 });
  const [playTada] = useSound("./tada.mp3", { volume: 0.25 });

  // restart if level changes
  useEffect(() => {
    setRestartState(levels[level]);
    setState(levels[level]);
  }, [level]);

  useEffect(() => {
    setValidMoves(getValidMoves(state));
  }, [state]);

  useEffect(() => {
    if (Object.keys(validMoves).length <= 0) {
      endGame(winCheck(state));
    }
  }, [validMoves]);

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
    newState[from[1]] = newState[from[1]].replaceAt(from[0], "_"); // from becomes empty
    newState[between[1]] = newState[between[1]].replaceAt(between[0], "_"); // inbetween becomes empty
    newState[to[1]] = newState[to[1]].replaceAt(to[0], "o"); // to becomes a marble
    setState(newState);
    playClick();
  }

  function restartGame() {
    setState(restartState);
    setShowOverlay(false);
  }

  function endGame(win) {
    if (win) {
      playTada();
      setOverlayMessage(
        <>
          <img
            src="./tada.jpg"
            style={{ height: "100px", width: "100px", marginBottom: "1rem" }}
          />
          <div style={{ marginBottom: "1rem" }}>You're insane!</div>

          <button className="button" onClick={restartGame}>
            Start over
          </button>
        </>
      );
    } else {
      setOverlayMessage(
        <>
          <img
            src="./yay.jpg"
            style={{ height: "100px", width: "100px", marginBottom: "1rem" }}
          />
          <div style={{ marginBottom: "1rem" }}>No moves left</div>

          <button className="button" onClick={restartGame}>
            Try again
          </button>
        </>
      );
    }
    setShowOverlay(true);
  }

  return (
    <>
      <div className="game">
        {showOverlay && <div className="overlay">{overlayMessage}</div>}
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
            </div>
          ))}
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
        .game {
          position: relative;
        }
        .overlay {
          position: absolute;
          width: 100%;
          height: 100%;
          background: rgba(52, 52, 53, 0.83);
          z-index: 1;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
        }
        .grid {
          display: flex;
          flex-direction: column;
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
      `}</style>
      <style jsx global>{`
        .button {
          border: none;
          background: purple;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 24px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
