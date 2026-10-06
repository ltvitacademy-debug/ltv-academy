# Lesson 5 — Merge vs. Rebase

**Chapter 1 · Git Fundamentals · Lesson 5 of 22**

## What you'll learn

- Two different ways to bring one branch's commits into another
- `git merge`: what a merge commit actually is, and when it's created
- `git rebase`: replaying commits on a new base, and why it rewrites history
- A practical rule of thumb for when to reach for each

## The situation: two branches that diverged

Say `main` has moved forward with new commits while you were working on
`feature-login`. Both branches now have commits the other doesn't. Bringing
them back together can be done two different ways.

## git merge

```bash
git switch main
git merge feature-login
```

Merge takes the tip of `feature-login` and the tip of `main`, and creates a
new **merge commit** that has both as parents. Nothing from either branch's
history is rewritten — every commit that happened stays exactly where it
was, and the merge commit is just a new point where the two histories join.

```
main:      A---B---C---------M
                    \        /
feature:             D---E--
```

This is honest about what actually happened — you can see from the history
that these two lines of work genuinely diverged and were later joined. The
tradeoff: the history has that extra branch-and-join shape, which gets
noisy if it happens often.

## git rebase

```bash
git switch feature-login
git rebase main
```

Rebase takes the commits unique to `feature-login` (`D` and `E`) and
**replays** them one at a time on top of `main`'s current tip, as if you'd
started your branch from there in the first place:

```
main:      A---B---C
                     \
feature:              D'---E'
```

Those replayed commits (`D'`, `E'`) are *new* commits with new hashes, even
though the actual code changes are the same — this is why rebase rewrites
history, and why you should never rebase commits that have already been
pushed somewhere others are working from. The result is a clean, linear
history with no merge commit at all.

## Which one to use

A practical default: **rebase your own local feature branch** to catch it
up with `main` before opening a pull request — it keeps your branch's
history linear and easy to review. **Merge** when combining a finished,
shared branch back into `main` — that's exactly the moment a pull request's
"Merge" button performs (Lesson 9), and it's the right call once a branch
is no longer just yours.

The one hard rule: **never rebase a branch other people are already
building on top of** — rewriting commits that others have already pulled
creates a mismatch between your new history and their old one that's
genuinely painful to untangle.

## Key terms

| Term | Meaning |
|---|---|
| Merge commit | A commit with two parents, created when `git merge` joins two branches |
| `git rebase` | Replays one branch's commits onto a new base, rewriting their hashes |
| Linear history | A commit history with no branch-and-join shape, as rebase produces |
| The hard rule | Never rebase commits that have already been pushed and shared |

## Check yourself

You're ready for Lesson 6 when you can explain, without looking: why a
rebased commit gets a new hash even though its code changes are identical,
and why that makes rebasing shared history dangerous.
