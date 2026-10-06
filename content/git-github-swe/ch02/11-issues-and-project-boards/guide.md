# Lesson 11 — Issues & Project Boards

**Chapter 2 · GitHub Essentials · Lesson 11 of 22**

## What you'll learn

- What GitHub Issues are for, and how they differ from a pull request
- Creating an issue, and what makes one actually useful
- Project boards: organizing issues (and PRs) visually
- Linking an issue to the pull request that resolves it

## What Issues are for

A **pull request** proposes a specific code change. An **Issue** is
GitHub's lightweight tracker for everything that comes *before* that: a
bug report, a feature request, a task, a question. Every repository has an
**Issues** tab right next to Pull requests:

![A GitHub repository's tab bar, with the Issues tab outlined, showing a count of open issues.](/courses/git-github-swe/ch02/11-issues-and-project-boards/repo-tabs-issues-global-nav-update.png)

## Creating an issue

A new issue is a title, a description, and optional metadata — assignee,
labels, a project, a milestone:

![GitHub's "Create new issue" dialog, with fields for repository, title, description, and metadata like assignee and labels.](/courses/git-github-swe/ch02/11-issues-and-project-boards/issue-create-form.png)

A genuinely useful issue is specific: for a bug, what you expected versus
what actually happened, and how to reproduce it; for a feature, what
problem it solves and for whom. "It's broken" helps nobody — not even
future-you, reopening it in three weeks.

## Project boards

A single list of issues gets unwieldy fast. **Projects** give you a visual
board — typically columns like *Backlog*, *In Progress*, *Done* — built
from your issues and pull requests:

![GitHub's repository tab bar with the Projects tab highlighted, where project boards are managed.](/courses/git-github-swe/ch02/11-issues-and-project-boards/tab-projects.png)

Adding an item to a board view is as direct as typing in a row:

![The bottom row of a GitHub project's table view, with the "Add item" field highlighted.](/courses/git-github-swe/ch02/11-issues-and-project-boards/add-item.png)

Project boards work the same way whether the team is three people or
three hundred — a shared, visual answer to "what's actually in progress
right now," without anyone needing to ask in chat.

## Linking issues and pull requests

Writing a phrase like `Closes #42` or `Fixes #42` in a pull request's
description links it to that issue — and merging the PR automatically
closes the issue. This is the connective tissue between "here's the
problem" (the issue) and "here's the fix" (the PR), and it's how a
project board's "Done" column tends to fill itself in as work actually
ships.

## Key terms

| Term | Meaning |
|---|---|
| Issue | GitHub's tracker for a bug, feature request, or task |
| Project (board) | A visual, column-based view built from issues and PRs |
| `Closes #42` | Links a PR to an issue; merging the PR auto-closes it |
| Label | A tag on an issue (e.g. `bug`, `enhancement`) for filtering and organization |

## Check yourself

You've completed Chapter 2 when you can create a clear, specific issue,
add it to a project board, and open a pull request that references it
with `Closes #<number>`.
