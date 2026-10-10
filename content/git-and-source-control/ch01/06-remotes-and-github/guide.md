# Lesson 6 — Remotes and GitHub

**Chapter 1 · Git Fundamentals · Lesson 6 of 17**

## What you'll learn

- What a "remote" is, and how it differs from the local repository you've used so far
- How GitHub (and similar hosts) fit into Git, which doesn't require them to function
- The core remote commands: `clone`, `fetch`, `pull`, and `push`
- Why `fetch` and `pull` are not the same command, even though they feel similar

## Git doesn't need GitHub

Every lesson so far has worked entirely on your own machine, with no network connection — that's the point of a distributed VCS (Lesson 1). GitHub, Bitbucket, and GitLab are not part of Git itself; they're hosting services that run a Git server and add a web interface, access control, pull requests, and other collaboration features on top. A **remote** is simply another copy of the repository that your local repository knows how to talk to — it could be a teammate's laptop, a company server, or a service like GitHub.

```bash
git remote -v
# origin  https://github.com/yourorg/trigger-practice.git (fetch)
# origin  https://github.com/yourorg/trigger-practice.git (push)
```

`origin` is just a conventional name for "the remote I cloned this from" — nothing forces that name, but almost every real project uses it.

## Cloning an existing repository

`git clone` downloads a full copy of a repository — not just its current files, but its entire history — and automatically sets up `origin` to point back at where it came from:

```bash
git clone https://github.com/yourorg/trigger-practice.git
cd trigger-practice
git remote -v
# origin  https://github.com/yourorg/trigger-practice.git (fetch)
```

## Sending your work: git push

`git push` uploads your local commits on a branch to the matching branch on the remote:

```bash
git push origin feature-duplicate-check
```

If the remote branch doesn't exist yet, this creates it. If it does exist and has commits your local branch doesn't have, the push is rejected until you reconcile the two (see `fetch`/`pull` below) — Git refuses to silently overwrite someone else's work on the remote.

## Getting others' work: fetch vs. pull

This is the distinction that trips up the most people new to Git:

- **`git fetch`** downloads new commits from the remote into your local repository, but does **not** touch your working directory or merge anything into your current branch. It just updates Git's knowledge of what the remote has — specifically, it updates a reference called `origin/main` (note the slash) to reflect the remote's current state, without moving your actual `main`.
- **`git pull`** does a `fetch` and then immediately merges (or, depending on configuration, rebases) those new commits into your current branch.

```bash
git fetch origin          # see what's new, without changing anything locally yet
git log origin/main       # inspect what's on the remote before touching your branch
git pull origin main      # fetch AND merge in one step
```

`fetch` is the safer, "look before you touch anything" option; `pull` is the common day-to-day shortcut once you trust that merging straight in won't surprise you. Many real workflows use `fetch` deliberately when reviewing what a teammate pushed before deciding to bring it into your own branch.

## A full remote round-trip

```bash
git clone https://github.com/yourorg/trigger-practice.git
cd trigger-practice
git switch -c add-readme
echo "# Trigger Practice" > README.md
git add README.md
git commit -m "Add project README"
git push origin add-readme
```

At this point, the `add-readme` branch exists on GitHub too, even though nothing has merged into `main` yet — which is exactly the state a pull request (Lesson 7) picks up from.

## Key terms

| Term | Meaning |
|---|---|
| Remote | Another copy of a repository your local repository can communicate with |
| `origin` | The conventional name for the remote a repository was cloned from |
| `git clone` | Downloads a full copy of a repository's history and sets up its remote |
| `git fetch` | Downloads new remote commits without merging them into your current branch |
| `git pull` | Fetches, then merges (or rebases) the new commits into your current branch |
| `git push` | Uploads local commits on a branch to the matching remote branch |

## Lab

If you have a free GitHub account, create a new empty repository there and push your local `trigger-practice` repo to it: add the remote with `git remote add origin <url>`, then `git push -u origin main`. If you don't want to create a GitHub account for this lab, instead write out, step by step, what commands you'd run to: (1) clone a teammate's repo, (2) create a branch, (3) push that branch, and (4) fetch (without merging) to check whether anyone else has pushed to `main` since you branched.

## Check yourself

Can you explain, in one or two sentences, why Git works perfectly well with no GitHub account at all? Can you describe the exact difference between what `git fetch` does and what `git pull` does?
