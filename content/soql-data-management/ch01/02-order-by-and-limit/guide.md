# ORDER BY & LIMIT

Sorting and capping results is one of the most familiar parts of SOQL — and also where the
syntax quietly moves on you. `ORDER BY` works exactly like T-SQL. `LIMIT` does the same job as
T-SQL's `TOP`, but it doesn't sit in the same place in the query.

## What you'll learn

- SOQL's `ORDER BY`, including `ASC`/`DESC` and multi-field sorts
- How SOQL handles nulls in a sort, which T-SQL doesn't let you control directly
- Why `LIMIT` goes at the *end* of a SOQL query instead of the start

## ORDER BY: exactly what you already know

```sql
SELECT Name, Amount, CloseDate
FROM Opportunity
WHERE StageName = 'Closed Won'
ORDER BY Amount DESC
```

`ORDER BY` behaves precisely like T-SQL: ascending by default, `DESC` for descending, and you
can sort on multiple fields separated by commas, evaluated left to right:

```sql
ORDER BY StageName ASC, Amount DESC
```

One genuine SOQL extra: you can control where nulls land in the sort with `NULLS FIRST` or
`NULLS LAST`, something T-SQL doesn't expose directly in the `ORDER BY` clause itself.

```sql
ORDER BY CloseDate DESC NULLS LAST
```

## LIMIT: same job as TOP, different address

This is the syntax difference that actually trips people up. T-SQL's `TOP` sits at the front
of the query, right next to `SELECT`:

```sql
-- T-SQL
SELECT TOP 10 Name, Amount
FROM Opportunities
ORDER BY Amount DESC
```

SOQL's `LIMIT` does the same job — cap the number of records returned — but it's written at
the very end of the query, after `ORDER BY`, the way MySQL or PostgreSQL write it:

```sql
-- SOQL
SELECT Name, Amount
FROM Opportunity
ORDER BY Amount DESC
LIMIT 10
```

If you write `LIMIT` up near `SELECT` out of T-SQL habit, the query simply fails to parse.
`LIMIT` is always the last clause in the statement.

## Putting it together, with OFFSET

SOQL also supports `OFFSET`, for skipping a number of records before the limit applies — handy
for paging through results:

```sql
SELECT Name, Amount, CloseDate
FROM Opportunity
WHERE StageName = 'Closed Won'
ORDER BY Amount DESC
LIMIT 10
OFFSET 20
```

That returns records 21–30 by `Amount`, descending. Clause order is fixed: `WHERE`, then
`ORDER BY`, then `LIMIT`, then `OFFSET`.

## Key terms

| Term | Meaning |
|---|---|
| ORDER BY | Sorts results; works identically to T-SQL, including multi-field sorts |
| ASC / DESC | Ascending (default) or descending sort direction |
| NULLS FIRST / NULLS LAST | SOQL-specific control over where null values land in a sort |
| LIMIT | Caps the number of records returned; always the last clause, unlike T-SQL's TOP |
| OFFSET | Skips a number of records before LIMIT applies, used for paging |

## Check yourself

A T-SQL developer writes `SELECT TOP 10 Name FROM Opportunities ORDER BY Amount DESC` and
tries to translate it directly into SOQL by writing `SELECT TOP 10 Name, Amount FROM
Opportunity`. What's wrong, and how should the query actually be written?
