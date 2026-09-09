# Lesson 49 — Date Functions: GETDATE, DATEADD, DATEDIFF

**Chapter 5 · Data Types, Strings, and Dates · Lesson 9 of 11**

## What you'll learn

- `GETDATE()` — the current date and time
- `DATEADD()` — adding or subtracting time from a date
- `DATEDIFF()` — measuring the distance between two dates
- Combining all three in a real query

## GETDATE — right now

```sql
SELECT GETDATE() AS CurrentDateTime;
```

`GETDATE()` returns the current date and time from the server, as a
`DATETIME`. It's commonly used for timestamping (`CreatedDate`,
`ModifiedDate`) and for date-math that needs to reference "today."

## DATEADD — moving a date forward or backward

```sql
USE AdventureWorks2012;
GO

SELECT OrderDate, DATEADD(DAY, 30, OrderDate) AS ThirtyDaysLater
FROM Sales.SalesOrderHeader;
```

`DATEADD(interval, number, date)` adds `number` of the specified
`interval` (`DAY`, `MONTH`, `YEAR`, `HOUR`, and more) to `date`. Use a
**negative** number to go backward instead of forward:

```sql
SELECT DATEADD(MONTH, -3, GETDATE()) AS ThreeMonthsAgo;
```

## DATEDIFF — measuring the gap between two dates

```sql
SELECT OrderDate, DueDate, DATEDIFF(DAY, OrderDate, DueDate) AS DaysToDeliver
FROM Sales.SalesOrderHeader;
```

`DATEDIFF(interval, startDate, endDate)` returns the number of interval
**boundaries crossed** between the two dates — for `DAY`, this is
effectively the day count between them. Order matters: reversing
`startDate` and `endDate` flips the sign of the result.

## Combining all three

```sql
SELECT OrderDate,
       DATEDIFF(DAY, OrderDate, GETDATE()) AS DaysSinceOrdered
FROM Sales.SalesOrderHeader
WHERE OrderDate > DATEADD(YEAR, -1, GETDATE());
```

This finds orders from the **last year** (`DATEADD` computing "one year
ago" from right now) and shows how many days have passed since each one
(`DATEDIFF` against `GETDATE()`).

## Key terms

| Term | Meaning |
|---|---|
| `GETDATE()` | The server's current date and time |
| `DATEADD(interval, number, date)` | Adds (or subtracts, with a negative number) time to a date |
| `DATEDIFF(interval, start, end)` | The number of interval boundaries between two dates |

## Lab

Run this against AdventureWorks2012:

```sql
SELECT SalesOrderID, OrderDate,
       DATEDIFF(DAY, OrderDate, GETDATE()) AS DaysAgo
FROM Sales.SalesOrderHeader
WHERE OrderDate > DATEADD(MONTH, -1, GETDATE())
ORDER BY OrderDate DESC;
```

## Check yourself

You're ready for Lesson 50 when you can answer, without looking: what
happens if you swap `DATEDIFF`'s start and end dates, and how do you make
`DATEADD` go backward instead of forward?
