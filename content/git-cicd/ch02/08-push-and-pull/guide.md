# Lesson 8 — Push, Pull & Fetch

**Chapter 2 · GitHub Essentials · Lesson 8 of 25**

## What you'll learn

- `git push` — sending your local commits to the remote
- `git pull` — fetch and merge in one step
- `git fetch` alone — seeing what changed on the remote without merging
  it into your work yet
- Why analysts routinely confuse pull and fetch, and why the
  difference actually matters

## git push: sending your commits

Once a local repository has a remote (Lesson 7), `git push` sends
whatever commits exist locally that the remote doesn't have yet:

```
git push origin main
```

This uploads your commits to the `main` branch on the `origin` remote.
The first time you push a brand-new local branch, add `-u` (or
`--set-upstream`) so Git remembers the pairing:

```
git push -u origin main
```

After that, plain `git push` knows where to send commits without you
naming the branch and remote every time.

## What pushing actually looks like on GitHub

After a push, GitHub shows the commit exactly where it landed —
attached to the branch it was pushed to:

![A GitHub commit page showing the commit message "Update README.md," a branch label reading "main," the committer, date, and a "Verified" badge.](/courses/git-cicd/ch02/08-push-and-pull/commit-branch-indicator.png)
*This is the real, permanent record a push creates — not a copy or a snapshot, but the actual commit, now living on GitHub with a branch label attached.*
Source: [GitHub Docs — About commits](https://docs.github.com/en/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/about-commits)

## git pull vs. git fetch — the distinction that actually matters

This is where analysts moving from "save the file" habits get tripped
up, because `git pull` and `git fetch` both "get the latest changes,"
but they do meaningfully different things:

- **`git fetch`** downloads whatever new commits exist on the remote
  and stores them locally — but does **not** touch your current
  working files or merge anything in. You can inspect what changed
  before deciding what to do with it.
- **`git pull`** does a fetch, then immediately merges those new
  commits into your current branch. It's `git fetch` + `git merge`,
  run back to back, in one command.

```
git fetch origin
git log main..origin/main --oneline
git pull origin main
```

The `git fetch` + `git log` combination above is exactly how you check
"what did my teammate change on `main`" *before* it touches your own
files — genuinely useful before merging someone else's dbt model
changes into a branch you're actively working on. `git pull` skips
straight to merging, which is fine most of the time, but is exactly
the command that can hand you a surprise merge conflict in the middle
of something else.

## Key terms

| Term | Meaning |
|---|---|
| `git push` | Sends local commits to a remote branch |
| `-u` / `--set-upstream` | Remembers the local-branch-to-remote-branch pairing so future pushes/pulls don't need it spelled out |
| `git fetch` | Downloads new commits from the remote without merging them into your working files |
| `git pull` | `git fetch` + `git merge` in a single command |

## Lab

1. In a repository with a remote, make a small change, commit it, and
   push it with `git push -u origin <branch>`. Confirm it landed on
   GitHub by refreshing the repository page.
2. Without pulling, run `git fetch origin` followed by
   `git log main..origin/main --oneline` (swap in your remote's
   branch name) and read what it reports — even with nothing new, you
   should see it report cleanly.
3. Write one sentence describing a real situation where you'd want to
   `git fetch` and *inspect* before merging, rather than immediately
   `git pull`.

## Check yourself

You're ready for Lesson 9 when you can explain, without looking it
up, exactly what `git pull` does that `git fetch` alone does not.
