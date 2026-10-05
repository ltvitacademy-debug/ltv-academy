# Lesson 15 — Change Impact Assessment · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Lesson 14 walked through impact analysis once, for one change. A
change impact assessment is that same exercise, formalized into a
process every meaningful change goes through before it ships.

## S2 · STEPS CARD (the four stages)

Four stages. Propose — describe precisely what's changing. Trace
lineage — perform and document the downstream walk, not just in
someone's head. Classify risk — score the findings, high, medium, or
low. Sign off and communicate — get approval, and notify affected
owners before it ships, not after.

## S3 · STEPS CARD (risk isn't just counting)

Risk classification isn't just counting consumers. Five non-critical
tables and one dashboard that's a Critical Data Element are not the
same risk level, even though the second change touches fewer things.
Any trace that touches a CDE gets treated as at least medium risk,
regardless of how small it otherwise looks.

## S4 · CODE CARD (grain change example)

Changing SalesFact from one row per order to one row per order line.
Three reports doing SUM aggregations still work fine. One report
counting rows — "number of orders" — now silently double-counts. That
one gets flagged high risk and fixed before the change ships.

## S5 · OUTRO CARD

Next lesson: lineage for root cause analysis — the mirror image of
everything in this lesson. Instead of walking downstream from a
proposed change, you'll walk upstream from a number that's already
wrong.
