# Script — if/else & switch

## Segment 1 (title)

A script that always does the same thing regardless of circumstances isn't very useful. if lets it branch on a condition — checking free disk space against a threshold, say, and reacting differently.

## Segment 2 (code: if/elseif/else)

PowerShell uses letter-based comparison operators — -lt, -eq, -gt — not < or ==, because the punctuation symbols are already reserved for redirecting output to a file. That trips up almost everyone on day one; it's just the syntax.

## Segment 3 (code: switch)

Once you're checking one variable against many specific values, an if/elseif chain gets unwieldy. switch states the variable once and lists every case underneath — Online, Degraded, Offline, with default as the fallback when nothing matches.

## Segment 4 (steps: when to use which)

Reach for if/elseif when the branches are a genuine condition or range. Reach for switch when you're really just matching one variable against a list of known, discrete values — it reads faster and is harder to typo.

## Segment 5 (outro)

That's branching logic. Next up: loops — foreach, while, and for, three genuinely different tools for repeating work.
