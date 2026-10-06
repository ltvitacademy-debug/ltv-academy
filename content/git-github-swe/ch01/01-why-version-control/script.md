# Script — Why Version Control?

## Segment 1 (title)

Before Git, developers protected their work the only way they knew how — by duplicating the file. report, report v2, report v2 FINAL, report v2 FINAL fixed. You've probably done this yourself.

## Segment 2 (steps: what goes wrong)

That approach breaks fast. Two people editing the same file overwrite each other with no warning. There's no record of why a change happened, no way to see what a file looked like last week, and no way to undo a bad edit except hunting through old copies — if they still exist.

## Segment 3 (steps: what version control gives you)

A version control system replaces that with one tracked history. Every meaningful change becomes a snapshot — timestamped, attributed, and always recoverable. That gives you history, the ability to revert, safe parallel work, and the confidence to experiment because you can always get back to where you started.

## Segment 4 (code: the naming mess vs. a tracked history)

Here's the contrast side by side — five manually renamed files on the left, against a short, real commit history on the right, each line a snapshot with who made it and why.

## Segment 5 (outro)

Git is a distributed version control system — every clone holds the full project history, not just a central server. That's why it works offline, and why branching and merging, which we'll cover over the next few lessons, are fast and cheap. Next up: actually installing it.
