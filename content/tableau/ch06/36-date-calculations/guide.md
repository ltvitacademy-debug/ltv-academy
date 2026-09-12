# Lesson 36 — Date Calculations

**Chapter 6 · Calculated Fields · Lesson 4 of 7**

## What you'll learn

- How to measure the distance between two dates with `DATEDIFF`
- How to shift a date forward or backward with `DATEADD`
- How to pull a piece out of a date with `DATEPART` and `DATENAME`
- How `DATETRUNC` rounds a date down to the start of a period
- `TODAY()` and `NOW()` for the current date and timestamp

## Measuring the distance between two dates

`DATEDIFF` is the function you'll use constantly once you're working
with order and ship dates:

```
Days to Ship =
DATEDIFF('day', [Order Date], [Ship Date])
```

The first argument is the **date part** you want the difference
measured in — `'day'`, `'week'`, `'month'`, `'quarter'`, or `'year'`
are the ones you'll use most. `DATEDIFF` subtracts the first date from
the second, so make sure the earlier date comes first if you want a
positive result.

## Shifting a date

`DATEADD` moves a date forward (or backward, with a negative number)
by a given interval:

```
Follow-Up Date =
DATEADD('month', 3, [Order Date])
```

That returns a real date, three months after `[Order Date]` — useful
for anything that needs a future or past reference point, like a
warranty expiration or a follow-up reminder.

## Pulling a piece out of a date

Two closely related functions extract one component of a date:

| Function | Returns | Example |
|---|---|---|
| `DATEPART(date_part, date)` | An integer | `DATEPART('month', [Order Date])` → `7` |
| `DATENAME(date_part, date)` | A string | `DATENAME('month', [Order Date])` → `"July"` |

```
Order Month Name =
DATENAME('month', [Order Date])
```

Use `DATEPART` when you need the number for sorting or math;
`DATENAME` when you want something readable to put on a label or
axis.

## Rounding down with DATETRUNC

`DATETRUNC` rounds a date *down* to the start of whatever period you
specify — genuinely different from `DATEPART`, which extracts a
single number:

```
Order Month =
DATETRUNC('month', [Order Date])
```

If `[Order Date]` is `July 17, 2024`, `DATETRUNC('month', ...)`
returns `July 1, 2024` — still a real date, just snapped to the first
of the month. This is exactly how Tableau builds its own
built-in date hierarchies (Year > Quarter > Month) under the hood, and
it's the function you reach for when you want a trend line that groups
by month without losing the actual date type.

## Right now: TODAY() and NOW()

```
Order Age (Days) =
DATEDIFF('day', [Order Date], TODAY())
```

`TODAY()` returns the current date (no time component); `NOW()`
returns the current date *and* time. Both are commonly combined with
`DATEDIFF` to build "how long ago was this" calculations that update
every time you open the workbook.

## Key terms

| Term | Meaning |
|---|---|
| `DATEDIFF` | Returns the difference between two dates, in a specified date part |
| `DATEADD` | Shifts a date forward or backward by a specified interval |
| `DATEPART` / `DATENAME` | Extract one component of a date as a number or a string |
| `DATETRUNC` | Rounds a date down to the start of a specified period |

## Lab

1. On **Sample Superstore**, create `Days to Ship = DATEDIFF('day',
   [Order Date], [Ship Date])` and drop it on a text table by
   `Ship Mode` to compare average shipping time.
2. Create `Order Month = DATETRUNC('month', [Order Date])` and use it
   on a line chart's Columns shelf instead of the raw `Order Date` —
   compare the shape of the resulting trend line.
3. Create `Order Age (Days) = DATEDIFF('day', [Order Date],
   TODAY())` and sort a table by it descending to find the oldest
   order in the dataset.

## Check yourself

You're ready for Lesson 37 when you can write a `DATEDIFF` formula
from memory and explain the difference between `DATEPART` and
`DATETRUNC`.
