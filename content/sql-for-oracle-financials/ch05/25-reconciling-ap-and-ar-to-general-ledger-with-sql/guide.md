# Lesson 25 — Reconciling AP and AR to General Ledger with SQL

**Chapter 5 · Investigating Financial Data · Lesson 5 of 5**

## What you'll learn

- Why subledger-to-GL reconciliation is one of the most important close tasks
- Totaling AP distributions by period and comparing to GL balances
- Doing the same for AR, mirrored
- Closing out Chapter 5 — and this course's investigation skills

## Why this reconciliation matters

Accounts Payable and Accounts Receivable are **subledgers** — detailed
transaction systems that periodically summarize their activity into the
General Ledger. If a subledger's total for a period doesn't match what
actually landed in the GL for the matching account, the trial balance is
wrong, and the month can't close cleanly. This is one of the most
important — and most commonly tested — reconciliation tasks in all of
Financials.

## AP distributions vs. GL balances, by period

```sql
WITH ap_by_period AS (
    SELECT TO_CHAR(ad.accounting_date, 'YYYY-MM') AS period_name,
           ad.dist_code_combination_id AS code_combination_id,
           SUM(ad.amount) AS ap_total
    FROM ap_invoice_distributions_all ad
    GROUP BY TO_CHAR(ad.accounting_date, 'YYYY-MM'), ad.dist_code_combination_id
),
gl_by_period AS (
    SELECT gb.period_name, gb.code_combination_id,
           gb.period_net_dr - gb.period_net_cr AS gl_total
    FROM gl_balances gb
    WHERE gb.actual_flag = 'A'
)
SELECT a.period_name, a.code_combination_id,
       a.ap_total, g.gl_total,
       a.ap_total - NVL(g.gl_total, 0) AS difference
FROM ap_by_period a
LEFT OUTER JOIN gl_by_period g
    ON g.period_name = a.period_name
    AND g.code_combination_id = a.code_combination_id
WHERE a.ap_total - NVL(g.gl_total, 0) <> 0;
```

This combines nearly everything this course has taught: a CTE (Lesson 17)
per side, `GROUP BY` by period and account (Lesson 14), `LEFT OUTER JOIN`
with `NVL` (Lesson 21's reconciliation pattern), and `HAVING`-style
exception filtering — here written as `WHERE` since the difference is
already computed inside the CTEs, not re-aggregated in the outer query.
`GL_BALANCES.ACTUAL_FLAG = 'A'` restricts to **actual** balances
(as opposed to budget or encumbrance balances also stored in that table).

## The same reconciliation, on AR

```sql
WITH ar_by_period AS (
    SELECT TO_CHAR(t.trx_date, 'YYYY-MM') AS period_name,
           tl.code_combination_id,
           SUM(tl.extended_amount) AS ar_total
    FROM ra_customer_trx_lines_all tl
    INNER JOIN ra_customer_trx_all t
        ON t.customer_trx_id = tl.customer_trx_id
    GROUP BY TO_CHAR(t.trx_date, 'YYYY-MM'), tl.code_combination_id
)
SELECT a.period_name, a.code_combination_id, a.ar_total,
       g.period_net_dr - g.period_net_cr AS gl_total
FROM ar_by_period a
LEFT OUTER JOIN gl_balances g
    ON g.period_name = a.period_name
    AND g.code_combination_id = a.code_combination_id
    AND g.actual_flag = 'A';
```

Same shape: total the subledger detail by period and account, then compare
to `GL_BALANCES` for the identical period and account combination.

## Chapter 5 and the course, tied together

This closes the investigation chapter: reconciling two numbers (21),
flagging bad data on its own (22), answering a real business question end
to end (23), tracing a specific transaction (24), and now tying subledgers
to the General Ledger itself (25). Chapter 6's practice sets let you
rehearse all of it before the course closes.

## Key terms

| Term | Meaning |
|---|---|
| Subledger | A detailed transaction system (AP, AR) that summarizes into the GL |
| `GL_BALANCES.ACTUAL_FLAG` | `'A'` for actual balances, as opposed to budget/encumbrance |
| Subledger-to-GL reconciliation | Confirming a subledger's period total matches the GL for the same account |

## Lab

Adapt the AP-to-GL reconciliation query to a single period you choose, and
identify every `code_combination_id` where the AP subledger and GL
disagree by more than $0.01 (to allow for harmless rounding).

## Check yourself

You're ready for Chapter 6 when you can answer, without looking: why is
subledger-to-GL reconciliation specifically important at month-end close,
and what does `GL_BALANCES.ACTUAL_FLAG = 'A'` filter out?
