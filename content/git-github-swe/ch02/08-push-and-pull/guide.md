# Lesson 8 — Push, Pull & Fetch

**Chapter 2 · GitHub Essentials · Lesson 8 of 22**

## What you'll learn

- `git push` — sending your local commits to GitHub
- `git fetch` — checking what's changed remotely, without touching your work
- `git pull` — fetch and merge (or rebase) in one step
- Why `fetch` is the safer command to reach for when you're not sure

## git push

Once a remote is configured (Lesson 7), sending your commits there is one
command:

```bash
git push origin main
```

This uploads any commits on your local `main` that the remote doesn't have
yet. The first time you push a new branch, Git usually asks you to set an
"upstream" so future pushes can just be `git push`:

```bash
git push -u origin main
```

After that `-u` (`--set-upstream`) the first time, `git push` and
`git pull` alone know which remote branch to talk to.

## git fetch: look, don't touch

```bash
git fetch origin
```

Fetch downloads any new commits from the remote and updates your local
*record* of where that remote's branches are — but it does **not** touch
your own working files or your current branch at all. After fetching, you
can inspect what changed (`git log origin/main`, or a diff) before
deciding what to do with it. This is the safe option when you're not sure
what's waiting on the remote.

## git pull: fetch + merge in one step

```bash
git pull origin main
```

Pull does exactly what fetch does, then immediately merges (or, with
`git pull --rebase`, rebases) those changes into your current branch. It's
the common everyday command for "catch my branch up with the remote" — but
because it merges automatically, it can surprise you with a merge conflict
you weren't expecting if you hadn't looked first.

## A practical habit

```bash
git fetch origin          # see what's there, no risk
git log main..origin/main # (optional) preview exactly what's incoming
git pull origin main      # now bring it in
```

For routine work on your own branch, a plain `git pull` is fine. When
you're picking back up after time away, or working somewhere with a lot of
simultaneous activity, fetching first costs nothing and removes the
surprise.

## Key terms

| Term | Meaning |
|---|---|
| `git push` | Uploads your local commits to the remote |
| `git fetch` | Downloads remote changes without touching your working branch |
| `git pull` | Fetch, then immediately merge (or rebase) into your current branch |
| Upstream | The remote branch a local branch is linked to, via `-u`/`--set-upstream` |

## Check yourself

You're ready for Lesson 9 when you can explain, without looking, exactly
what `git fetch` changes on your machine that `git pull` changes further —
and why that difference matters.
