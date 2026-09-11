# Lesson 18 — SCD Type 2

**Chapter 4 · Slowly Changing Dimensions · Lesson 18 of 39**

## What you'll learn

- The exact mechanics of a Type 2 change: an UPDATE and an INSERT
  working together, in a real Microsoft dimensional modeling diagram
- Why Type 2 requires a surrogate key, and what breaks if you try
  to do it with only a natural key
- The full set of historical tracking columns — effective date,
  expiration date, and a current-row flag — and what each one is for
- The real tradeoff: accurate history versus a growing number of
  versions per dimension member
- Why this is the single most important pattern in this chapter

## Why Type 2 exists

Type 1 (Lesson 17) is simple, but it destroys history: overwrite a
salesperson's region assignment, and every past sale now reports
under the new region, as if it had always been that way. **SCD
Type 2** exists specifically to prevent that. Instead of overwriting
the existing row, a Type 2 change **inserts a brand-new row** that
represents a new *version* of the dimension member — and the old
row is preserved, untouched, as a permanent historical record.

## The mechanics, from a real diagram

![Diagram showing a salesperson dimension row before and after a Type 2 change: the old row's EndDate is set and IsCurrent flips to FALSE, while a new row is inserted with a new surrogate key, a new StartDate, and IsCurrent set to TRUE.](/courses/data-warehousing/ch04/18-scd-type-2/slowly-changing-dimension-type-2.svg)
*The old row closes; a new surrogate key opens the current version.*

This is Microsoft's own real example: a salesperson (natural key
`EmployeeID = 758596752`) is reassigned from sales region `4` to
sales region `5`. Two things happen, in order:

1. **UPDATE the existing row.** The old row (surrogate key `296`)
   is *not* deleted. Its `EndDate` is set to the date the change took
   effect (`20240523`), and its `IsCurrent` flag flips from `TRUE`
   to `FALSE`. It becomes permanent history.
2. **INSERT a brand-new row.** A new row gets a **new surrogate
   key** (`369` — never reused), the *same* natural key
   (`758596752` — this is still the same person), the new
   `SalesRegion_FK` value (`5`), a `StartDate` equal to the old row's
   `EndDate`, and `IsCurrent = TRUE`.

Notice there are now **two rows for the same salesperson** — that's
the entire point. The old row still exists, fully intact, for any
historical fact that needs to know what was true *at the time*.

## Why a new surrogate key is required

The natural key (`EmployeeID`) is now duplicated across two rows —
one salesperson, two versions. If dimension rows were only
identified by their natural key, the warehouse couldn't tell which
version a given fact should join to. The **surrogate key** is what
makes each version uniquely addressable: fact rows loaded *before*
the change point to surrogate key `296`; fact rows loaded *after*
point to `369`. This is exactly why Lesson 12 insisted surrogate keys
are non-negotiable for any dimension that might need Type 2 tracking
later — you can't retrofit this cleanly onto a dimension keyed only
by its natural key.

## The historical tracking columns

| Column (this course's naming) | Microsoft's naming | Purpose |
|---|---|---|
| `EffectiveDate` | `RecValidFromKey` / `StartDate` | When this version became active |
| `ExpirationDate` | `RecValidToKey` / `EndDate` | When this version stopped being active (a far-future date like `9999-12-31` for the current row) |
| `IsCurrentFlag` | `RecIsCurrent` / `IsCurrent` | `TRUE`/`1` for exactly one version per natural key — the one current fact loads should use |

Different shops name these differently — you'll see `EffectiveDate`/
`ExpirationDate`, `StartDate`/`EndDate`, or Microsoft's own
`RecValidFromKey`/`RecValidToKey` — but the three jobs above are
universal to every Type 2 implementation.

## The SQL pattern

```sql
UPDATE DimSalesperson
SET    ExpirationDate = '2024-05-23',
       IsCurrentFlag   = 0
WHERE  SalespersonKey = 296;

INSERT INTO DimSalesperson
  (BusinessKey, SalesRegionKey, EffectiveDate,
   ExpirationDate, IsCurrentFlag)
VALUES (758596752, 5, '2024-05-23', '9999-12-31', 1);
```

Notice both statements run as one logical unit of work — the old
row's closing and the new row's opening represent a single business
event and should be wrapped in one transaction.

## The real tradeoff

Type 2 gives you accurate history, but at a cost: **the fact
table's grain isn't really "salesperson," it's "salesperson
version."** A rollup of historical sales by region still produces the
*correct* numbers — but there are now two (or more) dimension rows
to look at instead of one, and reports need to account for that.
Microsoft's own guidance adds a practical label tip here: give
versioned rows a descriptive label — e.g. "Lynn Tsoflias (Australia)"
for one version, "Lynn Tsoflias (United Kingdom)" for the next — so
analysts browsing the dimension can tell versions apart at a glance.

Too many Type 2 versions on one attribute is also a warning sign.
If an attribute changes *frequently* (a "rapidly changing
dimension"), Type 2 can produce an overwhelming number of versions.
In that case, consider moving the attribute into the fact table
directly instead of versioning the dimension.

## Key terms

| Term | Meaning |
|---|---|
| SCD Type 2 | Insert a new, time-versioned row when an attribute changes, preserving the old row as permanent history |
| Surrogate key | The unique key that distinguishes each version of a dimension member — required for Type 2 |
| EffectiveDate / ExpirationDate | The validity window during which a given version was the current one |
| IsCurrentFlag | Marks exactly one version per natural key as the one current fact loads should use |
| Rapidly changing dimension | An attribute that changes so often that Type 2 versioning produces too many rows — a signal to reconsider |

## Lab

1. In AdventureWorksDW2014, open `DimEmployee` and find its
   `StartDate`, `EndDate`, and `Status` columns — this is a real,
   already-implemented Type 2 pattern. Write a query that returns
   only the *current* version of every employee.
2. Using the mechanics above, write the `UPDATE` + `INSERT` pair you
   would run if employee `758596752` moved from `SalesRegionKey 5`
   to `SalesRegionKey 7` on `2025-01-10`.

## Check yourself

You're ready for Lesson 19 when you can explain, without looking:
why Type 2 requires a surrogate key, what each of the three
historical tracking columns does, and the real tradeoff Type 2
introduces to a dimension's grain.
