import { emptyChars } from "./levels";

export function average(n1, n2) {
  return (n1 + n2) / 2;
}

export function getValidMoves(state) {
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

export function winCheck(state) {
  let marbleCount = 0;
  state.forEach((row) => {
    row.split("").forEach((char) => {
      if (char === "o") {
        marbleCount += 1;
      }
    });
  });
  if (marbleCount === 1) {
    return true;
  }
  return false;
}
