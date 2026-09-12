# Lesson 6 — Resolving Merge Conflicts

**Chapter 1 · Git Fundamentals for Data People · Lesson 6 of 25**

## What you'll learn

- Why a conflict happens in the first place
- What a real conflict marker block looks like inside an actual SQL file
- The real, step-by-step workflow for resolving one and finishing the merge

## Why conflicts happen

A conflict happens when two branches change the *same lines* of the
*same file* in different ways, and Git genuinely can't tell which
version you want. If you changed different files, or even different
lines of the same file, Git merges them automatically without asking.
Conflicts only happen on real, overlapping edits.

![Diagram showing two independent sets of changes made to the same document, which cannot both be applied automatically when merged, producing a question mark where they collide.](/courses/git-cicd/ch01/06-resolving-conflicts/git-merge-conflict.svg)
*Two people (or two branches) change the same lines differently — Git stops and asks a human to decide.*
Source: [Software Carpentry — Conflicts](https://swcarpentry.github.io/git-novice/09-conflict.html)

## What a real conflict looks like

Say `main` and your branch both changed the `WHERE` clause in
`churn_flags.sql`. Running `git merge` (or `git rebase`) stops and
leaves this inside the actual file:

```sql
SELECT customer_id, churn_date
FROM subscriptions
<<<<<<< HEAD
WHERE status = 'cancelled'
=======
WHERE status IN ('cancelled', 'expired')
>>>>>>> feature/track-expired-subs
```

- `<<<<<<< HEAD` marks the start of **your current branch's version**
- `=======` separates the two versions
- `>>>>>>> feature/track-expired-subs` marks the end of **the incoming branch's version**

Git has already written both versions into the file for you — it just
can't decide between them, and won't guess.

## Resolving it: the real workflow

You have three real choices for each conflict:

1. **Pick one side entirely** — delete the other version and both marker lines
2. **Combine both** — if the right answer is genuinely both, e.g. `WHERE status IN ('cancelled', 'expired')`
3. **Write something new** — sometimes neither original version is actually correct once you look at both together

Whichever you choose, the fix is the same: **delete all three marker
lines** (`<<<<<<<`, `=======`, `>>>>>>>`) along with whichever version
you're discarding, leaving only clean, correct SQL behind. Then:

```
git add churn_flags.sql
git commit
```

(If you're resolving a conflict from a `rebase` instead of a `merge`,
the last step is `git rebase --continue` instead of `git commit`.)

`git status` will always tell you which files still have unresolved
conflicts — it won't let you commit until every marker is gone.

## Key terms

| Term | Meaning |
|---|---|
| Conflict | Two branches changed the same lines of the same file differently, and Git can't auto-merge them |
| `<<<<<<<` / `=======` / `>>>>>>>` | Markers Git inserts showing your version vs. the incoming version |
| `git add` + `git commit` | How you tell Git a conflict is resolved and finish a merge |
| `git rebase --continue` | The rebase equivalent of finishing after resolving a conflict |

## Lab

1. Create two branches from the same starting file, edit the same line differently on each, and merge one into the other to trigger a real conflict.
2. Open the file, find the three marker lines, and resolve the conflict by combining both changes.
3. Run `git add` and `git commit` to finish the merge, then confirm with `git log --oneline --graph` that the merge commit landed.

## Check yourself

You've completed Chapter 1 when you can look at a real `<<<<<<<` / `=======` / `>>>>>>>` block in a SQL file and resolve it correctly, without panicking — conflicts are a normal, expected part of working with branches, not a sign something went wrong.
