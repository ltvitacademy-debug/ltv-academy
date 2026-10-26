# Lesson 3 — Writing the Multi-Table T-SQL Extract

**Chapter 1 · Intermediate Capstone: Customer Segment & Territory Report · Lesson 3 of 16**

## What you'll learn

- Writing the customer-segment extract: Customer joined to order data
- Writing the territory extract: SalesTerritory joined to order data
- Why joining through SalesOrderDetail causes row fan-out, and why that's expected here
- Why each extract is scoped to exactly what one stakeholder's page needs, no more

## Extract 1 — the customer-segment extract

This is the Marketing Manager's extract. It joins `Sales.Customer` to `Sales.SalesOrderHeader` and
`Sales.SalesOrderDetail`, and builds the segment label directly in SQL with a `CASE` expression:

```sql
SELECT
    c.CustomerID,
    CASE WHEN c.StoreID IS NOT NULL THEN 'Store/Reseller' ELSE 'Individual' END AS CustomerSegment,
    soh.SalesOrderID,
    soh.OrderDate,
    sod.LineTotal
FROM Sales.Customer AS c
JOIN Sales.SalesOrderHeader AS soh ON soh.CustomerID = c.CustomerID
JOIN Sales.SalesOrderDetail AS sod ON sod.SalesOrderID = soh.SalesOrderID
WHERE soh.Status = 5;
```

`Status = 5` restricts the extract to shipped orders only — a deliberate filter, not an
afterthought, so both stakeholders' pages are built on the same real definition of "a completed
sale."

## Extract 2 — the territory extract

This is the Sales Director's extract. Same order data, joined through a different dimension:

```sql
SELECT
    st.TerritoryID,
    st.Name  AS TerritoryName,
    st.Group AS TerritoryGroup,
    soh.SalesOrderID,
    soh.OrderDate,
    sod.LineTotal
FROM Sales.SalesTerritory AS st
JOIN Sales.SalesOrderHeader AS soh ON soh.TerritoryID = st.TerritoryID
JOIN Sales.SalesOrderDetail AS sod ON sod.SalesOrderID = soh.SalesOrderID
WHERE soh.Status = 5;
```

## Why both extracts have more rows than you might expect

`Sales.SalesOrderDetail` has many rows per `SalesOrderID` — one per order line. Joining it in means
every header-level column (`OrderDate`, `CustomerID`, `TerritoryID`) repeats once per line on that
order. That's not a mistake; it's the correct, expected shape for a line-level extract, because the
actual dollar amount lives in `SalesOrderDetail.LineTotal`, not on the header. Aggregation to
order-level or customer-level totals happens later, deliberately, once the data reaches pandas —
not by trying to pre-aggregate inside this extract query.

## Why two separate extracts, not one combined query

It's tempting to write one giant query joining `Customer`, `SalesTerritory`, `SalesOrderHeader`,
and `SalesOrderDetail` all at once. This project deliberately keeps them as two separate extracts
instead, because that's the real scenario from Lesson 1: two different people, pulling two
different extracts, independently. The join-them-properly work is Lesson 6's job, in Python — and
building that skill is part of the point of this project.

## Key terms

| Term | Meaning |
|---|---|
| Row fan-out | Rows repeating once per match in a one-to-many join |
| `Status = 5` | AdventureWorks2012's code for a shipped (completed) sales order |
| Line-level extract | An extract with one row per order line, not pre-aggregated to order or customer level |

## Lab

Run both extracts against your own AdventureWorks2012 instance. Confirm the customer extract's
`CustomerSegment` column only ever shows `Individual` or `Store/Reseller`, and confirm the
territory extract's row count is roughly the same order of magnitude as the customer extract's
(both are joined through the same `SalesOrderDetail` table).

## Check yourself

You're ready for Lesson 4 when you can answer, without looking: why does joining in
`SalesOrderDetail` cause each header-level column to repeat multiple times, and why does this
project keep the two extracts separate instead of combining them in one T-SQL query?
