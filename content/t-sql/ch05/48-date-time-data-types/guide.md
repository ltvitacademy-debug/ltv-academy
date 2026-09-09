# Lesson 48 — Date and Time Data Types

**Chapter 5 · Data Types, Strings, and Dates · Lesson 8 of 11**

## What you'll learn

- The four main date/time types: `DATE`, `TIME`, `DATETIME`, `DATETIME2`
- Why storing only what you need matters
- `DATETIME`'s quirks vs. `DATETIME2`'s improvements

## DATE — just the date

```sql
-- Illustrative column definition:
-- BirthDate DATE  -- stores 2026-09-09, no time component at all
```

`DATE` stores a calendar date only — year, month, day. No time-of-day
information exists at all, which is exactly right for something like a
birth date or a hire date, where a time component is meaningless.

## TIME — just the time

```sql
-- ShiftStart TIME  -- stores 09:00:00, no date component
```

`TIME` is the mirror image: time-of-day only, no date.

## DATETIME — the old standby

```sql
-- OrderDate DATETIME
```

`DATETIME` stores both date and time together, and has been in SQL Server
since long before the more precise types existed. It has two quirks worth
knowing:
- Its valid range starts at January 1, 1753 — dates before that can't be
  stored.
- Its precision rounds to increments of about **3.33 milliseconds**, not a
  clean fraction of a second.

## DATETIME2 — the modern replacement

```sql
-- OrderDateModern DATETIME2
```

`DATETIME2` fixes both `DATETIME` quirks: a much wider valid date range
(back to year 1) and genuinely precise fractional seconds. **For new
development, `DATETIME2` is the recommended choice** over legacy
`DATETIME` — you'll see `DATETIME` constantly in existing databases
(including AdventureWorks2012 itself, built years ago), but reach for
`DATETIME2` when designing something new.

## Why storing only what you need matters

Just like `CHAR` vs. `VARCHAR` (Lesson 41), picking the **narrowest**
appropriate type communicates intent and avoids wasted storage: a birth
date stored as `DATETIME` implies a time-of-day that doesn't exist and
never means anything, inviting confusion later (was that midnight
literally recorded, or just a default?).

## Key terms

| Term | Meaning |
|---|---|
| `DATE` | Calendar date only, no time |
| `TIME` | Time of day only, no date |
| `DATETIME` | Legacy combined type, limited range and precision |
| `DATETIME2` | Modern combined type, wider range and true precision |

## Lab

In AdventureWorks2012, check the data type of
`Sales.SalesOrderHeader.OrderDate` and `HumanResources.Employee.BirthDate`
via Object Explorer, and explain why each was declared the way it was.

## Check yourself

You're ready for Lesson 49 when you can answer, without looking: what are
`DATETIME`'s two main limitations, and why should new development prefer
`DATETIME2`?
