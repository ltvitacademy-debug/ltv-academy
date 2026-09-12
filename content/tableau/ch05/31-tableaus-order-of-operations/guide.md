# Lesson 31 — Understanding Tableau's Order of Operations

**Chapter 5 · Filters, Sorting & Analytics · Lesson 31 of 95**

## What you'll learn

- The full, official sequence Tableau uses to process a view
- Exactly where context filters (Lesson 30) and Top N/measure filters
  sit relative to each other
- Why a measure filter can never filter out rows a context filter
  already excluded, but the reverse isn't true
- How to use this sequence to debug a filter that "isn't working"

## The official sequence

Tableau processes every view in a fixed, predictable order:

![Tableau's official order-of-operations diagram: Extract Filters, then Data Source Filters, then Context Filters, then Dimension Filters, then Measure Filters, then Table Calc Filters, each in its own colored box stacked top to bottom.](/courses/tableau/ch05/31-tableaus-order-of-operations/order-of-operations-colored.png)
*Six stages, always in this order — nothing later in the list can un-exclude a row an earlier stage already dropped.*
Source: [Tableau Help — Order of Operations](https://help.tableau.com/current/pro/desktop/en-us/order_of_operations.htm)

1. **Extract Filters** — applied when the extract itself was created
2. **Data Source Filters** — applied at the data-source level, before any sheet sees the data
3. **Context Filters** — Lesson 30's grey pills, computed once, first among sheet-level filters
4. **Dimension Filters** — the General/Wildcard/Condition tabs from Lesson 28
5. **Measure Filters** — the aggregation-based filters from Lesson 28
6. **Table Calc Filters** — filters on table calculations (Chapter 7 covers these), which can only run last because a table calculation needs the rest of the view's data already assembled to compute in the first place

## Why the order is one-directional

Every stage operates only on rows that survived every earlier stage.
That means a Dimension Filter can never bring back a row a Context
Filter already excluded — but a Context Filter has no idea what any
Dimension Filter downstream is going to do. This is exactly why Lesson
30's Top N example worked the way it did: putting `Category: Furniture`
in context (stage 3) meant the Sub-Category Top N filter (stage 4)
only ever saw Furniture's rows to begin with.

## A real interaction: filters and sorts

The sequence also explains behavior that looks confusing at first —
filtering and sorting interacting in a specific order:

![A Tableau worksheet with a City filter set to New York City and Customer Name nested and sorted within it, showing a descending bar chart of customers by sales, all confined to New York City.](/courses/tableau/ch05/31-tableaus-order-of-operations/order-of-operations.png)
*The City filter (stage 4, a dimension filter) runs before the sort — the sort only ever orders the rows that survived filtering.*
Source: [Tableau Help — Order of Operations](https://help.tableau.com/current/pro/desktop/en-us/order_of_operations.htm)

If you ever see a sort that "isn't sorting the whole dataset," this is
almost always why: the sort is operating on whatever a filter has
already narrowed the view down to.

## Using this to debug

When a filter seems to "not be working," the order of operations is
usually the first thing to check: is the filter you're editing running
*after* a context filter or an extract filter that already excluded
the rows you expected to see? If so, the fix isn't the filter itself —
it's re-examining what ran before it.

## Key terms

| Term | Meaning |
|---|---|
| Order of operations | Tableau's fixed six-stage sequence for processing filters on a view |
| Extract/Data Source Filters | The earliest stages, applied before any sheet-level filter runs |
| Table Calc Filter | The last stage — can only run after the rest of the view's data is assembled |

## Lab

1. In Sample Superstore, build a Context Filter on `Region: West`, then a Dimension Filter's Top 3 on `Sub-Category` by Sales. Confirm the Top 3 only reflects West's sub-categories.
2. Remove the Context Filter (leave the Region filter as a regular dimension filter) and rebuild the same Top 3. Compare the results and explain the difference using the order of operations.

## Check yourself

You're ready for Lesson 32 when you can list all six stages of
Tableau's order of operations from memory, in the correct sequence.
