# Lesson 12 — Surrogate Keys

**Chapter 3 · Dimension Tables · Lesson 12 of 39**

## What you'll learn

- What a surrogate key actually is, and how to generate one in T-SQL
- The four concrete benefits a surrogate key buys you, beyond "it's a
  primary key"
- The special reserved key values warehouses use for missing, unknown,
  N/A, and error rows
- Why a surrogate key should almost never carry business meaning

## A meaningless key, on purpose

A **surrogate key** is a system-generated identifier — almost always a
simple integer — that exists purely to identify a row. It has no meaning
in the real world; it doesn't come from a source system, and a business
user would never ask for it by name. The easiest way to generate one in
SQL Server is `IDENTITY`:

```sql
CREATE TABLE DimProduct (
    ProductKey     INT IDENTITY(1,1) PRIMARY KEY,
    ProductCode    VARCHAR(20)  NOT NULL,
    ProductName    VARCHAR(100) NOT NULL,
    Category       VARCHAR(50)  NOT NULL
);
```

`ProductKey` is the surrogate key — SQL Server assigns it automatically on
insert, it's the table's `PRIMARY KEY`, and nothing about its value means
anything outside this one table. `ProductCode` is the *natural* key
(Lesson 13 compares the two directly).

## Four real reasons to use one

It's tempting to think a surrogate key is just bureaucratic overhead when
a perfectly good natural key already exists. It isn't — a surrogate key
buys you four concrete things:

- **Consolidates multiple sources.** If two source systems each have
  their own `CustomerID` numbering, a surrogate key gives the warehouse
  one clean, collision-free identifier regardless of where a row came
  from.
- **Shrinks the join.** A narrow `INT` surrogate key joins faster than a
  long text natural key — and every fact table row references one.
- **Enables SCD Type 2 history.** A Type 2 change (covered in Chapter 4)
  inserts a *new row* for the same real-world entity. That's only
  possible because the surrogate key — not the natural key — is what has
  to stay unique.
- **Insulates the warehouse.** If a source system ever changes the
  *format* of its own IDs, the warehouse's own surrogate-key numbering
  never has to change to match.

## Reserved surrogate key values

Real dimension tables also reserve a handful of small negative or zero
surrogate key values for rows that represent something other than a
normal member — so a fact table's foreign key never has to be left
`NULL`:

| Key value | Purpose |
|---|---|
| `0` | Missing — not available in the source system |
| `-1` | Unknown — a lookup failed while loading the fact row |
| `-2` | N/A — not applicable to this fact |
| `-3` | Error — something went wrong during load |

Loading a fact row that can't be matched to a real dimension member
this way still gives it a valid foreign key, so joins and constraints
keep working.

## The one exception: don't be afraid to break the "meaningless" rule for dates

The advice to keep a surrogate key meaningless has exactly one common
exception: a **date dimension's** surrogate key is conventionally stored
in `YYYYMMDD` format as an `INT` (for example, `20260911`). It's
readable, it sorts correctly, and it's the one case where a human-
readable surrogate key is standard practice — Lesson 13 covers this
in more detail.

## Key terms

| Term | Meaning |
|---|---|
| Surrogate key | A system-generated, meaningless identifier used as a dimension's primary key |
| IDENTITY | The T-SQL column property that auto-generates sequential surrogate key values |
| Reserved key value | A small negative or zero surrogate key representing missing, unknown, N/A, or error rows |

## Lab

Run against `AdventureWorksDW2014`:

```sql
-- Confirm ProductKey is the surrogate key: an IDENTITY column, unique, and gapless-ish
SELECT MIN(ProductKey) AS MinKey, MAX(ProductKey) AS MaxKey, COUNT(*) AS RowCount
FROM dbo.DimProduct;

-- Look for any reserved key values already in use
SELECT ProductKey, EnglishProductName
FROM dbo.DimProduct
WHERE ProductKey <= 0;
```

## Check yourself

You're ready for Lesson 13 when you can explain, without looking: what
`IDENTITY` does, name at least two of the four real benefits a surrogate
key provides, and say what a fact table's foreign key value should be
when the true dimension member is unknown at load time.
