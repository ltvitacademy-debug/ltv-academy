# Script — .gitignore for Data Projects

## Segment 1 (title)

.gitignore tells Git which untracked files to leave alone — never stage automatically, never flag in git status. One pattern per line, and it only affects files Git doesn't already track.

## Segment 2 (steps: what data projects leak)

Real leaks that happen on real teams: a .env file with a database password, committed once and permanently in history. A 400MB CSV committed just this once, slowing every future clone. dbt's target directory, regenerated every run, creating merge conflicts on files nobody should hand-edit.

## Segment 3 (code: a real .gitignore)

A real .gitignore for a data project covers environment files, raw data by pattern, dbt's target and dbt_packages directories, Jupyter's checkpoint folders, and Python's cache files — adapted to what your project actually generates, not blindly copied.

## Segment 4 (code: untracking a committed file)

Adding a pattern to .gitignore doesn't retroactively remove a file already in history. Untrack it explicitly with git rm --cached, then commit that removal. If real credentials were committed, untracking isn't enough on its own — the credential is still recoverable from history, so rotate it.

## Segment 5 (outro)

Next lesson: notebooks in Git — why a Jupyter notebook's diff is unreadable, and what to do about it.
