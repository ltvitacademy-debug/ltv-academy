# Lesson 2 — SELECT, FROM and WHERE on Finance Data

**Chapter 1 · SQL Foundations for Finance · Lesson 2 of 5**

## What you'll learn

- The three clauses behind nearly every query in this course
- `AP_INVOICES_ALL`, your first real Oracle Financials table
- Comparison operators for filtering finance data
- Why Oracle table aliases never use `AS`

## Your first real table: AP_INVOICES_ALL

Behind the Manage Invoices page sits a table called `AP_INVOICES_ALL` — the
real Oracle Fusion/EBS table name, used by every Payables consultant who has
ever written a custom report. A simplified slice of it looks like this:

| Column | Meaning |
|---|---|
| `INVOICE_ID` | Unique internal ID for the invoice |
| `VENDOR_ID` | Which supplier this invoice belongs to |
| `INVOICE_NUM` | The invoice number as the supplier wrote it |
| `INVOICE_DATE` | Date on the invoice |
| `INVOICE_AMOUNT` | Total invoice amount |
| `PAYMENT_STATUS_FLAG` | `Y` fully paid, `N` unpaid, `P` partially paid |

## SELECT and FROM

```sql
SELECT invoice_num, invoice_date, invoice_amount
FROM ap_invoices_all;
```

`SELECT` lists the columns you want back. `FROM` names the table they come
from. Without a `WHERE`, every row in the table comes back — on a real
Payables table, that could be hundreds of thousands of rows, so `FROM`
without a filter is rarely what you actually want in practice.

## WHERE: filtering to the rows that matter

```sql
SELECT invoice_num, invoice_date, invoice_amount
FROM ap_invoices_all
WHERE invoice_amount > 10000;
```

`WHERE` is evaluated **per row**: for each row in `ap_invoices_all`, Oracle
checks whether `invoice_amount > 10000` is true. Only rows where it's true
make it into the result.

## Comparison operators

| Operator | Meaning |
|---|---|
| `=` | Equal to |
| `!=` or `<>` | Not equal to |
| `>`, `<`, `>=`, `<=` | Greater/less than (or equal) |

```sql
SELECT invoice_num, payment_status_flag
FROM ap_invoices_all
WHERE payment_status_flag <> 'Y';
```

That query returns every invoice that is **not** fully paid — `'N'`
(unpaid) and `'P'` (partially paid) both qualify. Notice the text value
`'Y'` is in single quotes; Oracle string and date literals always are.

## The Oracle rule everyone trips over: no AS on table aliases

```sql
SELECT i.invoice_num, i.invoice_amount
FROM ap_invoices_all i
WHERE i.invoice_amount > 10000;
```

`i` here is a **table alias** — a short stand-in name, exactly like you may
have used in other SQL dialects. But Oracle has one strict rule that
surprises people coming from SQL Server or MySQL: **a table alias cannot use
the `AS` keyword.** `FROM ap_invoices_all AS i` is a syntax error in Oracle.
Column aliases can still use `AS` if you want (`invoice_amount AS amt`), but
table aliases never can. This course writes table aliases bare, the Oracle
way, from here on.

## Key terms

| Term | Meaning |
|---|---|
| `SELECT` | Lists the columns to return |
| `FROM` | Names the table(s) to query |
| `WHERE` | Filters rows down to those where a condition is true |
| Table alias | A short stand-in name for a table — written with no `AS` in Oracle |

## Lab

Write a query against `ap_invoices_all` that returns `invoice_num` and
`invoice_amount` for every invoice where `invoice_amount` is greater than or
equal to 5000. Give the table an alias, and write that alias the Oracle way.

## Check yourself

You're ready for Lesson 3 when you can answer, without looking: what does
`WHERE` actually evaluate against, and what's the one rule Oracle enforces
about `AS` and table aliases that most other databases don't?
