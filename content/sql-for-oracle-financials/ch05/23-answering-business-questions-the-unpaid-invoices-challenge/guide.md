# Lesson 23 — Answering Business Questions: The Unpaid Invoices Challenge

**Chapter 5 · Investigating Financial Data · Lesson 3 of 5**

## What you'll learn

- Translating a plain-English business question into a query, piece by piece
- Building the complete unpaid-invoices-over-$10,000 query from Lesson 1
- Why this query's three conditions each belong to a different part of the data model
- The general method for tackling any new business question like it

## The question, again

From Lesson 1: **"Finance needs every unpaid supplier invoice over $10,000
that's more than 30 days old."** You now have every tool required to build
this for real. Let's build it piece by piece.

## Step 1: break the question into conditions

| Business phrase | Data condition | Where it lives |
|---|---|---|
| "Unpaid supplier invoice" | `payment_status_flag <> 'Y'` | `AP_INVOICES_ALL` |
| "Over $10,000" | `invoice_amount > 10000` | `AP_INVOICES_ALL` |
| "More than 30 days old" | `TRUNC(SYSDATE) - due_date > 30` | `AP_PAYMENT_SCHEDULES_ALL` |

Notice the "30 days old" part doesn't actually live on the invoice at all —
Lesson 7 established that `AP_PAYMENT_SCHEDULES_ALL`, not `AP_INVOICES_ALL`,
is the table that tracks `DUE_DATE` and what's actually still owed. This is
exactly why Chapter 2's joins matter: the real answer to a business
question is frequently spread across more than one table.

## Step 2: build the query

```sql
SELECT s.vendor_name,
       i.invoice_num,
       i.invoice_date,
       ps.due_date,
       ps.amount_remaining,
       TRUNC(SYSDATE) - ps.due_date AS days_overdue
FROM ap_invoices_all i
INNER JOIN poz_suppliers s
    ON s.vendor_id = i.vendor_id
INNER JOIN ap_payment_schedules_all ps
    ON ps.invoice_id = i.invoice_id
WHERE i.payment_status_flag <> 'Y'
  AND ps.amount_remaining > 10000
  AND TRUNC(SYSDATE) - ps.due_date > 30
ORDER BY days_overdue DESC;
```

Walk through it exactly as it reads: join invoices to suppliers (Lesson 6)
to get a human-readable name, join invoices to payment schedules (Lesson
7) to get what's actually still owed and when it was due, then filter on
all three conditions from the table above at once. `ps.amount_remaining`
is used rather than `i.invoice_amount` deliberately — a partially-paid
invoice might have started over $10,000 but now have less than that
actually remaining, and "over $10,000" should mean the **outstanding**
amount, not the original invoice total.

## Step 3: sanity-check the result

Before handing a query like this to Finance, ask: does every row make
sense? Is `days_overdue` always positive (it should be, given the
filter)? Does `vendor_name` look like a real company name, not blank or
garbled? This kind of review catches join mistakes — like accidentally
using `LEFT OUTER JOIN` where `INNER JOIN` was intended, silently
including rows that shouldn't qualify.

## The general method, for the next new question

1. Translate each business phrase into a concrete column condition.
2. Identify which **table** each condition actually lives on.
3. Join only the tables you need, using the key relationships from
   Chapter 2.
4. Apply every condition in `WHERE` (or `HAVING`, if it's on an
   aggregate).
5. Sanity-check the result before trusting it.

## Key terms

| Term | Meaning |
|---|---|
| Business phrase → condition | Translating plain English into a specific column and operator |
| Outstanding amount vs. original amount | `AMOUNT_REMAINING` reflects partial payments; `INVOICE_AMOUNT` does not |

## Lab

Adapt the query above to answer a close variant: "every unpaid invoice over
$5,000 that's more than 60 days old," and confirm the result changes
sensibly when you tighten or loosen each threshold.

## Check yourself

You're ready for Lesson 24 when you can answer, without looking: why does
this query filter on `ps.amount_remaining` rather than `i.invoice_amount`,
and which table does the "30 days old" condition actually come from?
