export const walls = "#█▌▐▀▄▖▗▝▘▚▞";
export const emptyChars = "-";
export const slotChars = "_ ";

// board state legend:
// # = wall
// o = marble
//   = empty marble space (slot)
// - = nothing (no slot)

// "       ▗▄▄  ",
// "       ▐▚   ",
// "       ▐ ▚  ",
// "          ▚ "

export const levels = {
  easy: [
    [
      // first move. you can't lose.
      "######",
      "#  o #",
      "#oo  #",
      "#    #",
      "######",
    ],
    [
      // baby steps
      "######",
      "# o o#",
      "#o oo#",
      "#o   #",
      "######",
    ],
    [
      // don't make the wrong move
      "######",
      "# oo #",
      "#oooo#",
      "#oo o#",
      "######",
    ],
    [
      // entrance & exit
      "### ##",
      "#ooo #",
      "oo o #",
      "#-o -#",
      "#oooo#",
      "######",
    ],
    [
      // rescue
      "   #  o",
      "o#o  o#",
      " o o  #",
      "o# o  -",
      "ooo o#-",
      " # # ##",
    ],

    [
      // checkerboard
      "oo  oo",
      "oo  oo",
      "  oo  ",
      "  oo  ",
      "##  oo",
      "##  oo",
    ],
  ],
  medium: [
    [
      "---   o#",
      "## #oo #",
      " o #   ",
      "o#o oo ",
      "ooo o   ",
      "  #o oo ",
      "--#o oo ",
    ],
    [
      // around the world
      "      oo ",
      "     o   ",
      " o ooo o ",
      "o  o    o",
      "  o      ",
      "oo      o",
      "o  o o o ",
    ],
    [
      // crosshair
      " o   oo oo",
      " o   o ▚ ▞",
      "o o o oo  ",
      " o   o ▞o▚",
      " o   o   -",
    ],
    [
      // fishbone
      " o         ",
      "oo o    # o",
      "o #ooooooo ",
      " ooo o   o ",
      "  o o  o   ",
    ],
    [
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
    [
      // careful
      " ##  #",
      " oo --#",
      "# #o o",
      " oo o #",
      "#ooo o",
      "  o o #",
    ],
  ],
  hard: [
    [
      // propagation
      "o-ooo - -",
      " o oo-  o",
      "oo   -oo#",
      "o  o   o#",
      " ooooo-- ",
      "--o  o- -",
    ],
    [
      // looks simple but tricky
      "         ",
      "  o   o  ",
      "oooo   o ",
      "  o o  o ",
      " oo oo  o",
      "   o    o",
    ],
    [
      // crucifixes
      "-    o oo",
      "  o o o  ",
      " ooo ooo ",
      " oo o oo ",
      "  o#o#o  ",
      "oo o    -",
    ],
    [
      // <3
      "   o     ",
      "oo#  o oo",
      "ooo o oo ",
      " oo o    ",
      " o     oo",
      "   ooo oo",
      " oo   oo ",
    ],
    [
      // basketball
      " o  oo  o",
      "oooo  o o",
      "o o o    ",
      "   - oo-o",
      " - oo-   ",
      " oo o oo ",
      "o o-o- oo",
      "ooo- -o o",
      " ---#----",
    ],
    [
      // RAILROAD EXPRESS
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
    [
      // phall
      " oo   oo ",
      " oooo oo ",
      "o  o  oo ",
      "ooo  # o ",
      " o #oo  o",
      "  oo    o",
      "  oo oo  ",
      "oo  oo oo",
      "o o ooo  ",
    ],
  ],
  classic: [
    [
      "▄██▀▀▀██▄",
      "██▌ooo▐██",
      "█▀▘ooo▝▀█",
      "▌ooooooo▐",
      "▌ooo ooo▐",
      "▌ooooooo▐",
      "█▄▖ooo▗▄█",
      "██▌ooo▐██",
      "▀██▄▄▄██▀",
    ],
  ],
};

export function transformLevels(levelObj) {
  const categoryList = Object.keys(levelObj);
  let levels = [];
  categoryList.forEach((category) => {
    levelObj[category].forEach((map, index) => {
      const levelID = `${category}${(index + 1).toString().padStart(2, 0)}`;
      levels[levelID] = map;
    });
  });
  return levels;
}
