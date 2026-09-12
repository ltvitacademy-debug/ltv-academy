# Script — Merge vs. Rebase

## Segment 1 (title)

What merge and rebase actually do to your history, and when a data team should use each one.

## Segment 2 (screenshot: merge commit)

Git merge creates a new merge commit — one commit with two parents: the tip of main, and the tip of your feature branch. Both lines of history are preserved exactly as they happened, side by side, joined at that one point.

## Segment 3 (screenshot: rebase)

Rebase does something different. It takes your branch's commits and replays them one at a time on top of main's current tip. The result is a clean, linear history — no merge commit at all. But those replayed commits are genuinely new, with new hashes. The originals are gone.

## Segment 4 (code: commands)

git switch main, then git merge rework-ltv-grain, for a merge. Or git switch back to your branch, then git rebase main, to replay your work on top.

## Segment 5 (steps: the real recommendation)

Rebase your own local feature branch before opening a pull request — nobody else has those commits, so rewriting them is safe. Never rebase a branch that's already shared or pushed. If a teammate already pulled it, your histories will disagree, and Git forces a confusing, avoidable mess.

## Segment 6 (outro)

Next lesson: resolving merge conflicts — what to do when Git can't combine two changes automatically.
