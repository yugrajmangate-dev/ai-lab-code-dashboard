rooms={"a":"dirty","b":"dirty"}
location="a"

def simple_reflex_agent(location,status):
    if status=="dirty":
        return "suck"
    elif location=="a":
        return "move right"
    else:
        return "move left"

while True:
    status=rooms[location]
    if rooms["a"]=="clean" and rooms["b"]=="clean":
        print("both the rooms are clean")
        print("goal achieved...!")
        break

    action=simple_reflex_agent(location,status)

    print("location :", location)
    print("percept",location,"is",status)

    print("action", action)

    if action=="suck":
        rooms[location]="clean"
    elif action=="move right":
        location="b"
    elif action=="move left":
        location="a"