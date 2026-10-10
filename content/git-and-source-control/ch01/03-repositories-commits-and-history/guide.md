# Lesson 3 — Repositories, Commits and History

**Chapter 1 · Git Fundamentals · Lesson 3 of 17**

## What you'll learn

- How commits link together to form history, and what a commit hash identifies
- How to read history with `git log`, in both the full and one-line forms
- How to inspect exactly what changed in a specific commit with `git show` and `git diff`
- How to write commit messages that make history actually useful later

## Commits form a chain

Every commit (except the very first one in a repository) points back to the commit that came immediately before it — its **parent**. That chain of parent pointers is what "history" means in Git: a linked sequence of snapshots, each one built on the last. Each commit is identified by a **SHA-1 hash** — a long string like `a3f5c92...` that's calculated from the commit's content, its parent, its author, and its message. Two commits can never accidentally share a hash, and the hash changes completely if anything about the commit changes, which is why Git can detect tampering or corruption so reliably.

```
A --- B --- C --- D   (main)
```

Here, `D` is the most recent commit, and its parent is `C`, whose parent is `B`, whose parent is `A`. `main` is just a label — a **branch** — pointing at whichever commit is currently the tip; Lesson 4 covers branches properly.

## Reading history with git log

`git log` prints the commit history, newest first:

```bash
git log
# commit a3f5c921e8b4d6f0a1c2b3d4e5f6a7b8c9d0e1f2
# Author: Priya Shah <priya@example.com>
# Date:   Tue Oct 7 14:22:03 2026 -0500
#
#     Add AccountTriggerHandler with duplicate-check logic
```

For a quicker overview, `--oneline` compresses each commit to a single line with a shortened hash:

```bash
git log --oneline
# a3f5c92 Add AccountTriggerHandler with duplicate-check logic
# 7c1e8d4 Initial commit
```

Add `--graph` and `--all` to visualize branches and merges at the same time (useful once Chapter 1's later lessons introduce multiple branches):

```bash
git log --oneline --graph --all
```

## Inspecting a specific change

`git show <hash>` displays everything about one commit — its message, author, and the full diff of what it changed:

```bash
git show a3f5c92
```

`git diff` compares two states instead of showing one commit in isolation. With no arguments, it shows uncommitted changes in your working directory versus the last commit; given two commit hashes (or branch names), it shows everything that changed between them:

```bash
git diff                  # working directory vs. last commit
git diff 7c1e8d4 a3f5c92   # what changed between two specific commits
```

## Writing commit messages that earn their keep

A commit message is only useful if it answers the question a future reader (often you, six months later) will actually ask: *why* was this change made? "Fixed bug" or "updates" tells a reader nothing. A convention worth adopting from day one: a short, specific summary line (50 characters or so, written in the imperative — "Add", "Fix", "Remove", not "Added" or "Fixes"), optionally followed by a blank line and a longer explanation of the reasoning if the change isn't self-evident.

```
Fix null pointer in AccountTriggerHandler.beforeUpdate

The trigger assumed Account.Industry was always populated, which
broke for records created via the Data Loader bypass. Added a null
check before the comparison.
```

Good messages become one of the most valuable artifacts a team produces over time — a searchable record of *why* the codebase looks the way it does, not just *what* it looks like now.

## Key terms

| Term | Meaning |
|---|---|
| Parent commit | The commit immediately before a given commit in history |
| SHA-1 hash | The unique identifier calculated from a commit's content, parent, author, and message |
| `git log` | Displays commit history, newest first |
| `git show` | Displays one commit's message, metadata, and full diff |
| `git diff` | Compares two states (working directory, commits, or branches) and shows the differences |

## Lab

In the `trigger-practice` repository from Lesson 2's lab, make three more commits: edit `notes.txt` to add a second line and commit it, add a new file `README.md` and commit it, then edit `notes.txt` again and commit that too. Run `git log --oneline` and confirm you see four commits total. Pick the second commit's hash and run `git show` on it to confirm it shows exactly the change you expect — nothing from the commits before or after it.

## Check yourself

Can you explain what makes a commit hash unique, and why that matters for trusting history? Given a `git log --oneline` output with four commits, could you say which command you'd run to see exactly what changed in the third one?
