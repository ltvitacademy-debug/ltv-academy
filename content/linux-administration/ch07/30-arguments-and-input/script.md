# Script — Arguments & Input

## Segment 1 (title)

A script that only ever does one thing is limiting — most of the scripts Northbridge Retail's ops team relies on take the server name or the environment as an argument, so the same script handles production, staging, and every server in between without being edited each time.

## Segment 2 (code)

When a script is called with arguments, Bash makes them available as numbered variables: dollar-zero is the script's own name, dollar-one and dollar-two are the individual arguments in order, dollar-at expands to all of them, and dollar-pound is how many were given. Checking dollar-pound before using an argument avoids a confusing error if someone forgets to pass one in.

## Segment 3 (steps)

Guarding a script with a quick check on the argument count, printing a usage message, and exiting is the standard pattern for catching a missing argument before the rest of the script tries to use it. That's a small habit that saves a lot of confusing failures further down the script.

## Segment 4 (code)

Shift drops dollar-one and renumbers every remaining argument down by one, which is exactly what lets a script loop through an unknown number of arguments instead of hardcoding how many it expects. Northbridge's restart-all script uses this to restart however many servers you list on the command line, one at a time.

## Segment 5 (code)

Sometimes a script needs to ask instead of being told, and read captures a typed line into a variable, with -p showing a prompt on the same line. Adding -s hides what's typed entirely, which is the standard way to prompt for a deploy token or password without echoing it to the screen.

## Segment 6 (outro)

Positional parameters and read are how a script gets information from the outside world, whether that's the command line or a person at the keyboard. Up next, lesson thirty-one: error handling and debugging, for making a script fail loudly and safely instead of quietly doing the wrong thing.
