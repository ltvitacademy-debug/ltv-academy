# Lesson 21 — Reconciling Transactions with SQL · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Welcome to Chapter 5 — real finance investigations, built from every tool
the last four chapters gave you. First up: reconciliation, which just
means confirming two numbers that should agree actually do.

## S2 · CODE CARD (invoice vs. paid)

Invoice amount, minus the total actually paid, as difference. Left outer
join so unpaid invoices still show up. NVL guards the SUM so an unpaid
invoice's NULL total doesn't break the subtraction. Group by, then HAVING
difference not equal to zero — fully paid invoices drop out entirely,
because that's exactly what a good reconciliation report should do: show
exceptions, not everything.

## S3 · CODE CARD (receipt vs. applied)

The mirror image, on Receivables. Receipt amount, minus what's actually
been applied, as unapplied amount. A receipt with money left unapplied is
a real, common problem — cash that came in, but hasn't been matched to an
invoice yet.

## S4 · STEPS CARD (the general pattern)

Four steps, every time: identify the two things that should reconcile.
Left outer join from the side that should have a match. NVL-guard any SUM
before subtracting. Group by the identifying columns, HAVING the
difference not equal to zero.

## S5 · OUTRO CARD

That's the shape you'll reuse all chapter. Next lesson: identifying
exceptions more broadly — the data patterns that signal something's
actually wrong, not just unreconciled.
