import Head from "next/head";
import { useEffect, useState } from "react";
import useSound from "use-sound";

String.prototype.replaceAt = function (index, replacement) {
  return (
    this.substring(0, index) +
    replacement +
    this.substring(index + replacement.length)
  );
};

export default function Home() {
  return (
    <>
      <div className="page">
        <Head>
          <title>Marble Solitaire</title>
          <meta name="description" content="Marble Solitaire" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="container">
          <h1 className="">Marble Solitaire</h1>

          <div className="gameContainer">
            <MarbleSolitaire />
          </div>
          <div className="instructions">
            <h1>Instructions </h1>
            <p>
              Marble solitaire is played on a board with a grid of 33 holes. At
              the start of the game there are marbles in every hole except for
              the central hole.
            </p>
            <p>
              Marbles can jump vertically or horizontally over a neighbouring
              marble and into an empty hole on the other side. The marble that
              was jumped over is then removed: You can select a marble by
              clicking or tapping it. You can then jump by clicking or tapping
              an empty hole.
            </p>
            <p>
              The aim of the game is to remove all of the marbles except for
              one.
            </p>
          </div>
        </main>

        <footer className="">
          <a
            href="https://john.shiksha"
            target="_blank"
            rel="noopener noreferrer"
          >
            by Rengwu
          </a>
        </footer>
      </div>
      <style jsx>{`
        .page {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 1000px;
        }
        .gameContainer {
          display: flex;
        }
        .instructions {
          margin-top: 2rem;
          text-align: center;
        }
      `}</style>
    </>
  );
}

const emptyChars = "_ ";

const walls = "#█▌▐▀▄▖▗▘▝▚▞";

const wallStyleMap = {
  "#": {
    height: "100%",
    width: "100%",
  },
  "█": {
    height: "100%",
    width: "100%",
  },
  "▌": { height: "100%", width: "50%", left: "0" },
  "▐": { height: "100%", width: "50%", right: "0" },
  "▀": { height: "50%", width: "100%", top: "0" },
  "▄": { height: "50%", width: "100%", bottom: "0" },
  "▖": {
    left: "0",
    bottom: "0",
    height: "50%",
    width: "50%",
  },
  "▗": {
    bottom: "0",
    height: "50%",
    width: "50%",
    right: "0",
  },
  "▘": {
    left: "0",
    top: "0",
    height: "50%",
    width: "50%",
  },
  "▝": {
    top: "0",
    right: "0",
    height: "50%",
    width: "50%",
  },
  "▚": {
    height: "140%",
    width: "50%",
    transform: "rotate(-45deg)",
  },
  "▞": {
    height: "140%",
    width: "50%",
    transform: "rotate(45deg)",
  },
};

// state legend:
// # = wall
// o = marble
// _ = empty space
const initialState = {
  chars: [
    "███▀▀▀███",
    "██▌ooo▐██",
    "█▀▘ooo▝▀█",
    "▌ooooooo▐",
    "▌ooo ooo▐",
    "▌ooooooo▐",
    "█▄▖ooo▗▄█",
    "██▌ooo▐██",
    "███▄▄▄███",
  ],
};

function getValidMoves(state) {
  // compute valid adjacent pairs
  const adjacents = {};
  state.forEach((row, y) => {
    row.split("").forEach((char, x) => {
      if (char === "o") {
        // check right side, mark as horizontal
        if (x + 1 < row.length && char === row[x + 1]) {
          adjacents[`${x},${y}-${x + 1},${y}`] = {
            from: { x, y },
            to: { x: x + 1, y },
            type: "hori",
          };
        }
        // check bottom side, mark as vertical
        if (y + 1 < state.length && char === state[y + 1][x]) {
          adjacents[`${x},${y}-${x},${y + 1}`] = {
            from: { x, y },
            to: { x, y: y + 1 },
            type: "verti",
          };
        }
      }
    });
  });

  // compile valid moves
  const validMoves = {};
  Object.values(adjacents).forEach((pair) => {
    const { from, to, type } = pair;
    if (type === "hori") {
      // horizontal, y is the same
      // check left side
      if (from.x > 0 && emptyChars.includes(state[from.y][from.x - 1])) {
        validMoves[`${to.x},${to.y}-${from.x - 1},${from.y}`] = true;
      }
      // check right side
      if (
        to.x < state[from.y].length - 1 &&
        emptyChars.includes(state[from.y][to.x + 1])
      ) {
        validMoves[`${from.x},${from.y}-${to.x + 1},${to.y}`] = true;
      }
    } else {
      // verti
      // check top side
      if (from.y > 0 && emptyChars.includes(state[from.y - 1][from.x])) {
        validMoves[`${to.x},${to.y}-${from.x},${from.y - 1}`] = true;
      }
      // check bottom side
      if (
        to.y < state.length - 1 &&
        emptyChars.includes(state[to.y + 1][to.x])
      ) {
        validMoves[`${from.x},${from.y}-${to.x},${to.y + 1}`] = true;
      }
    }
  });
  return validMoves;
}

function average(n1, n2) {
  return (n1 + n2) / 2;
}

function MarbleSolitaire() {
  const [restartState, setRestartState] = useState(initialState.chars);
  const [state, setState] = useState(initialState.chars);
  const [validMoves, setValidMoves] = useState(
    getValidMoves(initialState.chars)
  );
  const [hist, setHist] = useState([]);
  const [overlayMessage, setOverlayMessage] = useState("message");
  const [showOverlay, setShowOverlay] = useState(false);

  const [playClick] = useSound("./click-perc.wav", { volume: 0.25 });

  useEffect(() => {
    setValidMoves(getValidMoves(state));
  }, [state]);

  useEffect(() => {
    console.log(Object.keys(validMoves).length);
    if (Object.keys(validMoves).length <= 0) {
      endGame(false);
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
      setOverlayMessage(<div>lol</div>);
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
      <svg>
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

function Cell({ char, x, y, active, showOnlyWalls = false, ...rest }) {
  return (
    <>
      <div className="cell" {...rest}>
        {showOnlyWalls && walls.includes(char) && (
          <div className="wall" style={wallStyleMap[char]} />
        )}
        {!showOnlyWalls && emptyChars.includes(char) && (
          <div className="empty" />
        )}
        {!showOnlyWalls && char === "o" && (
          <div className={`marble ${active && "active"}`} />
        )}
      </div>
      <style jsx>{`
        .cell {
          position: relative;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          user-select: none;
        }
        .wall {
          background: #555;
          position: absolute;
        }
        .marble {
          position: absolute;
          width: 80%;
          height: 80%;
          border-radius: 50%;
          background: #008073;
          cursor: pointer;
        }

        .marble.active {
          border: 3px solid black;
        }
        .empty {
          position: absolute;
          width: 80%;
          height: 80%;
          border-radius: 50%;
          background: grey;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
