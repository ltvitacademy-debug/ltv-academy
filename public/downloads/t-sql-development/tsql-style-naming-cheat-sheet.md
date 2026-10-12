# T-SQL Style & Object-Naming Cheat Sheet

The formatting and naming conventions this course uses consistently
from Chapter 1 onward (Lesson 10), plus the object-naming and
error-handling conventions introduced as each topic arrives. Keeping to
one style means every script in this course — and every script you
write afterward — reads the same way.

## Query formatting (Lesson 10)

- Keywords in `UPPERCASE` — `SELECT`, `FROM`, `WHERE`, `GROUP BY`.
- One clause per line once a query has more than one or two clauses.
- Every statement ends with `;`.
- Every script opens with `USE <database>; GO`.
- Always use two-part `schema.table` naming (`Production.Product`, not
  just `Product`).

```sql
USE AdventureWorks2012;
GO

SELECT Name,
       ListPrice
FROM Production.Product
WHERE ListPrice < 50;
```

Comments should explain **why**, not restate **what** the code already
shows:

```sql
-- Bad: just restates the code
-- Select FirstName and LastName
SELECT FirstName, LastName FROM Person.Person;

-- Better: explains WHY
-- Marketing needs a name list for the spring mailer — see ticket #4471
SELECT FirstName, LastName FROM Person.Person;
```

## Clause evaluation order (Lesson 40)

Written order and evaluated order are different — know both:

| Written first → last | Actually evaluated |
|---|---|
| `SELECT` | 5. (after grouping/filtering) |
| `FROM` | 1. |
| `WHERE` | 2. |
| `GROUP BY` | 3. |
| `HAVING` | 4. |
| `ORDER BY` | 6. (last, always) |

`WHERE` removes rows before grouping; `HAVING` removes whole groups
after aggregation. Never use `HAVING` for a row-level filter — it still
works, but it's slower and it's not what the clause is for.

## Object naming prefixes

| Prefix | Object | Example |
|---|---|---|
| `vw_` | View (Lesson 58) | `vw_ExpensiveProducts` |
| `usp_` | Stored procedure — "user stored procedure" (Lesson 68) | `usp_GetExpensiveProducts` |

Both prefixes are optional in SQL Server itself, but this course uses
them consistently so an object's kind is obvious from its name alone,
without having to look it up.

## Stored procedure parameters (Lesson 69)

Always call with **named notation** — unambiguous and order-independent:

```sql
-- This course's convention:
EXEC usp_GetProductsByColorAndPrice @Color = 'Red', @MinPrice = 500;

-- Avoid (positional — easy to get wrong once there are several params):
EXEC usp_GetProductsByColorAndPrice 'Red', 500;
```

## Raising your own errors: THROW, not RAISERROR (Lesson 77)

`THROW` is the modern, recommended syntax for new code. `RAISERROR` is
the older syntax — recognize it in legacy scripts, but don't write new
code with it.

```sql
-- Preferred, for new code:
THROW 50000, 'Product does not exist.', 1;

-- Re-raising the exact error just caught, inside a CATCH block:
THROW;

-- Older syntax, still seen in existing code — avoid for anything new:
RAISERROR('Product does not exist.', 16, 1);
```

## SARGable predicates (Lesson 87)

Never wrap the **column** in a function inside a `WHERE` clause — wrap
the comparison value instead, and leave the column untouched so SQL
Server can still use an index on it.

```sql
-- NON-SARGABLE: avoid
WHERE YEAR(SellStartDate) = 2013
WHERE UPPER(LastName) = 'SMITH'

-- SARGABLE: prefer
WHERE SellStartDate >= '2013-01-01' AND SellStartDate < '2014-01-01'
WHERE LastName = 'Smith' -- relying on this course's default case-insensitive collation
```

## Quick checklist before you call a query "done"

- [ ] Keywords uppercase, one clause per line, statement ends with `;`
- [ ] Two-part `schema.table` names throughout
- [ ] A comment explaining *why*, wherever the logic isn't obvious
- [ ] No function wrapped around a filtered/joined column (SARGable)
- [ ] New stored procedures use `usp_`; new views use `vw_`
- [ ] Stored procedure calls use named `@Param = value` notation
- [ ] New custom errors use `THROW`, not `RAISERROR`
