# Lesson 4 — Working with Dates in Oracle SQL

**Chapter 1 · SQL Foundations for Finance · Lesson 4 of 5**

## What you'll learn

- `SYSDATE` and `TRUNC` — today's date, without the time component
- Date arithmetic: subtracting two dates gives you a number of days
- `ADD_MONTHS` and `MONTHS_BETWEEN`
- `TO_CHAR` and `TO_DATE` for formatting and parsing

Dates are everywhere in Financials — due dates, invoice dates, period end
dates — and the unpaid-invoice challenge from Lesson 1 depends entirely on
getting date math right. This lesson builds that foundation.

## SYSDATE and TRUNC

```sql
SELECT SYSDATE FROM dual;
```

`SYSDATE` returns the current date **and time** on the database server.
`dual` is a tiny built-in Oracle table with exactly one row, used whenever
you want to evaluate an expression without querying real data. Because
`SYSDATE` includes a time component, comparing it to a plain date column
can behave unexpectedly, so Financials queries almost always wrap it in
`TRUNC`:

```sql
SELECT TRUNC(SYSDATE) FROM dual;
```

`TRUNC(SYSDATE)` strips the time off, leaving midnight on today's date —
this is what you want for "how many days ago" calculations.

## Date arithmetic: subtracting two dates

In Oracle, subtracting one date from another gives you the number of days
between them, as a plain number:

```sql
SELECT invoice_num, TRUNC(SYSDATE) - invoice_date AS days_old
FROM ap_invoices_all
WHERE invoice_amount > 10000;
```

`days_old` is a number — if `invoice_date` was 45 days ago, `days_old` is
`45`. This single piece of arithmetic is the engine behind every aging
calculation you'll build in this course.

## ADD_MONTHS and MONTHS_BETWEEN

```sql
SELECT ADD_MONTHS(invoice_date, 1) AS one_month_later
FROM ap_invoices_all;

SELECT MONTHS_BETWEEN(SYSDATE, invoice_date) AS months_old
FROM ap_invoices_all;
```

`ADD_MONTHS` shifts a date forward (or backward, with a negative number) by
whole months — correctly handling month-end edge cases, which plain day
arithmetic can't. `MONTHS_BETWEEN` returns the number of months between two
dates, including a fractional part for partial months.

## TO_CHAR and TO_DATE

```sql
SELECT TO_CHAR(invoice_date, 'YYYY-MM-DD') AS invoice_date_text
FROM ap_invoices_all;

SELECT *
FROM ap_invoices_all
WHERE invoice_date >= TO_DATE('2026-01-01', 'YYYY-MM-DD');
```

`TO_CHAR` turns a date into formatted text, for reports. `TO_DATE` does the
reverse — it parses a text string into a real date, using a format mask so
Oracle knows how to read it. Always supply the format mask; relying on
Oracle's default date format is a common source of bugs when a report runs
on a server configured differently than your own machine.

## Key terms

| Term | Meaning |
|---|---|
| `SYSDATE` | Current date and time on the database server |
| `TRUNC(date)` | Strips the time component, leaving midnight |
| `date1 - date2` | Number of days between two dates |
| `ADD_MONTHS` | Shifts a date by whole months |
| `MONTHS_BETWEEN` | Number of months (with a fraction) between two dates |
| `TO_CHAR` / `TO_DATE` | Format a date as text / parse text into a date |

## Lab

Write a query returning `invoice_num` and the number of days between
`invoice_date` and today (`TRUNC(SYSDATE)`) for every invoice in
`ap_invoices_all`, aliased as `days_old`.

## Check yourself

You're ready for Lesson 5 when you can answer, without looking: what does
subtracting one Oracle date from another actually return, and why do
Financials queries almost always wrap `SYSDATE` in `TRUNC` before comparing
it to a date column?
