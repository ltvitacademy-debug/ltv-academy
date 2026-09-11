# Lesson 3 — Report Builder vs. SSDT/Visual Studio

**Chapter 1 · SSRS Fundamentals · Lesson 3 of 40**

## What you'll learn

- What Report Builder is, who it's built for, and what its authoring
  experience actually looks like
- What SSDT (Report Designer) is, and why it's structured around
  projects and solutions instead of individual files
- What both tools actually produce underneath, and why that matters
- A practical rule of thumb for which one to reach for

## Same RDL, two very different front doors

Here's the thing to hold onto through this whole lesson: **Report
Builder and SSDT's Report Designer build the exact same kind of
file** — an RDL report definition. Neither tool is "the real one."
They're two different front doors onto the same underlying format,
built for two different working styles.

## Report Builder: stand-alone, Office-like, fast to start

**Report Builder** is a stand-alone application — you don't need
Visual Studio or any project at all to use it. You can launch it
straight from the web portal's **New > Paginated Report** menu, and
it opens with an Office-like ribbon interface built for business
users and IT professionals who want to create or tweak a report
quickly, without a project-based workflow getting in the way.

![A Report Builder-authored paginated report: a matrix with sparklines and a summary chart, alongside a map of sales by state.](/courses/ssrs/ch01/03-report-builder-vs-ssdt/report-builder-getting-started.png)
*A sample Report Builder report — matrix, sparklines, chart, and a spatial map, all in one authoring surface.*

Report Builder can deploy a finished report to a native-mode or
SharePoint-integrated report server, *or* publish it straight to the
Power BI service. It also includes wizards for tables, matrices,
charts, and maps that walk you through picking a data source,
dragging in fields, and choosing a layout — genuinely quick for a
one-off report or an update to an existing one. One limitation worth
knowing early: in Report Builder, you can't *create* a shared data
source from scratch — you can only browse to and select one that
already exists on the report server.

## SSDT: Visual Studio, projects, and repeatable deployment

**SSDT (SQL Server Data Tools)** is a Visual Studio environment, and
its **Report Designer** is the authoring tool inside it. Where Report
Builder is one report at a time, SSDT is organized around a **Report
Server Project** — a container that holds every report, shared data
source, and shared dataset you're working on, all visible together in
Visual Studio's **Solution Explorer**.

![The Report Designer design surface inside Visual Studio, showing the Design and Preview tabs on an open report file.](/courses/ssrs/ch01/03-report-builder-vs-ssdt/ssdt-report-designer.png)
*Report Designer's Design and Preview tabs — the same two views you'll live in for most of this course.*

That project structure buys you things Report Builder doesn't have:
source control integration, a **Configuration Manager** for switching
between named sets of deployment properties (so "Debug" can point at
a test server while "Release" points at production), and — unlike
Report Builder — the ability to *create* new shared data sources as
project files, not just browse to existing ones.

## When to reach for each

| Situation | Reach for |
|---|---|
| Quick one-off report, or tweaking someone else's report | Report Builder |
| No Visual Studio installed, want to start from the web portal | Report Builder |
| Building many reports as a team, need version control | SSDT |
| Need repeatable deployment across test/production servers | SSDT |
| Need to publish straight to the Power BI service | Report Builder |
| Creating brand-new shared data sources as reusable project files | SSDT |

This course will use SSDT for most of the hands-on work, precisely
because a project-based, version-controlled workflow is what you'll
actually be doing on the job — but everything you learn about
building reports transfers directly to Report Builder too, since
they're editing the same RDL underneath.

## Key terms

| Term | Meaning |
|---|---|
| Report Builder | Stand-alone, Office-like report authoring app; no project required |
| SSDT (SQL Server Data Tools) | The Visual Studio environment that hosts Report Designer |
| Report Designer | The report authoring tool inside SSDT |
| Report Server Project | A Visual Studio project that holds reports, shared data sources, and datasets together |
| Configuration Manager | The Visual Studio feature for switching between named deployment property sets (Debug/Release) |

## Lab

1. If you have Report Builder installed (or can launch it from a web
   portal's **New** menu), open it and note the ribbon-based, Office-
   like interface — no Solution Explorer, no project.
2. If you have SSDT installed, open (or create) a Report Server
   Project and note the Solution Explorer pane listing Shared Data
   Sources, Shared Datasets, and Reports as separate folders.

## Check yourself

You're ready for Lesson 4 when you can explain, without looking: what
do Report Builder and SSDT's Report Designer both ultimately produce,
and what's the real difference between them — is it the report
format, or the working style around it?
