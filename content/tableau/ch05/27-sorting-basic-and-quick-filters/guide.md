# Lesson 27 — Sorting, Basic Filters & Quick Filters

**Chapter 5 · Filters, Sorting & Analytics · Lesson 27 of 95**

## What you'll learn

- How Tableau's built-in sort icons work, and what they don't do
- The difference between a basic filter and a quick filter
- Where each one lives, and who can actually change it
- When to reach for a quick filter instead of a basic one

## Welcome to Chapter 5

Chapter 4 was about how a chart *looks*. Chapter 5 is about what data
actually *reaches* that chart in the first place — sorting, filtering,
and (starting in Lesson 31) the exact order Tableau applies all of it.

## Sorting

Hover over an axis, a header, or a field label and a small sort icon
appears.

![A horizontal bar chart of colors by material, with a sort icon highlighted in the Hue row header and another sort icon highlighted below a Metric A axis.](/courses/tableau/ch05/27-sorting-basic-and-quick-filters/sort-icons.png)
*Sort icons appear on hover over headers, axes, and field labels — click to cycle through descending, ascending, and no sort.*
Source: [Tableau Help — Sort Data in a Visualization](https://help.tableau.com/current/pro/desktop/en-us/sortgroup_sorting_computed_howto.htm)

- **First click** → sort descending
- **Second click** → sort ascending
- **Third click** → clear the sort, back to default order

Sorting **never removes data** — it only reorders what's already in the
view. If you want to actually exclude values, you need a filter.

## Basic filters

Drag any field from the Data pane onto the **Filters** shelf, and
Tableau opens a Filter dialog letting you choose which values to
include or exclude (the exact dialog varies by field type — Lesson 28
covers each variant). Once set, the filter is baked into the worksheet,
invisible to anyone viewing the finished chart unless they open the
workbook and look at the Filters shelf themselves.

## Quick filters

A **quick filter** takes that same filter and displays it as a live,
interactive card directly on the sheet or dashboard:

![A Quick Filter card labeled Category, with a checklist showing (All), Furniture, Office Supplies, and Technology, all checked.](/courses/tableau/ch05/27-sorting-basic-and-quick-filters/quick-filter.png)
*A Quick Filter card — anyone viewing the dashboard can check or uncheck values themselves, live.*
Source: [Tableau Help — Filter Data from Your Views](https://help.tableau.com/current/pro/desktop/en-us/filtering.htm)

To turn any filter into a quick filter, right-click the field on the
Filters shelf and choose **Show Filter**. The resulting card can be
customized further — single-value dropdown, multi-select checklist,
slider, and more — via the card's own drop-down menu.

## Key terms

| Term | Meaning |
|---|---|
| Sort icon | The click-to-cycle control on headers, axes, and field labels |
| Basic filter | A field on the Filters shelf that includes/excludes data, hidden from viewers |
| Quick filter | The same filter, surfaced as a live, interactive card on the view |
| Show Filter | The right-click option that turns a basic filter into a quick filter |

## Lab

1. Build a bar chart of Sales by Sub-Category. Click the sort icon on
   the axis three times and note what changes at each click.
2. Drag Category onto Filters and exclude one category from the view.
3. Right-click that same filter and choose Show Filter — now toggle
   categories on and off directly from the card, without touching the
   Filters shelf.

## Check yourself

You're ready for Lesson 28 when you can explain, in one sentence each,
what sorting does, what a basic filter does, and what makes a quick
filter different from a basic one.
