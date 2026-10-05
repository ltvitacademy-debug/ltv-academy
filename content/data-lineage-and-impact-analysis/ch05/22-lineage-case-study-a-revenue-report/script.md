# Lesson 22 — Lineage Case Study: A Revenue Report · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

A full, illustrative case study — Brightleaf Outfitters, a fictional
retailer used purely as a realistic scenario. A revenue report is off by
two hundred thousand dollars. We'll trace it using everything from the
last four chapters.

## S2 · STEPS CARD (problem)

Finance flags that the revenue report shows 2.1 million, but the point
of sale system's own daily totals add up to roughly 2.3 million. The
report has looked fine for over a year. Nobody currently on the team
built the original pipeline.

## S3 · STEPS CARD (trace)

The analyst walks the lineage hop by hop — POS transactions, a nightly
extraction, a cleaning transformation, a warehouse load, the dashboard
tile. At the column level, the filter condition excluding "voided"
transactions turns out to also be excluding legitimate after-hours
sales, because of a POS-side labeling change nobody told the data team
about.

## S4 · STEPS CARD (impact and fix)

Before fixing anything, the analyst checks what else reads from that
same transformation step — three other reports depend on it, so this
bug has been quietly affecting revenue, inventory, and commissions
everywhere downstream. The fix fixes the filter condition, and updates
the lineage record itself to document the fragile dependency.

## S5 · OUTRO CARD

Next up: a second case study — this time tracing customer data across
multiple systems, where the problem isn't a wrong number, but duplicate
and inconsistent records.
