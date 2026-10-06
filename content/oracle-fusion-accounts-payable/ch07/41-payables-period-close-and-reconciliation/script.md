# Lesson 41 — Payables Period Close and Reconciliation · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Closing a Payables period isn't one button. It's a checklist, and this lesson walks through why each step is there.

## S2 · STEPS

Complete invoice entry and validation, resolve or deliberately carry forward every hold, finish any payment runs for the period, run Create Accounting in Final mode, then transfer and post those journals to GL, reconcile, and only then close.

## S3 · STEPS

Payables actually blocks the close if unaccounted transactions or unresolved holds are still sitting in that period. That's not bureaucracy — it's the system refusing to let a period close while numbers inside it could still move.

## S4 · CODE

Before closing, the Payables-to-Ledger Reconciliation report compares the ending AP liability in the subledger against the ending AP liability in the General Ledger. Solace Robotics runs this at month end: one hundred forty-two thousand six hundred dollars on both sides. Zero difference.

## S5 · STEPS

With that checklist complete and a zero difference, the period closes cleanly and the next one opens. If those two numbers didn't match instead, the gap would point straight back to the accounted-transferred-posted pipeline — something accounted but never transferred, or transferred but never posted.

## S6 · OUTRO

A checklist, a block on unresolved items, and a reconciliation report that proves the subledger and the ledger agree. Next up, lesson forty-two, the final lesson: payables troubleshooting practice, working through real scenarios.
