# HAVING in SOQL

Lesson 8 produced one summary row per group. But often you only want the groups that meet a
condition: industries with more than ten accounts, stages worth more than a million dollars,
email addresses that appear more than once. `WHERE` cannot do that, because it runs before
any grouping happens. `HAVING` can.

## What you'll learn

- Why `WHERE` cannot filter on an aggregate, and what `HAVING` does instead
- How to combine `WHERE` and `HAVING` in one query
- What can and cannot appear inside `HAVING`
- A classic real-world use: finding duplicate contacts

## WHERE filters rows, HAVING filters groups

```sql
SELECT Industry, COUNT(Id) accounts
FROM Account
GROUP BY Industry
HAVING COUNT(Id) > 10
```

`GROUP BY` builds one row per industry, then `HAVING` keeps only the groups whose count is
above ten. This is the exact same division of labor as T-SQL: `WHERE` decides which
**rows** go into the groups, and `HAVING` decides which **groups** survive.

## Using both together

```sql
SELECT StageName, COUNT(Id) deals, SUM(Amount) pipeline
FROM Opportunity
WHERE CloseDate = THIS_YEAR
GROUP BY StageName
HAVING SUM(Amount) > 1000000
   AND COUNT(Id) >= 3
ORDER BY SUM(Amount) DESC
```

Read it in execution order. `WHERE` first narrows the opportunities to this year's close
dates. `GROUP BY` builds one row per stage. `HAVING` keeps only stages with more than a
million dollars and at least three deals. `ORDER BY` sorts the survivors. The full clause
order is `SELECT`, `FROM`, `WHERE`, `GROUP BY`, `HAVING`, `ORDER BY`, `LIMIT`.

As a rule, put any condition that does not involve an aggregate in `WHERE`. It is applied
earlier, on individual rows, so the groups have less to process.

## What HAVING accepts

Inside `HAVING` you can use aggregate functions and fields that appear in your `GROUP BY`.
Repeat the aggregate expression in full, such as `HAVING COUNT(Id) > 10`. Do not expect to
reuse the alias you gave it in the `SELECT` list. You can combine conditions with `AND`,
`OR`, and parentheses, and use the same comparison operators as `WHERE`. You cannot
filter in `HAVING` on an ungrouped, non-aggregated field, since after grouping that field no
longer has one value per group.

## Real use: finding duplicates

This pattern is the fastest way to find duplicate records in a Salesforce org, and it
previews the data quality work in Chapter 7.

```sql
SELECT Email, COUNT(Id) copies
FROM Contact
WHERE Email != null
GROUP BY Email
HAVING COUNT(Id) > 1
ORDER BY COUNT(Id) DESC
```

Every email that appears on more than one contact comes back with its count. The
`WHERE Email != null` matters: without it, all the contacts with no email would form one large
null group and dominate the results with a meaningless count.

## Key terms

| Term | Meaning |
|---|---|
| HAVING | Filters groups after aggregation, using aggregate expressions or grouped fields |
| WHERE | Filters individual rows before grouping; cannot reference aggregate functions |
| Execution order | WHERE, then GROUP BY, then HAVING, then ORDER BY and LIMIT |
| Duplicate detection | Grouping on a field and keeping groups with COUNT(Id) > 1 |

## Check yourself

You want industries with more than five Technology-or-Finance accounts. Which condition goes
in `WHERE`, which goes in `HAVING`, and why does it help to put the industry filter in
`WHERE` where possible?
