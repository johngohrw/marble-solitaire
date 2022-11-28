import Head from "next/head";
import { useEffect, useState } from "react";

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
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="">
          <h1 className="">
            Welcome to <a href="https://nextjs.org">Next.js!</a>
          </h1>

          <div className="gameContainer">
            <MarbleSolitaire />
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
        .gameContainer {
          display: flex;
        }
      `}</style>
    </>
  );
}

// state legend:
// # = wall
// o = marble
// _ = empty space
const initialState = {
  chars: [
    "#########",
    "###ooo###",
    "###ooo###",
    "#ooooooo#",
    "#ooo_ooo#",
    "#ooooooo#",
    "###ooo###",
    "###ooo###",
    "#########",
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
      if (from.x > 0 && state[from.y][from.x - 1] === "_") {
        validMoves[`${to.x},${to.y}-${from.x - 1},${from.y}`] = true;
      }
      // check right side
      if (to.x < state[from.y].length - 1 && state[from.y][to.x + 1] === "_") {
        validMoves[`${from.x},${from.y}-${to.x + 1},${to.y}`] = true;
      }
    } else {
      // verti
      // check top side
      if (from.y > 0 && state[from.y - 1][from.x] === "_") {
        validMoves[`${to.x},${to.y}-${from.x},${from.y - 1}`] = true;
      }
      // check bottom side
      if (to.y < state.length - 1 && state[to.y + 1][to.x] === "_") {
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
  const [state, setState] = useState(initialState.chars);
  const [validMoves, setValidMoves] = useState(
    getValidMoves(initialState.chars)
  );
  const [hist, setHist] = useState([]);

  useEffect(() => {
    setValidMoves(getValidMoves(state));
  }, [state]);

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
  }

  return (
    <>
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
      <style jsx>{`
        .grid {
          display: flex;
          flex-direction: column;
        }
        .gridRow {
          display: flex;
        }
      `}</style>
    </>
  );
}

function Cell({ char, x, y, active, ...rest }) {
  return (
    <>
      <div className={`${char === "#" && "wall"} cell`} {...rest}>
        <div className="empty" />
        {char === "o" && <div className={`marble ${active && "active"}`} />}
      </div>
      <style jsx>{`
        .cell {
          position: relative;
          width: 50px;
          height: 50px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          user-select: none;
        }
        .wall {
          background: brown;
        }
        .marble {
          position: absolute;
          width: 80%;
          height: 80%;
          border-radius: 50%;
          background: green;
        }

        .marble.active {
          border: 3gipx solid black;
        }
        :not(.wall) > .empty {
          position: absolute;
          width: 80%;
          height: 80%;
          border-radius: 50%;
          background: grey;
        }
      `}</style>
    </>
  );
}
