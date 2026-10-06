# Lesson 14 — Balances by Supplier, Customer and Period

**Chapter 3 · Aggregation and Aging · Lesson 4 of 5**

## What you'll learn

- Grouping by more than one column at once
- Building a supplier-by-period balance report
- The same pattern, mirrored onto Receivables
- Reading a multi-column `GROUP BY` result correctly

## GROUP BY with more than one column

So far, every `GROUP BY` in this course has grouped by a single column.
Finance regularly wants two dimensions at once — a balance **per supplier,
per period**, not just per supplier overall:

```sql
SELECT i.vendor_id, TO_CHAR(i.invoice_date, 'YYYY-MM') AS invoice_month,
       SUM(i.invoice_amount) AS total_invoiced
FROM ap_invoices_all i
GROUP BY i.vendor_id, TO_CHAR(i.invoice_date, 'YYYY-MM');
```

With two columns in `GROUP BY`, Oracle creates one group for every distinct
**combination** of `vendor_id` and `invoice_month` — supplier 101 in
January is a different group from supplier 101 in February, even though
it's the same supplier.

## Bringing in the supplier name

Joining first, then grouping, works exactly the way you'd expect from
Chapter 2 plus this chapter combined:

```sql
SELECT s.vendor_name, TO_CHAR(i.invoice_date, 'YYYY-MM') AS invoice_month,
       SUM(i.invoice_amount) AS total_invoiced,
       COUNT(*) AS invoice_count
FROM poz_suppliers s
INNER JOIN ap_invoices_all i
    ON i.vendor_id = s.vendor_id
GROUP BY s.vendor_name, TO_CHAR(i.invoice_date, 'YYYY-MM')
ORDER BY s.vendor_name, invoice_month;
```

Notice `s.vendor_name` is safe to include un-aggregated: because you're
also grouping by `vendor_id`'s effective identity through the join (one
`vendor_name` per `vendor_id`), every row within a group shares the same
`vendor_name` — Oracle still requires it in `GROUP BY`, but it will never
actually vary within a group.

## The same pattern, mirrored onto Receivables

```sql
SELECT c.account_number, TO_CHAR(t.trx_date, 'YYYY-MM') AS trx_month,
       SUM(ps.amount_due_remaining) AS total_outstanding
FROM hz_cust_accounts c
INNER JOIN ra_customer_trx_all t
    ON t.bill_to_customer_id = c.cust_account_id
INNER JOIN ar_payment_schedules_all ps
    ON ps.customer_trx_id = t.customer_trx_id
GROUP BY c.account_number, TO_CHAR(t.trx_date, 'YYYY-MM');
```

Same structure: join the chain of tables from Lesson 9, then group by
customer and month together, summing the outstanding balance
(`AMOUNT_DUE_REMAINING`) from `AR_PAYMENT_SCHEDULES_ALL`.

## Key terms

| Term | Meaning |
|---|---|
| Multi-column `GROUP BY` | Creates one group per distinct combination of the listed columns |
| `TO_CHAR(date, 'YYYY-MM')` | A common way to group dates into a monthly bucket |

## Lab

Write a query grouping `ap_invoices_all` joined to `poz_suppliers` by
`vendor_name` and month, returning total invoiced per supplier per month,
ordered by supplier name then month.

## Check yourself

You're ready for Lesson 15 when you can answer, without looking: when you
`GROUP BY vendor_id, invoice_month`, what counts as "the same group" — and
why is it safe to include `vendor_name` in `SELECT` without aggregating it,
once you've joined to the supplier table?
