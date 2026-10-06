# Lesson 20 — Comparing Two Sets of Data

**Chapter 4 · Subqueries and CTEs · Lesson 5 of 5**

## What you'll learn

- `UNION` and `UNION ALL` — combining two result sets into one
- `INTERSECT` — rows that appear in both sets
- `MINUS` — Oracle's set-difference operator (it's not called `EXCEPT` here)
- Closing out Chapter 4 by comparing two periods' supplier lists

## The three set operators

All three combine the results of two `SELECT` statements that return the
**same number of columns**, in compatible data types. They operate on
whole result sets, not individual rows joined by a key.

| Operator | Returns |
|---|---|
| `UNION` | Every distinct row from either query |
| `UNION ALL` | Every row from both queries, duplicates kept |
| `INTERSECT` | Only rows that appear in **both** queries |
| `MINUS` | Rows from the first query that do **not** appear in the second |

## UNION vs. UNION ALL

```sql
SELECT vendor_id FROM ap_invoices_all WHERE invoice_date >= DATE '2026-01-01'
UNION
SELECT vendor_id FROM ap_invoices_all WHERE invoice_date < DATE '2026-01-01';
```

`UNION` removes duplicate rows from the combined result — if a supplier
has invoices in both halves of this query, they still appear only once.
`UNION ALL` skips that duplicate-removal step, which makes it **faster**
whenever you already know (or don't care) that duplicates can't occur or
don't matter — always prefer `UNION ALL` unless you specifically need
deduplication.

## MINUS: Oracle's name for set difference

```sql
SELECT vendor_id FROM ap_invoices_all WHERE invoice_date >= DATE '2026-01-01'
MINUS
SELECT vendor_id FROM ap_invoices_all WHERE invoice_date < DATE '2026-01-01';
```

Other databases (SQL Server, Postgres) call this operator `EXCEPT` —
Oracle has always called it `MINUS`. This returns every `vendor_id` that
invoiced in 2026 **but never invoiced before 2026** — new suppliers, from
the data's perspective. (Oracle 21c added `EXCEPT` as an additional,
newer alias, but `MINUS` is the name you'll see everywhere in existing
Oracle Financials code, and the one this course uses.)

## INTERSECT: what both sets share

```sql
SELECT vendor_id FROM ap_invoices_all WHERE invoice_date >= DATE '2026-01-01'
INTERSECT
SELECT vendor_id FROM ap_invoices_all WHERE invoice_date < DATE '2026-01-01';
```

This returns suppliers who invoiced **both** before and during 2026 —
established, ongoing suppliers, as opposed to brand-new ones.

## Chapter 4, tied together

Chapter 4 added the tools for questions that depend on another question's
answer, or that need to look across an entire set of rows rather than row
by row: subqueries (scalar, multi-row, correlated), CTEs for naming and
chaining logic, `NOT EXISTS` for missing records, `ROW_NUMBER()` for
duplicates, and now set operators for comparing two results outright.
Chapter 5 puts all of it to work on real finance investigations.

## Key terms

| Term | Meaning |
|---|---|
| `UNION` | Combines two result sets, removing duplicates |
| `UNION ALL` | Combines two result sets, keeping duplicates (faster) |
| `INTERSECT` | Rows present in both result sets |
| `MINUS` | Rows in the first result set, absent from the second (Oracle's name for `EXCEPT`) |

## Lab

Using `ap_invoices_all`, write a `MINUS` query returning every `vendor_id`
that appears in 2026 invoices but not in 2025 invoices.

## Check yourself

You're ready for Chapter 5 when you can answer, without looking: what does
`MINUS` return that `INTERSECT` doesn't, and why should you generally
prefer `UNION ALL` over `UNION` when you know duplicates can't occur?
