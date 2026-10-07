# Script — Loops & Functions

## Segment 1 (title)

Conditionals let a script decide; loops let it repeat; functions let it package that logic so it's written once and called by name everywhere it's needed. Northbridge Retail's ops team has a function that restarts a service and confirms it came back up, written once and called from a dozen different maintenance scripts.

## Segment 2 (code)

A for loop iterates over a fixed list — words you type directly, filenames the shell expands from a glob, or a numeric range written with brace expansion like one dot dot three. Each pass through the loop binds the loop variable to the next item in that list, which is exactly how you'd check a list of Northbridge's servers one at a time.

## Segment 3 (code)

A while loop keeps running as long as its condition stays true, which fits waiting on something rather than iterating a fixed list — like retrying a connection a few times. Until is the same loop with the test inverted, so it runs until a condition becomes true, which reads naturally as waiting for nginx to finish starting.

## Segment 4 (steps)

A Bash function groups commands under a name you can call like any other command, and it has to be defined before the line that calls it. Inside that function, dollar-one and dollar-two refer to the arguments the function itself was called with, and the local keyword keeps a variable like service_name from leaking out and colliding with anything else in the script.

## Segment 5 (code)

Northbridge's restart_service function takes a service name, restarts it, and checks whether it actually came back up before returning. Return sets the function's exit status, zero or nonzero, exactly like a script's own exit, so the caller can check it with an if statement before deciding whether it's safe to continue a deployment.

## Segment 6 (outro)

Loops repeat work across a list or until a condition is met, and functions turn a block of logic into something you define once and reuse everywhere. Up next, lesson thirty: arguments and input, for getting values into a script from the command line and from the user.
