# Lesson 91 — Publish to Power BI Service

**Chapter 12 · Capstone Project · Lesson 8 of 10**

## What you'll learn

- Creating a dedicated workspace for this capstone
- Publishing, and confirming what actually made the trip
- Building a simple dashboard on top of the published report
- Packaging the whole thing into an app, end to end

## A workspace for this project alone

Following Lesson 69, create a new workspace — something like
`Adventure Works Sales Capstone` — rather than reusing a workspace
from an earlier chapter's lab. A dedicated workspace keeps this
project's permissions, refresh schedule, and app cleanly separate
from everything else you've built in this course.

## Publishing

From Desktop: **File → Publish → Publish to Power BI**, selecting
your new workspace. Following Lesson 70's mechanics, this sends your
semantic model — nine tables, every relationship, every measure from
Lesson 88 — and your three report pages (plus the hidden drillthrough
page) as one unit.

Once published, open the report in the service and confirm all four
pages render correctly, with every visual populated — this is the
same verification discipline every lesson in this course has used
before calling a build "done."

## Building a dashboard on top

Recall Lesson 74: a dashboard is a single-page canvas of tiles pinned
from reports. Pin:

- The headline `Total Sales` card from Page 1
- The `Gross Margin %` bar chart from Page 2
- The reseller fulfillment gauge from Page 3

This gives the VP a genuine at-a-glance view, with every tile linking
back to its full report page for anyone who wants the detail behind
it — exactly the dashboard-to-report relationship Lesson 74 diagrammed.

## Packaging it as an app

Following Lesson 73's three-tab flow:

1. **Setup**: name it `Adventure Works Sales Capstone`, add a short
   description.
2. **Content**: add the report and the dashboard you just built.
3. **Audience**: create one audience — everyone who'd realistically
   need this — and publish.

## What this lesson deliberately doesn't cover yet

Sharing specific access and configuring refresh come next, in Lesson
92 — publishing the app doesn't yet mean the right people can see it,
or that it'll stay current once real data changes. Those are
separate, deliberate steps, not automatic side effects of publishing.

## Key terms

| Term | Meaning |
|---|---|
| Workspace (dedicated) | A workspace created specifically for one project, not shared with unrelated work |
| App audience | The group of users who see a specific version of a published app |

## Lab

1. Create a new workspace for this capstone and publish your report
   into it.
2. Build a dashboard pinning the three tiles listed above.
3. Package the report and dashboard into an app with one audience,
   and publish it.

## Check yourself

You're ready for Lesson 92 when your app is published and you can
explain why sharing access and configuring refresh are still separate
steps — not something publishing already handled for you.
