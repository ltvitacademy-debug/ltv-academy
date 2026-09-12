# Script — init, add & commit

## Segment 1 (title)

Three commands you'll use every single day: git status, git add, and git commit.

## Segment 2 (code: git status)

Add a real file, customer_ltv dot sql, to your repository. Run git status, and Git reports it as an untracked file — it exists on disk, but Git isn't watching it yet. Run this command constantly; it always tells you exactly where you stand.

## Segment 3 (code: git add)

git add customer_ltv dot sql stages the file for your next commit. Run git status again, and it now shows under "changes to be committed." Staging is deliberate — you could stage just a schema fix in one file and leave an unrelated formatting change in another file out entirely.

## Segment 4 (code: git commit)

git commit dash m, with a message, takes a permanent, timestamped snapshot of exactly what's staged. git log dash dash oneline confirms it landed, with a short hash and your message.

## Segment 5 (steps: good commit messages)

What separates a good commit message from a useless one? "Add customer_ltv model" is specific and present-tense. "updates" tells a future reader nothing. Six months from now, someone reading only your commit message should understand what changed, and ideally why.

## Segment 6 (outro)

Next lesson: branches — how to make a risky change without touching the working version.
