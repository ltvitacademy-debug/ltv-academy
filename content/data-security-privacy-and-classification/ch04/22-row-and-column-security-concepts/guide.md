# Lesson 22 — Row and Column Security Concepts

**Chapter 4 · Protecting Data · Lesson 22 of 30**

## What you'll learn

- Column-level security: scoping a GRANT to specific columns instead of a whole table
- Row-Level Security (RLS): real T-SQL for a security predicate function and a security policy
- The difference between a filter predicate and a block predicate
- Why RLS is enforced in the database engine, not left to application code

## Column-level security: narrower than the whole table

Lesson 13 introduced `GRANT`/`DENY` at the table level. Both statements also accept a specific column list, which is the simplest form of column-level security:

```sql
-- HR can see these three columns of Employees — nothing else
GRANT SELECT ON dbo.Employees(EmployeeId, Name, Department) TO HRRole;

-- Payroll additionally needs Salary — granted separately, to a narrower role
GRANT SELECT ON dbo.Employees(EmployeeId, Salary) TO PayrollRole;
```

This is least privilege (Lesson 14) applied at the column level: `HRRole` can query `dbo.Employees` for the columns it was explicitly granted, and any other column — `Salary`, say — simply isn't visible to that role, with no masking function or extra logic required.

## Row-Level Security: restricting which rows a query can even see

Column-level security controls *which columns* a role can see. **Row-Level Security (RLS)** controls *which rows* — the same query, run by two different users, can return a completely different set of rows from the identical table, with no `WHERE` clause changes needed in the application at all. The classic case is multi-tenant data: every tenant's rows live in the same `Sales` table, and each tenant's users should only ever see their own tenant's rows, automatically, no matter how the query is written.

RLS has two pieces: a **security predicate function** that defines the rule, and a **security policy** that attaches the rule to a table.

```sql
-- 1. The predicate: a rule that returns one row when the condition passes
CREATE SCHEMA Security;
GO

CREATE FUNCTION Security.fn_tenantAccessPredicate(@TenantId AS INT)
RETURNS TABLE
WITH SCHEMABINDING
AS
RETURN SELECT 1 AS fn_result
WHERE @TenantId = CAST(SESSION_CONTEXT(N'TenantId') AS INT);
GO

-- 2. The policy: attach the predicate to a table, and turn it on
CREATE SECURITY POLICY TenantFilterPolicy
ADD FILTER PREDICATE Security.fn_tenantAccessPredicate(TenantId)
ON dbo.Sales
WITH (STATE = ON);
```

Once that policy is `ON`, every query against `dbo.Sales` — a plain `SELECT *`, a report, an ad-hoc query from any tool — is silently filtered down to only the rows where `TenantId` matches the current session's `SESSION_CONTEXT`. The application sets that session context once, at login, and every subsequent query in that session is automatically scoped, with zero per-query filtering logic anywhere in the application code.

## Filter predicates vs. block predicates

A **filter predicate** (used above) silently hides rows that don't match — a `SELECT` just doesn't return them, as if they didn't exist. A **block predicate** goes further: it actively *prevents* an operation (an `INSERT`, `UPDATE`, or `DELETE`) that would violate the rule, raising an error instead of silently filtering:

```sql
-- Add a block predicate so a user can't INSERT a row for another tenant
ALTER SECURITY POLICY TenantFilterPolicy
ADD BLOCK PREDICATE Security.fn_tenantAccessPredicate(TenantId)
ON dbo.Sales AFTER INSERT;
```

Filter predicates handle reads; block predicates handle writes that would otherwise let someone create or modify a row outside their own scope.

## Why this belongs in the database engine, not the application

The reason RLS exists as a database feature, rather than being left to "the application always adds the right `WHERE` clause," is the same reason masking (Lesson 18) lives in the engine: application code is only as safe as every single query path through it, forever, across every report, every ad-hoc tool, every future developer. A security policy enforced by the database engine applies no matter what wrote the query — a reporting tool connecting directly, a DBA running an ad-hoc `SELECT`, or a bug in application code that forgot the tenant filter. That's a materially stronger guarantee than "we remembered to add the filter everywhere."

## Key terms

| Term | Meaning |
|---|---|
| Column-level security | Scoping GRANT/DENY to a specific column list rather than an entire table |
| Row-Level Security (RLS) | A database feature that silently restricts which rows a query returns, based on a defined predicate |
| Security predicate function | An inline table-valued function defining the rule that decides row visibility |
| Filter predicate / block predicate | A filter predicate hides non-matching rows from reads; a block predicate rejects writes that would violate the rule |

## Lab

On a test database, create a small `Sales` table with a `TenantId` column and a few rows for two different tenant IDs. Build the security predicate function and policy shown above, set `SESSION_CONTEXT` to one tenant's ID, and run `SELECT * FROM dbo.Sales` — confirm you only see that tenant's rows. Then change the session context to the other tenant and run the same query again.

## Check yourself

- How does column-level `GRANT` differ from Row-Level Security in terms of what each one restricts?
- Explain the difference between a filter predicate and a block predicate, and give one situation where you'd need the block predicate specifically.
