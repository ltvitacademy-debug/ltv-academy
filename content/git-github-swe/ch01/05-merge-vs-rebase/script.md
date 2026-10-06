# Script — Merge vs. Rebase

## Segment 1 (title)

Two branches diverged — main moved forward while you worked on feature-login. Bringing them back together can be done two different ways, and they produce very different histories.

## Segment 2 (code: git merge)

git switch main, then git merge feature-login. Merge creates a new merge commit with both branch tips as parents. Nothing gets rewritten — every commit stays exactly where it was, and the merge commit is just the point where the two histories join back together.

## Segment 3 (code: git rebase)

git switch feature-login, then git rebase main. Rebase takes your branch's unique commits and replays them one at a time on top of main's current tip. Those replayed commits are brand new, with new hashes, even though the code changes are identical — that's why rebase rewrites history.

## Segment 4 (steps: which one to use)

A practical default: rebase your own local branch to catch it up with main before opening a pull request, for a clean linear history. Merge when combining a finished, shared branch back into main — that's literally what a pull request's merge button does. And the one hard rule: never rebase a branch other people are already building on top of.

## Segment 5 (outro)

Those are the two tools for combining branches — now what happens when they can't combine automatically. Next up: resolving an actual merge conflict.
