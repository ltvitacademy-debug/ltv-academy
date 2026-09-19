# Lesson 34 — Row-Level Security

**Chapter 6 · Data Security & Compliance · Lesson 34 of 95**

## What you'll learn

- What Row-Level Security (RLS) actually restricts: which rows, not which columns or values
- Security predicates, inline table-valued functions, and security policies — how the three pieces fit
- `FILTER` predicates vs. `BLOCK` predicates, and when each applies
- Why RLS is transparent to the querying application, and what that means operationally

## What RLS restricts, precisely

Lesson 33's Dynamic Data Masking changes *what a column looks like* in a result. **Row-Level
Security** is a different axis entirely: it restricts *which rows* a user's query is even allowed to
see or affect, based on a predicate you define — most commonly matching the querying user's identity
against a value stored in the row itself, like a `SalesRepID` column matching the logged-in sales
rep. A `SELECT * FROM Orders` run by two different users, with identical permissions on the table
object itself, returns different row sets, because RLS filters below the object-permission layer
entirely.

```
SalesRep A: SELECT * FROM Orders    -> only sees rows where SalesRepID = A's ID
SalesRep B: SELECT * FROM Orders    -> only sees rows where SalesRepID = B's ID
Both have identical table-level SELECT permission. RLS is what actually differs.
```

## The three pieces: predicate function, security policy, and the table

RLS is built from two objects working together:

**1. A predicate function** — an inline table-valued function (TVF) that returns 1 row when the
predicate is satisfied for the current execution context (usually checked against `USER_NAME()` or
`SESSION_CONTEXT`):

```sql
CREATE FUNCTION dbo.fn_SalesRepPredicate(@SalesRepID AS INT)
RETURNS TABLE
WITH SCHEMABINDING
AS
RETURN SELECT 1 AS fn_result
WHERE @SalesRepID = CAST(SESSION_CONTEXT(N'CurrentSalesRepID') AS INT)
       OR IS_MEMBER('SalesManagers') = 1;
```

**2. A security policy** — binds that predicate function to a table, as either a `FILTER` or
`BLOCK` predicate:

```sql
CREATE SECURITY POLICY SalesRepFilter
ADD FILTER PREDICATE dbo.fn_SalesRepPredicate(SalesRepID)
ON dbo.Orders
WITH (STATE = ON);
```

## `FILTER` predicates vs. `BLOCK` predicates

| Predicate type | Applies to | Effect |
|---|---|---|
| **FILTER** | `SELECT`, `UPDATE`, `DELETE` | Silently filters rows out of the result/operation — no error, the row simply isn't there |
| **BLOCK** | `AFTER INSERT`, `AFTER UPDATE`, `BEFORE UPDATE`, `BEFORE DELETE` | Actively rejects an operation that would violate the predicate — throws an error |

A `FILTER` predicate is the common one for read visibility — a sales rep querying `Orders` simply
never sees rows outside their scope, with no indication anything was hidden. A `BLOCK` predicate
stops a write that would violate the rule outright — for example, preventing a sales rep from
inserting a row claiming a `SalesRepID` that isn't their own, which a `FILTER` predicate alone
wouldn't necessarily catch on `INSERT`.

## Transparent to the application — which is the whole point, and the whole risk

Just like TDE and DDM, RLS requires **zero application code changes** — the application still runs
`SELECT * FROM Orders`, and the security policy silently narrows what comes back. This is
operationally powerful (one policy protects every application and every ad-hoc query tool uniformly)
and operationally risky in exactly one way: if you forget the policy exists, query results that look
"complete" might not be — a report that seems to be missing rows might actually be RLS working
correctly, not a data or join bug. Document RLS policies clearly; a query author six months from now
troubleshooting "missing rows" needs to know this layer exists before chasing the wrong cause.

## Key terms

| Term | Meaning |
|---|---|
| Predicate function | Inline TVF returning whether a row satisfies the security condition for the current session |
| Security policy | The object binding a predicate function to a table as FILTER and/or BLOCK |
| FILTER predicate | Silently narrows SELECT/UPDATE/DELETE row visibility |
| BLOCK predicate | Actively rejects a write operation that would violate the predicate |

## Lab

1. Create a predicate function checking a session-context value against a `SalesRepID` column, and a
   security policy applying it as a `FILTER` predicate on a test `Orders` table.
2. Set `SESSION_CONTEXT` to two different rep IDs in two separate sessions and confirm each sees only
   their own rows on an identical `SELECT *`.
3. Add a `BLOCK` predicate preventing `INSERT` of a row with a mismatched `SalesRepID`, and confirm
   the insert throws an error instead of silently failing.

## Check yourself

You're ready for Lesson 35 when you can explain, without looking: why might a `SELECT *` returning
fewer rows than expected be correct behavior rather than a bug, and how would you confirm that before
assuming something's broken?
