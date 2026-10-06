# Script — Control Flow

## Segment 1 (title)

A script that always does the same thing isn't very useful. Control flow is how a script makes decisions and repeats work — today covers if/else, equality checks, switch, and loops.

## Segment 2 (code: if/else and equality)

if and else branch based on a condition — only one branch ever runs. For comparing values, always use triple equals, not double. Double equals quietly converts types before comparing, so "5" double-equals 5 comes back true, which looks like a bug. Triple equals compares value and type with no conversion — this course uses it exclusively.

## Segment 3 (code: switch)

When you're checking one variable against several fixed possibilities, switch reads more clearly than a long chain of else-if. Each case needs a break statement, or execution falls through into the next case whether you meant it to or not.

## Segment 4 (code: loops)

Use a for loop when you know how many times you want to repeat something, like looping over a fixed range. Use a while loop when you're repeating until some condition becomes false and you don't know the count in advance — like retrying a failed network request.

## Segment 5 (outro)

If/else for decisions, triple equals for comparisons, switch for many possibilities against one value, for and while for repetition. Next up: functions — bundling this logic into something reusable.
