# Lesson 3 — Sorting and Limiting Results

**Chapter 1 · SQL Foundations for Finance · Lesson 3 of 5**

## What you'll learn

- `ORDER BY` — sorting results ascending and descending
- `FETCH FIRST n ROWS ONLY` — Oracle's modern way to cap a result set
- `ROWNUM` — the legacy approach you'll still see in older code
- Why "biggest" and "oldest" questions always need both

## ORDER BY: sorting the result

```sql
SELECT invoice_num, invoice_amount
FROM ap_invoices_all
ORDER BY invoice_amount DESC;
```

`ORDER BY` sorts the final result set. `DESC` means largest first; the
default, if you leave it off, is `ASC` (smallest/earliest first). You can
sort by more than one column — `ORDER BY vendor_id, invoice_date` sorts by
vendor first, then by date within each vendor.

## FETCH FIRST n ROWS ONLY: the modern limit

Finance often asks for "the biggest" or "the oldest N" of something — not
every row, just the top handful. Oracle Database 12c introduced the
ANSI-standard way to do that:

```sql
SELECT invoice_num, invoice_amount
FROM ap_invoices_all
ORDER BY invoice_amount DESC
FETCH FIRST 10 ROWS ONLY;
```

This reads naturally: order everything by invoice amount, highest first,
then fetch just the first 10 rows. Because `FETCH FIRST` is evaluated
**after** `ORDER BY`, you always get the correct top 10 — the sort happens
first, then the cap.

## ROWNUM: the legacy approach

Before Oracle 12c, there was no `FETCH FIRST`. Consultants used a
pseudo-column called `ROWNUM` instead, and you will still see it in older
Oracle Financials customizations and reports:

```sql
SELECT invoice_num, invoice_amount
FROM (
    SELECT invoice_num, invoice_amount
    FROM ap_invoices_all
    ORDER BY invoice_amount DESC
)
WHERE ROWNUM <= 10;
```

Notice the inner query does the sorting, wrapped in an outer query that
applies `ROWNUM`. That wrapping is required: `ROWNUM` is assigned to rows as
Oracle produces them, **before** any `ORDER BY` in the same query block
takes effect, so `WHERE ROWNUM <= 10 ORDER BY invoice_amount DESC` in a
single query block would sort the wrong 10 rows. `FETCH FIRST` avoids this
trap entirely, which is why this course uses it going forward, reserving
`ROWNUM` for recognizing it in code you didn't write.

## Combining with OFFSET

```sql
SELECT invoice_num, invoice_amount
FROM ap_invoices_all
ORDER BY invoice_amount DESC
OFFSET 10 ROWS FETCH NEXT 10 ROWS ONLY;
```

`OFFSET` skips rows before fetching — this returns the 11th through 20th
largest invoices, useful for paging through a long result a page at a time.

## Key terms

| Term | Meaning |
|---|---|
| `ORDER BY` | Sorts the final result set, ascending by default |
| `FETCH FIRST n ROWS ONLY` | Oracle 12c+ ANSI syntax to cap a result after sorting |
| `ROWNUM` | Legacy pseudo-column, assigned before `ORDER BY` runs — needs a wrapped subquery to sort first |
| `OFFSET` | Skips a number of rows before fetching, for paging |

## Lab

Write a query against `ap_invoices_all` returning the 5 oldest unpaid
invoices (`payment_status_flag <> 'Y'`), sorted by `invoice_date` ascending,
using `FETCH FIRST`.

## Check yourself

You're ready for Lesson 4 when you can answer, without looking: why does
`ROWNUM <= 10` need a wrapped subquery to get the correct top 10 by amount,
while `FETCH FIRST 10 ROWS ONLY` doesn't?
