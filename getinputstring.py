puz = [
      "oooo ooo o o",
      "o    o o o o",
      "o oo ooo ooo",
      "o oo o o  o ",
      "oooo o o  o ",
]

string = ""
for line in puz:
    string += line + '|' 
string[:-1]

print(string)