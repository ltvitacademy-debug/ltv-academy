# Version Control with Git

Lesson 4's Dev-stage diagram included a step called "Branch Created," and Lesson 6's CI/CD
pipeline starts the instant "a developer pushes a change to Git" — both assumed you already knew
roughly what that meant. This lesson opens that up: what a repository actually is, how a commit
works, and the everyday workflow almost every real engineering team runs on, no matter what
you end up building.

## What you'll learn

- What a version-control system tracks, and why "just email me the file" breaks down past one person
- The core Git vocabulary: repository, commit, branch, remote
- The everyday workflow: clone, branch, commit, push, pull request
- Why commit messages and a `.gitignore` file matter more than they look like they should

## Why version control exists

Before version control, teams really did share code by emailing files back and forth, or editing
the same shared folder — and it fell apart almost immediately. Two people edit the same file and
one person's changes silently overwrite the other's. Nobody can say for certain what changed
between Tuesday's version and today's, or who changed it, or why. And if today's change breaks
something, there's no reliable way back to a version that worked.

**Version control** (also called **source control**) is software that tracks every change to a
set of files over time — who made it, when, and what exactly changed — and lets a team work on
the same codebase at the same time without stepping on each other. **Git** is, by a wide margin,
the version control system real IT teams actually use.

## The core vocabulary

- **Repository (repo)**: the full tracked history of a project — every file, plus every change
  ever made to those files, going back to the very first commit.
- **Commit**: a saved snapshot of a specific set of changes, with a message describing what
  changed and why. A repo's history is just a chain of commits, one after another.
- **Branch**: an isolated line of work, split off from the main codebase, so changes in progress
  don't affect anyone else until they're deliberately merged back in. This is exactly the "Branch
  Created" step from Lesson 4's Dev-stage diagram — now you know what it actually is.
- **Remote**: a copy of the repository hosted somewhere other than your own machine — GitHub is
  the most common host — so a whole team can push to and pull from the same shared history.

## The everyday workflow

A typical change, start to finish, looks like this:

```
git clone <repo-url>              # copy the repo to your own machine
git checkout -b fix-report-filter # create and switch to a new branch
# ...make your changes...
git add .                         # stage the changed files
git commit -m "Fix date filter on regional report"
git push origin fix-report-filter # send the branch to the remote (e.g. GitHub)
```

From there, you open a **pull request** — a request to merge your branch into the main codebase —
which is exactly the Code Review step Lesson 4 placed inside the Dev stage: a teammate reads the
diff, leaves comments, and approves (or sends it back) before it merges. Only after it's merged
does the change become part of the shared history everyone else builds on.

## Why commit messages and `.gitignore` matter

A commit message like `"fixed stuff"` is technically a commit message, but it's useless to the
next person reading the history — including you, six months from now. A good commit message says
what changed and, where it isn't obvious, why: `"Fix date filter on regional report — was
comparing against UTC instead of local time."`

A `.gitignore` file tells Git which files to never track in the first place — build output,
local configuration, and especially credentials or connection strings. Committing a password or
an API key into a repo's history doesn't just expose it once; it stays recoverable from that
history forever, even after you "delete" the file in a later commit.

## Key terms

| Term | Meaning |
|---|---|
| Version control / source control | Software that tracks every change to a set of files over time, by whom, and when |
| Git | The version control system almost all real IT teams use |
| Repository (repo) | The full tracked history of a project |
| Commit | A saved snapshot of changes, with a message describing what changed and why |
| Branch | An isolated line of work, split off so changes don't affect anyone else until merged |
| Remote | A hosted copy of a repository (e.g. GitHub) that a team pushes to and pulls from |
| Pull request | A request to merge one branch into another, reviewed by a teammate before it's accepted |

## Check yourself

In your own words, explain what a branch is for, and why a pull request sits between "I pushed my
branch" and "my change is part of the main codebase." Then explain why `"fixed stuff"` is a worse
commit message than one that names what changed and why.
