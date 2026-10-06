# Lesson 5 — NULLs and Data Quality Checks

**Chapter 1 · SQL Foundations for Finance · Lesson 5 of 5**

## What you'll learn

- What `NULL` actually means — and what it isn't
- `IS NULL` / `IS NOT NULL` — the only correct way to test for it
- `NVL` and `NVL2` — Oracle's own NULL-substitution functions
- `COALESCE` — the ANSI-standard equivalent

This closes out Chapter 1. Before Finance trusts any total you calculate,
you need to know how to find — and handle — missing data.

## What NULL means

`NULL` represents **unknown or missing** data — it is not zero, not an
empty string, and not equal to anything, including another `NULL`. An
invoice distribution with no `ACCOUNTING_DATE` populated yet doesn't have an
accounting date of zero; it simply has none recorded.

## Testing for NULL: IS NULL and IS NOT NULL

```sql
SELECT invoice_num
FROM ap_invoices_all
WHERE vendor_site_id IS NULL;
```

Because `NULL` isn't equal to anything, `WHERE vendor_site_id = NULL` **never
matches a row** — not even a row that actually has a `NULL` there. It's not
an error, it just silently returns nothing, which makes it a dangerous typo
to miss. You must use `IS NULL` or `IS NOT NULL` — never `=` or `<>` — to
test for it.

## NVL: substituting a value for NULL

```sql
SELECT invoice_num,
       NVL(discount_amount_taken, 0) AS discount_amount_taken
FROM ap_invoices_all;
```

`NVL(expr, replacement)` returns `expr` if it isn't `NULL`, and
`replacement` otherwise. This is essential before summing a column that
might contain `NULL`s — `SUM` quietly skips `NULL` values on its own, but
once you start doing arithmetic across multiple columns, an unguarded
`NULL` can silently wipe out an entire calculation (`100 + NULL` is
`NULL`, not `100`).

## NVL2: one step further

```sql
SELECT invoice_num,
       NVL2(discount_amount_taken, 'Discount Taken', 'No Discount') AS discount_status
FROM ap_invoices_all;
```

`NVL2(expr, value_if_not_null, value_if_null)` picks between **two**
different values depending on whether `expr` is `NULL` — useful for status
labels like this one, in a single expression instead of a `CASE`.

## COALESCE: the ANSI-standard equivalent

```sql
SELECT invoice_num,
       COALESCE(discount_amount_taken, 0) AS discount_amount_taken
FROM ap_invoices_all;
```

`COALESCE` returns the first non-`NULL` value from a list of expressions —
with two arguments, it behaves just like `NVL`, but it also accepts more
than two, checked left to right. Because `COALESCE` is ANSI-standard SQL
(not Oracle-specific), many consultants prefer it for portability; both are
correct, and you'll see both in real Fusion customizations.

## Key terms

| Term | Meaning |
|---|---|
| `NULL` | Unknown/missing data — never equal to anything, including another NULL |
| `IS NULL` / `IS NOT NULL` | The only correct way to test for NULL |
| `NVL(expr, repl)` | Oracle function: substitutes `repl` when `expr` is NULL |
| `NVL2(expr, v1, v2)` | Oracle function: picks `v1` or `v2` depending on whether `expr` is NULL |
| `COALESCE(e1, e2, ...)` | ANSI-standard: returns the first non-NULL expression |

## Lab

Write a query against `ap_invoices_all` that finds every invoice where
`vendor_site_id IS NULL` — a common data-quality problem worth flagging
before an invoice can be paid.

## Check yourself

You're ready for Chapter 2 when you can answer, without looking: why does
`WHERE column = NULL` silently return no rows instead of raising an error,
and what's the correct way to write that condition instead?
