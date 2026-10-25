# Lesson 50 — Common Table Expressions and Recursive Queries in PostgreSQL

**Chapter 8 · PostgreSQL Deep Dive for T-SQL Developers · Lesson 3 of 5**

## What you'll learn

- A quick recap of standard `WITH` CTE syntax (from Chapter 4) — unchanged in PostgreSQL
- The "optimization fence" behavior PostgreSQL CTEs had before version 12, and what changed
- The `MATERIALIZED` keyword, and when you'd still want it
- `WITH RECURSIVE` — required in PostgreSQL, same as MySQL, unlike T-SQL/Oracle

## The basic syntax hasn't changed

You already covered standard `WITH name AS (...)` CTE syntax back in Chapter 4 — PostgreSQL uses
exactly that syntax, with no changes needed.

```sql
WITH high_value_customers AS (
  SELECT customer_id, SUM(amount) AS total_spent
  FROM orders
  GROUP BY customer_id
  HAVING SUM(amount) > 10000
)
SELECT c.customer_name, h.total_spent
FROM high_value_customers h
JOIN customers c ON c.customer_id = h.customer_id;
```

This lesson goes deeper into PostgreSQL-specific behavior **around** that syntax — not the syntax
itself.

## Before PostgreSQL 12: CTEs were always optimization fences

Historically, PostgreSQL always **materialized** every CTE — ran it fully, stored the result, then
used that stored result in the outer query — rather than inlining it into the outer query's
execution plan. This is called being an "optimization fence," and it's a real, version-dependent
behavior difference worth knowing by name, because it could make a CTE noticeably slower than the
equivalent subquery on older PostgreSQL versions, even though the SQL text looked no different.

## PostgreSQL 12+: non-recursive CTEs inline by default

PostgreSQL 12 changed this default: a non-recursive CTE is now **inlined** into the outer query
automatically (the same way a subquery would be), unless you explicitly mark it `MATERIALIZED`.

```sql
-- PostgreSQL 12+: inlined by default, planner can push WHERE conditions in
WITH recent_orders AS (
  SELECT * FROM orders
)
SELECT * FROM recent_orders WHERE customer_id = 42;

-- Force the pre-12 materialized behavior explicitly, when you WANT the
-- fence (e.g. the CTE has a side effect, or you want to stabilize a plan)
WITH recent_orders AS MATERIALIZED (
  SELECT * FROM orders
)
SELECT * FROM recent_orders WHERE customer_id = 42;
```

Knowing which PostgreSQL version you're running matters here in a way it simply doesn't for the
rest of standard CTE syntax — the exact same query can behave as "optimized like a subquery" on one
version and "always fully materialized first" on another.

## Recursive CTEs: WITH RECURSIVE is required

T-SQL and Oracle let you write a self-referencing CTE without any special keyword — the recursion
is implied by the CTE referencing itself. PostgreSQL requires `WITH RECURSIVE` explicitly, the
**same requirement MySQL has**, and different from T-SQL/Oracle.

```sql
-- T-SQL: no special keyword needed
WITH OrgChart AS (
  SELECT EmployeeId, ManagerId, 0 AS Level
  FROM Employees WHERE ManagerId IS NULL
  UNION ALL
  SELECT e.EmployeeId, e.ManagerId, o.Level + 1
  FROM Employees e JOIN OrgChart o ON e.ManagerId = o.EmployeeId
)
SELECT * FROM OrgChart;

-- PostgreSQL: WITH RECURSIVE is required
WITH RECURSIVE org_chart AS (
  SELECT employee_id, manager_id, 0 AS level
  FROM employees WHERE manager_id IS NULL
  UNION ALL
  SELECT e.employee_id, e.manager_id, o.level + 1
  FROM employees e JOIN org_chart o ON e.manager_id = o.employee_id
)
SELECT * FROM org_chart;
```

## Key terms

| Term | Meaning |
|---|---|
| Optimization fence | Pre-PostgreSQL-12 default: CTEs always fully materialized, never inlined |
| `MATERIALIZED` | Explicitly forces the pre-12 fenced behavior on PostgreSQL 12+ |
| `WITH RECURSIVE` | Required keyword for self-referencing CTEs in PostgreSQL (and MySQL); not required in T-SQL/Oracle |

## Lab

Write a recursive CTE in PostgreSQL syntax (using `WITH RECURSIVE`) that walks an employee
hierarchy, and note the one syntax difference from how you'd write the same thing in T-SQL.

## Check yourself

You're ready for Lesson 51 when you can explain, without looking: what changed about CTE
materialization in PostgreSQL 12, and what keyword does PostgreSQL require for recursive CTEs that
T-SQL does not?
