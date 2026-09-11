# Lesson 1 — Welcome! What Is Tableau & Course Overview

**Chapter 1 · Getting Started · Lesson 1 of 95**

## What you'll learn

- What Tableau actually is, and where it fits next to the T-SQL and
  Power BI skills you already have
- What the real Tableau Desktop workspace looks like, and how its
  pieces map onto the work you'll do in this course
- How this course is structured, chapter by chapter
- What this course assumes you already know, and what it teaches fresh

## What Tableau actually is

**Tableau** is a data visualization and business intelligence platform
— you connect it to data, and it turns that data into interactive
charts, dashboards, and stories, without writing code for the
visualization layer itself. If that sounds like Power BI, that's
because it is: Tableau and Power BI solve the same core problem
(turning tables of data into something a human can actually read and
act on) with different philosophies, different licensing, and — this
matters for your job search — different, real market share. A huge
number of BI Developer and Data Analyst postings ask for Tableau
specifically, often instead of Power BI, sometimes alongside it.
Knowing both makes you employable at a meaningfully wider set of
companies than knowing just one.

## The real Tableau Desktop workspace

Here's what you're actually looking at once Tableau Desktop is open and
connected to data:

![Labeled Tableau Desktop workspace screenshot showing the menu bar, toolbar, Show Me button, Pages/Filters/Marks cards, Data pane with the Sample Superstore dataset, the Columns/Rows shelves, the worksheet canvas showing a line chart by segment and region, and the status bar.](/courses/tableau/ch01/01-welcome-what-is-tableau/tableau-workspace.png)
*The Tableau Desktop workspace, from Tableau's own documentation — this exact layout is what you'll be looking at for the rest of this course.*
Source: [Tableau Help — The Tableau Workspace](https://help.tableau.com/current/pro/desktop/en-us/environment_workspace.htm)

A few pieces worth knowing by name right now, because every lesson
from here on refers to them:

| Area | What it does |
|---|---|
| **Data pane** | Every field from your connected data source, split into Dimensions and Measures (Lesson 5 goes deep on this split) |
| **Columns / Rows shelves** | Drag fields here to build the view — what goes on Columns and Rows determines the chart's basic shape |
| **Marks card** | Controls color, size, detail, and shape for whatever's on the canvas (Chapter 4 is built entirely around this) |
| **Show Me** | A panel that suggests chart types based on what fields you've selected (Lesson 14) |
| **Worksheet canvas** | Where the actual visualization renders |

This particular screenshot uses the **Sample Superstore** dataset —
the same dataset Lesson 3 has you download and explore, and the one
this course keeps coming back to throughout Chapters 1-13.

## What this course assumes, and what it teaches fresh

This course assumes you already know SQL from T-SQL Development
elsewhere in this catalog — when a lesson covers joins, filtering, or
aggregation inside Tableau, it teaches how that *already-familiar*
concept behaves specifically inside Tableau's engine, not the concept
from scratch. Everything Tableau-specific — the workspace, Show Me,
calculated fields, LOD expressions, table calculations, dashboards,
and publishing — is taught from zero, assuming no prior Tableau
experience at all.

## How this course is structured

| Chapters | Focus |
|---|---|
| 1-2 | Getting started, connecting to and preparing real data |
| 3-4 | Visualization fundamentals and formatting/visual design |
| 5-7 | Filters and analytics, calculated fields, time series and table calculations |
| 8-10 | Data modeling (joins/relationships/blending), maps, groups/sets/bins |
| 11-13 | Parameters, Level of Detail expressions, advanced visualizations |
| 14-16 | Dashboards, Tableau Server/Cloud/Public, performance optimization |
| 17-18 | Three portfolio projects, then interview and portfolio strategy |

That's 95 lessons — deliberately built to end the same way this
catalog's other tool-specific courses do: with real, presentable
portfolio work and job-search material, not just a list of features.

## Key terms

| Term | Meaning |
|---|---|
| Tableau Desktop | The authoring application you'll spend most of this course in — connect to data, build visualizations, design dashboards |
| Dimension / Measure | Tableau's core split of every field into "describes something" vs. "measures something" (Lesson 5) |
| Worksheet | A single view/chart, built on the Columns/Rows shelves and Marks card |
| Dashboard | A combination of worksheets, filters, and objects assembled into one interactive view (Chapter 14) |

## Lab

1. If you haven't already, skim [Tableau's own product page](https://www.tableau.com/products/desktop) for the current Tableau Desktop feature list — you'll install it for real next lesson.
2. Look at the screenshot above and find the Data pane, the Marks card, and the Columns/Rows shelves. Say out loud what you think each one does, in your own words, before reading the table again.

## Check yourself

You're ready for Lesson 2 when you can name at least four labeled areas
of the Tableau Desktop workspace from the screenshot above without
looking, and explain in one sentence why this catalog teaches both
Power BI and Tableau rather than just one.
