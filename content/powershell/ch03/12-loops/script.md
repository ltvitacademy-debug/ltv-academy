# Script — Loops: foreach, while & for

## Segment 1 (title)

Three loop keywords, three genuinely different jobs — not three syntax variants of the same thing. Choosing the right one depends on what you actually have: a collection, a condition, or a count.

## Segment 2 (code: foreach)

foreach is what you reach for constantly — a list of servers or databases already in a variable, doing the same thing to each one. It's the language-keyword counterpart to Lesson 8's ForEach-Object, which instead receives items one at a time from the pipeline.

## Segment 3 (code: while)

while doesn't know how many times it'll run — it keeps going as long as its condition stays true. That's the right tool for a retry loop or polling a service until it responds, something foreach can't express since it needs a collection up front.

## Segment 4 (code: for)

for is for an actual counter — starting value, condition, and an increment step, all in the parentheses. It's less common day-to-day than foreach, but right when the loop is about counting: exactly N times, or stepping through index positions.

## Segment 5 (outro)

Have a list — foreach. Waiting for something to become true — while. Counting iterations — for. Next up: functions — packaging this logic into your own reusable cmdlet-shaped commands.
