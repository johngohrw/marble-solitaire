import json
import time
import os

f = open('history.json')
data = json.load(f)

while True:
    for i in range(len(data['history']) -1, -1, -1):
        state = data['history'][i]
        os.system('cls')
        for row in state:
            print(row)
        time.sleep(0.9)
    time.sleep(2)