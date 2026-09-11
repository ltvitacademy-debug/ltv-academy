# Lesson 23 — Aggregate

**Chapter 4 · Data Flow Transformations · Lesson 23 of 49**

## What you'll learn

- The seven operations the Aggregate transformation supports
- Why it only outputs the columns actually involved in grouping or
  aggregating — and drops everything else
- What it means that the Aggregate transformation is **asynchronous**
- How multiple aggregations and multiple outputs work together

## GROUP BY, entirely inside the pipeline

The **Aggregate** transformation applies aggregate functions — Sum,
Average, Count, and more — to column values, and it supports a
**Group By** clause just like T-SQL's `GROUP BY`. If you already know
how to write:

```sql
SELECT CountryRegion, SUM(Population)
FROM Sales
GROUP BY CountryRegion
```

...you already understand what this transformation does. The difference
is *where* it runs: entirely inside the data flow, on rows that are
already flowing through your pipeline, with no round trip back to the
database required.

## The seven operations

| Operation | What it does |
|---|---|
| Group By | Divides the dataset into groups; any data type can be used |
| Sum | Totals a numeric column's values |
| Average | Averages a numeric column's values |
| Count | Counts the number of items in a group |
| Count distinct | Counts the number of unique, non-null values in a group |
| Minimum | Returns the minimum value (numeric, date, or time types only) |
| Maximum | Returns the maximum value (numeric, date, or time types only) |

You can apply **multiple aggregations to a single input column** — for
example, both Sum and Average on the same `Sales` column in the same
transformation — and you can even route different aggregations to
**different outputs**, since the Aggregate transformation supports more
than one output.

## Only the relevant columns survive

Here's a detail that surprises people the first time they hit it: the
Aggregate transformation **does not pass through** any column
untouched. It only outputs columns that are either used for grouping or
have an aggregate function applied to them. If your input has
`CountryRegion`, `City`, and `Population`, and you group by
`CountryRegion` while summing `Population`, the output has exactly two
columns — `City` is gone, because nothing referenced it.

## Why it's asynchronous

Most transformations you've seen so far process rows one at a time as
they stream through. The Aggregate transformation is **asynchronous** —
it has to consume the *entire* rowset before it can publish anything,
because it can't know a group's final sum until every row in that group
has been seen. That makes it a natural place to watch for memory and
performance considerations: setting the **Keys** or **KeysScale**
property tells the transformation roughly how many groups to expect, so
it can size its internal cache efficiently instead of guessing.

## Key terms

| Term | Meaning |
|---|---|
| Group By | The Aggregate operation that divides rows into groups by column value |
| Asynchronous transformation | One that must consume its entire input before producing any output |
| IsBig | A property flagging a column's values as needing wider numeric handling (DT_R8/DT_UI8) |
| Keys / KeysScale | Performance hints estimating how many groups a Group By will produce |

## Lab

1. Add an OLE DB source reading `Sales.SalesOrderDetail` from
   AdventureWorks2012 (it has `ProductID` and `OrderQty` columns).
2. Drag an **Aggregate** transformation onto the data flow and connect
   the source to it.
3. In the Aggregations tab, check `ProductID` and set its Operation to
   **Group By**. Check `OrderQty` and add it twice — once with
   **Sum** and once with **Average** — giving each an Output Alias
   (`TotalQty` and `AvgQty`).
4. Add a data viewer after the transformation and run the package.
   Confirm the output has exactly three columns — `ProductID`,
   `TotalQty`, `AvgQty` — and one row per distinct `ProductID`.

## Check yourself

You're ready for Lesson 24 when you can explain, without looking: why
does the Aggregate transformation have to wait for the entire rowset
before it can output anything, and what does that mean for a very large
input?
