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
    [
      // dota
      "  o oo ",
      "o▚ oo# ",
      " o▚oo o",
      "oo ▚ o ",
      "    ▚o ",
      " #o  ▚ ",
      "  o    ",
    ],
  ],
  medium: [
    [
      "---   o#",
      "## #oo #",
      " o #   -",
      "o#o oo -",
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
      "  o#   -",
      "o  o    ",
      "o o  o  ",
      " oo   o-",
      "   oo o ",
    ],
    [
      // careful
      " ##  #-",
      " oo --#",
      "# #o o-",
      " oo o #",
      "#ooo o-",
      "  o o #",
    ],
    [
      // middle finger
      " o# -o ",
      "#oo o -",
      "   #ooo",
      "oo#o o ",
      "o  oo#o",
      " ooo -o",
    ],
    [
      // maze
      "o#o o",
      "o# oo",
      " #o# ",
      "ooo#o",
      " oo# ",
    ],
    [
      // otherside
      "- oo o ",
      " - oo  ",
      "o -oo o",
      "ooo-o o",
      " oo -  ",
      "oooo -o",
      "oo o o ",
    ],
    [
      // roshan's pit
      "--   --",
      "-oo o -",
      "oo # o ",
      "oo#o#  ",
      "oo o o ",
      "-oooo -",
      "-- o --",
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
    [
      // inorganic
      " o o o oo",
      "oo o o oo",
      " ########",
      "o oo oooo",
      "ooooooooo",
      "oooo oooo",
      "########o",
      "oo o o oo",
      "oo o o oo",
    ],
    [
      // colliseum
      "  o oo  ",
      "o# oo #o",
      "o #o #oo",
      "oo  o o ",
      "o  ooo o",
      "  # o#o ",
      "o#oo o#o",
      " o ooo  ",
    ],
    [
      // parthenon
      " o o ooo ",
      "o#o# #o#o",
      " o  o  oo",
      "oooo oo#o",
      "oooo oo  ",
      "o#o#o#o#o",
      " ooo o o ",
    ],
    [
      // lanes
      "o#  o    ",
      "o#   o  o",
      " # #ooo o",
      " oo#o o  ",
      "ooo#o#   ",
      "oo oo# oo",
      "o  oo# # ",
      " ooooo #o",
      "oo o   #o",
    ],
    [
      // looks can be deceiving
      "oo oo",
      "ooooo",
      "oo oo",
      "ooooo",
      "oo oo",
    ],
    [
      // roshan's pit
      " oo ooo ",
      " # oo oo",
      "# ## o o",
      "# o #ooo",
      "# oo#oo ",
      " # o# o ",
      "  #o ooo",
      " o o ooo",
    ],
    [
      // try to end it here
      "o ooooo o",
      "oo o o o ",
      "oo  ▗▄▄ o",
      "oooo▐▚ o ",
      "oo  ▐ ▚oo",
      "oooo oo▚o",
      "   oo    ",
    ],
    [
      //loaded charge
      "  oooo oo",
      "  oo ooo ",
      "    o o  ",
      "#o###o###",
      "        o",
      "### ###o#",
      "oo oo oo ",
      " ooooo oo",
      " o o o oo",
    ],
  ],
};

export function getLevelID(category, index) {
  return `${category}${(index + 1).toString().padStart(2, 0)}`;
}

export function transformLevels(levelObj) {
  const categoryList = Object.keys(levelObj);
  let levels = [];
  categoryList.forEach((category) => {
    levelObj[category].forEach((map, index) => {
      const levelID = getLevelID(category, index);
      levels[levelID] = map;
    });
  });
  return levels;
}
