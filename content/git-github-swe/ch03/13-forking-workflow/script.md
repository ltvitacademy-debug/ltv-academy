# Script — The Forking Workflow

## Segment 1 (title)

Branches work when you have push access. Most open-source projects don't give that to everyone. Forking lets you propose changes to a repository you don't control at all.

## Segment 2 (screenshot: fork button)

Clicking Fork creates a complete, independent copy of a repository under your own account — your own main, your own branches, full push access, no permission needed. This is different from cloning, which just downloads a copy of the same remote repo you still can't push to.

## Segment 3 (screenshot: compare across forks)

With your fork cloned, the work looks exactly like a normal branch: commit, push — but to your fork, not the original. GitHub defaults to comparing branches within one repo, so you have to explicitly choose to compare across forks.

## Segment 4 (screenshot: base and head)

You choose both sides explicitly: base is the original repository and branch you want merged into, head is your fork and the branch holding your commits. It's easy to get those backwards the first time.

## Segment 5 (code: syncing with upstream)

Unlike a branch, your fork doesn't automatically track the original repository. Add it as a second remote called upstream, fetch from it, merge into your main, then push that back to your own fork.

## Segment 6 (outro)

Next lesson: git blame and history — tracing exactly when and why a specific line changed.
