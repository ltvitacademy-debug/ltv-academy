# Lesson 12 — Power Query Editor Explained

**Chapter 3 · Power Query & Data Cleaning · Lesson 1 of 12**

## What you'll learn

- How to open Power Query Editor, and why it's a separate window
- The four areas of the editor, and what each one is for
- How Applied Steps work — and why they're the most important idea in this chapter
- Where to see the actual code Power Query is writing for you

## Getting there

Every table you've loaded so far went straight into your report. Power
Query Editor is the workshop *before* that — where data gets cleaned up
first. Open it from the **Transform data** button on the Home ribbon:

![Screenshot of the Home ribbon in Power BI Desktop with the Transform data button highlighted.](/courses/power-bi/ch03/12-power-query-editor/query-overview-transform.png)
*Transform Data — the same button you've been skipping past since Lesson 4, choosing Load instead.*

Power Query Editor opens as its own window, with its own ribbon, separate
from the report canvas. That's deliberate: everything you do here happens
*before* your data ever reaches a visual.

## Four areas, one purpose

Once you're connected to data, the editor has four working areas:

![Screenshot of Power Query Editor with a query loaded, showing the ribbon, the Queries pane on the left, the data grid in the center, and the Query Settings pane on the right.](/courses/power-bi/ch03/12-power-query-editor/query-overview-with-data-connection.png)
*Ribbon on top, queries on the left, your data in the center, and every step you've taken on the right.*

| Area | What it's for |
|---|---|
| **Ribbon** | Every cleaning action lives here — or in the right-click menu, which mirrors it |
| **Queries pane** (left) | Lists every table you're working on; select one to edit it |
| **Data grid** (center) | The actual data, live, as your current step left it |
| **Query Settings** (right) | Every step you've applied, in order — this chapter's real subject |

## The ribbon, tab by tab

The Home tab holds the actions you'll use constantly:

![Screenshot of the Power Query Editor Home ribbon showing Close & Apply, New Source, Data source settings, Manage Parameters, and Refresh Preview.](/courses/power-bi/ch03/12-power-query-editor/query-overview-ribbon.png)
*Home: new connections, refreshing the preview, and Close & Apply — how you leave the editor when you're done.*

Three more tabs sit beside it, and you'll meet each one properly later in
this chapter: **Transform** (Lessons 13–19: data types, rows, columns,
pivoting, grouping), **Add Column** (building new columns from existing
ones), and **View** (toggling panes, and the Advanced Editor covered
below).

## The Queries pane

Every table you're transforming shows up here — one query per table:

![Screenshot of the Queries pane on the left side of Power Query Editor, listing one query named "Best States to Retire."](/courses/power-bi/ch03/12-power-query-editor/query-overview-the-left-pane.png)
*One query so far. Chapter 3 later covers combining multiple queries together — merging and appending.*

## Query Settings: the real subject of this chapter

Every single cleaning action you take — changing a type, removing a column,
filtering rows — gets recorded here, in order, under **Applied Steps**:

![Screenshot of the Query Settings pane showing Properties and an Applied Steps list.](/courses/power-bi/ch03/12-power-query-editor/query-overview-query-settings-pane.png)
*This list is the whole point of Power Query. Nothing here is a one-time edit — it's a recipe that reruns automatically every time your data refreshes.*

This is the single most important idea in this chapter: **Power Query
doesn't change your source data. It records a sequence of steps, and
replays that sequence on whatever data shows up next.** Every lesson from
here through Lesson 23 is really just "here's another kind of step you can
add to this list."

## Seeing the actual code

Every step you take through the ribbon or right-click menus is really just
generating code, in a language called **Power Query M**. You can see it
directly:

![Screenshot of the Advanced Editor dialog showing the M code generated for a query, including Source, Extracted Table From Html, Promoted Headers, and Changed Type steps.](/courses/power-bi/ch03/12-power-query-editor/query-overview-advanced-editor.png)
*View > Advanced Editor. Each line matches one entry in Applied Steps — you don't need to write M by hand, but it's there when you need it.*

You won't need to write M code for most of this course — the ribbon covers
almost everything. But knowing this window exists matters: it's where you
go if a step needs a small manual tweak the ribbon can't quite make.

## Key terms

| Term | Meaning |
|---|---|
| Power Query Editor | The separate window where data gets cleaned before loading |
| Applied Steps | The ordered list of every transformation applied to a query |
| Query | One table's worth of connection + transformation steps |
| Power Query M | The formula language every step is written in, viewable in Advanced Editor |
| Close & Apply | Leaves the editor and loads the transformed data into your report |

## Lab

1. Connect to any data source and select **Transform Data** instead of
   Load, to land directly in Power Query Editor.
2. Find all four areas: ribbon, Queries pane, data grid, Query Settings.
3. Right-click a column header and compare the menu that appears to the
   buttons on the Home and Transform ribbon tabs — notice they overlap.
4. Open **View > Advanced Editor** and just look — don't edit anything —
   at the M code your connection already generated.

## Check yourself

You're ready for Lesson 13 when you can explain, in one sentence, why
Applied Steps matters more than any single transformation you'll learn in
this chapter.
