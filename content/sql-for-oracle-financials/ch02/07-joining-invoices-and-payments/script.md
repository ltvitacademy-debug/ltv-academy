# Lesson 7 — Joining Invoices and Payments · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

How was this invoice actually paid? Answering that takes three tables, not
two — and understanding why is this lesson's whole point.

## S2 · STEPS CARD (three tables, linking table explained)

An invoice can be paid across more than one check — a partial payment, then
a final one — and a single check run can pay several invoices at once.
That's why A-P Invoice Payments All exists: it's a linking table, sitting
between the invoice and the actual check, built specifically to handle that
many-to-many reality.

## S3 · CODE CARD (three-table join)

Select invoice number, invoice amount, check number, check date, and the
amount on this specific check. From invoices, inner join invoice payments
on invoice id, inner join checks on check id. Each join adds one more table
to the chain — invoices to the linking table, linking table to checks.

## S4 · STEPS CARD (why one invoice can produce multiple rows)

If invoice 5001 was partially paid by one check, and the rest by a second
check later, this query returns two rows for that invoice — one per check.
That's correct: the join reflects what actually happened. One row per
invoice total comes later, with GROUP BY, in Chapter 3.

## S5 · CODE CARD (AP_PAYMENT_SCHEDULES_ALL)

And here's the table that actually matters for "what's still owed":
A-P Payment Schedules All. Due date, amount remaining — tracked
independent of whether a check has even been cut yet. This is where the
unpaid-invoices challenge gets its outstanding-balance number from, not
from the checks table.

## S6 · OUTRO CARD

Three tables, one chain: invoices, the linking table, and checks — plus a
fourth, payment schedules, for what's still owed. Next lesson: INNER versus
OUTER joins, and why "no match" sometimes needs to stay in the result.
