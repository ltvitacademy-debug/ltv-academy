# Lesson 3 — init, add & commit

**Chapter 1 · Git Fundamentals for Data People · Lesson 3 of 25**

## What you'll learn

- What `git status` tells you at every stage
- How `git add` stages specific files (or all of them)
- How `git commit` turns staged changes into a permanent snapshot
- What separates a good commit message from a useless one, on a data project

## git status: what changed

Inside your `customer-ltv-project` repository from Lesson 2, add a new
file, `customer_ltv.sql`, with a real query in it. Run:

```
git status
```

Git reports `customer_ltv.sql` as an **untracked file** — it exists on
disk, but Git isn't watching it yet. This is the single most useful
command in Git. Run it constantly; it always tells you exactly where you
stand.

## git add: staging your changes

To tell Git you want this file included in your next commit:

```
git add customer_ltv.sql
```

Run `git status` again, and `customer_ltv.sql` now shows as staged, under
"Changes to be committed." If you've edited several files and want all
of them staged at once:

```
git add -A
```

Staging is deliberate by design. If you've been mid-way through editing
two unrelated things — say, a schema fix in one file and a formatting
cleanup in another — you can stage just the schema fix and leave the
formatting change out of this commit entirely.

## git commit: taking the snapshot

Once something is staged, commit it:

```
git commit -m "Add customer_ltv model"
```

This creates a permanent, timestamped, attributed snapshot of exactly
what was staged — no more, no less. Check it landed:

```
git log --oneline
```

You'll see your commit, with a short hash and your message.

## What makes a good commit message

On a real data team, six months from now, someone (possibly you) will
run `git log` trying to understand why a query changed. Compare:

- **"Add customer_ltv model"** — specific, says what was added, present tense
- **"updates"** — tells a future reader nothing at all
- **"Fix churn_flags join to exclude cancelled subscriptions"** — specific, explains the *why*
- **"changes"** — same problem as "updates"

A good commit message names the *what* — and ideally the *why* — in
enough detail that someone reading only the message, without opening the
diff, understands what changed.

## Key terms

| Term | Meaning |
|---|---|
| `git status` | Shows the current state of your working directory and staging area |
| `git add <file>` | Stages a specific file (or `-A` for everything) for the next commit |
| `git commit -m "..."` | Creates a permanent snapshot of everything currently staged |
| `git log --oneline` | Shows commit history, one line per commit |

## Lab

1. In your Lesson 2 repository, create `customer_ltv.sql` with a real (even simple) query.
2. Run `git status`, then `git add customer_ltv.sql`, then `git status` again to see the difference.
3. Commit it with a specific, present-tense message, then run `git log --oneline` to confirm it landed.

## Check yourself

You're ready for Lesson 4 when you can explain, without looking it up, what `git status` shows at each of the three stages (untracked, staged, committed), and you can write a commit message a teammate would actually understand six months from now.
