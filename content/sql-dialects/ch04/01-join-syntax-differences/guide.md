# Lesson 20 — Join Syntax Differences: Old-Style vs. ANSI Joins

**Chapter 4 · Joins, Subqueries & Set Operations · Lesson 1 of 5**

## What you'll learn

- Why Oracle's legacy `(+)` outer-join operator still shows up in production code
- How ANSI `JOIN` syntax replaced it everywhere, including on Oracle itself
- The real limitations that make `(+)` worth avoiding in new code
- Confirming that T-SQL, MySQL, and PostgreSQL never had this quirk to begin with

## The ANSI join syntax you already know

Everything you've written in T-SQL uses the ANSI join syntax — the join condition lives in the
`FROM` clause, next to the keyword that names the join type:

```sql
-- T-SQL — ANSI join syntax
SELECT o.OrderID, c.CustomerName
FROM Orders AS o
LEFT JOIN Customers AS c
  ON o.CustomerID = c.CustomerID;
```

MySQL and PostgreSQL write this identically. T-SQL, MySQL, and PostgreSQL have **never** had any
other way to write a join — ANSI syntax is the only syntax on those three platforms. Oracle is
the one dialect in this course with a second, older way to do the same thing.

## Oracle's legacy `(+)` operator

Before Oracle implemented ANSI join syntax, outer joins were written by putting `(+)` next to a
column in the `WHERE` clause, marking which side of the join is allowed to be missing:

```sql
-- Oracle — legacy (+) syntax for a LEFT JOIN
SELECT o.order_id, c.customer_name
FROM orders o, customers c
WHERE o.customer_id = c.customer_id(+);
```

The `(+)` sits on the side that can have **no match** — here, `customers`, meaning every order
shows even if it has no matching customer row. That's the same result as:

```sql
-- Oracle — the modern, preferred equivalent
SELECT o.order_id, c.customer_name
FROM orders o
LEFT JOIN customers c
  ON o.customer_id = c.customer_id;
```

You will still see `(+)` in production Oracle code, especially anything written before the
early 2000s. Oracle supports modern `LEFT JOIN` / `RIGHT JOIN` / `FULL JOIN` syntax too, and it
is the syntax Oracle itself now recommends — `(+)` is legacy, not a current best practice.

## Why `(+)` lost out to ANSI syntax

Two real, concrete limitations explain why ANSI syntax replaced `(+)` everywhere, including on
Oracle:

```sql
-- (+) CANNOT express a full outer join directly —
-- putting (+) on BOTH sides is illegal:
-- WHERE o.customer_id(+) = c.customer_id(+)   -- ORA-01468
```

```sql
-- ANSI syntax handles it directly, no workaround needed
SELECT o.order_id, c.customer_name
FROM orders o
FULL OUTER JOIN customers c
  ON o.customer_id = c.customer_id;
```

The second limitation shows up once more than two tables are involved: with `(+)` the join
conditions live in one flat `WHERE` clause, so it's easy to accidentally apply `(+)` inconsistently
across multiple joined tables and get an ambiguous or wrong result. ANSI syntax keeps each join's
condition paired with its own `JOIN` keyword, so the join graph stays readable (and unambiguous)
no matter how many tables you add.

## What this means across the dialects in this course

| Platform | Legacy join syntax? | Current recommendation |
|---|---|---|
| T-SQL | Never existed | ANSI `JOIN ... ON` |
| MySQL | Never existed | ANSI `JOIN ... ON` |
| PostgreSQL | Never existed | ANSI `JOIN ... ON` |
| Oracle | Yes — `(+)` in `WHERE` | ANSI `JOIN ... ON` (preferred, even on Oracle) |

The practical takeaway: write ANSI join syntax everywhere, on every platform in this course. The
only reason to recognize `(+)` at all is to read it when you encounter it in someone else's
Oracle code — not to write it yourself.

## Key terms

| Term | Meaning |
|---|---|
| ANSI join syntax | `JOIN ... ON` in the `FROM` clause — standard, portable, used by all four OLTP dialects |
| `(+)` operator | Oracle-only legacy outer-join marker placed in the `WHERE` clause |
| `ORA-01468` | The Oracle error when `(+)` is placed on both sides of a comparison, attempting a full outer join |

## Lab

You're given this Oracle `WHERE`-clause query. Rewrite it as ANSI join syntax, then explain in one
sentence why the ANSI version would have been easier to extend to three tables:

```sql
SELECT e.employee_name, d.department_name
FROM employees e, departments d
WHERE e.department_id(+) = d.department_id;
```

## Check yourself

You're ready for Lesson 21 when you can answer, without looking: which single dialect in this
course has legacy `(+)` join syntax, what's the one outer-join type `(+)` cannot express directly,
and why does ANSI syntax hold up better once a query joins three or more tables?
