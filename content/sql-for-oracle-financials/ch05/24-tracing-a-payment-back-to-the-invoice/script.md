# Lesson 24 — Tracing a Payment Back to the Invoice · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Every query so far starts from a condition and finds matching rows — a
list. An audit trail is different: it starts from one specific, known
record, and walks backward to answer "what was this actually for?"

## S2 · CODE CARD (tracing from a check number)

Start at AP checks all, where check number equals a specific value. Join
forward to invoice payments, to invoices, out to suppliers for the name.
Notice this runs in the opposite direction from lesson seven's original
join — here you start at the check and walk backward to what it paid. If
that check paid more than one invoice, you correctly get one row per
invoice.

## S3 · CODE CARD (the same trace on Receivables)

Same idea, mirrored. Start at the cash receipt, walk through applications
and payment schedules to the transaction, out to the customer account.
Exactly lesson nine's chain — just traversed from the opposite end,
starting at the receipt instead of the customer.

## S4 · STEPS CARD (why this matters)

When an auditor or a supplier disputes what a specific check was actually
for, a consultant who can write this trace in under a minute — instead of
clicking through screens — demonstrates real command of the data model,
not just the UI.

## S5 · OUTRO CARD

List queries start from a condition. Trace queries start from a known
record and work backward. Last lesson before the practice sets: tying AP
and AR all the way to the General Ledger.
