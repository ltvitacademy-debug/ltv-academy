# Comparison & Logical Operators

Now that you can sort and cap results, it's time to filter them properly. The good news: SOQL's
comparison and logical operators are almost a straight copy of T-SQL's. The pattern-matching and
list-membership operators carry over too, with syntax you'll recognize immediately.

## What you'll learn

- SOQL's comparison operators (`=`, `!=`, `<`, `>`, `<=`, `>=`) and logical operators (`AND`,
  `OR`, `NOT`)
- `LIKE` with `%` and `_` wildcards, identical to T-SQL
- The `IN` operator for matching against a list of values

## Comparison and logical operators: no surprises

```sql
SELECT Name, Amount, StageName
FROM Opportunity
WHERE Amount >= 50000
  AND (StageName = 'Negotiation/Review' OR StageName = 'Proposal')
  AND NOT IsClosed = true
```

`=`, `!=`, `<`, `>`, `<=`, `>=` all mean exactly what they mean in T-SQL. `AND`, `OR`, and `NOT`
combine conditions the same way, and parentheses group them the same way too — SOQL respects
standard operator precedence, so wrap `OR` conditions in parentheses when mixing with `AND`,
just like you already do in T-SQL.

## LIKE: the same two wildcards

```sql
SELECT Name, Email
FROM Contact
WHERE Email LIKE '%@acme.com'

SELECT Name
FROM Account
WHERE Name LIKE 'Acme_Corp'
```

`LIKE` uses the identical two wildcards T-SQL uses: `%` matches any number of characters
(including zero), `_` matches exactly one character. If you can write a T-SQL `LIKE` pattern,
you can write a SOQL one without changing anything.

## IN: matching against a list

```sql
SELECT Name, StageName
FROM Opportunity
WHERE StageName IN ('Closed Won', 'Negotiation/Review', 'Proposal')
```

`IN` works the same way too: the field's value has to match one of the values in the
parenthesized, comma-separated list. `NOT IN` excludes any record matching a value in the list.
This is especially useful in SOQL because picklist fields like `StageName` often have several
valid values you want to include at once, and it reads more cleanly than a chain of `OR`
conditions.

## Key terms

| Term | Meaning |
|---|---|
| Comparison operators | `=`, `!=`, `<`, `>`, `<=`, `>=` — identical behavior to T-SQL |
| Logical operators | `AND`, `OR`, `NOT` — combine conditions, respect the same precedence as T-SQL |
| LIKE | Pattern match using `%` (any number of characters) and `_` (exactly one character) |
| IN | Matches a field against a list of values; `NOT IN` excludes matches |
| Picklist | A Salesforce field type with a constrained set of valid values, e.g. StageName |

## Check yourself

Write a SOQL query against the `Contact` object that returns `Name` and `Email` for contacts
whose `Email` ends in `@acme.com` and whose `MailingState` is either `'GA'` or `'FL'`.
