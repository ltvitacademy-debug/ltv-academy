# Lesson 9 — Aggregate Queries

**Chapter 2 · Relationships and Aggregates · Lesson 9 of 23**

## What you'll learn

- The five core aggregate functions SOQL provides
- How aggregates behave with and without grouping
- How nulls are handled differently by COUNT() versus COUNT(fieldName)
- Why aggregate query results are a different shape than a normal query's results

## The core aggregate functions

SOQL supports a small, fixed set of aggregate functions that summarize across multiple rows instead of returning each row individually:

- `COUNT()` / `COUNT(fieldName)` — number of matching rows
- `COUNT_DISTINCT(fieldName)` — number of distinct non-null values
- `SUM(fieldName)` — total of a numeric field
- `AVG(fieldName)` — average of a numeric field
- `MIN(fieldName)` / `MAX(fieldName)` — lowest / highest value of a field

A query with no grouping and only aggregate functions in the `SELECT` list collapses the entire matching set down to a single summary row:

```sql
SELECT AVG(Amount), SUM(Amount), COUNT(Id)
FROM Opportunity
WHERE IsClosed = true
```

This doesn't return one row per opportunity — it returns exactly one row with three numbers: the average, the total, and the count of every closed opportunity.

## COUNT() versus COUNT(fieldName)

This distinction matters and is easy to get backwards. `COUNT()` with empty parentheses counts every row, period — it behaves like `COUNT(*)` in standard SQL. `COUNT(fieldName)`, by contrast, counts only rows where that specific field is **not null**:

```sql
SELECT COUNT(Id), COUNT(Email)
FROM Contact
```

If there are 500 contacts total but only 420 have an email on file, this returns `500` for `COUNT(Id)` and `420` for `COUNT(Email)`. Every other aggregate function (`SUM`, `AVG`, `MIN`, `MAX`, `COUNT_DISTINCT`) also ignores null values in the field being aggregated — `COUNT()` with nothing inside the parentheses is the one exception that counts rows regardless of any field's null status.

## MIN and MAX on non-numeric fields

`MIN` and `MAX` aren't limited to numbers — they work on dates too:

```sql
SELECT MIN(CreatedDate), MAX(CreatedDate)
FROM Case
```

And on picklist fields, where "lowest" and "highest" are determined by the picklist's defined sort order (the order values are arranged in Setup), not alphabetically — a detail worth remembering the first time a `MAX()` on a picklist field returns a value that looks alphabetically wrong but is actually correct per that field's configured value order.

## What the result actually looks like

An aggregate query without `GROUP BY` returns an `AggregateResult` in Apex, not a list of the queried object's own sObject type:

```apex
AggregateResult result = [
    SELECT AVG(Amount) avgAmt, COUNT(Id) total
    FROM Opportunity
    WHERE IsClosed = true
];
Decimal average = (Decimal) result.get('avgAmt');
Integer total = (Integer) result.get('total');
```

Giving each aggregate an alias (`avgAmt`, `total`) is what lets you retrieve the value by name afterward — without an alias, Salesforce auto-generates a less readable default name, so aliasing is a habit worth building from the start rather than something to clean up later.

## Key terms

| Term | Meaning |
|---|---|
| Aggregate function | A function (COUNT, SUM, AVG, MIN, MAX) that summarizes across multiple rows into one value |
| COUNT() vs COUNT(fieldName) | COUNT() counts every row; COUNT(fieldName) counts only rows where that field is non-null |
| AggregateResult | The Apex return type for an aggregate query, accessed by alias via .get('alias') |

## Lab

Against `Opportunity` in a Developer Edition org, write a query that returns the total count of opportunities, the count of opportunities with a non-null `Amount`, the sum of `Amount`, and the average `Amount` — all in one query with aliases for each. Then write it as Apex, retrieving each value from the resulting `AggregateResult` by its alias.

## Check yourself

What's the practical difference between COUNT() and COUNT(Amount) if some opportunities have a blank Amount? Why does an aggregate query without GROUP BY return a single row instead of one row per matching record?
