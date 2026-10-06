# Lesson 6 — Joining Suppliers and Invoices

**Chapter 2 · Joining Financial Tables · Lesson 1 of 5**

## What you'll learn

- `POZ_SUPPLIERS`, the real Oracle Fusion supplier master table
- Why `VENDOR_ID` is the join key — a naming leftover from Oracle's history
- Writing an `INNER JOIN` the Oracle way, with bare table aliases
- Combining a join with `WHERE` to answer a real question

## Two tables, one relationship

Every invoice in `AP_INVOICES_ALL` belongs to exactly one supplier, stored
in `POZ_SUPPLIERS`:

| Table | Key columns |
|---|---|
| `POZ_SUPPLIERS` | `VENDOR_ID`, `VENDOR_NAME` |
| `AP_INVOICES_ALL` | `INVOICE_ID`, `VENDOR_ID`, `INVOICE_NUM`, `INVOICE_AMOUNT` |

Notice the join column is called `VENDOR_ID` on **both** tables, even
though the supplier table itself is named `POZ_SUPPLIERS`. That's not a
typo — it's a genuine naming leftover. Oracle E-Business Suite originally
called suppliers "vendors" (`PO_VENDORS`), and when Fusion renamed the
supplier master to `POZ_SUPPLIERS`, the underlying `VENDOR_ID` column name
stuck around for compatibility. You'll see `VENDOR_ID` used as the supplier
key across the Payables schema for exactly this historical reason.

## INNER JOIN, the Oracle way

```sql
SELECT s.vendor_name, i.invoice_num, i.invoice_amount
FROM poz_suppliers s
INNER JOIN ap_invoices_all i
    ON s.vendor_id = i.vendor_id;
```

Read this top to bottom: `FROM` names the first table, aliased `s`.
`INNER JOIN` names the second, aliased `i` — notice, again, **no `AS`**
before either alias; that rule from Lesson 2 applies to every join you'll
ever write in Oracle. `ON` specifies the predicate that pairs rows together
— here, matching `VENDOR_ID` on both sides.

`INNER JOIN` returns only rows where that match exists on **both** sides. A
supplier with zero invoices this year never appears in this result; an
invoice row with a `VENDOR_ID` that doesn't exist in `POZ_SUPPLIERS` (which
shouldn't happen if the data is clean, but can in practice) is dropped too.

## Combining the join with WHERE

```sql
SELECT s.vendor_name, i.invoice_num, i.invoice_amount
FROM poz_suppliers s
INNER JOIN ap_invoices_all i
    ON s.vendor_id = i.vendor_id
WHERE i.invoice_amount > 10000
ORDER BY i.invoice_amount DESC;
```

`WHERE` still filters the **combined, already-joined** rows, exactly as it
did on a single table — it just now has columns from both tables available
to filter on. This is the first building block of the unpaid-invoices
challenge: you need the supplier's name on the result, which means you need
this join.

## Key terms

| Term | Meaning |
|---|---|
| `POZ_SUPPLIERS` | Oracle Fusion's supplier master table |
| `VENDOR_ID` | The supplier key column — named for Oracle's historical "vendor" terminology |
| `INNER JOIN` | Returns only rows that match on both sides |
| `ON` | The predicate deciding which rows pair together |

## Lab

Write a query joining `poz_suppliers` to `ap_invoices_all` that returns
`vendor_name`, `invoice_num` and `invoice_date` for every invoice from a
supplier whose `vendor_name` contains `'Steel'` (hint: you'll need `LIKE`
from the Chapter 2 join exercises, or simply filter with `=` on a known
exact name for now).

## Check yourself

You're ready for Lesson 7 when you can answer, without looking: why is the
join column between `POZ_SUPPLIERS` and `AP_INVOICES_ALL` called
`VENDOR_ID` instead of `SUPPLIER_ID`, and what does `INNER JOIN` drop from
the result?
