# Lesson 26 — SQL Practice Set: Payables Investigations · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Three real Payables investigations, framed exactly the way Finance would
actually ask them. Try each one yourself before you see the solution.

## S2 · CODE CARD (top 5 suppliers by exposure)

"Which suppliers are we most exposed to right now?" Join suppliers to
invoices to payment schedules, sum amount remaining, group by supplier,
order by total descending, fetch first five rows only. Three chapters at
once: the join chain, GROUP BY and SUM, and FETCH FIRST to cap it.

## S3 · CODE CARD (suspected duplicate payment)

"Did we pay any single invoice more than once?" Group by invoice, having
sum of payments at least double the invoice amount. That threshold is
deliberate — it's tuned to catch an actual duplicate payment, not just a
small overpayment.

## S4 · CODE CARD (missing remit-to site)

"Are any active suppliers missing a remit-to site?" Suppliers with at
least one invoice, where that invoice has no vendor site ID recorded — a
data gap that can block payment processing entirely. Chapter one's IS
NULL check, put to work on a real investigation.

## S5 · OUTRO CARD

Exposure, duplicates, data gaps — three different questions, the same
toolkit. Next lesson: the same exercise, on the Receivables side.
