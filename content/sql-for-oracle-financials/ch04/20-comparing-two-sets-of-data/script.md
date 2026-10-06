# Lesson 20 — Comparing Two Sets of Data · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Last lesson of Chapter 4: comparing two entire result sets against each
other, not row by row with a join, but as whole sets at once.

## S2 · CODE CARD (UNION vs UNION ALL)

Vendor ID where invoice date is in 2026, UNION, vendor ID where invoice
date is before 2026. UNION removes duplicate rows from the combined
result. UNION ALL skips that step entirely — faster, and the one you
should default to whenever duplicates can't occur or don't matter.

## S3 · CODE CARD (MINUS)

Same two queries, but MINUS instead of UNION. Every vendor ID that
invoiced in 2026 but never invoiced before — new suppliers, from the
data's perspective. Other databases call this EXCEPT; Oracle has always
called it MINUS, and that's the name you'll see in existing Oracle
Financials code.

## S4 · CODE CARD (INTERSECT)

Flip the operator one more time to INTERSECT, and you get suppliers who
invoiced both before and during 2026 — established, ongoing relationships,
not brand new ones.

## S5 · STEPS CARD (Chapter 4, tied together)

Chapter 4 gave you the tools for questions that depend on another
question's answer: subqueries, CTEs for naming and chaining logic, NOT
EXISTS for what's missing, ROW_NUMBER for duplicates, and now set
operators for comparing two results outright.

## S6 · OUTRO CARD

Chapter 4 complete. Next: Chapter 5, where every one of these tools gets
put to work on real finance investigations — including, finally, the full
unpaid-invoices challenge.
