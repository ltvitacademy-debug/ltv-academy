# Lesson 8 — Merge Conflicts

**Chapter 2 · Collaboration · Lesson 8 of 17**

## What you'll learn

- Exactly why Git can't auto-resolve certain changes, and what triggers a conflict
- How to read Git's conflict markers in a file
- The step-by-step process for resolving a conflict and completing the merge
- How to safely back out of a conflicted merge if it's too messy to resolve right now

## Why conflicts happen

Lesson 5 showed that Git can automatically combine changes from two diverged branches, as long as those changes don't touch the same lines. A **merge conflict** happens specifically when both branches changed the same lines of the same file in different ways — Git has no way to know which version you actually want, so it stops and asks you to decide.

```bash
git switch main
git merge feature-duplicate-check
# Auto-merging AccountTriggerHandler.cls
# CONFLICT (content): Merge conflict in AccountTriggerHandler.cls
# Automatic merge failed; fix conflicts and then commit the result.
```

At this point the merge is paused, not failed-and-abandoned. Git has already merged everything it could figure out automatically; the conflicting file is left with both versions marked inside it for you to sort out by hand.

## Reading conflict markers

Open the conflicted file, and you'll see something like this:

```
<<<<<<< HEAD
    if (acct.AnnualRevenue > 1000000) {
        acct.Tier__c = 'Enterprise';
    }
=======
    if (acct.AnnualRevenue >= 500000) {
        acct.Tier__c = 'Mid-Market';
    }
>>>>>>> feature-duplicate-check
```

- Everything between `<<<<<<< HEAD` and `=======` is **your current branch's version** (here, `main`).
- Everything between `=======` and `>>>>>>> feature-duplicate-check` is **the incoming branch's version**.
- The labels after `<<<<<<<` and `>>>>>>>` tell you exactly which branch each side came from.

## Resolving it

Resolving a conflict means editing the file down to what it *should* actually say — removing the marker lines entirely, and keeping, combining, or rewriting the two versions as the correct outcome requires:

```
    if (acct.AnnualRevenue > 1000000) {
        acct.Tier__c = 'Enterprise';
    } else if (acct.AnnualRevenue >= 500000) {
        acct.Tier__c = 'Mid-Market';
    }
```

Once every conflict marker is gone and the file reads correctly, stage it and complete the merge like any other commit:

```bash
git add AccountTriggerHandler.cls
git status
# All conflicts fixed but you are still merging.
git commit
```

Notice there's no `-m` message required here — Git pre-fills a sensible merge commit message, though you can edit it to note how the conflict was resolved if that's useful context for later readers.

## Checking for more than one conflicted file

A single merge can produce conflicts in several files at once. `git status` during a conflicted merge lists every file still needing attention under "Unmerged paths" — resolve and `git add` each one before committing:

```bash
git status
# Unmerged paths:
#   both modified:   AccountTriggerHandler.cls
#   both modified:   AccountTriggerHandlerTest.cls
```

## Backing out safely

If a conflict turns out to be bigger than you want to deal with right now — or you realize you merged the wrong branch — you can abandon the whole in-progress merge and return to exactly where you were before it started:

```bash
git merge --abort
```

This is completely safe: nothing is lost, because nothing was committed yet. It's the right move whenever you'd rather regroup (talk to the other branch's author, re-read the requirements) than resolve a conflict under time pressure.

## Key terms

| Term | Meaning |
|---|---|
| Merge conflict | What happens when both branches changed the same lines of the same file differently |
| Conflict markers | `<<<<<<<`, `=======`, `>>>>>>>` — the lines Git inserts to show both versions |
| Unmerged paths | Files still containing unresolved conflict markers during a paused merge |
| `git merge --abort` | Cancels an in-progress conflicted merge and restores the pre-merge state |

## Lab

In `trigger-practice`, deliberately create a conflict: on `main`, change the first line of `notes.txt` to `"Version A"` and commit. Switch to `experiment`, change the same first line to `"Version B"` and commit. Switch back to `main` and run `git merge experiment` — Git should report a conflict. Open the file, examine the conflict markers, resolve it by choosing (or combining) a final version, then `git add` and `git commit` to complete the merge. As a second pass, repeat the setup and this time run `git merge --abort` instead of resolving it, and confirm `notes.txt` is back to just your `main` version.

## Check yourself

Can you explain exactly what triggers a merge conflict, as opposed to a change Git can combine automatically? If you opened a conflicted file and saw `<<<<<<< HEAD`, would you know which branch's version that section represents?
