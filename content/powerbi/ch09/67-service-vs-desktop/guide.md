# Lesson 67 — Power BI Service vs. Desktop

**Chapter 9 · Power BI Service & Fabric · Lesson 1 of 8**

## What you'll learn

- What Power BI Desktop and the Power BI service each actually do
- Why you can't create a workspace from inside Desktop
- The five core service concepts: workspace, semantic model, report,
  dashboard, and app
- Where every one of your last eight chapters' work is about to move

## Two halves of one product

Every lesson so far has happened inside **Power BI Desktop** — the
Windows application you installed back in Chapter 1. Desktop is where
you connect to data, clean it in Power Query, build the model, write
DAX, and design report pages. It's a local authoring tool.

The **Power BI service** is the other half: a website
(`app.powerbi.com`), not a program you install. It's where finished
work goes to be stored, refreshed on a schedule, and shared with
people who never open Desktop at all. You've used it once already —
Chapter 2, Lesson 9's SQL Server connector setup touched the service's
gateway concept in passing — but starting with this chapter, it's the
main subject.

![Screenshot of the Power BI Desktop Home ribbon with the Publish button highlighted.](/courses/power-bi/ch09/67-service-vs-desktop/pbid_publish_publishbutton.png)
*Desktop's job ends at this button — everything after belongs to the service.*

## What moves, and what doesn't

Publishing a `.pbix` file sends two things to the service: the
**semantic model** (your tables, relationships, and DAX measures) and
any **reports** you built in Report view. What *doesn't* come along:
the underlying Power Query steps stay editable only in Desktop, and any
changes made to a report inside the service are never written back to
your original `.pbix` file. The two copies diverge the moment you
publish.

![Screenshot of a Power BI service workspace listing a dashboard, report, workbook, and dataset for a sample project.](/courses/power-bi/ch09/67-service-vs-desktop/power-bi-new-workspaces.png)
*A workspace in the service — the destination every "Publish" click has been heading toward.*

## The five concepts this chapter builds on

| Term | What it is |
|---|---|
| Workspace | A collaborative area in the service where a team's reports, semantic models, and dashboards live together |
| Semantic model | The published version of your data model — tables, relationships, measures — that reports are built from |
| Report | One or more pages of visuals based on a single semantic model (what you've been building in Desktop's Report view) |
| Dashboard | A single-page canvas of tiles pinned from one or more reports — a service-only feature, not available in Desktop |
| App | A packaged bundle of reports, dashboards, and semantic models, published for a broad audience to consume |

Every lesson left in this chapter is one of these five ideas in depth.

## Why you can't build a workspace in Desktop

Desktop has no workspace-creation screen anywhere in its interface —
by design. Workspaces, along with the permissions and roles that
control who can see what inside them, exist only in the browser. When
you publish from Desktop, the destination workspace has to already
exist; Desktop can put a report *into* a workspace you already have
access to, but it never creates one. Lesson 69 covers creating and
configuring a workspace from the service side.

## Key terms

| Term | Meaning |
|---|---|
| Power BI Desktop | The Windows authoring application for connecting, modeling, and building reports |
| Power BI service | The browser-based platform (`app.powerbi.com`) for storing, refreshing, and sharing published content |
| Designer / creator | A service user who builds and publishes content |
| Consumer / end user | A service user who views and interacts with content others published |

## Lab

1. Open a report you built earlier in this course against
   `AdventureWorksDW2014` (any lesson from Chapter 7 or 8 works).
2. In Desktop, go to **File → Publish → Publish to Power BI** — don't
   finish the dialog yet, just note which workspace it defaults to.
3. Write down, in your own words, which parts of that report exist
   only in the `.pbix` file on your machine right now, and which parts
   are about to become a shared, service-hosted semantic model the
   moment you click through.

## Check yourself

You're ready for Lesson 68 when you can explain, without looking back
at this page, why a change made to a report inside the Power BI
service never updates your original Desktop file.
