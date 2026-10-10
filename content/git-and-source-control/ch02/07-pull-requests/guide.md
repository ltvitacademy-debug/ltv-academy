# Lesson 7 — Pull Requests

**Chapter 2 · Collaboration · Lesson 7 of 17**

## What you'll learn

- What a pull request actually is — and isn't — relative to a plain `git merge`
- The lifecycle a pull request goes through, from opening to merging
- How to write a pull request description that helps a reviewer actually review
- The three merge options GitHub offers, and how they affect history differently

## A pull request is not a Git feature

This is worth saying plainly: **pull requests are not part of Git.** You won't find a `git pull-request` command, because there isn't one. A pull request (PR) — called a "merge request" on GitLab — is a feature of the hosting platform (GitHub, GitLab, Bitbucket) built *around* Git. What a PR actually does is propose that one branch's commits be merged into another, and give a team a structured place to discuss, review, run automated checks against, and ultimately approve that proposal before the merge happens.

Mechanically, nothing about a PR changes what you learned in Lessons 4–6: you still create a branch, commit to it, and push it to a remote. The PR is the layer on top that turns "I pushed a branch" into "here is a specific, reviewable change request."

## The lifecycle of a pull request

1. **Push a branch** with your finished (or in-progress) work, as in Lesson 6.
2. **Open a pull request** on GitHub, selecting your branch as the source and typically `main` (or a release branch) as the target.
3. **Automated checks run** — test suites, linters, Salesforce deployment validations — against the proposed merge, often before a human even looks at it.
4. **Reviewers comment, request changes, or approve.** This is Lesson 9's focus in depth.
5. **The author pushes more commits** addressing feedback; the PR updates automatically — there's no separate "resubmit" step.
6. **Once approved and passing checks, the PR is merged** into the target branch, and the source branch is typically deleted.

## Writing a PR description that's actually useful

A PR titled "fixes" with an empty description forces every reviewer to reverse-engineer what you were trying to do by reading the diff cold. A good PR description answers three questions up front: *what* changed, *why* it changed, and *how to verify it*. For a Salesforce-flavored example:

```
## What
Adds a duplicate-check to AccountTriggerHandler.beforeInsert so two
Accounts with the same Tax ID can't both be created.

## Why
Support ticket #4821 — three duplicate Accounts created in production
last week, causing downstream billing errors.

## How to verify
1. Deploy to a scratch org
2. Create an Account with Tax ID "12-3456789"
3. Try to create a second Account with the same Tax ID — expect a
   validation error instead of a second record
```

This isn't bureaucracy for its own sake — a reviewer who knows *why* a change exists can actually judge whether it solves the right problem, not just whether the code compiles.

## The three ways a PR can merge

GitHub offers three distinct merge strategies when a PR is approved, and they affect `main`'s history differently:

| Strategy | What it does to history |
|---|---|
| **Merge commit** | Standard three-way merge (Lesson 5) — keeps every individual commit from the branch, plus a new merge commit |
| **Squash and merge** | Combines every commit on the branch into a single new commit on the target branch, discarding the branch's individual commit history |
| **Rebase and merge** | Replays the branch's commits one by one onto the tip of the target branch, with no merge commit at all |

Squash-and-merge is popular specifically because feature branches often accumulate messy, incremental commits ("wip", "fix typo", "actually fix it") that aren't worth preserving individually in `main`'s permanent history — squashing collapses all of that into one clean commit representing the whole feature. Teams should pick one strategy and apply it consistently; mixing all three unpredictably makes history hard to read.

## Key terms

| Term | Meaning |
|---|---|
| Pull request (PR) | A hosting-platform feature proposing that one branch be merged into another, with review built in |
| Merge request | GitLab's name for the same concept as a pull request |
| Merge commit (PR strategy) | Preserves every individual commit from the branch plus a merge commit |
| Squash and merge | Combines all of a branch's commits into one commit on the target branch |
| Rebase and merge | Replays a branch's commits onto the target branch with no merge commit |

## Lab

Using the GitHub repository from Lesson 6's lab (or a new one if you skipped that lab — write this out as a plan if you have no GitHub account), open a pull request from your `add-readme` branch into `main`. Write a full PR description following the What/Why/How-to-verify structure above, even for a trivial change. Then look at GitHub's merge button on the PR page and identify which of the three merge strategies is selected by default for that repository.

## Check yourself

Can you explain to someone why "pull request" is a GitHub/GitLab feature and not a Git command? Can you describe, in your own words, the difference in main's resulting history between a squash-and-merge and a standard merge commit?
