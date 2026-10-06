# Lesson 25 — Reconciling AP and AR to General Ledger · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

AP and AR are subledgers — detailed systems that periodically summarize
into the General Ledger. If a subledger's total doesn't match the GL for
that same period and account, the month can't close cleanly. This is one
of the most important reconciliations in all of Financials.

## S2 · CODE CARD (AP distributions vs. GL balances)

Two CTEs: AP totaled by period and account, GL balances filtered to
actual, not budget or encumbrance. Left outer join them together on
period and account, NVL-guard the GL side, and keep only where the
difference isn't zero. This combines nearly everything this course has
taught, in one query.

## S3 · CODE CARD (the same reconciliation, on AR)

Same shape, mirrored onto Receivables: total the transaction lines by
period and account, left outer join to GL balances on the same period and
account. Subledger total, GL total, side by side.

## S4 · STEPS CARD (Chapter 5, tied together)

Look at what Chapter 5 built: reconciling two numbers that should agree,
flagging data that looks wrong on its own, answering a real business
question end to end, tracing one specific transaction backward, and now
tying both subledgers to the General Ledger itself.

## S5 · OUTRO CARD

Chapter 5 complete. Next: Chapter 6, practice sets — a chance to rehearse
everything you've built, across Payables, Receivables, and the Ledger, one
more time before the course closes.
