export const walls = "#█▌▐▀▄▖▗▝▘▚▞";
export const emptyChars = "-";
export const slotChars = "_ ";

// board state legend:
// # = wall
// o = marble
//   = empty marble space (slot)
// - = nothing (no slot)
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
  easy1: ["######", "# o o#", "#o oo#", "#o   #", "######"],
  easy2: ["######", "# oo #", "#oooo#", "#oo o#", "######"],
  easy3: ["######", "#ooo #", "#  o #", "# o  #", "#o oo#", "######"],
  easy4: ["   #  o", "o#o  o#", " o o  #", "o# o  -", "ooo o#-", " # # ##"],
  medium1: [" ##  #", " oo --#", "# #o o", " oo o #", "#ooo o", "  o o #"],
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
    "      oo ",
    "     o   ",
    " o ooo o ",
    "o  o    o",
    "  o      ",
    "oo      o",
    "o  o o o ",
  ],
  medium4: [
    " o   oo oo",
    " o   o ▚ ▞",
    "o o o oo  ",
    " o   o ▞o▚",
    " o   o   -",
  ],
  medium5: [
    " o         ",
    "oo o    # o",
    "o #ooooooo ",
    " ooo o   o ",
    "  o o  o   ",
  ],
  medium6: [
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
  // "       ▗▄▄  ",
  // "       ▐▚   ",
  // "       ▐ ▚  ",
  // "          ▚ "

  hard1: [
    "         ",
    "  o   o  ",
    "oooo   o ",
    "  o o  o ",
    " oo oo  o",
    "   o    o",
  ],
  hard2: [
    "#-#-#-#-#-#",
    " o      oo ",
    "-  o#o oo o",
    " o o o    o",
    "  o o o o  ",
    " o #ooo# o ",
    "o -   o - o",
    " o oo# o o ",
    "# # o   # #",
  ],
};
