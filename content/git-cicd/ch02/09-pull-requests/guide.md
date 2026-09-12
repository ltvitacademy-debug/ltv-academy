# Lesson 9 — Pull Requests

**Chapter 2 · GitHub Essentials · Lesson 9 of 25**

## What you'll learn

- What a pull request actually is — a proposal to merge one branch into
  another, with a place for discussion attached
- Opening a pull request from a branch you've already pushed
- Why teams require pull requests even for their own solo projects
- The difference between a pull request and the underlying `git merge`
  it eventually runs

## A pull request is a proposal, not a merge

Chapter 1 covered branches and merging entirely on your own machine —
`git merge` runs locally, instantly, with no review step. A **pull
request** (PR) is GitHub's layer on top of that: it's a request to
merge one branch into another, opened *before* the merge happens, with
a place attached for comments, suggested changes, and CI results to
show up before anyone approves it.

After you push a new branch, GitHub notices and offers to open one for
you directly:

![A yellow GitHub banner reading "octo-repo had recent pushes less than a minute ago" with a green "Compare & pull request" button.](/courses/git-cicd/ch02/09-pull-requests/pull-request-compare-pull-request.png)
*GitHub shows this banner on the repository page right after a push — click it instead of hunting through menus for "new pull request."*
Source: [GitHub Docs — Creating a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)

## Choosing the branches being compared

Opening a PR means telling GitHub two branches: the one with your new
commits, and the one you want them merged into (almost always `main`).
GitHub's branch switcher handles both sides of that comparison:

![GitHub's branch/tag switcher dropdown, showing a search box and a list of matching branches, plus an option to create a new branch.](/courses/git-cicd/ch02/09-pull-requests/branch-dropdown.png)
*The same dropdown UI you'd use to switch branches while browsing a repo — a pull request just uses it twice, once for each side of the comparison.*
Source: [GitHub Docs — Creating a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)

## Why bother, even solo

It's tempting to think pull requests are only useful when a teammate
needs to review your work. Two reasons they're worth it even alone on
a project:

- **A PR is a checkpoint.** Anything wired into CI (covered starting
  Chapter 4) runs automatically on a pull request — tests, linting,
  a dbt build — before the change ever reaches `main`. Merging
  directly with `git merge` skips all of that.
- **A PR is a permanent record.** The description, the diff, and every
  comment stay attached to that change forever, searchable later when
  you're trying to remember why a model changed the way it did six
  months ago.

## Key terms

| Term | Meaning |
|---|---|
| Pull request (PR) | A request to merge one branch into another, opened before the merge, with discussion attached |
| Base branch | The branch being merged *into* — almost always `main` |
| Compare branch (head branch) | The branch with the new commits, being merged *from* |
| "Compare & pull request" | The shortcut GitHub offers right after a push to a new branch |

## Lab

1. Push a branch with at least one commit that isn't on `main` yet.
2. On GitHub, either click the "Compare & pull request" banner or open
   a PR manually, and confirm the base and compare branches are the
   ones you intend.
3. Write a real PR description — what changed and why — before
   opening it. Even alone, get in the habit now.

## Check yourself

You're ready for Lesson 10 when you can explain what a pull request
adds on top of a plain `git merge` — and why that matters even when
you're the only one reviewing it.
