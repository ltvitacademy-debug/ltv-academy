# Script — Branches

## Segment 1 (title)

A branch is not a copy of your project — it's a small, movable pointer to a commit, which moves forward automatically as you commit while it's checked out. Every repository starts with one, conventionally called main.

## Segment 2 (code: creating and switching branches)

git branch creates one without switching to it; git switch moves you onto it. Or do both at once with switch dash c. You'll also see the older git checkout dash b — same result. While your new branch is checked out, commits move that pointer forward, and main stays exactly where it was.

## Segment 3 (screenshot: GitHub's branch dropdown)

That same model shows up in GitHub's own web interface once a repo is pushed there. This dropdown on a repository's file tree view lists every branch — the current one and all the others — no terminal required to see what exists.

## Segment 4 (screenshot: creating a branch on GitHub)

Type a name that doesn't exist yet into that same selector, and GitHub offers to create it on the spot — the web equivalent of git switch dash c. And the repository's Branches page lists every branch with a trash icon to delete the ones you're done with.

## Segment 5 (outro)

The web UI is handy for a quick one-off edit, but real feature work happens from the command line, which is what the rest of this course assumes. Next up: actually combining branches back together, with merge versus rebase.
