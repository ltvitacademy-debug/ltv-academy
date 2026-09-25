# Date Functions in SOQL

Almost every real reporting question has a time dimension: what closed this quarter, which
cases came in last week, how did revenue trend by year. SOQL gives you two tools for that:
**date literals**, which are built-in keywords for relative time ranges, and **date
functions**, which extract parts of a date so you can group and filter by them. This lesson
closes Chapter Two.

## What you'll learn

- How to write date and datetime values in SOQL
- The most useful date literals, including the `:n` forms
- How `CALENDAR_YEAR()`, `CALENDAR_MONTH()`, and the fiscal functions work
- How to group by a date part

## Writing dates

Date values in SOQL are **never quoted**. A date field uses the `YYYY-MM-DD` format and a
datetime field uses `YYYY-MM-DDThh:mm:ssZ`.

```sql
SELECT Id, Name, CloseDate
FROM Opportunity
WHERE CloseDate >= 2026-01-01
  AND CloseDate <= 2026-03-31

SELECT Id, Subject
FROM Case
WHERE CreatedDate >= 2026-09-01T00:00:00Z
```

Hard-coding dates works, but the query is stale as soon as the calendar moves. Date
literals fix that.

## Date literals

A **date literal** is a keyword that Salesforce resolves against the current date every time
the query runs. Like dates, they are never quoted.

```sql
SELECT Id, Name, Amount FROM Opportunity WHERE CloseDate = THIS_MONTH
SELECT Id, Subject FROM Case WHERE CreatedDate = TODAY
SELECT Id, Subject FROM Case WHERE CreatedDate >= LAST_N_DAYS:30
SELECT Id, Name FROM Opportunity WHERE CloseDate = NEXT_QUARTER
```

Commonly used literals include:

- **Single days:** `YESTERDAY`, `TODAY`, `TOMORROW`
- **Weeks, months, quarters, years:** `LAST_WEEK`, `THIS_WEEK`, `NEXT_WEEK`, `LAST_MONTH`,
  `THIS_MONTH`, `NEXT_MONTH`, `THIS_QUARTER`, `LAST_YEAR`, `THIS_YEAR`, `NEXT_YEAR`
- **Fiscal versions:** `THIS_FISCAL_QUARTER`, `LAST_FISCAL_YEAR`, and so on, which follow
  your org's fiscal year settings
- **Rolling windows with a number:** `LAST_N_DAYS:n`, `NEXT_N_DAYS:n`, `LAST_N_MONTHS:n`,
  `N_DAYS_AGO:n`, where you replace `n` with a whole number, such as `LAST_N_DAYS:30`

Two points of care. First, a period literal like `THIS_MONTH` is a range, so
`CloseDate = THIS_MONTH` means "anywhere in this month," which is usually what you want.
Second, the `:n` forms take a colon and a number with no spaces.

## Date functions

Date functions extract a part of a date. The most used are `CALENDAR_YEAR()`,
`CALENDAR_QUARTER()`, `CALENDAR_MONTH()`, `DAY_IN_MONTH()`, `DAY_IN_WEEK()`, and
`WEEK_IN_YEAR()`. The fiscal equivalents are `FISCAL_YEAR()`, `FISCAL_QUARTER()`, and
`FISCAL_MONTH()`, and they use your org's fiscal calendar instead of January to December.
They work in `WHERE` and, most usefully, in `GROUP BY`.

```sql
SELECT CALENDAR_YEAR(CloseDate) yr, SUM(Amount) revenue
FROM Opportunity
WHERE StageName = 'Closed Won'
GROUP BY CALENDAR_YEAR(CloseDate)
ORDER BY CALENDAR_YEAR(CloseDate)
```

This returns one row per year of closed-won revenue, combining Lesson 8's grouping with a
date function. To group by fiscal quarter, swap in `FISCAL_QUARTER(CloseDate)` and, if you
span several years, include `FISCAL_YEAR(CloseDate)` too, so that quarter 1 of one year does
not merge with quarter 1 of another.

You can also filter with a function: `WHERE CALENDAR_YEAR(CloseDate) = 2026`. It works, but
a range such as `CloseDate = THIS_YEAR` is usually simpler and lets Salesforce use its
indexes more easily.

## A datetime caveat

Fields like `CreatedDate` store a full timestamp in UTC. When you group by a date part of a
datetime field, wrap it in `convertTimezone()` so the boundaries follow the running user's
time zone: `CALENDAR_MONTH(convertTimezone(CreatedDate))`. Plain `Date` fields such as
`CloseDate` have no time zone issue.

## Key terms

| Term | Meaning |
|---|---|
| Date literal | A keyword such as `TODAY` or `LAST_N_DAYS:30` resolved against the current date each time the query runs |
| `LAST_N_DAYS:n` | A rolling window literal; replace `n` with a number of days |
| Date function | A function like `CALENDAR_YEAR()` that extracts part of a date, usable in `WHERE` and `GROUP BY` |
| Fiscal function | A date function, like `FISCAL_QUARTER()`, that follows the org's fiscal year settings |
| `convertTimezone()` | Converts a datetime field to the user's time zone before a date function is applied |

## Check yourself

You need closed-won revenue for each fiscal quarter across the last three years. Which date
function or functions would you put in `GROUP BY`, and why is a single `FISCAL_QUARTER()` not
enough?
