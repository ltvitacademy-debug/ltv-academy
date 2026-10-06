# Lesson 6 — Resolving Merge Conflicts

**Chapter 1 · Git Fundamentals · Lesson 6 of 22**

## What you'll learn

- Why Git reports a conflict instead of guessing
- Reading the conflict markers Git inserts into a file
- Resolving a conflict locally: edit, stage, commit
- The same idea, handled in GitHub's own browser-based conflict editor

## Why conflicts happen

Merging (or rebasing) usually works silently — Git can combine changes to
different parts of a file, or different files entirely, without asking you
anything. A **conflict** happens specifically when both branches changed
the *same lines* of the *same file* in different ways. Git has no way to
guess which version you want, so it stops and asks.

## Reading the markers

When a conflict happens, Git edits the file in place, inserting markers
around both versions of the disputed lines:

```
<<<<<<< HEAD
greeting = "Hello there!"
=======
greeting = "Hi, welcome!"
>>>>>>> feature-login
```

`HEAD` is the version from the branch you're on; the section after `=======`
is the version from the branch you're merging in, labeled with its name.
Nothing else in the file is touched — only the exact conflicting lines get
these markers.

## Resolving it

Resolving a conflict means editing the file so it reads correctly, with the
markers themselves completely removed — not just picking one side, but
deciding what the *correct* final content should be (sometimes that's one
side, sometimes a combination of both):

```bash
# edit the file, remove the markers, keep the right content

git add greeting.py
git commit -m "Resolve conflict in welcome message"
```

Staging the file with `git add` tells Git "this conflict is resolved";
committing finishes the merge. `git status` is your friend throughout —
it lists every file still containing unresolved conflicts until you've
staged each one.

## The same idea, on GitHub

A pull request (Chapter 2) that can't be merged automatically shows the
same conflict, right in the browser:

![A GitHub pull request showing a warning that it has a merge conflict, with the "Resolve merge conflicts" button outlined.](/courses/git-github-swe/ch01/06-resolving-conflicts/resolve-merge-conflicts-button.png)

Clicking through opens GitHub's own conflict editor — the same `<<<<<<<`
markers, editable directly in the browser:

![GitHub's web-based conflict editor, showing the "Mark as resolved" button after conflict markers have been edited out.](/courses/git-github-swe/ch01/06-resolving-conflicts/mark-as-resolved-button.png)

Once every conflicted file is marked resolved, GitHub lets you commit the
merge directly:

![GitHub's conflict editor with the "Commit merge" button outlined, ready to finish the merge once all conflicts are resolved.](/courses/git-github-swe/ch01/06-resolving-conflicts/merge-conflict-commit-changes.png)

This is genuinely useful for a small, simple conflict — but for anything
nontrivial, resolving locally in your own editor, where you can run the
code and see the surrounding context, is usually the better call.

## Key terms

| Term | Meaning |
|---|---|
| Merge conflict | When both branches changed the same lines differently |
| `<<<<<<<` / `=======` / `>>>>>>>` | The markers Git inserts around conflicting content |
| Resolving | Editing the file to its correct final content and removing the markers |
| `git add` (during a conflict) | Marks that specific file's conflict as resolved |

## Check yourself

You're ready for Lesson 7 when you can deliberately create a merge
conflict between two branches, read the markers, resolve it correctly, and
finish the merge with a commit.
