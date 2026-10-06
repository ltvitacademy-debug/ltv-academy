# Lesson 14 — git blame & History

**Chapter 3 · Collaborative Workflows · Lesson 14 of 22**

## What you'll learn

- Using `git blame` to find out who last touched a line, and when
- Reading `git log` with the options that actually make history useful
- `git log -S` and `git log -p` for finding when specific code appeared
- Why `git blame` tells you where to start asking, not who's "at fault"

## The question blame actually answers

A line of code is doing something wrong, or you don't understand why
it's written the way it is. `git blame <file>` annotates every line
with the commit that last changed it, plus the author and date:

```
$ git blame src/pricing.py
a3f91c2e (Priya Shah   2025-11-02 14:22:10) def apply_discount(price, pct):
a3f91c2e (Priya Shah   2025-11-02 14:22:10)     # capped at 40% per legal review, see JIRA-2291
f7c1a0b8 (Dan Okafor   2026-02-18 09:03:41)     pct = min(pct, 0.40)
a3f91c2e (Priya Shah   2025-11-02 14:22:10)     return price * (1 - pct)
```

That 40% cap line, written by Dan in February, looks arbitrary without
context — but the comment on the line above it, from Priya back in
November, points straight at the actual reason (`JIRA-2291`, a legal
review). "Blame" is a misleading name here: the output isn't about
fault, it's the fastest path to the commit message, PR, or linked
ticket that explains a decision you don't have the context for.

## Reading the full commit, not just the hash

A blamed line gives you a commit hash — the next step is almost always
`git show` on it, to read the full commit message and diff:

```
$ git show a3f91c2e
commit a3f91c2e4d8b2f1a9c0e5d7f3b8a1c6e9d2f4a7b
Author: Priya Shah <priya@company.com>
Date:   Sun Nov 2 14:22:10 2025 -0500

    Cap discount at 40% per legal review (JIRA-2291)

    Legal flagged uncapped discounts as a contract risk during
    the Q4 promo audit. 40% matches the ceiling approved in the
    review doc linked on the ticket.

diff --git a/src/pricing.py b/src/pricing.py
...
```

This is why a good commit message (Lesson 3 territory) matters months
later — `git blame` finds the commit, but the commit message is what
actually answers "why."

## Searching history for when something appeared — or disappeared

Sometimes you're not looking at a current line, you're looking for
when a specific piece of code was introduced or removed entirely.
`git log -S` (the "pickaxe") searches every commit's diff for a
string, not just commit messages:

```
$ git log -S "MAX_RETRIES" --oneline
e4c8a91 Lower retry ceiling after incident review
b2f0d73 Add exponential backoff with configurable retry limit
```

That finds every commit that added or removed the string
`MAX_RETRIES` — including the one that deleted it, which `git blame`
on the current file can never show you, since the line no longer
exists to blame. `git log -p <file>` is the blunter version: it walks
the entire diff history of one file, commit by commit, useful when you
need the full story rather than a targeted search.

## A practical history-reading workflow

1. `git blame <file>` to find the commit that touched the line you
   care about.
2. `git show <hash>` to read the full commit message and diff.
3. If the message references a ticket or PR, go read that for the
   full discussion.
4. If you're hunting for when something was added or removed instead
   of looking at a current line, `git log -S "<term>"` instead of
   starting from blame.

## Key terms

| Term | Meaning |
|---|---|
| `git blame <file>` | Annotates each line of a file with the commit, author, and date that last changed it |
| `git show <hash>` | Displays the full commit message and diff for a specific commit |
| `git log -S "<string>"` | Searches every commit's diff for one that added or removed a given string (the "pickaxe") |
| `git log -p <file>` | Walks the full diff history of one file, commit by commit |

## Lab

1. In a repository with real history (your own, or a cloned
   open-source project), run `git blame` on a file you didn't write
   and find a line whose reasoning surprises you.
2. Run `git show` on that line's commit hash and read the full
   message.
3. Pick a function or constant name you suspect was renamed at some
   point, and use `git log -S` to find when.

## Check yourself

You're ready for Lesson 15 when you can take any single line in an
unfamiliar file and trace it back to the commit, author, and reasoning
behind it, using blame and show together — not just blame alone.
