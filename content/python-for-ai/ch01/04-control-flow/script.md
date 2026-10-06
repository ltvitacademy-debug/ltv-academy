# Script — Control Flow: if, for & while

## Segment 1 (title)

Code that just runs top to bottom once isn't very useful. This lesson covers how Python makes decisions and repeats itself: if, for, and while.

## Segment 2 (code: indentation is the syntax)

First, something that trips up every beginner coming from another language: Python uses indentation, not curly braces, to mark a block of code. Four spaces, consistently. Any line indented under an if, for, or while is considered inside it. Get it wrong, and Python raises an error rather than guessing what you meant.

## Segment 3 (code: if / elif / else)

if, elif, else let your code choose a path. Python checks each condition top to bottom and runs the first one that's true — if temperature is low, print one thing; elif it's medium, print another; else, the catch-all for everything left over.

## Segment 4 (code: for loops)

A for loop walks through every item in a collection — a list of model names, or range of 3 for a fixed number of repeats. This is the loop you'll use constantly: for model in models, do something with each one.

## Segment 5 (code: while loops and break/continue)

A while loop keeps running as long as its condition stays true — useful when you don't know in advance how many times you'll repeat, like retrying a failed API call. Just make sure something inside moves it toward ending, or you get an infinite loop. break exits a loop immediately; continue skips to the next item.

## Segment 6 (outro)

With decisions and repetition covered, next up is functions — packaging logic into something you can name and reuse instead of repeating it everywhere.
