# Kanban Boards & Work Management

Whether a team runs Scrum sprints or something looser, almost every IT team tracks its actual work
on a Kanban-style board. This lesson is about reading one correctly — what a card really
represents, why columns have limits, and the real tools you'll meet it in on the job.

## What you'll learn

- How to read a Kanban board's columns and cards
- Why work-in-progress (WIP) limits exist
- The real tools this shows up in: Jira, Azure DevOps Boards, Trello, GitHub Projects

![A Kanban board with five columns — Backlog, To Do, In Progress, Review, Done — each holding task cards like "Build SQL view," "Power BI model," and "Approved report," visualizing where every piece of work currently stands.](/courses/how-it-teams-work/ch01/03-kanban-boards-and-work-management/kanban-board.png)

## Columns are status, cards are work

Each column on a Kanban board represents one status a piece of work passes through — Backlog, To
Do, In Progress, Review, Done, or whatever stages a given team has defined. Each card represents
one discrete piece of work — a ticket, a user story, a bug — and it has an owner, a short
description, and usually a priority or tag. As work advances, the card physically moves one
column to the right. A board is a live picture of where everything stands, which is exactly why a
manager or teammate can glance at it instead of asking "where are we on this?" in a meeting.

## Tickets, ownership, and blockers

Every card should have exactly one owner at a time — the person actually doing that piece of work
right now. A card sitting in "In Progress" with no clear owner, or with an owner who's blocked on
something outside their control, is a signal the team needs to look at, not just background noise.
Teams usually flag a blocked card visually — a red marker, a "Blocked" tag — so it's obvious at a
glance which cards need help rather than just time.

## Why work-in-progress limits exist

A Kanban column often has a **WIP limit** — a cap on how many cards can sit in that column at
once. That might look strange at first: wouldn't a team get more done by starting more things in
parallel? In practice, the opposite tends to happen. A developer with five things "in progress"
simultaneously is really context-switching between five half-finished tasks, which is slower
overall than finishing one before starting the next. A WIP limit forces the team to actually
finish work before pulling in more, which is what moves cards all the way to Done — not just
starts them.

## Where you'll actually see this

Kanban-style boards aren't one specific product — they're a pattern that shows up across several
real tools you'll use on the job:

![Where Kanban boards show up in real tools: Jira, the most common board in software and data teams; Azure DevOps Boards, tightly integrated with Azure repos and pipelines; Trello, lightweight boards for smaller teams; GitHub Projects, boards linked directly to issues and pull requests.](/courses/how-it-teams-work/ch01/03-kanban-boards-and-work-management/kanban-tools.png)

Which tool you meet depends entirely on where you land — a Microsoft-heavy shop is likely to use
Azure DevOps Boards since it's wired directly into the same repos and pipelines you'll already be
working in; a mixed-stack shop is more likely to use Jira. The columns, cards, and WIP limits work
the same way regardless of which product's logo is on the screen.

## Key terms

| Term | Meaning |
|---|---|
| Kanban board | A visual board of columns (statuses) and cards (work items) showing where every task stands |
| WIP limit | A cap on how many cards can be in one column at a time, forcing finishing over starting |
| Blocked | A card's status when it can't move forward due to something outside the owner's control |
| Card ownership | Every active card should have exactly one person responsible for it at a time |

## Check yourself

Why would limiting how many cards a team can have "In Progress" at once actually help the team
finish more work, not less?
