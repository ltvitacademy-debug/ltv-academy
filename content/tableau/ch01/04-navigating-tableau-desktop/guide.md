# Lesson 4 — Navigating Tableau Desktop

**Chapter 1 · Getting Started · Lesson 4 of 95**

## What you'll learn

- Every major area of the Tableau Desktop workspace, by name, and what
  each one is for
- The difference between the application shell (menus, toolbar, panes)
  and the view itself (the actual chart you build)
- The parts of a worksheet view specifically: headers, axes, legends,
  titles, and captions
- Enough working vocabulary that every later lesson's instructions
  ("drag it to the Rows shelf," "check the Marks card") make sense
  immediately

## The workspace, area by area

Lesson 1 showed you this screenshot once as an overview. Now you're
going to actually learn each labeled area, because you'll be moving
between them constantly for the rest of this course.

![Real, labeled screenshot of the Tableau Desktop workspace (A-I): menu bar, toolbar, Data/Analytics pane, Pages/Filters/Marks cards, Columns/Rows shelves, worksheet canvas, and status bar.](/courses/tableau/ch01/04-navigating-tableau-desktop/workspace-overview.png)
*The full Tableau Desktop workspace, labeled A through I.*
Source: [Tableau Help — The Tableau Workspace](https://help.tableau.com/current/pro/desktop/en-us/environment_workspace.htm)

| Area | What it's for |
|---|---|
| **Menu bar** | File, Data, Worksheet, Dashboard, Story, Analysis, Map, Format, Server, Window, Help |
| **Toolbar** | Undo/redo, save, new data source, run/pause auto-updates, swap rows and columns, and more one-click actions |
| **Data pane** | Every field from your connected source, split into Dimensions and Measures |
| **Analytics pane** | Drag-and-drop reference lines, trend lines, and forecasts onto the view (Chapter 5) |
| **Pages / Filters / Marks cards** | Control paging, filtering, and the visual encoding (color, size, detail) of marks |
| **Columns / Rows shelves** | Determine the view's basic structure — what's on the horizontal vs. vertical axis |
| **Worksheet canvas** | Where the actual chart renders |
| **Status bar** | Row/column counts and other quick summary info at the bottom |

Notice the tabs along the bottom of the window, too — every worksheet,
dashboard, and story you build in a workbook gets its own tab, exactly
like sheets in an Excel workbook.

## The parts of the view itself

Zoom in one level further, and the chart you actually build (called a
"view" in Tableau) has its own named parts:

![Real, labeled screenshot (A-G) of a Tableau worksheet view showing Category row headers, a chart title, Order Date/Region column headers, a color legend, dollar-value axes, and a caption describing the sum of Profit by Region and Category.](/courses/tableau/ch01/04-navigating-tableau-desktop/view-parts.png)
*A real worksheet, with every part labeled.*
Source: [Tableau Help — Parts of the View](https://help.tableau.com/current/pro/desktop/en-us/view_parts.htm)

| Label | Part | What it shows |
|---|---|---|
| A | Row headers | The discrete field's distinct values (here, Category) |
| B | Title | The worksheet's name or a custom title |
| C | Column headers | Another discrete field's values (here, Order Date / Region) |
| D | Legend | What color, size, or shape encodes (here, Ship Mode) |
| E, F | Axes | The scale for a continuous field (here, dollar amounts) |
| G | Caption | A short auto-generated or custom description of what the view shows |

Every one of these terms — headers, axis, legend, caption — will come
up by name in later lessons without re-explanation, so this is worth
re-reading once before moving on.

## Key terms

| Term | Meaning |
|---|---|
| Workbook | A Tableau file (.twb/.twbx) containing one or more worksheets, dashboards, and stories |
| Worksheet | A single view/chart |
| Shelf | A drop target for fields (Columns, Rows, Pages, Filters) |
| Headers | Labels created by a discrete field placed on a shelf |
| Axis | A scale created by a continuous field placed on a shelf |

## Lab

1. Open Sample Superstore in Tableau Desktop and identify, by pointing at them, the Data pane, the Columns shelf, the Rows shelf, and the Marks card.
2. Drag Category onto Rows and Sales onto Columns. Identify which part of the resulting view is the header and which is the axis.
3. Look at the bottom of the workbook window and find the worksheet tab — right-click it and note the options (Rename, Duplicate, Delete) without changing anything yet.

## Check yourself

You're ready for Lesson 5 when you can point to (or name, without
looking) the Data pane, Marks card, Columns/Rows shelves, and explain
the difference between a header and an axis in your own words.
