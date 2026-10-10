# Lesson 4 — Branches

**Chapter 1 · Git Fundamentals · Lesson 4 of 17**

## What you'll learn

- What a branch actually is under the hood (a movable pointer, not a copy of the files)
- How to create, switch to, list, and delete branches
- What `HEAD` means and how it tracks where you currently are
- Why isolating work in branches is the foundation every later lesson builds on

## A branch is just a pointer

This is the single most important thing to understand about Git branches: a branch is not a copy of your files. It is a small, movable label pointing at one specific commit. When you create a branch, Git doesn't duplicate anything on disk — it just writes a new pointer. When you make a new commit while on that branch, the branch's pointer automatically moves forward to the new commit.

```
          feature-login
               |
              v
A --- B --- C --- D
            ^
            |
           main
```

Here, `main` still points at `C`, while a separate branch, `feature-login`, has moved ahead to a new commit `D`. Both branches share the same history up through `C` — nothing was copied, nothing was deleted. This is why creating a branch in Git is instant, even in a huge repository: it's writing one small file, not cloning anything.

## HEAD: where you are right now

`HEAD` is a special pointer that tracks whichever branch (and therefore, commit) you currently have checked out. Most of the time, `HEAD` points at a branch, which itself points at a commit — so moving `HEAD` to a different branch is how you "switch" what you're working on.

## Creating, switching, and listing branches

```bash
git branch                       # list all local branches; * marks the current one
git branch feature-login         # create a new branch (doesn't switch to it)
git switch feature-login         # switch HEAD to that branch
git switch -c feature-signup     # create AND switch in one step
```

Older material and some muscle memory from experienced users will show `git checkout <branch>` and `git checkout -b <branch>` instead — these are the older, more overloaded commands that `switch` and `restore` were introduced to replace, but they still work and you'll see them often in real codebases and tutorials.

To delete a branch once it's no longer needed (typically after it's been merged):

```bash
git branch -d feature-login
```

## Why branch at all

Without branches, a repository only ever has one line of history, and every commit affects the one and only version everyone sees. Branches let you develop something — a new Lightning component, a bug fix, an experiment — in complete isolation from `main`, commit as many times as you want along the way, and only bring the finished result back into `main` when it's ready (that bringing-back step is merging, covered in the next lesson). If the work doesn't pan out, you can simply delete the branch; `main` was never touched.

This isolation is exactly why real teams can have multiple people working on completely different features at the same time without stepping on each other: Marcus's `feature-signup` branch and Priya's `feature-login` branch both start from the same `main`, but neither sees the other's half-finished work until one of them merges back.

```bash
git switch -c feature-duplicate-check
# ... edit AccountTriggerHandler.cls ...
git add AccountTriggerHandler.cls
git commit -m "Add duplicate-check logic to AccountTriggerHandler"
git switch main
```

Notice that switching back to `main` makes the working directory look exactly like `main`'s last commit again — the duplicate-check code isn't missing, it's safely committed on `feature-duplicate-check`, waiting for you to switch back to it whenever you want.

## Key terms

| Term | Meaning |
|---|---|
| Branch | A movable pointer to a specific commit — not a copy of the files |
| `HEAD` | The pointer tracking which branch/commit you currently have checked out |
| `git branch` | Lists, creates, or deletes branches |
| `git switch` | Changes which branch `HEAD` points to (moves you to a different branch) |
| `git checkout` | The older command that did what `switch` and `restore` now split into |

## Lab

In your `trigger-practice` repository, create a new branch called `experiment` with `git switch -c experiment`. Make a change to `notes.txt` and commit it on this branch. Run `git log --oneline` and note the hash of your new commit. Switch back to `main` with `git switch main`, open `notes.txt`, and confirm your experimental change is not there. Finally, switch back to `experiment` and confirm it is.

## Check yourself

Can you explain why creating a new branch in Git is nearly instant, even on a huge repository? Can you describe, in your own words, what `HEAD` points to and how it changes when you run `git switch`?
