# Lesson 5 — Merging

**Chapter 1 · Git Fundamentals · Lesson 5 of 17**

## What you'll learn

- What `git merge` actually does, and the two shapes a merge can take
- The difference between a fast-forward merge and a merge commit (three-way merge)
- How to merge a finished branch back into `main` from the command line
- Why merging, not branching, is where real teams first run into friction

## Bringing a branch back together

Branching (Lesson 4) is only half the story — at some point, the work on a branch needs to rejoin the line of history everyone else is building on. `git merge` takes the changes from one branch and integrates them into the branch you currently have checked out.

```bash
git switch main
git merge feature-duplicate-check
```

This takes everything committed on `feature-duplicate-check` and applies it to `main`. What happens next depends on how far `main` and the feature branch have diverged.

## Fast-forward merge

If `main` hasn't moved at all since `feature-duplicate-check` was created — nobody else committed anything to `main` in the meantime — Git can do the simplest possible thing: just move `main`'s pointer forward to match the feature branch's latest commit. No new commit is created; `main` simply catches up.

```
Before:              After (fast-forward):
A---B (main)          A---B---C---D (main, feature-duplicate-check)
     \
      C---D (feature-duplicate-check)
```

## Three-way merge (merge commit)

If `main` has moved forward too — someone else merged a different branch into it while you were working — Git can't just slide the pointer forward, because the two branches have genuinely diverged. Instead, Git creates a new **merge commit**, which has two parents: the tip of `main` and the tip of the feature branch. This merge commit is what actually combines both lines of history back into one.

```
Before:                        After (three-way merge):
A---B---E (main)                A---B---E---M (main)
     \                               \     /
      C---D (feature-duplicate-check) C---D
```

`M` is the merge commit. It has two parents (`E` and `D`), and from this point forward, `main`'s history includes everything from both lines. Git figures out what changed on each side since their common ancestor (`B`) and combines both sets of changes automatically — as long as they don't touch the exact same lines of the exact same file, which is when a **merge conflict** happens (its own full lesson, Lesson 8).

## A realistic sequence

```bash
git switch -c feature-duplicate-check
# ... work, commit ...
git switch main
git pull                              # make sure main has everyone else's latest work
git merge feature-duplicate-check
git push
git branch -d feature-duplicate-check  # clean up — the work is now part of main
```

Running `git pull` on `main` before merging is a habit worth building now: it ensures you're merging your branch into the *current* state of `main`, not a stale copy from when you first branched off — which is exactly the situation that produces a three-way merge instead of a simple fast-forward.

## Which kind of merge should happen?

You generally don't choose fast-forward vs. three-way yourself — Git decides automatically based on whether the branches have diverged. Some teams deliberately force a merge commit even when a fast-forward would work, using `git merge --no-ff`, specifically so that every feature's history stays visibly grouped together in the log rather than being flattened into `main`'s straight line. This is a stylistic/process choice some teams standardize on; neither option is "more correct" in isolation.

## Key terms

| Term | Meaning |
|---|---|
| `git merge` | Integrates the changes from one branch into the currently checked-out branch |
| Fast-forward merge | Simply moving a branch pointer forward when there's no divergence to reconcile |
| Three-way merge | Creating a new merge commit with two parents when both branches have diverged |
| Merge commit | A commit with two parent commits, produced by a three-way merge |
| Merge conflict | What happens when both sides changed the exact same lines (Lesson 8) |

## Lab

Using the `trigger-practice` repo, switch to `main` and make one new commit (any small edit to `notes.txt`) so that `main` moves forward. Then switch to your `experiment` branch from Lesson 4's lab and make one more commit there too, so both branches have diverged from their common point. Switch back to `main` and run `git merge experiment`. Confirm from the output and `git log --oneline --graph` whether Git performed a fast-forward or created a merge commit, and explain why.

## Check yourself

Can you explain, using the diagram style from this lesson, the difference between what a fast-forward merge does to history versus what a three-way merge does? Why does running `git pull` on `main` right before merging reduce the chance of ending up with an unexpected three-way merge?
