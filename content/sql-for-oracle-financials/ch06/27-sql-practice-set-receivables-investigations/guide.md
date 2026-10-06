# Lesson 27 — SQL Practice Set: Receivables Investigations

**Chapter 6 · Practice Sets · Lesson 2 of 5**

## What you'll learn

Three more real investigations, mirrored onto Receivables. Same method as
Lesson 26: work each one out yourself first.

## Investigation 1: "Which customers owe us the most, past due?"

**The ask:** the top 5 customers by total past-due balance (overdue, not
just outstanding).

```sql
SELECT c.account_number, SUM(ps.amount_due_remaining) AS total_past_due
FROM hz_cust_accounts c
INNER JOIN ar_payment_schedules_all ps
    ON ps.customer_id = c.cust_account_id
WHERE ps.amount_due_remaining > 0
  AND ps.due_date < TRUNC(SYSDATE)
GROUP BY c.account_number
ORDER BY total_past_due DESC
FETCH FIRST 5 ROWS ONLY;
```

The Receivables mirror of Lesson 26's first investigation — note the
explicit `due_date < TRUNC(SYSDATE)` condition, which is what makes this
specifically "past due" rather than simply "outstanding" (an invoice due
next week is outstanding, but not past due).

## Investigation 2: "Which customers have unapplied cash sitting on their account?"

**The ask:** customers with at least one cash receipt that still has
money left unapplied.

```sql
SELECT c.account_number, r.receipt_number,
       r.amount - NVL(SUM(ra.amount_applied), 0) AS unapplied_amount
FROM hz_cust_accounts c
INNER JOIN ar_cash_receipts_all r
    ON r.customer_id = c.cust_account_id
LEFT OUTER JOIN ar_receivable_applications_all ra
    ON ra.cash_receipt_id = r.cash_receipt_id
GROUP BY c.account_number, r.receipt_number, r.amount
HAVING r.amount - NVL(SUM(ra.amount_applied), 0) <> 0;
```

A direct application of Lesson 21's reconciliation pattern, now with a
customer account joined in for context.

## Investigation 3: "Which customers have never made a single payment?"

**The ask:** customers with at least one transaction, but zero cash
receipts ever recorded against their account.

```sql
SELECT c.account_number
FROM hz_cust_accounts c
WHERE EXISTS (
    SELECT 1 FROM ra_customer_trx_all t
    WHERE t.bill_to_customer_id = c.cust_account_id
)
AND NOT EXISTS (
    SELECT 1 FROM ar_cash_receipts_all r
    WHERE r.customer_id = c.cust_account_id
);
```

`EXISTS` and `NOT EXISTS` combined in one query — "has a transaction" and
"has never paid" at the same time — a pattern you'll reach for constantly
once you're comfortable with Chapter 4's tools.

## Key terms

| Term | Meaning |
|---|---|
| Past due vs. outstanding | Past due requires `due_date` to already have passed; outstanding just means not yet fully paid |

## Lab

Write a fourth investigation: "which customers have a past-due balance
over $5,000 AND unapplied cash on their account at the same time?" —
combine Investigations 1 and 2 above.

## Check yourself

You're ready for Lesson 28 when you can answer, without looking: what
makes "past due" different from "outstanding," and how does Investigation
3 combine `EXISTS` and `NOT EXISTS` to answer a question that needs both?
