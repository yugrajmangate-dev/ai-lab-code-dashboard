export const screenshotPrograms = [
  {
    id: "screenshot-01",
    number: "IMG-01",
    title: "Simple Reflex Agent",
    filename: "screenshot-01-simple-reflex-agent.py",
    kind: "screenshot",
    code: `#1
rooms={"A":"Dirty","B":"Dirty"}
location="A"
def simple_reflex_agent(location,status):
    if status=="Dirty":
        return "SUCK"
    elif location=="A":
        return "Move right"
    else:
        return "Move left"

while True:
    status=rooms[location]
    if rooms["A"]=="Clean" and rooms["B"]=="Clean":
        print("Both rooms are clean")
        print("Goal Achieved")
        break

    action=simple_reflex_agent(location,status)
    print("Location: ",location)
    print("Percept",location,"is",status)
    print("Action",action)
    print()

    if action=="SUCK":
        rooms[location]="Clean"
    elif action=="Move right":
        location="B"
    elif action=="Move left":
        location="A"`,
    verified: false,
    note: "Transcribed from the supplied screenshot; kept separate from the original workspace source.",
    cells: []
  },
  {
    id: "screenshot-02",
    number: "IMG-02",
    title: "Maze Search",
    filename: "screenshot-02-maze-search.py",
    kind: "screenshot",
    code: `#2
grid = [
    ['S', '.', '#', '.', '.'],
    ['.', '.', '#', '.', '.'],
    ['#', '.', '.', '.', '#'],
    ['.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', 'G']
]
position = (0, 0)
goal = (4, 4)
visited = set()
moves = [(0, 1), (1, 0), (-1, 0), (0, -1)]

while position != goal:
    visited.add(position)
    row, col = position
    moved = False

    for nr, nc in moves:
        new_row = row + nr
        new_col = col + nc

        if 0 <= new_row < 5 and 0 <= new_col < 5:
            if (grid[new_row][new_col] != '#' and
                (new_row, new_col) not in visited):

                position = (new_row, new_col)
                moved = True
                break

    print("Current Position:", position)

    if position == goal:
        print("Goal Reached!")
        break`,
    verified: false,
    note: "Transcribed from the supplied screenshot; kept separate from the original workspace source.",
    cells: []
  },
  {
    id: "screenshot-04",
    number: "IMG-04",
    title: "Tower of Hanoi",
    filename: "screenshot-04-tower-of-hanoi.py",
    kind: "screenshot",
    code: `#4
def tower_of_hanoi(n,source,auxiliary,destination):
    if n==1:
        print("Move disk 1 from ",source, "to ",destination)
        return
    tower_of_hanoi(n-1,source,destination,auxiliary)
    print("Move disk ",n,"from ",source, "to ",destination)
    tower_of_hanoi(n-1,auxiliary,source,destination)
n=3
print("The solution is: ")
tower_of_hanoi(n,"A","B","C")`,
    verified: false,
    note: "Transcribed from the supplied screenshot; kept separate from the original workspace source.",
    cells: []
  },
  {
    id: "screenshot-05",
    number: "IMG-05",
    title: "BFS Shortest Path",
    filename: "screenshot-05-bfs-shortest-path.py",
    kind: "screenshot",
    code: `#5
from collections import deque
grid = [
    ['S', '.', '#', '.', '.'],
    ['.', '.', '#', '.', '.'],
    ['#', '.', '.', '.', '#'],
    ['#', '#', '.', '.', '.'],
    ['.', '.', '.', '.', 'G']
]
start=(0,0)
goal=(4,4)

queue=deque([start])
visited={start}
parent={start:None}
moves={(1,0),(0,1),(-1,0),(0,-1)}

while queue:
    current=queue.popleft()
    if current==goal:
        break
    row,col=current

    for nr,nc in moves:
        new_row=row+nr
        new_col=col+nc
        next_position=(new_row,new_col)
        if 0<=new_row<5 and 0<=new_col<5 and grid[new_row][new_col]!='#' and next_position not in visited:

            visited.add(next_position)
            parent[next_position]=current
            queue.append(next_position)

            if goal in visited:
                path=[]
                current =goal
                while current is not None:
                    path.append(current)
                    current=parent[current]

                path.reverse()
                print("Shortest path:: ")
                print(path)
                print("number of moves::",len(path)-1)
            else:
                print("No path found")`,
    verified: false,
    note: "Transcribed from the supplied screenshots; kept separate from the original workspace source.",
    cells: []
  },
  {
    id: "screenshot-06",
    number: "IMG-06",
    title: "DFS Maze",
    filename: "screenshot-06-dfs-maze.py",
    kind: "screenshot",
    code: `#6
maze=[
    [0,1,0,0],
    [0,0,0,0],
    [1,0,1,0],
    [0,0,0,0]
]
row=len(maze)
col=len(maze[0])
visited=set()

def dfs(x,y):
    if x<0 or y<0 or x>=row or y>=col:
        return False
    if maze[x][y]==1:
        return False
    if (x,y)in visited:
        return False
    print("Visited: ",(x,y))
    if(x,y)==(3,3):
        print("\\n Goal reached")
        return True
    visited.add((x,y))

    if dfs(x+1,y):
        return True
    if dfs(x-1,y):
        return True
    if dfs(x,y-1):
        return True
    if dfs(y,x+1):
        return True
    return False
print("Starting DFS from(0,0)\\n")
dfs(0,0)`,
    verified: false,
    note: "Transcribed from the supplied screenshot; kept separate from the original workspace source.",
    cells: []
  },
  {
    id: "screenshot-07",
    number: "IMG-07",
    title: "8 Queens",
    filename: "screenshot-07-8-queens.py",
    kind: "screenshot",
    code: `#7
N=8
board=[-1]*8
def is_safe(row,col):
    for i in range(row):
        if board[i]==col:
            return False
        if abs(board[i]-col)==abs(row-i):
            return False
    return True

def solve(row):
    if row==N:
        return True

    for col in range(N):
        if is_safe(row,col):
            board[row]=col

            if solve(row+1):
                return True
            board[row]=-1
    return False

if solve(0):
    print ("Solution found: ")
    for row in range(N):
        for col in range(N):
            if board[row]==col:
                print("Q",end=" ")
            else:
                print(".",end=" ")
        print()
else:
    print("No solution found")`,
    verified: false,
    note: "Transcribed from the supplied screenshot; kept separate from the original workspace source.",
    cells: []
  },
  {
    id: "screenshot-08",
    number: "IMG-08",
    title: "Rule-Based Chatbot",
    filename: "screenshot-08-chatbot.py",
    kind: "screenshot",
    code: `#8

import re

rules = [
    (r".*hello.*", "Hello! "),
    (r".*how are you.*", "I am fine!"),
    (r".*what is your name.*", "My name is Chatbot!"),
    (r".*what is your age.*", "I am 1 year old!"),
    (r".*bye.*", "Goodbye! Have a nice day!")
]

print("Chatbot: Hello! Type 'bye' to exit.")

while True:
    user = input("You: ").lower().strip()

    for pattern, response in rules:
        if re.match(pattern, user):
            print("Chatbot:", response)
            break
    else:
        print("Chatbot: Sorry, I don't understand.")

    if re.match(r".*bye.*", user):
        break`,
    verified: false,
    note: "Transcribed from the supplied screenshot; kept separate from the original workspace source.",
    cells: []
  }
] as const;
