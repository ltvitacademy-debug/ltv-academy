# Lesson 22 — Common Table Expressions Across Dialects

**Chapter 4 · Joins, Subqueries & Set Operations · Lesson 3 of 5**

## What you'll learn

- How consistent plain `WITH` CTE syntax is across T-SQL, Oracle, MySQL, and PostgreSQL
- The one real divergence: whether `RECURSIVE` is required for a recursive CTE
- The anchor-member / recursive-member shape that's identical everywhere
- Why this lesson is good news after the last two lessons' real syntax differences

## Plain CTEs: remarkably consistent

A non-recursive CTE — `WITH name AS (...)` followed by a `SELECT` — is written almost identically
across all four OLTP dialects in this course:

```sql
-- T-SQL
WITH HighValueCustomers AS (
  SELECT CustomerID, SUM(TotalDue) AS LifetimeValue
  FROM Sales.SalesOrderHeader
  GROUP BY CustomerID
  HAVING SUM(TotalDue) > 50000
)
SELECT * FROM HighValueCustomers;
```

```sql
-- Oracle, MySQL 8.0+, PostgreSQL — syntactically identical shape
WITH high_value_customers AS (
  SELECT customer_id, SUM(total_due) AS lifetime_value
  FROM sales_order_header
  GROUP BY customer_id
  HAVING SUM(total_due) > 50000
)
SELECT * FROM high_value_customers;
```

Note the version floor: MySQL only gained CTE support in MySQL 8.0 — earlier MySQL versions
(5.7 and before) don't support `WITH` at all. Oracle and T-SQL have supported CTEs for much
longer, and PostgreSQL has supported them since version 8.4.

## Recursive CTEs: the one real divergence

The shape of a recursive CTE — an **anchor member** (the starting rows) `UNION ALL` a
**recursive member** (a query that references the CTE itself, building on the previous
iteration) — is identical in concept across every dialect. The divergence is a single keyword:

```sql
-- T-SQL and Oracle — no special keyword required
WITH EmployeeHierarchy AS (
  -- anchor member: top of the hierarchy
  SELECT EmployeeID, ManagerID, 0 AS Level
  FROM Employees
  WHERE ManagerID IS NULL
  UNION ALL
  -- recursive member: references EmployeeHierarchy itself
  SELECT e.EmployeeID, e.ManagerID, eh.Level + 1
  FROM Employees AS e
  JOIN EmployeeHierarchy AS eh ON e.ManagerID = eh.EmployeeID
)
SELECT * FROM EmployeeHierarchy;
```

```sql
-- MySQL 8.0+ and PostgreSQL — RECURSIVE keyword is REQUIRED
WITH RECURSIVE employee_hierarchy AS (
  SELECT employee_id, manager_id, 0 AS level
  FROM employees
  WHERE manager_id IS NULL
  UNION ALL
  SELECT e.employee_id, e.manager_id, eh.level + 1
  FROM employees e
  JOIN employee_hierarchy eh ON e.manager_id = eh.employee_id
)
SELECT * FROM employee_hierarchy;
```

Leave out `RECURSIVE` on MySQL or PostgreSQL and the self-reference to `employee_hierarchy`
inside the recursive member fails — the parser doesn't know this CTE is allowed to reference
itself without that keyword. T-SQL and Oracle never require (or even have) an equivalent
keyword; the recursive structure alone is enough for the engine to recognize it.

## Why this lesson is good news

Compare this to the last two lessons: join syntax had a real legacy/modern split on Oracle, and
`APPLY`/`LATERAL` needed genuinely different keywords across platforms. CTEs are one of the more
portable corners of modern SQL — the only thing to remember is a single word, `RECURSIVE`, and
only on two of the four platforms, and only for the recursive case.

## Key terms

| Term | Meaning |
|---|---|
| CTE | A named temporary result set defined with `WITH`, scoped to the statement that follows it |
| Anchor member | The starting (non-recursive) query inside a recursive CTE |
| Recursive member | The query inside a recursive CTE that references the CTE itself, combined with the anchor via `UNION ALL` |
| `RECURSIVE` keyword | Required by MySQL 8.0+ and PostgreSQL before `WITH`, for recursive CTEs only; not required by T-SQL or Oracle |

## Lab

Take this T-SQL recursive CTE (walking up a bill-of-materials structure) and rewrite it for
PostgreSQL, changing only what's required:

```sql
WITH PartsBreakdown AS (
  SELECT PartID, ParentPartID, 0 AS Depth
  FROM Parts
  WHERE ParentPartID IS NULL
  UNION ALL
  SELECT p.PartID, p.ParentPartID, pb.Depth + 1
  FROM Parts AS p
  JOIN PartsBreakdown AS pb ON p.ParentPartID = pb.PartID
)
SELECT * FROM PartsBreakdown;
```

## Check yourself

You're ready for Lesson 23 when you can answer, without looking: which two platforms require the
`RECURSIVE` keyword and which two don't, what's the minimum MySQL version for CTE support at all,
and what are the two parts of a recursive CTE called?
