# Script — Push, Pull & Fetch

## Segment 1 (title)

Push, pull, and fetch — how commits actually travel between your machine and GitHub, and the one distinction that trips up a lot of analysts moving off a save-the-file workflow.

## Segment 2 (code: git push)

Once a local repo has a remote, git push sends whatever commits it has that the remote doesn't. The first push of a new branch, add -u, so Git remembers the pairing and future pushes don't need the branch and remote spelled out.

## Segment 3 (screenshot: commit-branch-indicator)

After a push, GitHub shows the commit exactly where it landed, attached to the branch you pushed it to. That's the real, permanent record a push creates — not a copy, the actual commit.

## Segment 4 (steps: fetch vs. pull)

Fetch and pull both get the latest changes, but differently. git fetch downloads new commits and stores them locally without touching your working files — you can inspect what changed first. git pull does a fetch, then immediately merges it in. It's fetch plus merge, run back to back.

## Segment 5 (outro)

Next lesson: pull requests — proposing a change on GitHub and getting it reviewed before it merges.
