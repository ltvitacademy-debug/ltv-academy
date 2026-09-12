# Lesson 12 — Date & Text Functions

**Chapter 3 · Aggregation & Logic Functions · Lesson 12 of 25**

## What you'll learn

- EOMONTH for finding month-end and month-boundary dates without manual
  date math
- DATEDIF for calculating a precise duration (years, months, or days)
  between two dates
- TEXT for formatting a number or date into a specific display string
  inside a formula
- LEFT, RIGHT, MID, and TRIM for cleaning up messy text pulled from
  imported or copy-pasted data

## EOMONTH: month-end dates without counting days

```
=EOMONTH(StartDate, 0)
=EOMONTH(StartDate, 1)
```

`EOMONTH(start_date, months)` returns the last day of the month that is
`months` away from `start_date`. Zero gives the end of the current
month; 1 gives the end of next month; -1 gives the end of last month.
This replaces error-prone manual logic like checking February for leap
years — EOMONTH already knows how many days each month has.

## DATEDIF: the duration Excel hides from autocomplete

```
=DATEDIF(StartDate, EndDate, "Y")
=DATEDIF(StartDate, EndDate, "M")
=DATEDIF(StartDate, EndDate, "D")
```

`DATEDIF(start_date, end_date, unit)` returns the whole number of
complete years (`"Y"`), months (`"M"`), or days (`"D"`) between two
dates — exactly the "how many years has this employee worked here" or
"how many days until this invoice is overdue" calculation analysts
need constantly. It's a real, working function, but Excel deliberately
doesn't show it in formula autocomplete or the function wizard — it
still works perfectly when typed by hand, it's just undocumented in the
UI. Knowing it exists is most of the value here.

## TEXT: formatting a value as a display string

```
=TEXT(TotalSales, "$#,##0.00")
=TEXT(InvoiceDate, "mmm yyyy")
```

`TEXT(value, format_code)` converts a number or date into text using a
format code — the same codes used in Excel's custom number formatting
dialog. This matters specifically when a formatted value needs to be
**concatenated** into a sentence, like `="Total: " & TEXT(TotalSales,
"$#,##0")` — without TEXT, joining a raw number into text strips all
its formatting and shows the unformatted number instead.

## LEFT, RIGHT, MID & TRIM: cleaning imported text

```
=LEFT(ProductCode, 3)
=RIGHT(ProductCode, 4)
=MID(ProductCode, 4, 2)
=TRIM(CustomerName)
```

Data imported from another system or pasted from a report often comes
as one combined text string that needs splitting, or has extra spaces
that break exact-match lookups. `LEFT`/`RIGHT` pull a fixed number of
characters from the start or end of a string; `MID` pulls a chunk from
the middle, given a starting position and a length. `TRIM` removes
extra spaces — including the invisible leading/trailing spaces that
are a classic, silent cause of a VLOOKUP or XLOOKUP (Chapter 2)
returning `#N/A` even though the value looks identical to the eye.

## Key terms

| Term | Meaning |
|---|---|
| EOMONTH | Returns the last day of a month, offset by a number of months |
| DATEDIF | Returns the duration between two dates in years, months, or days — hidden from autocomplete |
| TEXT | Formats a number or date as a display string using a format code |
| TRIM | Removes extra spaces, including invisible ones that break lookups |

## Lab

1. Given any start date, use EOMONTH to find the end of the current month and the end of the previous month.
2. Given a hire date and today's date, use DATEDIF with `"Y"` to calculate years of service.
3. Take a text column with inconsistent leading/trailing spaces and clean it with TRIM, then confirm a lookup against it now matches correctly.

## Check yourself

You're ready for Lesson 13 when you can explain why DATEDIF still works
even though Excel won't suggest it while you type.
