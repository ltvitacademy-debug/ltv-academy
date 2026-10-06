# Lesson 12 — HAVING and Filtering Groups

**Chapter 3 · Aggregation and Aging · Lesson 2 of 5**

## What you'll learn

- Why `WHERE` can't filter on an aggregated total
- `HAVING` — the clause built specifically for that
- The logical order: `FROM` → `WHERE` → `GROUP BY` → `HAVING` → `ORDER BY`
- Using `WHERE` and `HAVING` together in the same query

## The problem: WHERE runs too early

```sql
-- ERROR: invoice_amount here means the GROUPED total, which WHERE can't see
SELECT vendor_id, SUM(invoice_amount) AS total_invoiced
FROM ap_invoices_all
WHERE SUM(invoice_amount) > 50000
GROUP BY vendor_id;
```

This fails because `WHERE` is evaluated **before** grouping happens — row
by row, exactly like every earlier lesson. At the point `WHERE` runs,
there's no such thing yet as "this supplier's total," because the rows
haven't been grouped and summed yet.

## HAVING: filtering after the aggregate is computed

```sql
SELECT vendor_id, SUM(invoice_amount) AS total_invoiced
FROM ap_invoices_all
GROUP BY vendor_id
HAVING SUM(invoice_amount) > 50000;
```

`HAVING` runs **after** `GROUP BY` has produced its one-row-per-group
result, so it can filter on the aggregate itself. This answers a question
`WHERE` structurally cannot: "which suppliers, in total, have we invoiced
more than $50,000 with this year?"

## The full logical order

Oracle evaluates a query's clauses in this order, regardless of the order
you type them in:

```sql
SELECT vendor_id, SUM(invoice_amount) AS total_invoiced
FROM ap_invoices_all                -- 1. FROM
WHERE invoice_date >= DATE '2026-01-01'  -- 2. WHERE (per-row filter)
GROUP BY vendor_id                  -- 3. GROUP BY
HAVING SUM(invoice_amount) > 50000  -- 4. HAVING (per-group filter)
ORDER BY total_invoiced DESC;       -- 5. ORDER BY
```

`WHERE` narrows down which **rows** even get grouped in the first place —
it's always cheaper to filter rows out early with `WHERE` than to group
everything and filter groups out later with `HAVING`. Use `WHERE` for
row-level conditions, `HAVING` only for conditions on the aggregate itself.

## WHERE and HAVING together

They're not alternatives — they routinely appear in the same query, each
doing the job the other can't:

```sql
SELECT vendor_id, COUNT(*) AS invoice_count, SUM(invoice_amount) AS total_invoiced
FROM ap_invoices_all
WHERE payment_status_flag <> 'Y'
GROUP BY vendor_id
HAVING COUNT(*) >= 3;
```

This finds suppliers with **3 or more unpaid/partially-paid invoices** —
`WHERE` picks which rows count as unpaid in the first place, `HAVING`
filters down to suppliers with enough of them to matter.

## Key terms

| Term | Meaning |
|---|---|
| `WHERE` | Filters individual rows, before grouping |
| `HAVING` | Filters groups, after aggregation, based on the aggregate value |
| Logical order | `FROM` → `WHERE` → `GROUP BY` → `HAVING` → `ORDER BY` |

## Lab

Write a query grouping `ap_invoices_all` by `vendor_id`, with `WHERE` kept
to invoices from 2026 and `HAVING` kept to suppliers whose total
`invoice_amount` exceeds $100,000.

## Check yourself

You're ready for Lesson 13 when you can answer, without looking: why can't
`WHERE SUM(invoice_amount) > 50000` work, and which clause does that job
instead?
