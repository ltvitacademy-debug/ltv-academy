# Aggregate Functions

Chapter One was about listing records. Chapter Two is about summarizing them, and it starts
with the five aggregate functions you already know from T-SQL: `COUNT`, `SUM`, `AVG`, `MIN`,
and `MAX`. They work the way you expect, with a few Salesforce-specific behaviors that are
worth learning before they surprise you.

## What you'll learn

- The five aggregate functions SOQL supports, plus `COUNT_DISTINCT`
- The difference between `COUNT()` and `COUNT(field)`
- How to alias an aggregate so the result has a usable name
- What an `AggregateResult` is and what the most common rules are

## The five functions

```sql
SELECT COUNT(Id) total,
       SUM(Amount) totalAmount,
       AVG(Amount) avgAmount,
       MIN(Amount) smallest,
       MAX(Amount) largest
FROM Opportunity
WHERE StageName = 'Closed Won'
```

This returns a single row summarizing every closed-won opportunity. `SUM` and `AVG` work on
numeric and currency fields. `MIN` and `MAX` also work on dates and text, so
`MAX(CloseDate)` gives you the latest close date and `MIN(CreatedDate)` gives you the
oldest record. `COUNT_DISTINCT(field)` counts unique non-null values, so
`COUNT_DISTINCT(AccountId)` tells you how many different accounts have opportunities.

## COUNT() versus COUNT(field)

SOQL has two forms of count, and they behave differently.

```sql
-- Form 1: COUNT() with nothing inside
SELECT COUNT() FROM Account WHERE Industry = 'Technology'

-- Form 2: COUNT(field)
SELECT COUNT(Industry) FROM Account
```

`COUNT()` returns the number of matching rows. It has to be the only item in the `SELECT`
list, and it returns a plain integer rather than a row of results. `COUNT(field)` counts the
rows where that field is **not null**, and it can sit alongside other aggregates. That is the
same distinction as `COUNT(*)` versus `COUNT(column)` in T-SQL. `COUNT(Id)` is the everyday
choice for a total row count because `Id` is never null.

Aggregates in general skip null values. `AVG(Amount)` averages only the opportunities that
actually have an amount, exactly like T-SQL.

## Aliases and AggregateResult

Notice the words `total`, `totalAmount`, and so on in the first query. In SOQL you alias an
aggregate by placing the name directly after the function, with no `AS` keyword. If you do not
alias, Salesforce names the columns for you: `expr0`, `expr1`, `expr2`, in order.

Aggregate queries return **AggregateResult** records rather than normal sObject records. If
you run them in Developer Console or Workbench you see them as ordinary rows and columns. In
Apex code you read each value by its alias, as in `ar.get('totalAmount')`, which is why
giving every aggregate a meaningful alias is a habit worth building from the start.

## Rules that save you a debugging session

```sql
-- Not valid: a plain field mixed with an aggregate and no GROUP BY
SELECT StageName, COUNT(Id) FROM Opportunity

-- Not valid: aggregates cannot filter in WHERE
SELECT Id FROM Account WHERE COUNT(Contacts) > 5
```

Selecting a plain field alongside an aggregate requires `GROUP BY`, which is Lesson 8.
Filtering on an aggregate result requires `HAVING`, which is Lesson 9. `WHERE` runs before
any aggregation, so it can only filter individual rows.

## Key terms

| Term | Meaning |
|---|---|
| Aggregate function | A function that summarizes many rows into one value: COUNT, SUM, AVG, MIN, MAX |
| `COUNT()` | Returns the number of rows matched; must be the only item in the SELECT list |
| `COUNT(field)` | Counts rows where the field is not null; can appear with other aggregates |
| `COUNT_DISTINCT` | Counts unique non-null values of a field |
| Alias | A name placed directly after an aggregate, with no AS keyword, to label its result |
| AggregateResult | The result type of an aggregate query, read by alias, or `expr0`, `expr1` if unaliased |

## Check yourself

What is the difference between `SELECT COUNT() FROM Contact` and
`SELECT COUNT(Email) FROM Contact`, and why does it matter which one you use when some
contacts have no email?
