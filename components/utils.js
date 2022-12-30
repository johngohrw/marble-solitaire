import { slotChars } from "./levels";

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
      if (from.x > 0 && slotChars.includes(state[from.y][from.x - 1])) {
        validMoves[`${to.x},${to.y}-${from.x - 1},${from.y}`] = true;
      }
      // check right side
      if (
        to.x < state[from.y].length - 1 &&
        slotChars.includes(state[from.y][to.x + 1])
      ) {
        validMoves[`${from.x},${from.y}-${to.x + 1},${to.y}`] = true;
      }
    } else {
      // verti
      // check top side
      if (from.y > 0 && slotChars.includes(state[from.y - 1][from.x])) {
        validMoves[`${to.x},${to.y}-${from.x},${from.y - 1}`] = true;
      }
      // check bottom side
      if (
        to.y < state.length - 1 &&
        slotChars.includes(state[to.y + 1][to.x])
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

export const lippyAwayCipher = (string, number) => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  const input = string.toLowerCase();
  let output = "";
  for (let i = 0; i < input.length; i++) {
    const letter = input[i];
    if (alphabet.indexOf(letter) === -1) {
      output += letter;
      continue;
    }
    let index = alphabet.indexOf(letter) + (number % 26);
    if (index > 25) index -= 26;
    if (index < 0) index += 26;
    output +=
      string[i] === string[i].toUpperCase()
        ? alphabet[index].toUpperCase()
        : alphabet[index];
  }
  return output;
};

export function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

export function getMaxRowLength(state) {
  let result = 0;
  state.forEach((row) => {
    if (row.length > result) {
      result = row.length;
    }
  });
  return result;
}

export function getNextLevel(current, allLevels) {
  const keys = Object.keys(allLevels);
  return keys[(keys.indexOf(current) + 1) % keys.length];
}
