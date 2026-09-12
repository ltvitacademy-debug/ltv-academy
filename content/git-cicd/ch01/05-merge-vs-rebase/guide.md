# Lesson 5 — Merge vs. Rebase

**Chapter 1 · Git Fundamentals for Data People · Lesson 5 of 25**

## What you'll learn

- What `git merge` actually does to history
- What `git rebase` actually does to history
- A real, practical recommendation for when to use which on a data team

## git merge: combines and preserves

You finished the `rework-ltv-grain` branch from Lesson 4. To bring it
into `main`:

```
git switch main
git merge rework-ltv-grain
```

Git creates a **new merge commit** — one commit with two parents: the
tip of `main` and the tip of `rework-ltv-grain`. Both lines of history
are preserved exactly as they happened, side by side, joined at that one
point.

![Diagram showing Common base, Main tip, and Feature tip all feeding into a New merge commit, which has both branch histories as parents.](/courses/git-cicd/ch01/05-merge-vs-rebase/git-merge-commit.png)
*A merge commit has two parents. Nothing about either branch's original history is rewritten.*
Source: [Atlassian — Git Merge](https://www.atlassian.com/git/tutorials/using-branches/git-merge)

The honest record of "these two lines of work happened in parallel and
were joined here" is exactly what a merge commit preserves — useful when
you want the true shape of history to survive, especially on a shared
branch other people are already using.

## git rebase: replays for a linear history

Rebase does something different. Instead of joining two lines with a new
commit, it takes your branch's commits and **replays them one at a time
on top of** the target branch's current tip — as if you'd started your
work just now, from the latest `main`:

```
git switch rework-ltv-grain
git rebase main
```

![Diagram showing the Feature branch's commits replayed as brand-new commits directly on top of Main's tip, producing one straight line.](/courses/git-cicd/ch01/05-merge-vs-rebase/git-rebase-onto-main.svg)
*Rebase rewrites your branch's commits as new commits on top of main — the result is one straight line, no merge commit.*
Source: [Atlassian — Merging vs. Rebasing](https://www.atlassian.com/git/tutorials/merging-vs-rebasing)

Notice the result is a clean, linear history — no merge commit, no
branching visible at all in `git log`. The catch: those replayed commits
are genuinely new commits, with new hashes. The originals are gone.

## The real recommendation for a data team

**Rebase your own local feature branch before opening a pull request.**
If `rework-ltv-grain` only exists on your machine and nobody else has
pulled it, rewriting its history with a rebase is completely safe —
you're the only one who has those commits, so nothing breaks. It gives
reviewers a clean, linear story of your change.

**Never rebase a branch that's already shared or pushed**, especially
`main` itself. If a teammate has already pulled the branch you rebase,
their local history and yours now disagree — Git will force both of you
into a confusing, avoidable mess. If a branch is shared, merge it.

## Key terms

| Term | Meaning |
|---|---|
| `git merge` | Joins two branches with a new merge commit; preserves both histories exactly as they happened |
| `git rebase` | Replays your branch's commits on top of another branch's tip, producing new commits and a linear history |
| Merge commit | A commit with two parents, marking where two branches were joined |

## Lab

1. In your Lesson 4 repository, merge `rework-ltv-grain` into `main` and run `git log --oneline --graph` to see the merge commit.
2. Create a second small branch, make a commit on it, then rebase it onto `main` and compare the `git log --oneline --graph` output to step 1.
3. Write one sentence explaining why you would never do step 2 on a branch a teammate has already pulled.

## Check yourself

You're ready for Lesson 6 when you can explain, from memory, the concrete difference between what `merge` and `rebase` do to commit history — and state the one rule about never rebasing shared history.
