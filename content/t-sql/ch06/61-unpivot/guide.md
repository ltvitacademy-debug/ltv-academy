# Lesson 61 — UNPIVOT

**Chapter 6 · Subqueries, CTEs, and Views · Lesson 10 of 10**

## What you'll learn

- `UNPIVOT` — the reverse of `PIVOT`, columns back into rows
- Where you'd actually encounter data that needs unpivoting
- The syntax parallel with `PIVOT`
- Wrapping up Chapter 6

## The shape UNPIVOT solves

`PIVOT` (Lesson 60) turns rows into columns. `UNPIVOT` does the **exact
opposite** — turning several columns back into rows. You'll run into this
most often with data that was **already** stored in a wide, spreadsheet-like
shape (quarterly sales columns, `Q1`, `Q2`, `Q3`, `Q4`) that you need back
in a tall, one-row-per-value shape for proper querying, joining, or
aggregating.

## An UNPIVOT example

Imagine a (illustrative) summary table already shaped with one column per
quarter:

```sql
-- Illustrative: a table already shaped with Q1..Q4 as separate columns
-- SalesID | Q1Sales | Q2Sales | Q3Sales | Q4Sales
```

```sql
SELECT SalesID, Quarter, SalesAmount
FROM QuarterlySales
UNPIVOT (
    SalesAmount FOR Quarter IN (Q1Sales, Q2Sales, Q3Sales, Q4Sales)
) AS UnpivotedData;
```

This takes four separate columns (`Q1Sales` through `Q4Sales`) and turns
them into **two** columns instead: `Quarter` (holding which column each
value came from) and `SalesAmount` (holding the value itself) — with **one
row per original column**, per `SalesID`.

## The syntax parallel with PIVOT

`UNPIVOT`'s syntax deliberately mirrors `PIVOT`'s:

| | `PIVOT` | `UNPIVOT` |
|---|---|---|
| Direction | Rows → columns | Columns → rows |
| Needs | An aggregate function | No aggregate — it's just reshaping |
| `FOR` | Names the new column headers | Names the new column that holds which original column each row came from |
| `IN (...)` | Values that become columns | Columns that become row values |

## When you'd reach for it

`UNPIVOT` matters most when working with data that arrives already
"wide" — a spreadsheet import, a legacy system's export — and needs to be
normalized into a proper tall shape before it can be joined, grouped, or
aggregated cleanly with the rest of your schema.

## Chapter 6 recap

You can now build queries out of other queries: scalar and multi-value
subqueries, correlated subqueries, `EXISTS`/`NOT EXISTS`, CTEs (including
recursive ones), views, and reshaping data with `PIVOT`/`UNPIVOT`.
Chapter 7 moves into T-SQL as a **programming language**: variables,
control flow, loops, and stored procedures.

## Key terms

| Term | Meaning |
|---|---|
| `UNPIVOT` | Turns multiple columns back into rows — the reverse of `PIVOT` |

## Lab

Using AdventureWorks2012's `Production.Product` table (not natively
"wide," but illustrative for syntax practice), write out — without
necessarily running it — what an `UNPIVOT` statement would look like if
`ListPrice`, `StandardCost`, and `Weight` were three separate "wide"
columns you wanted collapsed into one `MetricName`/`MetricValue` pair.

## Check yourself

You're ready for Chapter 7 when you can answer, without looking: what
does `UNPIVOT` do that `PIVOT` doesn't, and what real-world data shape
typically needs `UNPIVOT` applied to it?
