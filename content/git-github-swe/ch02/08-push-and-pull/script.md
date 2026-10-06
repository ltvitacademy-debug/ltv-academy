# Script — Push, Pull & Fetch

## Segment 1 (title)

Once a remote is configured, sending your commits to GitHub is one command — git push origin main. That uploads any local commits the remote doesn't have yet.

## Segment 2 (code: push and upstream)

The first time you push a new branch, set the upstream with dash u — git push dash u origin main. After that, plain git push and git pull on their own know exactly which remote branch to talk to.

## Segment 3 (code: fetch, the safe one)

git fetch downloads new commits from the remote and updates your local record of where its branches are — but it does not touch your own working files or current branch at all. You can inspect what changed before deciding what to do with it.

## Segment 4 (code: pull, fetch plus merge)

git pull does exactly what fetch does, then immediately merges those changes into your current branch. It's the everyday command, but because it merges automatically, it can hand you a surprise conflict if you hadn't looked first.

## Segment 5 (outro)

A practical habit: fetch first to see what's there with zero risk, then pull once you know what's incoming. Next up: Chapter Two's centerpiece — opening an actual pull request.
