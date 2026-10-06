# Lesson 30 — Turning Queries into Reusable Reports

**Chapter 6 · Practice Sets · Lesson 5 of 5**

## What you'll learn

- `CREATE OR REPLACE VIEW` — saving a query under a name, for reuse
- Why a view is the right next step once a query proves useful
- A realistic view built from this course's unpaid-invoices challenge
- Where this course leaves you, and what comes next in the path

## From a one-off query to something reusable

Every query in this course has lived in a single script, run once. Once a
query **proves itself** — Finance keeps asking for the same unpaid-invoices
report every week, say — it's worth saving as something reusable instead
of re-typing or re-finding it each time.

## CREATE OR REPLACE VIEW

```sql
CREATE OR REPLACE VIEW vw_unpaid_invoices_over_threshold AS
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
  AND TRUNC(SYSDATE) - ps.due_date > 30;
```

This is Lesson 23's full unpaid-invoices query, saved as a **view** — a
named, stored query that behaves like a table every time it's queried.
`OR REPLACE` means re-running this statement updates the view's definition
if it already exists, instead of erroring out. Once created:

```sql
SELECT * FROM vw_unpaid_invoices_over_threshold
ORDER BY days_overdue DESC;
```

Anyone with access to the view can run this simple `SELECT`, with no idea
of the three-table join and three-condition filter underneath it — the
complexity is captured once, in the view's definition, and reused forever
after.

## Why a view, and not just a saved script

A view lives **in the database** itself, so it's queryable from any tool
that can connect — not just the one script file where you first wrote it.
It can also be the basis for row-level security (restricting who sees
which rows) in a way a plain script file cannot, though that topic belongs
to the Security course later in this path, not here.

## One important caution: a hardcoded threshold

Notice `10000` and `30` are hardcoded into the view's definition. If
Finance later wants `$15,000` instead, the view itself has to be edited
and re-created — a view isn't automatically parameterized the way a
function or report filter would be. For a view meant to be adjusted
often, consider instead keeping the query as a well-documented script
with those numbers clearly called out, or building it as a parameterized
report in whatever BI/reporting tool sits in front of this data.

## Where this course leaves you

You can now read and write Oracle SQL specific to Financials: the
dialect's own syntax quirks, the real Payables/Receivables/General Ledger
data model, and — most importantly — the method for turning any new
finance question into a working query, sanity-checked before anyone
trusts it. That's the whole toolkit this course set out to build,
starting from a single unpaid-invoices challenge in Lesson 1.

## Key terms

| Term | Meaning |
|---|---|
| `CREATE OR REPLACE VIEW` | Saves a query as a named, reusable, table-like object in the database |
| View vs. script | A view lives in the database and is queryable by anyone with access; a script lives in one file |

## Lab

Turn one of Chapter 6's practice-set investigations into a view, give it a
clear `vw_` name, and query it with a simple `SELECT * FROM`.

## Check yourself

Before moving on in the path: can you explain, without looking, why
`ps.amount_remaining > 10000` being hardcoded into a view is a real
limitation, and what a consultant should consider instead for thresholds
that change often?

## What's next

This course completes the **Reporting & Data** stage of the Oracle Fusion
Financials Consultant path — alongside Oracle Financial Reporting and
Oracle Financials Data, you now have the querying skills to actually get
data **out** of Oracle Fusion on your own terms. Next in the path:
**FBDI & ADFdi**, which flips the direction — getting data safely and
correctly **into** Oracle Fusion at scale, opening the Data Loading &
Integrations stage.
