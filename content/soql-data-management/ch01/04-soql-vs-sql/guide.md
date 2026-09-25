# SOQL vs. SQL: What's Actually Different

Chapter One has spent five lessons showing how close SOQL is to T-SQL. That's true, and it's
also only half the story. Before Chapter Two moves into aggregation, this lesson consolidates
the real, structural differences — the ones that aren't just syntax placement, but things SOQL
genuinely does not let you do.

## What you'll learn

- Why `SELECT *` doesn't exist in SOQL, and won't ever
- Why SOQL has no arbitrary `JOIN` keyword
- Why `UPDATE`, `DELETE`, and `INSERT` are not SOQL statements at all
- What a governor limit is, and why it exists

## No SELECT *

Covered in Lesson 1, worth restating here as a rule: every field must be named explicitly.

```sql
-- Not valid SOQL:
SELECT * FROM Account

-- Required:
SELECT Id, Name, Industry, AnnualRevenue FROM Account
```

This isn't a missing feature — it's permanent, by design, tied to API cost and governor limits.

## No arbitrary JOIN

T-SQL lets you `JOIN` any two tables that share a sensible key, on any condition you write.
SOQL has no `JOIN` keyword at all. Instead, you can only traverse relationships that Salesforce
already knows about — parent-to-child and child-to-parent — using dot notation and nested
queries, which is the entire subject of Chapter 3.

```sql
-- T-SQL: join any two tables on any condition
SELECT o.Name, a.Industry
FROM Opportunity o
JOIN Account a ON o.AccountId = a.Id

-- SOQL: no JOIN keyword; relationships are traversed differently
SELECT Name, Account.Industry
FROM Opportunity
```

That query above works — but only because `Opportunity` has a predefined relationship to
`Account` through the `AccountId` lookup field. You can't join two unrelated objects on an
arbitrary condition the way T-SQL lets you.

## No UPDATE, DELETE, or INSERT

SOQL is a **read-only** query language. There is no `SOQL UPDATE`, `SOQL DELETE`, or `SOQL
INSERT` statement — full stop. Changing data in Salesforce is handled by an entirely separate
layer: DML (Data Manipulation Language) operations, executed through Apex, the API, or tools
like Data Loader (Chapter 5) and Workbench (Chapter 6). SOQL's only job is to read records back.

## Governor limits: why none of this is arbitrary

Salesforce runs on shared, multi-tenant infrastructure, so it enforces **governor limits** —
hard caps on what any single operation can do, to keep one customer's query from degrading the
whole system. One that matters immediately: a single SOQL query can't return unlimited rows
without special handling (bulk query patterns, covered later in this path, exist specifically
to work around this). This is the same underlying reason `SELECT *` doesn't exist: naming exact
fields and capping result sizes keeps every query's cost predictable in a system where many
customers share the same resources.

## Key terms

| Term | Meaning |
|---|---|
| DML | Data Manipulation Language — the separate mechanism (Apex, API, Data Loader, Workbench) that changes Salesforce data; not part of SOQL |
| Governor limit | A hard Salesforce platform cap (e.g. on rows returned) that protects shared, multi-tenant infrastructure |
| Relationship traversal | SOQL's substitute for arbitrary JOINs — following predefined parent/child links via dot notation or nested queries |

## Check yourself

A colleague asks why they can't just write `UPDATE Account SET Industry = 'Technology' WHERE
Id = '001...'` in a SOQL query tool. What's the actual reason, and what should they use instead?
