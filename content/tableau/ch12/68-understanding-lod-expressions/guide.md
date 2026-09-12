# Lesson 68 — Understanding Level of Detail Expressions

**Chapter 12 · Level of Detail Expressions · Lesson 68 of 95**

## What you'll learn

- What "level of detail" means in Tableau, and why the view's own level of
  detail sometimes isn't the level of detail you need
- The LOD expression syntax: `{ SCOPE [dimension] : AGGREGATE([measure]) }`
- The three LOD keywords — `FIXED`, `INCLUDE`, `EXCLUDE` — and what each one
  does at a glance
- Where LOD expressions fit next to what you already know: regular
  aggregations, and the table calculations from Chapter 7

## The problem LOD expressions solve

Every worksheet in Tableau computes at **the level of detail of the view** —
whatever dimensions are on Rows, Columns, and the Marks card. Drop
`Customer Name` on Rows and `SUM(Sales)` on Text, and Tableau aggregates
sales *per customer*, because that's the view's grain. That's normally
exactly what you want.

But sometimes you need a number computed at a **different** grain than the
one on screen — total sales per customer, displayed on a view that's
grained by *order*, so you can compare each order to that customer's
lifetime total. Regular aggregation can't do that: it only knows the grain
of the view it's sitting in. That's the gap **Level of Detail (LOD)
expressions** close — they let a calculated field declare its *own* grain,
independent of (or partially independent of) whatever's on the shelves.

## The syntax

Every LOD expression has the same shape:

```
{ FIXED [Customer Name] : SUM([Sales]) }
```

Read it as three parts:

| Part | Meaning |
|---|---|
| `{ }` | Curly braces mark it as an LOD expression |
| `FIXED [Customer Name]` | The **scope** — which dimension(s) to compute at, and which keyword controls how that scope relates to the view |
| `: SUM([Sales])` | The **aggregation** — any standard aggregate function, computed at that scope |

This one computes total sales *per customer*, full stop — regardless of
what else is on the view, and (for `FIXED`) regardless of most filters.

## The three keywords

| Keyword | What it does |
|---|---|
| **FIXED** | Computes at *exactly* the dimension(s) listed — ignores the view's other dimensions and most filters entirely (Lesson 69) |
| **INCLUDE** | Computes at the view's dimensions *plus* the ones listed — adds finer detail than the view has (Lesson 70) |
| **EXCLUDE** | Computes at the view's dimensions *minus* the ones listed — removes detail the view would otherwise have (Lesson 70) |

```
{ FIXED [Customer Name] : SUM([Sales]) }      -- ignores the view entirely
{ INCLUDE [Order ID] : COUNTD([Product Name]) } -- view's grain + Order ID
{ EXCLUDE [Sub-Category] : SUM([Sales]) }       -- view's grain − Sub-Category
```

## How this relates to what you already know

You've already met calculated fields (Chapter 6) and table calculations
(Chapter 7). LOD expressions sit between them:

- A **regular aggregation** like `SUM([Sales])` computes at the view's
  grain, no options.
- An **LOD expression** computes at a grain you name explicitly, *before*
  most filtering and *before* the view's own aggregation happens.
- A **table calculation** computes *after* the view's query returns,
  working only with what's already on screen (Lesson 72 compares the two
  directly).

Tableau's own documentation calls LOD expressions one of the most powerful
— and most misunderstood — features in the product, precisely because
they change *when* in the query pipeline a calculation runs, not just *what*
it calculates.

## Key terms

| Term | Meaning |
|---|---|
| Level of detail (LOD) | The granularity a calculation is computed at — which dimension(s) define one "row" of the calculation |
| View LOD | The level of detail implied by whatever dimensions are on Rows, Columns, and the Marks card |
| FIXED / INCLUDE / EXCLUDE | The three LOD keywords, each changing how the expression's scope relates to the view LOD |
| Aggregation | The `SUM`, `AVG`, `MIN`, `MAX`, `COUNTD`, etc. that an LOD expression wraps |

## Lab

1. Open a workbook connected to Sample Superstore. Create a calculated
   field named `Customer Total Sales` with `{ FIXED [Customer Name] : SUM([Sales]) }`.
2. Build a view with `Order ID` on Rows and `SUM([Sales])` on Text, then
   add `Customer Total Sales` next to it. Notice the second column repeats
   the same number for every order from the same customer — that's the
   FIXED grain staying constant regardless of the order-level view.
3. Write down, in your own words, what would change if you swapped
   `FIXED` for `INCLUDE` in that same calculation.

## Check yourself

You're ready for Lesson 69 when you can write the three-part syntax of an
LOD expression from memory and explain, in one sentence each, what makes
FIXED, INCLUDE, and EXCLUDE different from one another.
