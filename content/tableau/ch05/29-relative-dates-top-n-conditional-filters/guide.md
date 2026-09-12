# Lesson 29 — Relative Dates, Top N & Conditional Filters

**Chapter 5 · Filters, Sorting & Analytics · Lesson 29 of 95**

## What you'll learn

- How to build a real Relative Dates filter, granularity by granularity
- The two ways to build a Top N filter — a fixed number, or a
  parameter-driven one that a viewer can change
- How to write a Condition filter formula from scratch
- Why a parameter-driven Top N beats a hardcoded one for a real
  dashboard

## Relative Dates, in full

Lesson 28 introduced Relative Date filtering. Here's the actual dialog:

![Tableau's Relative Dates filter dialog for Order Date, with granularity tabs for Years, Quarters, Months, Weeks, and Days, and radio options like Previous week, This week, Next week, Last N weeks, and Next N weeks.](/courses/tableau/ch05/29-relative-dates-top-n-conditional-filters/relative-dates.png)
*Pick a granularity (Weeks, in this example), then a specific relative window — "This week," "Last 3 weeks," and so on.*
Source: [Tableau Help — Filter Data from Your Views](https://help.tableau.com/current/pro/desktop/en-us/filtering.htm)

The "Anchor relative to" checkbox at the bottom is worth knowing about:
by default, "today" means the actual calendar date the workbook is
opened on. Anchoring to a fixed date instead is useful when you want a
relative filter that behaves consistently in a demo or a screenshot,
rather than shifting every time someone opens the file.

## Top N, the parameter-driven way

A hardcoded "Top 10" filter works, but it means editing the filter
itself every time someone wants "Top 5" instead. The better pattern —
and the one that shows up constantly in real dashboards — drives Top N
from a parameter:

![Tableau's Edit Set dialog for 'Top N Customers by Sales,' with the Top tab selected and a parameter named 'Top Customers 2' plugged in as the N value instead of a hardcoded number.](/courses/tableau/ch05/29-relative-dates-top-n-conditional-filters/top-n.png)
*Instead of typing "10," the N value comes from a parameter — a viewer-facing control changes how many rows show up, no editing required.*
Source: [Tableau Help — Sets for Top N and Others](https://help.tableau.com/current/pro/desktop/en-us/sortgroup_sets_topn.htm)

This uses a **Set** (Chapter 10 covers sets properly) rather than the
plain dimension filter's Top tab — sets are more flexible because they
can be combined with other sets and referenced in calculated fields,
which a plain filter can't do.

## Conditional filters, worked

Lesson 28 showed the Condition tab exists. Here's an actual formula,
built the same way you'd type it into that tab:

```
SUM([Sales]) > 10000
```

Applied to `Sub-Category` on the Condition tab, this keeps only
sub-categories whose total sales exceed $10,000 — dynamically, so if
the underlying data changes, the set of sub-categories that pass the
filter can change too, unlike a hardcoded General-tab selection.

## Key terms

| Term | Meaning |
|---|---|
| Anchor relative to | An option that pins "today" to a fixed date instead of the actual calendar date |
| Parameter-driven Top N | A Top N filter or set whose N value comes from a parameter, so a viewer can change it without editing the filter |
| Condition filter | A filter that keeps only values where a formula evaluates true, re-evaluated as the data changes |

## Lab

1. Build a Relative Dates filter on `Order Date` set to "Last 4 Weeks," then check the "Anchor relative to" box and pick a fixed date — compare the two.
2. Create an integer parameter called `Top N`, then build a Top N set on `Customer Name` by `SUM([Sales])` driven by that parameter instead of a hardcoded number.
3. Build a Condition filter on `Sub-Category` using `SUM([Profit]) < 0` and confirm it returns different sub-categories than a General-tab manual selection would.

## Check yourself

You're ready for Lesson 30 when you can build a parameter-driven Top N
set from scratch and explain, in one sentence, why it's more flexible
than the plain Top tab on a dimension filter.
