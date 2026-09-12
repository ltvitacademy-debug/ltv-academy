# Lesson 4 — Branches: Working Without Breaking Things

**Chapter 1 · Git Fundamentals for Data People · Lesson 4 of 25**

## What you'll learn

- Why you'd branch a dbt project or a set of SQL scripts before a risky change
- `git branch`, `git checkout -b`, and the modern `git switch -c`
- The core idea: a branch lets you experiment without touching the working version

## Why branch at all

Say your dbt project's `main` branch is the version that actually feeds
production dashboards. You need to rework the grain of the
`customer_ltv` model — a real, structural schema change that might break
three downstream reports if you get it wrong. Committing that change
directly on `main` means everyone using the project sees your
half-finished work immediately, including anything that's currently
broken.

A branch solves this: it's a separate, parallel line of commits that
starts from wherever you create it, and doesn't affect `main` — or
anyone else's checkout of `main` — until you deliberately bring the two
back together (Lesson 5 covers exactly how).

![Diagram showing a Main branch with a small "Little Feature" branch (one commit) and a larger "Big Feature" branch (three commits), both starting from and rejoining the Main line.](/courses/git-cicd/ch01/04-branches/git-branch-diagram.svg)
*Every branch is just a separate line of commits, starting from a point on another branch. Main keeps moving untouched while a branch does its own thing.*
Source: [Atlassian — Using Branches](https://www.atlassian.com/git/tutorials/using-branches)

## Creating and switching branches

```
git branch rework-ltv-grain
git checkout rework-ltv-grain
```

Or, in one step:

```
git checkout -b rework-ltv-grain
```

Modern Git also has `git switch`, added specifically to make branch
switching clearer than `checkout` (which historically did too many
unrelated things):

```
git switch -c rework-ltv-grain
```

All three end in the same place: a new branch, checked out, ready for
commits. `git branch` (no arguments) lists every branch you have and
marks the current one with an asterisk.

## What actually happens when you commit on a branch

Every commit you make while on `rework-ltv-grain` extends *that*
branch's line of history. `main` doesn't move. If you switch back:

```
git switch main
```

Your working directory's files literally change on disk back to
whatever `main` last looked like — the schema rework you were doing on
the other branch is still there, safely committed, waiting for you to
switch back to it. Nothing is lost; it's just not currently checked out.

## Key terms

| Term | Meaning |
|---|---|
| Branch | A separate, parallel line of commits, starting from a point on another branch |
| `git branch <name>` | Creates a new branch (but doesn't switch to it) |
| `git switch -c <name>` | Creates a new branch and switches to it in one step |
| `main` | The default branch, conventionally the one that reflects production/working state |

## Lab

1. In your Lesson 3 repository, run `git branch` to see your current branch (probably `main`).
2. Create and switch to a new branch called `rework-ltv-grain` using `git switch -c`.
3. Make a small edit to `customer_ltv.sql` and commit it on that branch, then run `git switch main` and confirm the file reverts to its pre-edit state on disk.

## Check yourself

You're ready for Lesson 5 when you can explain why a risky schema change belongs on a branch instead of directly on `main`, and you've actually created, committed on, and switched away from a branch yourself.
