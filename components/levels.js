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
  // freewin: [
  //   "███▀▀▀███",
  //   "██▌   ▐██",
  //   "█▀▘   ▝▀█",
  //   "▌       ▐",
  //   "▌ oo    ▐",
  //   "▌       ▐",
  //   "█▄▖   ▗▄█",
  //   "██▌   ▐██",
  //   "███▄▄▄███",
  // ],
  easy1: ["######", "# o o#", "#o oo#", "#o   #", "######"],
  easy2: ["######", "# oo #", "#oooo#", "#oo o#", "######"],
  easy3: ["######", "#ooo #", "#  o #", "# o  #", "#o oo#", "######"],
  medium1: ["   #  o", "o#o  o#", " o o  #", "o# o  -", "ooo o#-", " # # ##"],
  medium2: [
    "---   o#",
    "## #oo #",
    " o #   ",
    "o#o oo ",
    "ooo o   ",
    "  #o oo ",
    "--#o oo ",
  ],
  medium3: [
    "         ",
    "  o   o  ",
    "oooo   o ",
    "  o o  o ",
    " oo oo  o",
    "   o    o",
  ],
  hard1: [
    "-    - -",
    "  o  oo ",
    " o o oo ",
    "-oo o   ",
    "  o#   ",
    "o  o    ",
    "o o  o  ",
    " oo   o-",
    "   oo o ",
  ],
};
