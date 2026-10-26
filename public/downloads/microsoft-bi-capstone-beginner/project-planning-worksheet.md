# Regional Sales Snapshot — Project Planning Worksheet

Beginner Capstone, based on Lesson 2: "Planning the T-SQL Query." Fill this out
*before* opening SSMS or Power BI — the lesson's whole point is that the plan
should exist in plain English first.

## 1. The business ask

Write the stakeholder's request as one specific, answerable sentence (not a
vague "something about sales"):

> _______________________________________________________________

## 2. Table list

For each table this report needs, name what it contributes:

| Table | What it gives you |
|---|---|
| `Sales.SalesOrderDetail` | ______________________________ |
| `Sales.SalesOrderHeader` | ______________________________ |
| `Production.Product` | ______________________________ |
| `Sales.SalesTerritory` | ______________________________ |

## 3. Join keys

Name the column that connects each pair of tables:

- `SalesOrderDetail` → `SalesOrderHeader` on: ______________________
- `SalesOrderDetail` → `Product` on: ______________________
- `SalesOrderHeader` → `SalesTerritory` on: ______________________

## 4. Starting point

Which table does the query start from, and why? (Hint: start from the table
that holds the number you're aggregating, to avoid double-counting.)

> _______________________________________________________________

## 5. Filter

What's the date range, in plain English, and what SQL function(s) will build
it without hardcoding a date?

> _______________________________________________________________

## 6. Grouping

What does one output row represent? List every column the `GROUP BY` needs:

> _______________________________________________________________

## Reference answer (Lesson 2 / Lesson 3)

Once you've filled this out yourself, compare it against the real plan and
query in `sales-extract-query-reference.sql` in this same download. If your
plan differs, figure out why before moving on — a different valid approach is
fine, a missed join key or wrong starting table is worth catching here, not
after you've written the SQL.
