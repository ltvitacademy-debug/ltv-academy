# Lesson 11 — GitHub Issues & Project Boards

**Chapter 2 · GitHub Essentials · Lesson 11 of 25**

## What you'll learn

- Opening an issue to track work that isn't a code change yet — a data
  quality problem, a requested new metric, a broken dashboard
- Labels, for filtering issues by type or priority at a glance
- Project boards — arranging issues into columns like To Do, In
  Progress, and Done
- Why "just Slack me when it's done" doesn't scale past a couple of
  people

## Issues: tracking work before there's a diff

Not every piece of work starts as a code change. "The revenue
dashboard undercounts refunds," "add a `customer_lifetime_value`
column to the mart," "investigate why yesterday's load ran twice" —
none of these have a diff yet. A GitHub **issue** is where that work
lives before it does:

![GitHub's 'Create new issue' form: a repository picker, a title field, quick-add chips for Assignee, Labels, Projects, and Milestone, and a Markdown body editor.](/courses/git-cicd/ch02/11-github-issues-and-projects/issue-create-form.png)
*Everything an issue needs up front — who it's for, what it's tagged, which project it belongs to — sits right above the description.*
Source: [GitHub Docs — Creating an issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/creating-an-issue)

An issue can turn into a pull request later (a code fix), or it might
never need one at all (a question answered in the comments, a
decision recorded and closed).

## Labels: filtering at a glance

A repository accumulates dozens of open issues fast. **Labels** are
how you filter them without reading every title — `bug`,
`data-quality`, `needs-triage`, `p0`:

![A GitHub Issues list with a 'Labels' button in the toolbar, showing a count of 7 labels defined on the repository.](/courses/git-cicd/ch02/11-github-issues-and-projects/issues-labels-button.png)
*Click Labels to filter the list down to exactly the category you care about — or to manage which labels exist on the repo at all.*
Source: [GitHub Docs — Managing labels](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/managing-labels)

A useful label set for a data team is small and specific:
`data-quality`, `new-metric`, `pipeline-failure`, `dashboard-bug` —
labels people actually use consistently beat a large taxonomy nobody
remembers.

## Project boards: work as columns

A **project** (GitHub's board view) arranges issues and pull requests
into columns — typically something like Backlog, In Progress, In
Review, Done:

![A GitHub Projects board view with issues represented as cards, arranged into status columns.](/courses/git-cicd/ch02/11-github-issues-and-projects/example-board.png)
*Dragging a card between columns updates its status — a live view of what's actually being worked on, not a spreadsheet someone forgets to update.*
Source: [GitHub Docs — Changing the layout of a view](https://docs.github.com/en/issues/planning-and-tracking-with-projects/customizing-views-in-your-project/changing-the-layout-of-a-view)

## Why this beats "just Slack me when it's done"

Ad hoc coordination works until it doesn't — usually right around the
point a team hits three or four people. Issues and boards fix the
specific failure modes that show up then: work that only exists in
someone's memory, no record of why a decision was made, and no way to
see, at a glance, what's actually in progress versus just talked
about.

## Key terms

| Term | Meaning |
|---|---|
| Issue | A tracked unit of work — a bug, request, or question — that may or may not become a pull request |
| Label | A tag on an issue used to filter and categorize (`bug`, `data-quality`, `p0`) |
| Project (board) | A column-based view of issues and PRs, showing status at a glance |
| Milestone | A deadline or release grouping issues toward a shared target |

## Lab

1. Open a real issue on one of your repositories describing an actual
   piece of data work — a metric to add, a quality problem to fix.
2. Create and apply at least one label that isn't GitHub's default
   `bug`/`enhancement` set — something specific to data work.
3. Add the issue to a project board and move it across at least two
   columns as you make progress.

## Check yourself

You're ready for Lesson 12 when you can explain what an issue is for
that a pull request isn't, and describe how a label and a project
column serve different purposes.
