# Lesson 11 — Semi-Joins and Anti-Joins

**Chapter 2 · Relationships and Aggregates · Lesson 11 of 23**

## What you'll learn

- What a semi-join and an anti-join are, and how SOQL expresses both with IN / NOT IN
- Real use cases for each pattern
- The documented restrictions on how many subqueries and IN/NOT IN clauses you can combine
- A common mistake: trying to use NOT as a conjunction with these patterns

## Semi-join: IN with a subquery

A semi-join keeps records from one object when a value matches a subquery's results run against a *different* object. You've already used `IN` with a literal list — a semi-join is the same keyword, but the list comes from a subquery instead:

```sql
SELECT Id, Name
FROM Account
WHERE Id IN (
    SELECT AccountId FROM Opportunity WHERE StageName = 'Closed Won'
)
```

This returns every account that has at least one closed-won opportunity — without ever joining the two objects together in the traditional SQL sense, and without pulling back any opportunity fields at all. The subquery only contributes a list of matching `AccountId` values for the outer query to check membership against.

## Anti-join: NOT IN with a subquery

Swap `IN` for `NOT IN` and you get the opposite: records that have **no** matching counterpart in the subquery:

```sql
SELECT Id, Name
FROM Account
WHERE Id NOT IN (
    SELECT AccountId FROM Opportunity WHERE StageName = 'Closed Won'
)
```

This finds every account with zero closed-won opportunities — a genuinely useful, common business question ("which accounts have we never actually closed business with?") that's awkward to express any other way in SOQL, since there's no `LEFT JOIN ... WHERE right side IS NULL` pattern available here.

## Documented restrictions

Semi-joins and anti-joins come with specific, documented limits that are easy to run into once a query grows past a simple example:

- **At most two `IN`/`NOT IN` statements per `WHERE` clause.**
- **At most two subqueries total in a single semi-join or anti-join query.**
- **The main query's filtered field must be a single ID (primary key) or reference (foreign key) field** — you can't build a semi-join off an arbitrary text field.
- **`NOT` can't be used as a conjunction with these patterns.** Writing `NOT (Id IN (subquery))` doesn't do what it looks like — using `NOT` this way effectively flips a semi-join into an anti-join and vice versa rather than behaving as a generic logical negation layered on top. If you want the anti-join, write it directly as `NOT IN`, rather than wrapping `IN` in `NOT`.

## Semi-joins inside SELECT, not just WHERE

The same `IN`-with-subquery pattern can also appear inside a `SELECT` clause's own relationship subquery, to filter which parent records' child subqueries get evaluated at all:

```sql
SELECT Id, (SELECT Id FROM OpportunityLineItems)
FROM Opportunity
WHERE Id IN (
    SELECT OpportunityId FROM OpportunityLineItem WHERE TotalPrice > 10000
)
```

This returns opportunity IDs together with their line items, but only for opportunities where at least one line item's `TotalPrice` exceeds $10,000 — filtering and nesting combined in one query.

## Key terms

| Term | Meaning |
|---|---|
| Semi-join | A query that keeps records matching a subquery's results via IN, without returning the subquery object's own fields |
| Anti-join | The inverse — records with no match in a subquery's results, via NOT IN |
| Subquery/clause limits | At most two subqueries and at most two IN/NOT IN statements per WHERE clause |

## Lab

Against `Account` and `Opportunity` in a Developer Edition org, write a semi-join that finds every account with at least one open (`IsClosed = false`) opportunity. Then write the anti-join version that finds every account with zero open opportunities. Confirm the two result sets, combined, account for every account in the org (accounting for accounts with no opportunities at all).

## Check yourself

What's the practical difference between a semi-join and a true SQL join, in terms of what fields you get back from the subquery's object? Why does wrapping IN (subquery) in NOT() not behave as a simple negation of a semi-join?
