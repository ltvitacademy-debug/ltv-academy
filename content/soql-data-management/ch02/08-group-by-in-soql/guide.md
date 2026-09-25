# GROUP BY in SOQL

Lesson 7 summarized a whole set of records into one row. `GROUP BY` is how you get one summary
row per category instead: opportunities by stage, accounts by industry, cases by priority.
The logic is the T-SQL you already know, with a handful of SOQL specifics.

## What you'll learn

- How `GROUP BY` pairs a plain field with an aggregate
- The rule every non-aggregated field must follow
- How to group by several fields, by a parent field, and how to sort the groups
- What `GROUP BY ROLLUP` adds

## One row per group

```sql
SELECT StageName, COUNT(Id) deals, SUM(Amount) pipeline
FROM Opportunity
GROUP BY StageName
```

This returns one row for each distinct `StageName`, with a count and a total for that stage.
The rule is the same as in T-SQL: **every field in the `SELECT` list must either be wrapped in
an aggregate function or appear in the `GROUP BY` clause.** Break that rule and the query
fails. Here `StageName` is grouped, and `COUNT(Id)` and `SUM(Amount)` are aggregates, so it
is valid.

Two details worth knowing. Records where the grouped field is null form their own group, so
you will see a row with a blank `StageName` if any exist. And because these are aggregate
queries, the rows come back as `AggregateResult` records, read by alias as you saw in Lesson 7.

## WHERE first, then GROUP BY

```sql
SELECT Industry, COUNT(Id) accounts, AVG(AnnualRevenue) avgRevenue
FROM Account
WHERE AnnualRevenue != null
GROUP BY Industry
ORDER BY COUNT(Id) DESC
```

The clause order is fixed: `SELECT`, `FROM`, `WHERE`, `GROUP BY`, `ORDER BY`, `LIMIT`. `WHERE`
filters individual rows before they are grouped, so here it removes accounts with no revenue
before averaging. To sort the groups by an aggregate you repeat the aggregate expression in
`ORDER BY`, as in `ORDER BY COUNT(Id) DESC`, which puts the largest industries first.

## Several fields, and parent fields

Group by more than one field and you get one row per unique combination.

```sql
SELECT StageName, Account.Industry, COUNT(Id) deals
FROM Opportunity
GROUP BY StageName, Account.Industry
```

This also shows that a field reached through a relationship, `Account.Industry`, can be used
in `GROUP BY`. Every non-aggregated field in the `SELECT` list appears in the `GROUP BY` list.

## ROLLUP for subtotals

`GROUP BY ROLLUP` adds subtotal and grand-total rows to the result.

```sql
SELECT Type, BillingCountry, COUNT(Id) accounts
FROM Account
GROUP BY ROLLUP(Type, BillingCountry)
```

Alongside the normal rows, you get a subtotal row for each `Type` and a grand-total row. In
those extra rows the rolled-up field comes back null, and the `GROUPING(field)` function tells
you whether a null is a real null or a subtotal marker. It is a useful tool, and you will
probably need the plain form far more often.

## Key terms

| Term | Meaning |
|---|---|
| GROUP BY | Collapses rows that share the same value(s) into one summary row per group |
| Grouped field | The field named in GROUP BY, which may appear unaggregated in the SELECT list |
| Group | The set of records sharing the same value in the grouped field(s) |
| ROLLUP | A GROUP BY modifier that adds subtotal and grand-total rows |
| GROUPING() | A function that distinguishes a subtotal-row null from a genuine null |

## Check yourself

You write `SELECT StageName, Type, COUNT(Id) FROM Opportunity GROUP BY StageName` and it
fails. What is the rule you broke, and what are two ways to fix it?
