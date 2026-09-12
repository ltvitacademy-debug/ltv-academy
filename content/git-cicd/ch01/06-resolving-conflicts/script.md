# Script — Resolving Merge Conflicts

## Segment 1 (title)

What a real conflict looks like inside a SQL file, and the real workflow for resolving one.

## Segment 2 (screenshot: conflict diagram)

A conflict happens when two branches change the same lines of the same file in different ways, and Git genuinely can't tell which version you want. Different files, or even different lines of the same file, merge automatically without asking. Conflicts only happen on real, overlapping edits.

## Segment 3 (code: conflict markers)

Say main and your branch both changed the where clause in churn_flags dot sql. Git stops and leaves both versions right in the file: less-than signs mark your branch's version, equals signs separate them, greater-than signs mark the incoming branch's version. Git has written both versions in for you — it just won't guess which one you want.

## Segment 4 (code: resolving)

Delete all three marker lines, keep whichever version is correct — or combine both, or write something new entirely. Then git add the file, and git commit to finish the merge. If you're resolving mid-rebase instead, it's git rebase dash dash continue.

## Segment 5 (outro)

That's Chapter 1 — Git Fundamentals for Data People, complete. Next up, Chapter 2: GitHub Essentials, starting with repositories and remotes.
