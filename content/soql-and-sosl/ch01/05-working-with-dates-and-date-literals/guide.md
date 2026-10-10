# Lesson 5 — Working With Dates and Date Literals

**Chapter 1 · Querying Salesforce · Lesson 5 of 23**

## What you'll learn

- How to filter on fixed dates versus relative date literals
- The categories of date literals SOQL provides, and how the `:n` parameterized forms work
- Why date literals exist instead of just calculating dates yourself
- A common gotcha with date/time fields and time zones

## Fixed dates

You can filter on a literal date directly, without quotes (dates are not strings in SOQL):

```sql
SELECT Name, CloseDate
FROM Opportunity
WHERE CloseDate = 2026-01-15
```

For datetime fields (fields that store both a date and a time), use the full ISO 8601 form:

```sql
SELECT Name, CreatedDate
FROM Case
WHERE CreatedDate > 2026-01-01T00:00:00Z
```

Fixed dates are fine for a one-off query, but almost every real report or Apex job needs "relative to today," not "relative to one specific calendar date" — which is exactly what date literals solve.

## Date literals

A date literal is a fixed expression representing a relative span of time, evaluated fresh every time the query runs, relative to the current day (and the running user's locale). Instead of calculating "30 days ago" yourself and hardcoding it, you write:

```sql
SELECT Name, CreatedDate
FROM Lead
WHERE CreatedDate = LAST_N_DAYS:30
```

That query means the same thing today as it will in six months, with zero maintenance. Salesforce documents a range of literal families:

- **Simple literals** — `TODAY`, `YESTERDAY`, `TOMORROW`
- **Calendar-period literals** — `THIS_WEEK`, `LAST_WEEK`, `THIS_MONTH`, `LAST_MONTH`, `THIS_QUARTER`, `THIS_YEAR`, `NEXT_YEAR`, and their fiscal-year equivalents (`THIS_FISCAL_QUARTER`, `THIS_FISCAL_YEAR`, and so on, for orgs with a custom fiscal year configured)
- **Parameterized `N` literals** — `LAST_N_DAYS:n`, `NEXT_N_DAYS:n`, `LAST_N_WEEKS:n`, `LAST_N_MONTHS:n`, `LAST_N_FISCAL_YEARS:n`, where you supply the count

Each literal's exact start and end boundary is defined relative to the moment the query runs, and some are locale-sensitive (what counts as the first day of "this week" depends on the running user's locale settings). Rather than memorizing every literal's exact boundary, the practical skill is knowing the literal exists and checking the current SOQL reference for the precise boundary when it matters for a given report.

## Why = instead of a range operator

Date literals represent a span, not a point, so `=` with a date literal means "falls within this range" — that's genuinely different from `=` with a fixed date, which means exactly one calendar day:

```sql
WHERE CreatedDate = THIS_MONTH
```

returns every record created at any point during the current month. To filter on one side of a boundary rather than the whole span, use `>` or `<`:

```sql
WHERE CloseDate > LAST_MONTH
```

This returns records from this month onward — everything after the end of last month — rather than records created during last month itself.

## A time zone gotcha

Date/time comparisons on datetime fields (like `CreatedDate`) are evaluated in relation to GMT internally but displayed and often reasoned about in the running user's time zone. A report that looks "off by a day" at month boundaries is very often a time zone artifact rather than a bug in your query — worth ruling out first before you start debugging the SOQL itself.

## Key terms

| Term | Meaning |
|---|---|
| Date literal | A fixed keyword representing a relative span of time (e.g. THIS_WEEK), evaluated fresh on every run |
| Parameterized N literal | A date literal family taking a numeric parameter, e.g. LAST_N_DAYS:30 |
| Fiscal-year literal | A date literal variant (THIS_FISCAL_YEAR, etc.) that respects a custom fiscal year configuration |

## Lab

Write three SOQL queries against `Opportunity`: one using `CloseDate = THIS_MONTH`, one using `CreatedDate = LAST_N_DAYS:7`, and one using `CloseDate > LAST_QUARTER` to find everything closing from last quarter's end onward. Run all three in a Developer Edition org's Query Editor and compare the row counts to a manual, fixed-date version of the same filter to confirm the literal is doing what you expect.

## Check yourself

Why does `WHERE CreatedDate = THIS_MONTH` make sense even though `=` usually means "exactly equal to one value"? What's the practical advantage of `LAST_N_DAYS:30` over hardcoding a fixed date 30 days in the past?
