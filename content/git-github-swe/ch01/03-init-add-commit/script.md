# Script — init, add & commit

## Segment 1 (title)

Any folder becomes a Git repository with one command, run inside it — git init. That creates a hidden dot-git folder, which is where every commit, every branch, the entire history, actually lives.

## Segment 2 (steps: the three states)

Every tracked file moves through three places. Your working directory is the actual files as you're editing them. The staging area is what you've marked with git add, ready for the next commit. And the repository is the permanent history, built one commit at a time.

## Segment 3 (code: git add)

Staging exists so a commit can be deliberate. git add report dot py stages one file; git add dot stages everything changed. If you've changed three unrelated things, stage and commit just the one that's ready, instead of every commit being whatever happened to be unsaved at the time.

## Segment 4 (code: git commit, status, log)

git commit dash m with a message saves that staged snapshot. A good message says what changed, and why if it's not obvious — fix bug tells future-you nothing. git status shows what's staged; git log shows the history, newest first, each entry with a hash, an author, a date, and your message.

## Segment 5 (outro)

That's the same tracked history Lesson 1 promised, now actually happening on your own machine. Next up: branches — working on more than one thing at once without them colliding.
