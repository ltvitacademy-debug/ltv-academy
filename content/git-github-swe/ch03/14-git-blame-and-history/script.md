# Script — git blame & History

## Segment 1 (title)

A line of code is doing something unexpected, and you don't understand why it's written that way. Blame and history are how you find out.

## Segment 2 (code: git blame)

git blame annotates every line of a file with the commit, author, and date that last changed it. The name is misleading — it's not about fault, it's the fastest path to the reasoning behind a line you don't have context for.

## Segment 3 (code: git show)

Blame gives you a commit hash. The next step is git show on it, to read the full commit message and diff. This is why a good commit message matters months later — blame finds the commit, the message answers why.

## Segment 4 (code: git log dash S)

Sometimes you're not looking at a current line — you're looking for when something was added or removed entirely. git log dash S, the pickaxe, searches every commit's diff for a string, including the commit that deleted it, which blame on the current file can never show you.

## Segment 5 (steps: the workflow)

Blame to find the commit. Show to read the full message and diff. If it references a ticket, go read that for the full discussion.

## Segment 6 (outro)

Next lesson: tags and releases — marking a specific commit as a version, permanently.
