# Lesson 38 — NULL Handling & Data-Type Calculations

**Chapter 6 · Calculated Fields · Lesson 6 of 7**

## What you'll learn

- What NULL means in Tableau, and why it silently breaks formulas
- `ISNULL`, `IFNULL`, and `ZN` — three ways to handle a missing value
- Converting between text, numbers, and dates with `INT`, `FLOAT`,
  `STR`, and `DATE`
- Why type mismatches are one of the most common calculation errors

## What NULL actually means

**NULL** means "no value" — not zero, not an empty string, genuinely
*nothing*. A `Ship Date` that's `NULL` means the order hasn't shipped
yet, not that it shipped on some default date. The problem: arithmetic
on a `NULL` usually produces another `NULL`, which quietly propagates
through your calculation and can make an entire aggregation disappear
without any obvious error message.

## Testing for NULL: ISNULL

`ISNULL` answers a yes/no question — is this expression `NULL`?

```
Has Ship Date =
NOT ISNULL([Ship Date])
```

That returns `TRUE` for every row with a real ship date, `FALSE` for
any row still missing one. `ISNULL` on its own just tells you *that*
something is missing — it doesn't fix it.

## Substituting a default: IFNULL

`IFNULL` returns the first expression if it isn't `NULL`, and a
fallback value if it is:

```
Safe Discount =
IFNULL([Discount], 0)
```

If `[Discount]` has a real value, that value passes through unchanged.
If it's `NULL`, `Safe Discount` returns `0` instead — one clean
function call instead of writing out a full `IF`/`ISNULL`/`THEN`/
`ELSE`/`END` by hand.

## The numeric shortcut: ZN

`ZN` (short for "zero-null") does exactly one specific job: it
converts a `NULL` **numeric** value to `0`, and passes any other
number through unchanged:

```
Safe Sales =
ZN([Sales])
```

`ZN([Sales])` is functionally equivalent to `IFNULL([Sales], 0)`, but
shorter to type and instantly recognizable to anyone who's used
Tableau before — reach for `ZN` specifically for numbers, and
`IFNULL` for anything else (text, dates).

## Converting between data types

Sometimes a field arrives as the wrong type — a date stored as text, a
number stored as text, or vice versa. Tableau's conversion functions
force a value into a specific type:

| Function | Converts to |
|---|---|
| `INT(expr)` | Integer |
| `FLOAT(expr)` | Decimal number |
| `STR(expr)` | Text |
| `DATE(expr)` | Date |

```
Order Date Parsed =
DATE([Order Date String])
```

If `[Order Date String]` holds text like `"2024-07-17"`, `DATE()`
converts it into a real date field Tableau can use in date functions,
timelines, and date hierarchies — text alone can't do any of that.

## Why type mismatches cause errors

Tableau is strict about mixing types inside a single expression — you
can't directly add a number to a text string, or compare a date to an
integer, without converting one side first. When a calculation won't
save and the error mentions **"cannot be compared"** or **"expects a
[type] argument"**, the fix is almost always wrapping one side in the
right conversion function (`STR`, `INT`, `FLOAT`, or `DATE`) before
the operator that's complaining.

## Key terms

| Term | Meaning |
|---|---|
| NULL | "No value" — genuinely missing data, not zero or blank text |
| `ISNULL` | Returns `TRUE`/`FALSE` for whether an expression is `NULL` |
| `IFNULL` | Returns the expression if not `NULL`, otherwise a fallback value |
| `ZN` | Shorthand for converting a `NULL` number to `0` |

## Lab

1. On **Sample Superstore**, create `Safe Discount = IFNULL([Discount],
   0)` and confirm it never shows a blank/NULL value in a table, even
   for rows where `Discount` is missing.
2. Create `Has Ship Date = NOT ISNULL([Ship Date])` and use it as a
   filter to isolate unshipped orders, if your extract has any.
3. Find or fabricate a text field holding a date-like string (e.g. via
   a calculated field `"2024-07-17"`), then convert it with `DATE()`
   and confirm it now behaves like a real date on a timeline.

## Check yourself

You're ready for Lesson 39 when you can explain the difference
between `ISNULL`, `IFNULL`, and `ZN` in one sentence each, and name
which conversion function you'd use to turn a text field into a date.
