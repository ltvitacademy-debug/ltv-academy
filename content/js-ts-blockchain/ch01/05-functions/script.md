# Script — Functions

## Segment 1 (title)

A function is a named, reusable block of code — write the logic once, run it as many times as you need with different inputs. Today covers declaring one, default parameters, and the one thing about return values that trips up every beginner at least once.

## Segment 2 (code: declaring and calling)

A function takes parameters — placeholders it expects to receive — and the actual values passed in when it's called are the arguments. return sends a value back out to wherever the function was called from. Everything after return inside the function never runs.

## Segment 3 (code: default parameters)

A default parameter value is used automatically whenever the caller doesn't pass that argument at all. This becomes genuinely useful once a function takes several optional settings, which is extremely common in real code.

## Segment 4 (code: declarations vs expressions)

A function declaration can be called earlier in the file than where it's written, because JavaScript hoists it. A function expression stored in a variable cannot — the variable doesn't exist yet at that point. Both behave identically once defined.

## Segment 5 (code: the undefined trap)

Here's the trap: a function with no return statement doesn't return nothing, it returns undefined, every single time, silently. If a value shows up as undefined where you expected real data, the first thing to check is whether the function that produced it forgot to return.

## Segment 6 (outro)

Parameters and arguments, default values, declarations versus expressions, and the silent undefined return. Next up: arrays and objects — how you actually structure real data.
