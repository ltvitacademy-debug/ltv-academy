# Lesson 73 — Real-World LOD Analysis: Customer Lifetime Sales & First Purchase

**Chapter 12 · Level of Detail Expressions · Lesson 73 of 95**

## What you'll learn

- How to combine multiple `FIXED` LOD expressions into one real analysis
- Building a "new vs. returning" flag from a customer's first purchase
  date
- Grouping customers into monthly cohorts by first purchase
- How this chapter's four keywords/concepts (FIXED, INCLUDE/EXCLUDE,
  filter order, LOD vs. table calc) come together in a single workbook

## The business question

"Which customers are worth the most over their entire relationship with
us, and are we still bringing in new customers each month, or just
re-selling to the same base?" That's two things a raw `SUM(Sales)` view
can't answer on its own — it needs both a lifetime total *per customer*
and a *first purchase date* per customer, both computed independent of
whatever's on the current view. That's a job for `FIXED`.

## Step 1: Lifetime sales per customer

```
{ FIXED [Customer Name] : SUM([Sales]) }
```

Call this `Customer Lifetime Sales`. Wherever it appears — on a view
grained by Order ID, Product, Region, anything — it always shows that
customer's full-relationship total.

## Step 2: First purchase date per customer

```
{ FIXED [Customer Name] : MIN([Order Date]) }
```

Call this `Customer First Order Date`. This is the earliest order date
across every order that customer has ever placed, again independent of
the view.

## Step 3: A new-vs-returning flag, built from Step 2

```
IF [Order Date] = [Customer First Order Date]
THEN "New"
ELSE "Returning"
END
```

Every row where the order's own date matches that customer's very first
order date gets labeled "New" — every other order from that customer,
"Returning." This calculation only works because `Customer First Order
Date` is stable per customer regardless of view — a table calculation
alone (Chapter 7 / Lesson 72) has no clean way to produce this, since it
would need to know each customer's absolute first date, not just an
ordering within whatever's currently on screen.

## Step 4: Monthly cohorts, built from Step 2

```
DATETRUNC('month', [Customer First Order Date])
```

Call this `Cohort Month`. Every customer who made their very first
purchase in, say, March 2011 lands in the same cohort, letting you build a
view with `Cohort Month` on Rows and `Customer Lifetime Sales` (averaged,
or summed) on Columns — a genuine cohort-value comparison, entirely built
from two `FIXED` expressions and a date function.

## Putting it together

| Field | Formula | What it gives you |
|---|---|---|
| `Customer Lifetime Sales` | `{ FIXED [Customer Name] : SUM([Sales]) }` | Stable per-customer lifetime total |
| `Customer First Order Date` | `{ FIXED [Customer Name] : MIN([Order Date]) }` | Stable per-customer first-purchase date |
| `New vs. Returning` | `IF [Order Date] = [Customer First Order Date] THEN "New" ELSE "Returning" END` | Flags each individual order |
| `Cohort Month` | `DATETRUNC('month', [Customer First Order Date])` | Groups customers by acquisition month |

A dashboard built from these four fields answers the original business
question directly: a bar chart of `SUM(Sales)` colored by
`New vs. Returning`, next to a line chart of `AVG(Customer Lifetime
Sales)` by `Cohort Month` — both driven entirely by two `FIXED` LOD
expressions computed once, reused everywhere.

## Key terms

| Term | Meaning |
|---|---|
| Cohort | A group of customers who share a first-purchase period, used to compare value across acquisition periods |
| New vs. returning | A flag distinguishing a customer's very first order from every subsequent one |
| DATETRUNC | A date function that rounds a date down to the start of a given period (here, month) |

## Lab

1. On Sample Superstore, build `Customer Lifetime Sales` and
   `Customer First Order Date` exactly as shown above.
2. Build `New vs. Returning` and `Cohort Month` from those two fields.
3. Build one view: `Cohort Month` on Rows, `AVG([Customer Lifetime
   Sales])` on Columns, and `New vs. Returning` as a filter set to
   "New" only (so you're only counting each customer once, at their
   first order). Which cohort month has the highest average lifetime
   value?

## Check yourself

You're ready for Lesson 74 when you've built all four calculated fields
above from scratch (not copied) and can explain, without checking back,
why `New vs. Returning` needs a FIXED expression rather than a plain
comparison of dates.
