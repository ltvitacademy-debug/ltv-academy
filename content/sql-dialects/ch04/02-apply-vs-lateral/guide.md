# Lesson 21 — CROSS APPLY/OUTER APPLY vs. LATERAL Joins

**Chapter 4 · Joins, Subqueries & Set Operations · Lesson 2 of 5**

## What you'll learn

- Why a plain `JOIN` can't let a derived table reference columns from an earlier table
- T-SQL's `CROSS APPLY` and `OUTER APPLY`, the tool you already use for this
- PostgreSQL's and MySQL's `LATERAL` keyword, doing the identical job
- That Oracle actually supports both spellings

## The problem a plain JOIN can't solve

A regular `JOIN`'s right-hand side — a table, view, or derived table — is evaluated independently;
it cannot reference columns from a table earlier in the `FROM` clause. That's fine for joining two
tables together, but it breaks down the moment you want "for each customer, give me their 3 most
recent orders" — the derived table (top 3 orders) needs to know *which customer* it's filtering
for, row by row.

```sql
-- T-SQL — this does NOT work: c.CustomerID isn't visible inside a plain JOIN's subquery
SELECT c.CustomerName, o.OrderID
FROM Customers AS c
JOIN (
  SELECT TOP 3 OrderID, OrderDate
  FROM Orders
  WHERE Orders.CustomerID = c.CustomerID  -- ERROR: c isn't in scope here
  ORDER BY OrderDate DESC
) AS o ON 1 = 1;
```

## T-SQL's answer: CROSS APPLY and OUTER APPLY

`CROSS APPLY` lets the right-hand derived table or table-valued function reference columns from
every table that precedes it in the `FROM` clause — exactly what the query above needed:

```sql
-- T-SQL — CROSS APPLY makes c.CustomerID visible inside the derived table
SELECT c.CustomerName, o.OrderID, o.OrderDate
FROM Customers AS c
CROSS APPLY (
  SELECT TOP 3 OrderID, OrderDate
  FROM Orders
  WHERE Orders.CustomerID = c.CustomerID
  ORDER BY OrderDate DESC
) AS o;
```

`CROSS APPLY` drops a customer with zero orders (like an inner join); `OUTER APPLY` keeps that
customer with `NULL`s in the applied columns (like a left join) — the same inner/outer distinction
you already know from `JOIN`, just applied to a correlated derived table instead of a plain one.

## PostgreSQL and MySQL: the same concept, the keyword is LATERAL

PostgreSQL has had `LATERAL` for this exact purpose for years, and MySQL added `LATERAL` support
in MySQL 8.0.14. Same correlation, different keyword:

```sql
-- PostgreSQL and MySQL 8.0.14+ — LATERAL is the keyword
SELECT c.customer_name, o.order_id, o.order_date
FROM customers c
CROSS JOIN LATERAL (
  SELECT order_id, order_date
  FROM orders
  WHERE orders.customer_id = c.customer_id
  ORDER BY order_date DESC
  LIMIT 3
) AS o;
```

`LATERAL` is written right before the derived table, combined with `JOIN` (or `LEFT JOIN LATERAL`
for the outer-join equivalent of `OUTER APPLY`). The concept — "this subquery is allowed to see
columns from earlier in the `FROM` clause" — is identical to `CROSS APPLY`. Only the spelling
differs.

## Oracle supports both spellings

Oracle added `LATERAL` support in 12c, and then added its own `CROSS APPLY` / `OUTER APPLY`
syntax in a later 12c release specifically to make migrating T-SQL code easier:

```sql
-- Oracle 12c+ — LATERAL works
SELECT c.customer_name, o.order_id
FROM customers c, LATERAL (
  SELECT order_id FROM orders
  WHERE orders.customer_id = c.customer_id
  ORDER BY order_date DESC FETCH FIRST 3 ROWS ONLY
) o;

-- Oracle 12c+ — CROSS APPLY also works, same result
SELECT c.customer_name, o.order_id
FROM customers c
CROSS APPLY (
  SELECT order_id FROM orders
  WHERE orders.customer_id = c.customer_id
  ORDER BY order_date DESC FETCH FIRST 3 ROWS ONLY
) o;
```

## The pattern across all four dialects

| Platform | Keyword | Inner-join equivalent | Outer-join equivalent |
|---|---|---|---|
| T-SQL | `APPLY` | `CROSS APPLY` | `OUTER APPLY` |
| PostgreSQL | `LATERAL` | `CROSS JOIN LATERAL` | `LEFT JOIN LATERAL` |
| MySQL 8.0.14+ | `LATERAL` | `CROSS JOIN LATERAL` | `LEFT JOIN LATERAL` |
| Oracle 12c+ | Both | `LATERAL` or `CROSS APPLY` | `LATERAL` (outer) or `OUTER APPLY` |

The concept is fully portable; only the keyword differs, and Oracle hedges by supporting both.

## Key terms

| Term | Meaning |
|---|---|
| Correlated derived table | A subquery in `FROM` that references a column from an earlier table in the same query |
| `CROSS APPLY` / `OUTER APPLY` | T-SQL's keywords for a correlated derived table, inner and outer variants |
| `LATERAL` | PostgreSQL's, MySQL's, and (optionally) Oracle's keyword for the identical concept |

## Lab

Take this T-SQL `CROSS APPLY` query and rewrite it as a PostgreSQL `LATERAL` query, keeping the
same "top 2 most expensive products per category" logic:

```sql
SELECT cat.CategoryName, p.ProductName, p.ListPrice
FROM Categories AS cat
CROSS APPLY (
  SELECT TOP 2 ProductName, ListPrice
  FROM Products
  WHERE Products.CategoryID = cat.CategoryID
  ORDER BY ListPrice DESC
) AS p;
```

## Check yourself

You're ready for Lesson 22 when you can answer, without looking: what can `CROSS APPLY`/`LATERAL`
do that a plain `JOIN` cannot, which dialect supports both spellings, and which keyword gives you
the "keep unmatched rows" outer-join behavior on each platform?
