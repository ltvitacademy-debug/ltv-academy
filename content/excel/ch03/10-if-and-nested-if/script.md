# Script — IF & Nested IF

## Segment 1 (title)

IF takes one condition and returns one of two outcomes. Nesting one IF inside another handles more than two outcomes — but there's a real point where that stops being a good idea.

## Segment 2 (code: nested IF)

Nest a second IF inside the false branch of the first, and it can keep going as many levels as the question needs. Formatting it one condition per line, indented, is the difference between a formula you can debug in ten seconds and one you have to untangle character by character.

## Segment 3 (steps: when to stop nesting)

Three levels is normal. Five or six is where it gets genuinely hard to audit. Two signs it's time to stop: you've lost count of the closing parentheses, or every branch tests the same field against a new threshold — that pattern is exactly what IFS or a lookup table replaces.

## Segment 4 (outro)

Next lesson: AND, OR, and IFS — combining conditions inside IF, then IFS as the clean replacement for a long IF chain.
