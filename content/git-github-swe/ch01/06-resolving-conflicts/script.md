# Script — Resolving Merge Conflicts

## Segment 1 (title)

Merging usually works silently. A conflict happens specifically when both branches changed the same lines of the same file in different ways — Git has no way to guess which version you want, so it stops and asks.

## Segment 2 (code: reading the markers)

Git edits the file in place with markers around both versions. HEAD is the branch you're on; after the equals signs is the branch you're merging in, labeled by name. Nothing else in the file is touched — only the exact conflicting lines.

## Segment 3 (screenshot: GitHub flags the conflict)

The same thing happens on GitHub. A pull request that can't merge automatically shows a warning right in the browser, with a Resolve merge conflicts button.

## Segment 4 (screenshot: GitHub's web conflict editor)

Clicking through opens GitHub's own conflict editor — the same markers, editable directly in the browser, with a Mark as resolved button once you've cleaned up the conflicting lines.

## Segment 5 (screenshot + outro: committing the resolved merge)

Once every conflicted file is marked resolved, GitHub lets you commit the merge directly. That's genuinely handy for a small conflict, though resolving locally in your own editor is usually the better call for anything nontrivial. Next up: pushing all of this work to GitHub with repositories and remotes.
