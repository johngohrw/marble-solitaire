import copy



slotChars = "_ ";
walls = "#█▌▐▀▄▖▗▝▘▚▞";
emptyChars = "-";

# defaults
solutions = []
solutionCount = 0
skipMoves = False
originalState = []
skipHistory = False
_moves = []
_history = []
historiesArr = []
movesArr = []
inputPuzzle = [
      "######",
      "# o o#",
      "#o oo#",
      "#o   #",
      "######",
]

def getValidMoves(state):
    # compute valid adjacent pairs
    adjacents = []
    for y in range(len(state)):
        row = state[y]
        for x in range(len(row)):
            char = row[x]
            if (char == "o"):
                # check right side, mark as horizontal
                if (x + 1 < len(row) and char == row[x + 1]):
                    adjacents.append({
                        "from": {"x": x, "y": y},
                        "to": {"x": x + 1, "y": y},
                        "type": "hori"
                    })
                # check bottom side, mark as vertical
                if (y + 1 < len(state) and char == state[y + 1][x]):
                    adjacents.append({
                        "from": {"x": x, "y": y},
                        "to": {"x": x, "y": y + 1},
                        "type": "verti"
                    })
    
    # compile valid moves
    validMoves = {}
    for i in range(len(adjacents)):
        pair = adjacents[i]
        _from  = pair["from"]
        _to = pair["to"]
        _type = pair["type"]
        if (_type == "hori"):
            # hori, y is same. check left and right.
            if (_from["x"] > 0 and state[_from["y"]][_from["x"] - 1] in slotChars):
                validMoves["{},{}-{},{}".format(_to["x"], _to["y"], _from["x"] - 1, _from["y"])] = True
            if (_to["x"] < len(state[_from["y"]]) - 1 and state[_from["y"]][_to["x"] + 1] in slotChars):
                validMoves["{},{}-{},{}".format(_from["x"], _from["y"],_to["x"] + 1,_to["y"])] = True
        else:
            # verti, x is same. check top and bottom.
            if (_from["y"] > 0 and state[_from["y"] - 1][_from["x"]] in slotChars):
                validMoves["{},{}-{},{}".format(_to["x"], _to["y"], _from["x"], _from["y"] - 1)] = True
            if (_to["y"] < len(state) - 1 and state[_to["y"] + 1][_to["x"]] in slotChars):
                validMoves["{},{}-{},{}".format(_from["x"], _from["y"],_to["x"],_to["y"] + 1)] = True
    return validMoves

def avgInt(n1, n2):
    return int((n1 + n2) / 2)

def toInt(str):
    return int(str)

def getMarbleCount(state):
    count = 0
    for y in range(len(state)):
        for x in range(len(state[y])):
            if (state[y][x] == 'o'):
                count += 1
    return count

def makeMove(moveString, _state):
    state = copy.deepcopy(_state)
    [_from, _to] = moveString.split("-")
    [fromX, fromY] = list(map(toInt, _from.split(",")))
    [toX, toY] = list(map(toInt, _to.split(",")))
    [betweenX, betweenY] = (avgInt(fromX, toX), avgInt(fromY, toY))
    state[fromY] = state[fromY][:fromX] + " " + state[fromY][fromX + 1:]
    state[betweenY] = state[betweenY][:betweenX] + " " + state[betweenY][betweenX + 1:]
    state[toY] = state[toY][:toX] + "o" + state[toY][toX + 1:]
    return state

def traversePuzzle(state, moves=[], history=[], depth=0):
    validMoves = list(getValidMoves(state)) # scan for moves
    
    global _moves
    global _history
    global solutionCount
    global originalState

    # base cases: only 1 marble left or no valid moves left
    if (len(validMoves) <= 0):
        if (getMarbleCount(state) == 1): # only 1 marble left
            # great success!
            if (not skipHistory):
                historiesArr.append(history) 
            if (not skipMoves):
                movesArr.append(moves) 
            solutionCount += 1
            print("solution found", "MOVES:", moves, "ORI :", originalState)
    else:
        # there are some valid moves
        for moveString in validMoves:
            _state = makeMove(moveString, state)
            if (not skipHistory):
                _history = history + [_state] 
            if (not skipMoves):
                _moves = moves + [moveString]
            traversePuzzle(_state, _moves, _history, depth+1)
    return

if __name__ == "__main__":
    print("puz string:")
    inputPuzzle = input().split("|")
    solutionCount = 0
    originalState = copy.deepcopy(inputPuzzle)
    historiesArr = []
    movesArr = []
    skipMoves = False
    skipHistory = True
    traversePuzzle(inputPuzzle, [], [], 0)
    print("solutionCount", solutionCount)
    # print("solutions:", len(solutions),"\n", "moves:", solutions[0][1], "\n", "history: ", solutions[0][0],"\n",)
    