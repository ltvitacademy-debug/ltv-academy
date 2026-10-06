# Lesson 8 — Inner vs. Outer Joins for Finance

**Chapter 2 · Joining Financial Tables · Lesson 3 of 5**

## What you'll learn

- Why `INNER JOIN` sometimes hides exactly the rows Finance needs to see
- `LEFT OUTER JOIN` — keeping unmatched rows from the first table
- Finding suppliers with no invoices, and invoices with no payment yet
- The legacy Oracle `(+)` outer join syntax, so you can recognize it

## The problem INNER JOIN creates

Lesson 6's join only shows suppliers that **have** invoices. But a common
Finance question is the opposite: "which suppliers have we set up but never
actually paid?" `INNER JOIN` can never answer that — by definition, it
drops every supplier with zero matching invoices before you even get to add
a `WHERE` clause.

## LEFT OUTER JOIN: keeping the unmatched rows

```sql
SELECT s.vendor_name, i.invoice_num, i.invoice_amount
FROM poz_suppliers s
LEFT OUTER JOIN ap_invoices_all i
    ON s.vendor_id = i.vendor_id;
```

`LEFT OUTER JOIN` (often just written `LEFT JOIN`) keeps **every** row from
the left-hand table (`poz_suppliers`), whether or not it finds a match on
the right. Where there's no matching invoice, every invoice column comes
back as `NULL` instead of the row disappearing.

## Finding suppliers with zero invoices

```sql
SELECT s.vendor_name
FROM poz_suppliers s
LEFT OUTER JOIN ap_invoices_all i
    ON s.vendor_id = i.vendor_id
WHERE i.invoice_id IS NULL;
```

This is the pattern: `LEFT OUTER JOIN`, then filter for
`WHERE <right-table key> IS NULL`. Only suppliers with **no** matching
invoice row survive that filter — because only for them is `i.invoice_id`
actually `NULL`. This exact pattern — outer join, then `IS NULL` on the
right side's key — is how you'll find "things that should exist but don't"
throughout this course.

## Finding invoices with no payment yet

The same pattern, flipped onto payments:

```sql
SELECT i.invoice_num, i.invoice_amount
FROM ap_invoices_all i
LEFT OUTER JOIN ap_invoice_payments_all ip
    ON ip.invoice_id = i.invoice_id
WHERE ip.invoice_id IS NULL;
```

Every invoice that has never had a single payment applied comes back here
— a useful early-warning list, separate from "unpaid but scheduled," which
you'll build with `AP_PAYMENT_SCHEDULES_ALL` in Chapter 5.

## The legacy (+) syntax

Older Oracle code — and you will run into it — sometimes uses a different,
Oracle-only outer join notation instead of ANSI `LEFT JOIN`:

```sql
SELECT s.vendor_name, i.invoice_num
FROM poz_suppliers s, ap_invoices_all i
WHERE s.vendor_id = i.vendor_id (+);
```

The `(+)` goes on the side that may be **missing** a match — here, on
`i.vendor_id`, meaning "keep every supplier even if there's no matching
invoice." This is the pre-ANSI Oracle outer join syntax. It still works,
but it's harder to read and easier to get wrong (a misplaced `(+)` silently
changes which side is kept), so this course always uses `LEFT OUTER JOIN`
going forward — recognizing `(+)` is enough.

## Key terms

| Term | Meaning |
|---|---|
| `LEFT OUTER JOIN` | Keeps every row from the left table, NULL-filling unmatched right-side columns |
| Outer-join-then-IS-NULL | The pattern for finding rows on the left with no match on the right |
| `(+)` | Legacy, Oracle-only outer join notation — recognize it, don't write it |

## Lab

Write a query that returns every supplier in `poz_suppliers` that has never
had an invoice, using `LEFT OUTER JOIN` and `WHERE ... IS NULL`.

## Check yourself

You're ready for Lesson 9 when you can answer, without looking: why does
`INNER JOIN` alone never find "suppliers with zero invoices," and what's
the two-part pattern (`LEFT OUTER JOIN` plus what filter) that does?
