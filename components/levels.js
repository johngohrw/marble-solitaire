export const walls = "#█▌▐▀▄▖▗▝▘▚▞";
export const emptyChars = "-";
export const slotChars = "_ ";

// state legend:
// # = wall
// o = marble
// _ = empty space
export const levels = {
  classic: [
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
  freewin: [
    "███▀▀▀███",
    "██▌   ▐██",
    "█▀▘   ▝▀█",
    "▌       ▐",
    "▌ oo    ▐",
    "▌       ▐",
    "█▄▖   ▗▄█",
    "██▌   ▐██",
    "███▄▄▄███",
  ],
  unrated50: [
    "---   o#",
    "## #oo #",
    " o #   ",
    "o#o oo ",
    "ooo o   ",
    "  #o oo ",
    "--#o oo ",
  ],
  easy1: ["######", "# o o#", "#o oo#", "#o   #", "######"],
  easy2: ["######", "# oo #", "#oooo#", "#oo o#", "######"],
  easy3: ["######", "#ooo #", "#  o #", "# o  #", "#o oo#", "######"],
  medium1: ["   #  o", "o#o  o#", " o o  #", "o# o  -", "ooo o#-", " # # ##"],
};
