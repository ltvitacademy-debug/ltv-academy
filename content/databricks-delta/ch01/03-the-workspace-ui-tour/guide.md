# Lesson 3 — The Workspace UI Tour

**Chapter 1 · Databricks Fundamentals · Lesson 3 of 57**

## What you'll learn

- The sidebar's core sections: Workspace, Compute, Jobs & Pipelines, Catalog, SQL
- Where notebooks actually live — the Workspace file browser
- The difference between "your" folder and a shared folder
- Where this course's later chapters live in this same UI

## The sidebar — the whole platform, one panel

Every Databricks feature in this course is reachable from the left
sidebar:

| Section | What it's for | Covered in |
|---|---|---|
| **Workspace** | Browsing/organizing notebooks, files, folders | This lesson |
| **Compute** | Creating and managing clusters | Lesson 4 |
| **Jobs & Pipelines** | Scheduled runs, Lakeflow pipelines | Lesson 11, Ch5 |
| **Catalog** | Unity Catalog — catalogs, schemas, tables | Chapter 4 |
| **SQL** | SQL editor and dashboards, outside the scope of this course |

Almost the entire rest of this course is really just a tour of what
each of these sections does, in depth.

## The Workspace file browser

Clicking **Workspace** opens a file browser very close to what
you'd expect from any cloud storage UI — folders, files, a "New"
button. Two folders matter most starting out:

- **Home** (your personal folder, `/Users/you@company.com/`) — notebooks only you can see by default.
- **Shared** — visible to everyone in the workspace, the natural home for anything a team works on together.

Notebooks (Lesson 6) live here as regular files, browsable and
organizable exactly like any other folder structure — nothing about
notebook storage is exotic.

## Personal vs. shared — a real decision, early

Where you save a first notebook matters less for practice, but in a
real team workspace, defaulting everything to your personal Home
folder means nobody else can find or reuse it. This course's
convention: exploratory/practice notebooks in Home, anything meant
to be reused or reviewed in Shared — the same instinct behind
Foundations' raw/cleansed data-zone separation, applied to code
instead of data.

## What's ahead, mapped to this UI

- **Compute** → Lesson 4 (clusters), the thing every notebook attaches to.
- **Jobs & Pipelines** → Lesson 11 (scheduled jobs) and this course's entire Chapter 5 (Lakeflow pipelines).
- **Catalog** → this course's entire Chapter 4 (Unity Catalog) — governance over every table you'll create from Chapter 2 onward.

## Key terms

| Term | Meaning |
|---|---|
| Workspace (sidebar) | The file browser for notebooks, files, and folders |
| Home folder | Your personal, private-by-default notebook folder |
| Shared folder | Visible to the whole workspace — the default for team-facing work |

## Check yourself

You're ready for Lesson 4 when you can explain, without looking: why
would a team convention favor saving reusable notebooks in Shared
rather than Home?
