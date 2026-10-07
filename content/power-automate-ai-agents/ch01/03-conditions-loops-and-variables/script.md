# Script — Conditions, Loops and Variables: The Essentials

## Segment 1 (title)

If triggers and actions are a flow's statements, conditions, loops, and variables are its control flow and local state — the same constructs you'd reach for in any code, as drag-and-drop cards instead of if, for, and let.

## Segment 2 (screenshot)

The Condition action compares one value to another and produces exactly two branches: If yes and If no. Under the hood it compiles to an if-else in the flow's underlying JSON — this card is just a friendlier face on something already familiar.

## Segment 3 (screenshot)

Apply to each is Power Automate's loop. It takes an array and runs its inner actions once per item, with a current-item value available on each pass. By default it runs sequentially — you can switch it to parallel for speed, but if anything inside writes to a variable, sequential avoids a race.

## Segment 4 (screenshot)

Initialize variable declares a name, a type, and a starting value — closest to a let with an initializer. After that, Set, Increment, Decrement, and Append change it over time.

## Segment 5 (steps)

Here's the restriction that catches almost everyone the first time: you can only initialize a variable at the top level of a flow — never inside a condition branch, a scope, or a loop. Need a counter inside a loop? Initialize it before the loop starts, then increment it inside.

## Segment 6 (outro)

Conditions branch, loops repeat, variables hold state across both. Next up, lesson four: HTTP actions, for calling any API from a flow.
