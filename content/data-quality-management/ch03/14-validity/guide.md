# Lesson 14 — Validity

**Chapter 3 · The Quality Dimensions · Lesson 14 of 30**

## What you'll learn

- What "validity" means — and why it's the quality dimension closest
  to a database's own built-in constraints
- The four common kinds of validity rule: type, format, range, and
  allowed-value (domain)
- How to check each kind with T-SQL, and how `CHECK` constraints
  enforce some of them automatically
- Why validity is usually the cheapest dimension to automate

## What validity actually means

**Validity** is whether a value conforms to a defined rule — a data
type, a format, a range, or a fixed set of allowed values. It's the
dimension that asks "is this a legal value?", not "is this the
*correct* value?" (that's accuracy, Lesson 11).

This is also the dimension SQL Server already partially enforces for
you: a column's data type is itself a validity rule. `INT` can't hold
`'banana'`. A `DATE` column can't hold `'next Tuesday'`. But most
validity rules worth checking are more specific than the column's raw
data type — and that's where explicit checks come in.

## Four kinds of validity rule

| Kind | Example rule | Example violation |
|---|---|---|
| **Type** | Must be numeric | `'N/A'` stored in a string column meant to hold numbers |
| **Format** | Must match a pattern | `'555-01999'` — wrong number of digits for a phone number |
| **Range** | Must fall between bounds | `Quantity = -5` in a column that should never be negative |
| **Domain** | Must be one of a fixed set | `Status = 'Pending-ish'` when only `'Pending'`, `'Shipped'`, `'Cancelled'` are legal |

## Checking validity with SQL

**Range check:**

```sql
SELECT OrderId, Quantity
FROM dbo.Orders
WHERE Quantity <= 0 OR Quantity > 10000;
```

**Domain (allowed-value) check:**

```sql
SELECT OrderId, Status
FROM dbo.Orders
WHERE Status NOT IN ('Pending', 'Shipped', 'Cancelled', 'Returned');
```

**Format check with a pattern** (`LIKE` with wildcards for simple
patterns — SQL Server doesn't have native regex, but `LIKE` covers a
lot of ground):

```sql
-- US 5-digit zip code: exactly 5 digits, nothing else
SELECT CustomerId, ZipCode
FROM dbo.Customers
WHERE ZipCode NOT LIKE '[0-9][0-9][0-9][0-9][0-9]'
   OR LEN(ZipCode) <> 5;
```

## Enforcing validity automatically with `CHECK`

Everything above *detects* existing violations. A `CHECK` constraint
goes a step further and **prevents** a violation from ever being
written in the first place:

```sql
ALTER TABLE dbo.Orders
ADD CONSTRAINT CK_Orders_Quantity
    CHECK (Quantity > 0 AND Quantity <= 10000);

ALTER TABLE dbo.Orders
ADD CONSTRAINT CK_Orders_Status
    CHECK (Status IN ('Pending', 'Shipped', 'Cancelled', 'Returned'));
```

This is the one spot in the quality dimensions where "data quality
check" and "database constraint" are nearly the same thing — a
`CHECK` constraint *is* a validity rule, enforced by the engine instead
of a separate query. The tradeoff: a constraint stops bad data from
being written, but it won't tell you about bad data that's already
there from before the constraint existed. You still need the `SELECT`
version of the check to audit existing rows.

## Key terms

| Term | Meaning |
|---|---|
| Validity | Whether a value conforms to a defined rule (type, format, range, or domain) |
| Domain | The fixed set of legal values a column is allowed to hold |
| CHECK constraint | A database-enforced rule that rejects writes violating a validity condition |

## Lab

1. Create a small `Orders` test table with `Quantity INT` and
   `Status VARCHAR(20)` columns, and insert a handful of rows —
   including at least one with a negative quantity and one with an
   invalid status.
2. Write a `SELECT` query that detects both kinds of violation.
3. Add a `CHECK` constraint for each rule, then try inserting another
   invalid row and confirm SQL Server rejects it.
4. Explain, in a comment in your script, why the `SELECT` audit query
   is still useful even after the `CHECK` constraints are in place.

## Check yourself

- Name the four common kinds of validity rule and give one example of
  each that isn't from this lesson.
- Why does a `CHECK` constraint not replace the need for an audit
  query against existing data?
- How is validity different from accuracy, even though both can be
  checked with similar-looking `WHERE` clauses?
