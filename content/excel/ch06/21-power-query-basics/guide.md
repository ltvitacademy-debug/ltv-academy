# Lesson 21 — Power Query Basics

**Chapter 6 · Power Query in Excel · Lesson 21 of 25**

## What you'll learn

- What Power Query actually is — a separate transformation engine that
  happens to live inside Excel
- Where to find it, and how it's genuinely different from formulas and
  PivotTables
- What the Applied Steps pane is, and why it's the single most important
  idea in this chapter
- Why a query beats manually re-cleaning a refreshed data pull, every
  single time

## Power Query is not a formula, and not a PivotTable

Everything in this course up to now has worked on data that's already
sitting in a worksheet. Power Query works *before* that — it's a
transformation engine that connects to a data source, reshapes it, and
only then drops the result into your sheet. It happens to ship inside
Excel (Microsoft calls it "Get & Transform" in the ribbon), and the same
engine also powers Power BI's data prep — but treat it as its own tool,
not an extension of formulas.

![Screenshot of the Excel Data tab ribbon, showing the Get & Transform Data group with Get Data, From Text/CSV, From Web, From Sheet, Recent Sources, and Existing Connections buttons.](/courses/excel/ch06/21-power-query-basics/excelpqribbon2016.png)
*Data tab → Get & Transform Data. This is the entire entry point — every Power Query lesson in this chapter starts here.*
Source: [Microsoft Support — About Power Query in Excel](https://support.microsoft.com/en-us/excel/about-power-query-in-excel-7104fbee-9e62-4cb9-a02e-5bfb1a6c536a)

## The Query Editor and Applied Steps

Clicking any "Get Data" option opens the **Power Query Editor** — a
separate window with its own ribbon, its own data preview, and a pane on
the right called **Query Settings**. That pane's **Applied Steps** list
is the whole point of this chapter:

![Screenshot of the Power Query Editor, showing a data preview table on the left and a Query Settings pane on the right with an Applied Steps list containing Source, Removed Columns, Duplicated Column, and Uppercased Text.](/courses/excel/ch06/21-power-query-basics/excelpqquerysettings.png)
*Every click you make — removing a column, splitting text, changing a type — gets recorded here as a named, ordered step. Nothing happens silently.*
Source: [Microsoft Support — About Power Query in Excel](https://support.microsoft.com/en-us/excel/about-power-query-in-excel-7104fbee-9e62-4cb9-a02e-5bfb1a6c536a)

Click any step in that list and the preview rewinds to show the data
exactly as it looked at that point. Delete a step, and everything after
it re-runs without it. This is the core mental model for the whole
chapter: **a query isn't a one-time cleanup — it's a saved recipe.**

## The four phases

Microsoft frames every query as four phases, and it's a genuinely useful
way to think about what you're doing at each point:

![Real Microsoft diagram showing four numbered phases: 1 Connect, 2 Transform, 3 Combine, 4 Load, each with a small icon.](/courses/excel/ch06/21-power-query-basics/powerquery-pq-flowdiagram1.png)
*Connect to a source, transform it, optionally combine it with other queries, then load the result into a worksheet or the Data Model.*
Source: [Microsoft Support — About Power Query in Excel](https://support.microsoft.com/en-us/excel/about-power-query-in-excel-7104fbee-9e62-4cb9-a02e-5bfb1a6c536a)

Chapter 6 spends most of its time in **Transform** (Lesson 22) and
**Combine** (Lesson 23) — Connect and Load are mostly one-click steps by
comparison.

## Why this beats doing it by hand again

Say a coworker emails you a fresh CSV export every Monday, and every
Monday you delete two junk columns, fix a date format, and remove blank
rows by hand before you can use it. Do that manually and you're
re-doing identical work forever, one typo away from a mistake. Build it
as a query once, and updating for next week's file is one click:
**Refresh**. Every recorded step re-runs, in order, against the new
data.

## Key terms

| Term | Meaning |
|---|---|
| Power Query | The transformation engine behind Excel's "Get & Transform" — a separate tool from formulas and PivotTables |
| Query Editor | The dedicated window where you build and edit a query's transformation steps |
| Applied Steps | The recorded, ordered, re-runnable list of every transformation you've applied to a query |
| Refresh | Re-runs every applied step against the current state of the source data |

## Lab

1. On the Data tab, open **Get Data > From File > From Text/CSV** (or
   **From Sheet** if you don't have a CSV handy) and load any small
   table into the Query Editor without closing it yet.
2. In the Query Editor, remove one column using **Home > Remove
   Columns**. Confirm a new step appears in Applied Steps.
3. Click back on the **Source** step at the top of the list and watch
   the preview rewind to before your removal — then click the newest
   step again to fast-forward back.
4. Close & Load the query into the worksheet, then find it again under
   **Data > Queries & Connections**.

## Check yourself

You're ready for Lesson 22 when you can explain, in one sentence, why
Applied Steps make a query different from just cleaning the data by
hand once.
