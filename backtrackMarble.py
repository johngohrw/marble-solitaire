import copy
import random
import json

inputPuzzle = [
      "---- ----",
      "---   ---",
      "--     --",
      "-       -",
      "    o    ",
      "-        ",
      "--       ",
      "---      ",
      "----     ",
]
stepsToExtrapolate = 300
debugMode = True

def getCoordsFromIndex(index, rows, cols):
    # out of range
    if (index >= int(rows * cols)):
        return [None, None]
    return [index % cols, index // cols] 

def getExtrapolations(state, x, y):
    # [edgeCondition, relativeCoord1, relativeCoord2]
    up = [y > 1, [0, -1], [0, -2]]
    down = [y < len(state) - 2, [0, 1], [0, 2]]
    left = [x > 1, [-1, 0], [-2, 0]]
    right = [x < len(state[0]) - 2, [1, 0], [2, 0]]
    directions = [up, down, left, right]
    result = []
    # check each direction
    for dir in directions:
        if (dir[0]): # if edge condition is satisfied
            cell1 = state[y + dir[1][1]][x + dir[1][0]]
            cell2 = state[y + dir[2][1]][x + dir[2][0]]
            # check if both relative cells are empty
            if (cell1 == " " and cell2 == " "):
                result.append([dir[1], dir[2]])
    return result

def getRelativeCoordinates(original, relative):
    return [original[0] + relative[0], original[1] + relative[1]]


def marbleIsExtrapolatable(state, x, y):
    # if no entries in result, then it's not extrapolatable.
    return len(getExtrapolations(state, x, y)) > 0

def getValidMarble(state):
    rows = len(state)
    cols = len(state[0])
    totalCellCount = int(rows * cols)

    # init unvisited array with cell indexes
    unvisited = []
    for i in range(totalCellCount):
        unvisited.append(i)

    while len(unvisited) > 0:
        # choose random cell from unvisited array to visit
        k = random.randint(0, len(unvisited) - 1)
        index = unvisited.pop(k)
        [x, y] = getCoordsFromIndex(index, rows, cols)
        char = state[y][x]
        if (char == "o" and marbleIsExtrapolatable(state, x, y)):
            return [x, y]
    return [None, None]
    
def extrapolate(_state):
    [x, y] = getValidMarble(_state)
    if (x == None or y == None):
        print("extrapolate(): getValidMarble failed.")
        return None
    moves = getExtrapolations(_state, x, y)
    randomMove = moves[random.randint(0, len(moves) - 1)]

    # get relative cell coords
    [x1, y1] = getRelativeCoordinates([x, y], randomMove[0])
    [x2, y2] = getRelativeCoordinates([x, y], randomMove[1])

    # deepcopy state
    state = copy.deepcopy(_state)
    
    # replace original cell with empty
    state[y] = state[y][:x] + " " + state[y][x + 1:] # original cell
    # replace relative cells with marbles
    state[y1] = state[y1][:x1] + "o" + state[y1][x1 + 1:] # intermediate cell
    state[y2] = state[y2][:x2] + "o" + state[y2][x2 + 1:] # furthermost cell
    # compute move that will result in initial state,
    # when applied on new extrapolated state
    # (fromX, fromY) , (toX, toY)
    move = [(x2, y2), (x, y)]
    return [state, move]

def printPuzzle(state):
    print(" " + "-" * len(state[0]))
    for row in state:
        print("|" + row + "|")
    print(" " + "-" * len(state[0]))

def multiExtrapolate(initialState, steps, debug):
    history = []
    moves = []
    currState = copy.deepcopy(initialState)
    if debug: print("initial:")
    if debug: printPuzzle(currState)
    for i in range(steps):
        if debug: print("move", i + 1)
        extrapolation = extrapolate(currState)
        if (extrapolation == None):
            break
        [currState, move] = extrapolation
        history.append(currState)
        moves.append(move)
        if debug: printPuzzle(currState)
    return [currState, moves, history]

if __name__ == "__main__":
    [extrapolatedState, moves, hist] = multiExtrapolate(inputPuzzle, stepsToExtrapolate, debugMode)

    file = open("generated.txt", "w")

    # write initial puzzleString
    file.write("\nPuzzle start state" + "\n")
    for row in extrapolatedState:
        file.write("\"" + row + "\"," + "\n")
    file.write("\n\n")
    
    # write history and moves to file
    for i in range(len(hist) - 1, -1, -1):
        _state = hist[i]
        _move = moves[i]
        for row in _state:
            file.write(row + "\n")
        file.write("\n#" + str(len(hist) - i) + "\n" + str(_move[0]) + "-->" + str(_move[1]) + "\n")
        
    # write final solution state
    file.write("\nFinal solution state" + "\n")
    for row in inputPuzzle:
        file.write(row + "\n")
    
    file.close()
    print("extrapolation saved to file (generated.txt)")

    file = open("history.json", "w")
    historyDict = {
    "history": [],
    }
    historyDict["history"] = hist 
    JSONstring = json.dumps(historyDict)
    file.write(JSONstring)
    file.close()
    print("history saved to file (history.json)")