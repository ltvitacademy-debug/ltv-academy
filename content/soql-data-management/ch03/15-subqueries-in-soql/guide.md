# Subqueries in SOQL

This chapter has shown two very different things that both involve a `SELECT` inside
parentheses. The parent-to-child subquery from Lesson 11 sat in the `SELECT` list and
brought child records back. The semi-join and anti-join from Lesson 14 sat in the `WHERE`
clause and only filtered. This lesson puts them side by side, so you always know which one
you're writing, and shows how to use both in the same query.

## What you'll learn

- The two places a subquery may appear in SOQL, and what each does
- The FROM-clause difference that catches people out
- How to combine both kinds in one query, and what SOQL does not allow

## Two subqueries, two jobs

```sql
-- 1. In the SELECT list: brings child records back
SELECT Name, (SELECT LastName FROM Contacts)
FROM Account

-- 2. In the WHERE clause: filters, brings nothing back
SELECT Name
FROM Account
WHERE Id IN (SELECT AccountId FROM Opportunity)
```

| | Parent-to-child | Semi-join / anti-join |
|---|---|---|
| Where it sits | The `SELECT` list | The `WHERE` clause |
| What it does | Returns nested child records | Filters the outer records |
| Inner `FROM` uses | The **child relationship name** (`Contacts`) | The **object name** (`Opportunity`) |
| Inner `SELECT` | Any child fields | One `Id` or lookup field |
| Result shape | Parent rows with a nested list each | Ordinary flat rows |

The row that trips people up is the inner `FROM`. In the first query it is `Contacts`, a
plural relationship name. In the second it is `Opportunity`, the real object name. If you
mix them up, you get an error about an unknown relationship or object. Ask what the subquery
is *for*. If it returns child data, it goes through a relationship. If it only filters, it
names an object.

## Using both in one query

Nothing stops you combining them. This returns Accounts that have a Closed Won Opportunity,
and for each of those Accounts also brings back the Contacts:

```sql
SELECT Name,
  (SELECT LastName, Title FROM Contacts ORDER BY LastName)
FROM Account
WHERE Id IN (SELECT AccountId
             FROM Opportunity
             WHERE StageName = 'Closed Won')
```

The `WHERE` semi-join decides *which* Accounts are in the result. The `SELECT`-list subquery
decides *what related data* each one carries. Each subquery keeps its own `WHERE` and, for
the child subquery, its own `ORDER BY`. This is the query pattern behind a lot of real
Salesforce reporting: "show me the accounts that matter and everyone I would call there."

The dot notation from Lessons 12 and 13 can sit in the same query too. Adding
`Owner.Name` to the field list above pulls in the Account's owner without any subquery.

## What SOQL does not let you do

- **No subqueries in `FROM`.** There are no derived tables. The outer `FROM` names one
  object.
- **No correlated subqueries.** A subquery cannot refer to the outer row, and SOQL has no
  `EXISTS`.
- **Limits apply.** A query can include up to 20 parent-to-child subqueries. A query that
  needs more than that should be split.

When a T-SQL habit says "wrap it in a derived table," the SOQL answer is usually a
relationship, a semi-join, or running two queries and combining the results in your tool.

## Chapter recap

Chapter 3 gave SOQL its version of joins: subqueries in the `SELECT` list for children, dot
notation for parents (up to five levels), and semi-joins and anti-joins for filtering by
related records. Together they cover most of what you would use a `JOIN` for.

## Key terms

| Term | Meaning |
|---|---|
| Parent-to-child subquery | A subquery in the `SELECT` list that returns nested child records |
| Semi-join / anti-join | A subquery in `WHERE` using `IN` / `NOT IN` to filter the outer records |
| Relationship name | What the child subquery's `FROM` uses (for example `Contacts`) |
| Derived table | A subquery in `FROM`; not supported in SOQL |

## Check yourself

In a single query, name where each of the two subquery kinds goes, and what each inner
`FROM` names. Then write the query for "Accounts with a Closed Won Opportunity, each with its
Contacts."
