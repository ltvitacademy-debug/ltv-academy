# Lesson 4 — Operators and Logical Expressions

**Chapter 1 · Querying Salesforce · Lesson 4 of 23**

## What you'll learn

- The comparison operators SOQL supports beyond `=` and `>`
- Pattern matching with `LIKE` and its two wildcards
- Checking membership with `IN` and `NOT IN`
- Combining and negating conditions with `AND`, `OR`, and `NOT`

## Comparison operators

Beyond the `=`, `!=`, `<`, `<=`, `>`, and `>=` you already used in Lesson 2, SOQL's comparison operators work almost exactly like SQL's:

```sql
SELECT Name, AnnualRevenue
FROM Account
WHERE AnnualRevenue >= 500000
```

One habit worth building now: `!=` (not equals) and `NOT LIKE` are **unselective** operators — they can't efficiently use an index, because "everything except this one value" usually matches most of a large table. You'll see exactly why that matters once you reach query optimization in Chapter 4, but it's worth noting the first time you reach for `!=`.

## LIKE and wildcards

`LIKE` does partial text matching on string fields, using two wildcard characters:

- `%` matches zero or more characters
- `_` matches exactly one character

```sql
SELECT Name FROM Account
WHERE Name LIKE 'Acme%'
```

This matches `Acme`, `Acme Corp`, and `Acme Industries`, but not `Global Acme` — `LIKE` with a trailing `%` anchors the match at the start of the string unless you also put a `%` at the front:

```sql
SELECT Name FROM Account
WHERE Name LIKE '%Acme%'
```

That version matches the value anywhere in the string. If you ever need to match a literal `%` or `_` character rather than treat it as a wildcard, escape it with a backslash.

## IN and NOT IN

`IN` checks whether a field's value matches any value in a list — much cleaner than stacking `OR` conditions:

```sql
SELECT Name FROM Account
WHERE BillingState IN ('California', 'New York', 'Texas')
```

`NOT IN` is the negation — accounts whose `BillingState` matches none of the listed values. Both forms also support subqueries instead of a literal list, which is exactly how semi-joins and anti-joins work — you'll build those in Chapter 2.

## AND, OR, and NOT

You've already used `AND` and `OR` to combine conditions. `NOT` negates a single condition:

```sql
SELECT Name FROM Opportunity
WHERE NOT (StageName = 'Closed Lost')
```

In practice, most people reach for `!=` instead of `NOT (... = ...)` for a simple negation, but `NOT` becomes genuinely useful once a condition is more complex than a single equality check, since it lets you negate an entire parenthesized expression at once rather than rewriting every piece of it.

## A combined example

```sql
SELECT Name, StageName, Amount
FROM Opportunity
WHERE (StageName IN ('Negotiation', 'Proposal'))
AND Amount > 50000
AND Name NOT LIKE '%Test%'
```

Read this as: open, high-value opportunities that are deep in the pipeline, with anything that looks like test data filtered out. Every operator you've seen this lesson shows up together in one realistic query — this is roughly what a sales-operations report filter looks like in production.

## Key terms

| Term | Meaning |
|---|---|
| LIKE | Pattern-matches string fields using `%` (zero or more characters) and `_` (exactly one character) |
| IN / NOT IN | Checks whether a field's value is, or isn't, among a list (or subquery) of values |
| NOT | Negates an entire condition or parenthesized expression |
| Unselective operator | An operator like `!=` or `NOT LIKE` that generally can't use an index efficiently |

## Lab

Against `Contact` in a Developer Edition org, write one query that finds every contact whose `LastName` starts with "Mc" using `LIKE`. Write a second query that finds every contact whose `MailingState` is in a list of three states you choose, using `IN`. Combine both conditions into a single query with `AND`, and confirm the result set is the intersection of the two.

## Check yourself

What's the difference between `LIKE 'Acme%'` and `LIKE '%Acme%'`? Why are `!=` and `NOT LIKE` described as "unselective," and why does that distinction matter even though both are perfectly valid, correct SOQL?
