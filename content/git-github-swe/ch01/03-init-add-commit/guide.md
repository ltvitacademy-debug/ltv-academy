# Lesson 3 — init, add & commit

**Chapter 1 · Git Fundamentals · Lesson 3 of 22**

## What you'll learn

- `git init` — turning any folder into a Git repository
- The three states a file moves through: working directory, staging area, repository
- `git add` — choosing exactly what goes into your next commit
- `git commit` — saving a snapshot, and writing a message that's actually useful later
- `git status` and `git log` — checking where you are and what's happened so far

## git init

Any folder becomes a Git repository with one command, run inside it:

```bash
git init
```

This creates a hidden `.git` folder, which is where Git stores the entire
history of the project — every commit, every branch, everything. Delete
`.git` and the folder goes back to being a plain, untracked directory; the
rest of your files are untouched, only the history is gone.

## The three states

Every file Git tracks moves through three places, and understanding this is
the key to the next two commands:

```
Working Directory  →   Staging Area   →   Repository
  (your edits)          (git add)         (git commit)
```

- **Working directory** — the actual files on disk, as you're editing them
- **Staging area** (the "index") — changes you've marked with `git add`,
  ready to be included in the next commit
- **Repository** — the permanent history, built from commits

## git add

```bash
git add report.py        # stage one specific file
git add .                 # stage everything changed in this folder
```

Staging exists so a commit can be deliberate. If you've changed three
unrelated things, you can `git add` just the one that's ready, commit it,
then stage and commit the rest separately — rather than every commit being
"whatever happened to be unsaved at the time."

## git commit

```bash
git commit -m "Add quarterly totals to report"
```

The `-m` flag provides the commit message inline. A good commit message
says *what* changed and, if it's not obvious, *why* — "fix bug" tells a
future reader (often you, in six months) nothing; "fix off-by-one error in
totals when the last row is empty" does.

## Checking where you are

```bash
git status    # what's staged, what's not, what's untracked
git log       # the commit history, newest first
```

```
commit a1b2c3d4e5f6...
Author: Ada Lovelace <ada@example.com>
Date:   Mon Oct 5 10:03:00 2026

    Add quarterly totals to report
```

Every commit in `git log` has that same shape: a unique hash, an author
(from the identity you set in Lesson 2), a date, and your message — the
same tracked history Lesson 1 promised, now actually happening on your
machine.

## Key terms

| Term | Meaning |
|---|---|
| `git init` | Turns the current folder into a Git repository |
| `.git` folder | Where Git stores the project's entire history |
| Staging area | Changes marked with `git add`, waiting for the next commit |
| `git commit -m "..."` | Saves a snapshot of staged changes with a message |
| `git log` | Shows the commit history |

## Check yourself

You're ready for Lesson 4 when you can run `git init`, edit a file, stage
it with `git add`, commit it with a real message, and see it appear in
`git log` — without looking anything up.
