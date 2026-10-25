# Lesson 23 — Set Operations: UNION, INTERSECT, EXCEPT vs. MINUS

**Chapter 4 · Joins, Subqueries & Set Operations · Lesson 4 of 5**

## What you'll learn

- `UNION` and `UNION ALL`: standard and identical across all four dialects
- `INTERSECT`: also standard and consistent everywhere
- The one real naming difference: `EXCEPT` vs. Oracle's `MINUS`
- MySQL's version floor for `INTERSECT` and `EXCEPT`

## UNION and UNION ALL: no surprises

`UNION` (deduplicated) and `UNION ALL` (keeps duplicates) are written identically across T-SQL,
Oracle, MySQL, and PostgreSQL — this one has no dialect quirks at all:

```sql
-- Identical on every platform in this course
SELECT CustomerID FROM ActiveCustomers
UNION
SELECT CustomerID FROM ArchivedCustomers;

SELECT CustomerID FROM ActiveCustomers
UNION ALL
SELECT CustomerID FROM ArchivedCustomers;
```

## INTERSECT: also standard

`INTERSECT` — return only rows present in **both** queries — is standard and works the same way
everywhere, including on Oracle:

```sql
-- T-SQL, Oracle, MySQL 8.0.31+, PostgreSQL
SELECT CustomerID FROM OnlineOrders
INTERSECT
SELECT CustomerID FROM StoreOrders;
```

## EXCEPT vs. MINUS: the one real naming split

`EXCEPT` returns rows from the first query that do **not** appear in the second. T-SQL,
PostgreSQL, and MySQL (8.0.31+) all call this operator `EXCEPT`. Oracle alone calls it `MINUS` —
same semantics, different name:

```sql
-- T-SQL, PostgreSQL, MySQL 8.0.31+ — EXCEPT
SELECT CustomerID FROM AllCustomers
EXCEPT
SELECT CustomerID FROM ArchivedCustomers;
```

```sql
-- Oracle — MINUS, same semantics as EXCEPT above
SELECT customer_id FROM all_customers
MINUS
SELECT customer_id FROM archived_customers;
```

Both return "customers in the first set, not in the second." If you write `EXCEPT` against
Oracle, you'll get a syntax error — Oracle has never adopted the `EXCEPT` keyword, even though
it's the ANSI-standard name and every other platform in this course has settled on it.

## MySQL's version floor

MySQL is the newest adopter of this family: `INTERSECT` and `EXCEPT` were added in MySQL 8.0.31.
Earlier MySQL 8.0 releases, and all of MySQL 5.7 and before, support only `UNION` and
`UNION ALL` — `INTERSECT` and `EXCEPT` have to be simulated with a `JOIN` or a `NOT EXISTS`
subquery on those older versions.

## The full picture

| Operation | T-SQL | Oracle | MySQL | PostgreSQL |
|---|---|---|---|---|
| `UNION` / `UNION ALL` | Yes | Yes | Yes (all versions) | Yes |
| `INTERSECT` | Yes | Yes | 8.0.31+ only | Yes |
| Row-in-first-not-second | `EXCEPT` | `MINUS` | `EXCEPT` (8.0.31+) | `EXCEPT` |

Three platforms converged on the ANSI name `EXCEPT`; Oracle alone kept its original `MINUS`
naming. This is the single naming exception to otherwise consistent set-operation syntax.

## Key terms

| Term | Meaning |
|---|---|
| `UNION` | Combines two result sets, removing duplicate rows |
| `UNION ALL` | Combines two result sets, keeping duplicate rows |
| `INTERSECT` | Returns only rows present in both result sets |
| `EXCEPT` / `MINUS` | Returns rows in the first result set that are absent from the second — same semantics, different name on Oracle |

## Lab

Write a query that returns customer IDs present in `OnlineOrders` but **not** in `StoreOrders`,
once using `EXCEPT` (for T-SQL/PostgreSQL/MySQL 8.0.31+) and once using `MINUS` (for Oracle).
Confirm both return the same logical result.

## Check yourself

You're ready for Lesson 24 when you can answer, without looking: which single platform uses
`MINUS` instead of `EXCEPT`, which two set operations does MySQL support in every version, and
which MySQL version added `INTERSECT` and `EXCEPT`?
