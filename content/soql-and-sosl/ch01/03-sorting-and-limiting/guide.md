# Lesson 3 — Sorting and Limiting

**Chapter 1 · Querying Salesforce · Lesson 3 of 23**

## What you'll learn

- Sorting results with `ORDER BY`, including multiple sort keys
- Controlling where nulls land in a sort with `NULLS FIRST` / `NULLS LAST`
- Capping result size with `LIMIT`
- Paging through results with `OFFSET`, and its documented ceiling

## ORDER BY

`ORDER BY` sorts the rows a query returns. Ascending (`ASC`) is the default, so these two queries return identically ordered results:

```sql
SELECT Name FROM Account ORDER BY Name
SELECT Name FROM Account ORDER BY Name ASC
```

Reverse it with `DESC`:

```sql
SELECT Name, AnnualRevenue
FROM Account
ORDER BY AnnualRevenue DESC
```

You can sort on more than one field — the second field only breaks ties within groups that share the same value on the first field:

```sql
SELECT Name, Industry, AnnualRevenue
FROM Account
ORDER BY Industry ASC, AnnualRevenue DESC
```

This groups accounts by industry alphabetically, and within each industry, sorts by revenue highest-first.

## Where nulls land

By default, Salesforce sorts null values first. If you want nulls to sort to the bottom instead, say so explicitly:

```sql
SELECT Name FROM Account ORDER BY Name DESC NULLS LAST
```

`NULLS FIRST` and `NULLS LAST` are the documented keywords for controlling this — there's no `IS NULL`-style syntax here, just a modifier on the sort itself. One more documented caveat worth internalizing early: Salesforce doesn't guarantee a stable order among rows that tie on every field in your `ORDER BY` list. If you need a fully deterministic order (useful for pagination, where the same record showing up twice or not at all on different pages is a real bug), add a unique tiebreaker field like `Id` as the last sort key.

## LIMIT

`LIMIT` caps how many rows come back, applied after sorting:

```sql
SELECT Name, AnnualRevenue
FROM Account
ORDER BY AnnualRevenue DESC
LIMIT 10
```

This is "top 10 accounts by revenue" — exactly the kind of query you'd write for a dashboard widget or a quick executive ask, and a pattern you'll lean on constantly once you're writing reporting queries.

## OFFSET

`OFFSET` skips a number of rows before returning the rest, which lets you page through a result set:

```sql
SELECT Name FROM Account
ORDER BY Name
LIMIT 20 OFFSET 20
```

That fetches rows 21–40 — the "second page" if your page size is 20. `OFFSET` has a hard, documented ceiling: the maximum offset is 2,000 rows; going past it raises a `NUMBER_OUTSIDE_VALID_RANGE` error. That ceiling matters architecturally — `OFFSET`-based paging works fine for a UI list view a user might click through a few pages of, but it is not a viable strategy for systematically walking an object with hundreds of thousands of rows. For that, later lessons in this course (and the Large Data Volumes lesson in Chapter 4) cover filtering on an indexed field like `Id` instead.

## Putting it together

```sql
SELECT Name, StageName, Amount
FROM Opportunity
WHERE IsClosed = false
ORDER BY Amount DESC NULLS LAST
LIMIT 5
```

Five open opportunities, biggest deal first, with any opportunity missing an `Amount` pushed to the bottom rather than sorted ambiguously at the top.

## Key terms

| Term | Meaning |
|---|---|
| ORDER BY | Sorts returned rows; ASC is the default direction |
| NULLS FIRST / NULLS LAST | Explicitly controls where null-valued rows land in a sort |
| LIMIT | Caps the number of rows returned, applied after sorting |
| OFFSET | Skips a number of rows before returning the rest; capped at 2,000 rows in SOQL |

## Lab

Against `Opportunity` in a Developer Edition org, write a query that returns `Name`, `Amount`, and `CloseDate` for open opportunities (`IsClosed = false`), sorted by `Amount` descending with nulls last, limited to the top 5. Then write a second query using `LIMIT` and `OFFSET` together to fetch "page 2" of all opportunities sorted by `Name`, with a page size of 10.

## Check yourself

What's the default sort direction in SOQL, and where do null values land by default? Why is OFFSET-based paging a poor strategy once an object has hundreds of thousands of rows, even though it works perfectly well for a small result set?
