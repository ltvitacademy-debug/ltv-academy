# Lesson 9 — Pull Requests

**Chapter 2 · GitHub Essentials · Lesson 9 of 22**

## What you'll learn

- What a pull request actually is, and why it exists as a separate step from merging
- Opening a pull request from a pushed branch
- Reading a PR's tabs: Conversation, Commits, Checks, Files changed
- Why small, focused pull requests are easier for everyone

## What a pull request is

A **pull request** (PR) is a request to merge one branch into another —
most often a feature branch into `main` — that opens a space for
discussion, automated checks, and review (Lesson 10) *before* the merge
actually happens. It's not a Git concept at all; `git merge` doesn't need a
pull request. It's a GitHub feature built around Git, specifically to put a
checkpoint before code lands in a shared branch.

## Opening one

After pushing a branch (Lesson 8), GitHub's branch switcher on the
repository's main page lets you find and select it:

![GitHub's branch dropdown with a typed branch name, listing matching branches and an option to create a new one.](/courses/git-github-swe/ch02/09-pull-requests/branch-dropdown.png)

Once you've pushed a branch with commits ahead of `main`, GitHub shows a
banner on the repository offering to open the comparison directly:

![GitHub banner showing a recently pushed branch with a "Compare & pull request" button.](/courses/git-github-swe/ch02/09-pull-requests/pull-request-compare-pull-request.png)

From there you pick the base branch (what you're merging *into*, usually
`main`) and the compare branch (your work), write a title and description
explaining *what* changed and *why*, and open the PR.

## Reading a pull request

Every PR has the same set of tabs:

![An open pull request's tab bar, with Conversation, Commits, Checks, and Files changed tabs, the Files changed tab outlined.](/courses/git-github-swe/ch02/09-pull-requests/pull-request-tabs-changed-files.png)

- **Conversation** — the description, plus every comment and review
- **Commits** — every commit included in this PR, individually
- **Checks** — automated tests/builds running against this branch (Chapter
  4 covers setting these up)
- **Files changed** — the actual diff, where code review (Lesson 10)
  happens

## Why small PRs are better PRs

A pull request with 40 files changed across six unrelated concerns is
genuinely hard to review well — reviewers either rubber-stamp it or spend
hours on it. A PR focused on one coherent change is faster to review,
faster to merge, and far easier to revert cleanly if something's wrong with
it. This is the same discipline Lesson 3's staging area taught at the
commit level, now applied at the PR level.

## Key terms

| Term | Meaning |
|---|---|
| Pull request (PR) | A request to merge one branch into another, with review built in |
| Base branch | The branch being merged into (usually `main`) |
| Compare branch | The branch containing your proposed changes |
| Files changed tab | Where the actual code diff — and code review — happens |

## Check yourself

You're ready for Lesson 10 when you can push a branch, open a pull request
against `main` with a clear title and description, and point to exactly
where its diff lives.
