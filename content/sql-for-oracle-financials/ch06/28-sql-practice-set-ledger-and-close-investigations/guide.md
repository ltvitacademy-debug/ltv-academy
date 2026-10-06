# Lesson 28 — SQL Practice Set: Ledger and Close Investigations

**Chapter 6 · Practice Sets · Lesson 3 of 5**

## What you'll learn

The final three investigations in the practice set, on the General
Ledger side — the kind of checks that run during an actual month-end
close.

## Investigation 1: "Is every journal in this period actually balanced?"

**The ask:** every journal header where total debits don't equal total
credits — which should never happen if the data is clean, since a real
accounting journal always balances by definition.

```sql
SELECT h.je_header_id, h.name,
       SUM(l.entered_dr) AS total_debits,
       SUM(l.entered_cr) AS total_credits
FROM gl_je_headers h
INNER JOIN gl_je_lines l
    ON l.je_header_id = h.je_header_id
WHERE h.period_name = 'JUN-26'
GROUP BY h.je_header_id, h.name
HAVING SUM(l.entered_dr) <> SUM(l.entered_cr);
```

If this query **ever** returns a row, something has gone seriously wrong —
either with the data itself or with a customization that bypassed Oracle's
normal journal-entry validation. A clean result (zero rows) is the
expected, healthy outcome here, unlike most of this course's exception
checks.

## Investigation 2: "Is this accounting period actually still open?"

**The ask:** before processing anything into a given period, confirm it's
open.

```sql
SELECT period_name, closing_status
FROM gl_periods
WHERE period_name = 'JUN-26';
```

A one-table, one-row lookup — the simplest query in this entire course —
but one of the most important guardrails in real close work: never assume
a period is open. Common `CLOSING_STATUS` values include `'O'` (open),
`'C'` (closed), and `'P'` (permanently closed), though exact codes can
vary by configuration.

## Investigation 3: "Which GL accounts moved the most this period, period over period?"

**The ask:** the 5 accounts (code combinations) with the largest swing in
net activity compared to the prior period — often the first thing a
controller asks about during a close review.

```sql
WITH current_period AS (
    SELECT code_combination_id, period_net_dr - period_net_cr AS net_activity
    FROM gl_balances
    WHERE period_name = 'JUN-26' AND actual_flag = 'A'
),
prior_period AS (
    SELECT code_combination_id, period_net_dr - period_net_cr AS net_activity
    FROM gl_balances
    WHERE period_name = 'MAY-26' AND actual_flag = 'A'
)
SELECT c.code_combination_id,
       c.net_activity AS current_net, p.net_activity AS prior_net,
       ABS(c.net_activity - NVL(p.net_activity, 0)) AS swing
FROM current_period c
LEFT OUTER JOIN prior_period p
    ON p.code_combination_id = c.code_combination_id
ORDER BY swing DESC
FETCH FIRST 5 ROWS ONLY;
```

Two CTEs, one per period, joined and compared — `ABS()` (absolute value)
treats a big swing up and a big swing down as equally worth investigating,
which is usually what a controller actually wants here.

## Key terms

| Term | Meaning |
|---|---|
| Balanced journal | A journal where total debits equal total credits — always true for valid accounting data |
| `GL_PERIODS.CLOSING_STATUS` | Whether a period is open, closed, or permanently closed |

## Lab

Run Investigation 1 against a period of your choosing and confirm it
returns zero rows — then explain, in your own words, why a nonzero result
there would be a serious red flag rather than an ordinary exception.

## Check yourself

You're ready for Lesson 29 when you can answer, without looking: why
should Investigation 1 normally return zero rows, unlike most of this
course's other exception checks, and what does `ABS()` accomplish in
Investigation 3?
