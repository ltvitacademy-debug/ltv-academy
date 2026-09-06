# Lesson 3 — Power BI Desktop Interface Tour

**Chapter 1 · Power BI Fundamentals · Lesson 3 of 5**

## What you'll learn

- The four main pieces of the Desktop workspace: ribbon, canvas, and panes
- What the Fields and Visualizations panes do, and how they work together
- The three views — Report, Data, and Model — and when you'd use each
- How report pages work: adding, renaming, hiding, and deleting them

## The workspace, at a glance

Everything in Power BI Desktop lives in one window, arranged the same way every
time:

![Screenshot of Power BI Desktop in Report view with a blank canvas, ribbon on top, and Filters, Visualizations, and Fields panes on the right.](/courses/power-bi/ch01/03-desktop-interface-tour/report-view-blank-canvas.png)
*The full workspace: ribbon on top, canvas in the middle, three collapsible panes on the right — Filters, Visualizations, Fields.*

| Area | What it is | What it's for |
|---|---|---|
| **Ribbon** | Tabs across the top: Home, Insert, Modeling, View, and more | Get data, transform data, add visuals, publish |
| **Canvas** | The large area in the middle | Where your report's visuals get placed and arranged |
| **Filters pane** | Left of the other two panes | Restrict what data a visual (or the whole page) shows |
| **Visualizations pane** | Middle of the three panes | Choose a visual type and format it |
| **Fields pane** | Right-most pane | Lists every table and column in your model |

You'll spend almost all of your time in this course moving between the ribbon,
the canvas, and these three panes — so it's worth knowing each one by name
before we start building anything.

## The three views

Power BI Desktop has three views, switched with the icons running down the far
left edge of the window:

![Close-up of the Report view icon highlighted in the left-hand navigation strip of Power BI Desktop.](/courses/power-bi/ch01/03-desktop-interface-tour/pbi_reportviewinpbidesigner_changeview.png)
*Report, Data, and Model — three icons stacked down the left edge. This is Report view, selected.*

| View | Icon looks like | What it's for |
|---|---|---|
| **Report** | A bar chart | Building and arranging visuals on the canvas — where you'll spend most of your time |
| **Data** | A table/grid | Inspecting the actual rows and columns in your loaded model, one table at a time |
| **Model** | Connected boxes | Seeing every table in your model and how they're related to each other |

Report view is the default and the one you'll use constantly. Data and Model
view are for the occasional moments you need to look *underneath* the report —
checking what a column actually contains, or how two tables connect.

## The Fields pane: building a visual

Once a model has data in it, the Fields pane lists every table and column
available to you.

![Screenshot of building a chart by checking fields in the Fields pane, with two selected fields highlighted.](/courses/power-bi/ch01/03-desktop-interface-tour/add-visual.png)
*Check a box next to a field — or drag it onto the canvas — and Power BI builds a visual from it automatically.*

Check a box next to a field, or drag it straight onto the canvas, and Power BI
creates a visual using a sensible default chart type. You'll refine the exact
type and appearance next, in the Visualizations pane.

## The Visualizations pane: choosing a chart

Select any visual on the canvas, and the Visualizations pane above it lets you
swap its chart type entirely without losing your field selections.

![Screenshot of the Visualizations pane with a different chart icon selected, changing the visual on the canvas from a line chart to a different type.](/courses/power-bi/ch01/03-desktop-interface-tour/change-visual.png)
*Select the visual, click a different icon in Visualizations, and the same fields redraw as a new chart type — no rebuilding required.*

The row of icons at the top is every visual type Power BI ships with: bar and
column charts, lines, maps, cards, tables, and more. Below that, **Build
visual** shows exactly which fields feed which part of the current chart (axis,
values, legend) — this is where most of your fine-tuning happens later in the
course.

## Data view: your model, row by row

Switch to Data view (sometimes called Table view) and you're looking at the
actual data sitting inside your model — not a visual built from it, but the
raw table itself.

![Screenshot of Data view in Power BI Desktop, showing a data grid, formula bar, search box, and fields list, with each element numbered.](/courses/power-bi/ch01/03-desktop-interface-tour/dataview_fullscreen.png)
*Data view: the data grid shows every row and column of the selected table; the formula bar is where DAX measures and calculated columns get written; search and the fields list on the right let you jump to any table.*

This view matters most once you start writing DAX (Chapter 5) — it's where you
go to sanity-check that a measure or calculated column is producing the values
you expect.

## Model view: tables and relationships

Switch to Model view, and you see every table in your model laid out as boxes,
connected by lines wherever a relationship exists between them.

![Screenshot of Model view in Power BI Desktop, showing several tables connected by relationship lines in a diagram.](/courses/power-bi/ch01/03-desktop-interface-tour/modeling-view-07.png)
*Model view: each box is a table, each connecting line a relationship. This is the exact picture Chapter 4 is built around.*

Don't worry about *why* these tables connect this way yet — that's the entire
subject of Chapter 4 (Data Modeling). For now, just recognize this screen: it's
where you'll go to build, inspect, and fix relationships once you have more
than one table.

## Report pages

A report always has at least one page, shown as a tab at the bottom of Report
view. From there:

- **Add a page** — select the **+** icon next to the page tabs, or **Insert >
  New page** on the ribbon.
- **Rename a page** — double-click its tab.
- **Hide a page** — right-click its tab and select **Hide**. Hidden pages
  aren't shown to report readers in the Power BI service, but they aren't a
  security feature — anyone with edit access can still unhide them.
- **Delete a page** — select the **x** on its tab.

## Key terms

| Term | Meaning |
|---|---|
| Ribbon | The tabbed toolbar (Home, Insert, Modeling, View) across the top |
| Canvas | The area where report visuals are placed and arranged |
| Fields pane | Lists every table/column in your model; drag or check to build visuals |
| Visualizations pane | Chooses and formats the chart type for the selected visual |
| Filters pane | Restricts what data a visual or page shows |
| Report view | Where you build and arrange visuals (the default view) |
| Data view | Shows raw rows/columns of your loaded model, one table at a time |
| Model view | Shows every table and the relationships between them, as a diagram |

## Lab

1. Open Power BI Desktop.
2. Click through all three view icons on the left edge — Report, Data, Model.
   With no data loaded yet, Data and Model view will look mostly empty; that's
   expected, and Lesson 4 fixes that.
3. In Report view, find the Filters, Visualizations, and Fields panes. Say out
   loud what each one is for, without looking back at this guide.
4. Add a second report page with the **+** icon, rename it "Test," then delete
   it. This muscle memory pays off constantly later in the course.

## Check yourself

You're ready for Lesson 4 when you can point to the ribbon, the canvas, each
of the three panes, and each of the three view icons, and say in one sentence
what each one is for.
