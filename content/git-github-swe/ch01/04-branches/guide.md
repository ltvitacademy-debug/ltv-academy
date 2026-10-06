# Lesson 4 — Branches

**Chapter 1 · Git Fundamentals · Lesson 4 of 22**

## What you'll learn

- What a branch actually is: a lightweight, movable pointer — not a copy
- Creating, switching, and deleting branches from the command line
- Why `main` stays stable while feature work happens elsewhere
- The same branch model, seen in GitHub's own web interface

## What a branch really is

A branch is **not** a copy of your project. It's a small pointer to a
specific commit, which moves forward automatically as you add new commits
while that branch is checked out. Every repository starts with one branch —
conventionally `main` — and every new branch you create is just another
pointer, starting from wherever you were when you created it.

That's why branching in Git is instant and cheap, unlike some older version
control systems: creating a branch doesn't copy any files, it just adds a
new pointer.

## Creating and switching branches

```bash
git branch feature-login          # create a branch (doesn't switch to it)
git switch feature-login          # switch to it

# or do both in one step:
git switch -c feature-login
```

The older, still-common equivalent of `switch -c` is `git checkout -b` —
you'll see both in the wild; they do the same thing. While `feature-login`
is checked out, every commit you make moves *that* pointer forward, leaving
`main` exactly where it was.

## Seeing and deleting branches

```bash
git branch              # list local branches, * marks the current one
git branch -d old-branch   # delete a branch (safely, only if merged)
```

## The same model, on GitHub

Everything above happens locally, with no server involved. But once a
repository is pushed to GitHub (Chapter 2), the same branch model is right
there in the web interface — useful for quick edits, or just for seeing
what branches exist without a terminal open.

![GitHub's file tree view with the branch dropdown open, showing the current branch and others in the repository.](/courses/git-github-swe/ch01/04-branches/file-tree-view-branch-dropdown.png)

Typing a name that doesn't exist yet into that same selector offers to
create it — the web equivalent of `git switch -c`:

![GitHub's branch selector dropdown showing the option "Create branch: new-branch" after typing a new branch name.](/courses/git-github-swe/ch01/04-branches/create-branch-text.png)

And a repository's **Branches** page lists every branch with a trash icon
to delete the ones you're done with — the same idea as `git branch -d`:

![A branch listed on GitHub's Branches page, with its delete (trash can) icon highlighted.](/courses/git-github-swe/ch01/04-branches/branches-delete.png)

The web UI is handy for quick, one-off changes, but for real feature work
you'll do this from the command line, which is what the rest of this course
assumes.

## Key terms

| Term | Meaning |
|---|---|
| Branch | A movable pointer to a commit, not a copy of the project |
| `main` | The conventional name for a repository's default branch |
| `git switch -c <name>` | Creates a new branch and switches to it in one step |
| `git checkout -b <name>` | The older, equivalent way to do the same thing |
| `git branch -d <name>` | Deletes a branch (only if its changes are already merged) |

## Check yourself

You're ready for Lesson 5 when you can create a branch, switch to it, make
a commit on it, switch back to `main`, and explain why `main` didn't
change.
