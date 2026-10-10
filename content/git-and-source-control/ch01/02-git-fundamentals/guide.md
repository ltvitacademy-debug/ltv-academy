# Lesson 2 — Git Fundamentals

**Chapter 1 · Git Fundamentals · Lesson 2 of 17**

## What you'll learn

- How Git stores a project's history as a series of snapshots, not file-by-file diffs
- The three areas every Git repo has: working directory, staging area, and repository
- The core command sequence — `git init`, `git status`, `git add`, `git commit` — you'll use constantly
- How to configure Git with your identity before your first commit

## Snapshots, not diffs

Many people assume Git stores a list of changes (diffs) between versions of each file, the way some older tools do. It doesn't. Git stores a full **snapshot** of every tracked file each time you commit. If a file hasn't changed since the last commit, Git just stores a reference to the identical copy it already has, so this is efficient in practice — but conceptually, every commit is a complete picture of the whole project at that moment, not a patch applied to the previous one. That's part of why checking out an old commit, or comparing two arbitrary points in history, is fast and reliable in Git: there's no chain of patches to replay, just snapshots to compare directly.

## The three areas

Every Git repository you work in has three distinct areas, and understanding the handoff between them is the single most useful mental model for everything that follows:

```
Working Directory  --git add-->  Staging Area  --git commit-->  Repository (.git)
   (your files)                  (what's next)                  (permanent history)
```

- **Working directory**: the actual files on disk that you edit in your code editor. Changes here are not yet tracked by any commit.
- **Staging area (the "index")**: a holding area where you deliberately choose which changes will go into the *next* commit. This is Git's most distinctive feature compared to many other tools — you don't commit everything you've changed, you commit exactly what you've staged.
- **Repository**: the permanent, committed history, stored in a hidden `.git` folder at the root of your project. Once something is committed, it's part of history (even if you later undo it, the old commit is still recoverable for a while).

## Your first commands

Before your first commit, tell Git who you are — this identity gets recorded on every commit you make:

```bash
git config --global user.name "Priya Shah"
git config --global user.email "priya@example.com"
```

To start tracking a new project, run `git init` inside its folder. This creates the hidden `.git` directory and nothing else — your existing files aren't touched or committed yet.

```bash
git init
```

`git status` is the command you'll run more than any other. It tells you, in plain terms, what's changed in your working directory, what's staged, and what branch you're on:

```bash
git status
# On branch main
# Untracked files:
#   AccountTriggerHandler.cls
```

`git add` moves a change from the working directory into the staging area:

```bash
git add AccountTriggerHandler.cls
# or, to stage everything that's changed:
git add .
```

`git commit` takes everything currently staged and permanently records it as a new snapshot, with a message:

```bash
git commit -m "Add AccountTriggerHandler with duplicate-check logic"
```

## Why staging exists

New Git users often ask why there's a staging step at all, instead of just committing every changed file directly. The staging area lets you build a commit deliberately: if you've been working on two unrelated things at once — fixing a bug and starting a new feature — you can `git add` only the bug-fix files and commit them alone, leaving the feature's half-finished files unstaged for a separate, later commit. This keeps each commit focused on one coherent change, which matters enormously once you're reading history back (Lesson 3) or need to undo one specific change without touching another.

## Key terms

| Term | Meaning |
|---|---|
| Working directory | The files on disk you're currently editing |
| Staging area (index) | Where you choose exactly which changes go into the next commit |
| `.git` directory | The hidden folder holding a repository's entire committed history |
| `git status` | Shows what's changed, staged, and which branch you're on |
| `git add` | Moves a change from the working directory into the staging area |
| `git commit` | Permanently records everything currently staged as a new snapshot |

## Lab

Create an empty folder called `trigger-practice`. Run `git init` inside it, then set your `user.name` and `user.email` with `git config`. Create a plain text file called `notes.txt` with one line of text, run `git status` to see it listed as untracked, then `git add notes.txt` and run `git status` again to see it listed as staged. Finally, commit it with a message, and run `git status` one more time to confirm there's nothing left to commit.

## Check yourself

Can you explain, without looking back at this lesson, what the staging area is for and why it's a separate step from committing? Can you list the four commands used in the lab, in order, and say what each one does?
