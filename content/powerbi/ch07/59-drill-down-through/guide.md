# Lesson 59 — Drill Down & Drill Through

**Chapter 7 · Building Reports & Visualizations · Lesson 8 of 10**

## What you'll learn

- The difference between drill mode and drillthrough — two features with similar names, different jobs
- The four drill actions inside a single visual
- How to build a drillthrough page, step by step
- Cross-report drillthrough, for navigating between separate reports

## Two different features, similar names

**Drill mode** moves through hierarchy levels *within one visual* — the
column chart drilling from year to quarter to month you saw in Lesson
54. **Drillthrough** is different: it *navigates to an entirely
different report page*, filtered to whatever you selected. Same general
idea — go from summary to detail — but drillthrough gets you a whole
dedicated page, not just a deeper level of the same chart.

## Drill mode, recapped

![Screenshot of a Power BI column chart with four drill icons above it: Drill up, Drill down, Next level, and Expand all levels.](/courses/power-bi/ch07/59-drill-down-through/column-drill.png)
*The same four icons from Lesson 54 — drill up, drill down, next level, expand all — all working within this one visual.*

## Building a drillthrough page

1. Add a new report page, and rename it to describe its purpose — "Product
   Details," "Customer Details."
2. In the **Visualizations** pane, expand the **Drillthrough** section
   and drag a field (like `Product Name`) into the **Drillthrough
   filters** well.
3. Power BI automatically adds a **Back** button to the page.
4. Add visuals that make sense at the individual-item level — a card
   showing the item's name, a table of its transaction history, a line
   chart of its trend over time.

The drillthrough page shows data for *only* the selected item — design
its visuals around that focused context, rather than reusing whatever
was on the summary page.

## Using drillthrough

Right-click a data point on any visual that contains the drillthrough
field, hover **Drillthrough** in the context menu, and select the
target page. Power BI navigates there, filtered to the item you
right-clicked. Select **Back** to return.

If **Drillthrough** doesn't appear in that context menu, check that the
field you added to the **Drillthrough filters** well also exists,
unaggregated, in the visual you're right-clicking — that match is
required for the option to show up.

## Drillthrough buttons

Right-clicking works, but it's not always obvious to a report viewer.
Add a **button** with its action set to **Drillthrough** and a target
page selected, and you get a visible, clickable alternative — with room
for a tooltip, conditional formatting, and clearer labeling than a
context menu offers.

## Cross-report drillthrough

Drillthrough can also jump between two *separate* reports in the same
workspace — useful when detail pages live in their own report rather
than as extra pages in the summary report. It requires:

- Both reports published to the same workspace.
- **Cross-report drillthrough** enabled in the target report's settings.
- Matching field names and data types between the source and target.

## Key terms

| Term | Meaning |
|---|---|
| Drill mode | Moving through hierarchy levels within a single visual |
| Drillthrough | Navigating to a separate report page, pre-filtered to a selected item |
| Drillthrough filter | The field added to a drillthrough page that determines what it's filtered to |

## Lab

1. On **AdventureWorksDW2014**, build a drillthrough page named "Product
   Details," with `DimProduct[EnglishProductName]` as the drillthrough
   filter and a table showing that product's sales history.
2. From a chart on another page broken out by product, right-click a
   product and confirm **Drillthrough → Product Details** appears and
   works.
3. Add a button to the summary page with its action set to
   **Drillthrough**, targeting the same page, as an alternative to
   right-clicking.

## Check yourself

You're ready for Lesson 60 when you can explain, in one sentence, the
difference between drill mode and drillthrough.
