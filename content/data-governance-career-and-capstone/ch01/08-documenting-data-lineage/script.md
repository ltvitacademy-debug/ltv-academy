# Lesson 8 — Documenting Data Lineage · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

A quality rule tells you a value is wrong. Lineage tells you how it
got there, and who else is affected. This lesson traces OrderTotal
end to end.

## S2 · STEPS CARD (the four-step lineage)

Four steps: Atlas calculates OrderTotal at order completion. A
nightly load lands it in a Summit staging table. A curated
transformation applies the Lesson 7 quality rules and produces
fact_Orders. Power BI's Executive Revenue Dashboard refreshes from it
each morning.

## S3 · STEPS CARD (the impact analysis)

Walking that map backward for a hypothetical currency-conversion
change: the nightly load needs to know raw versus converted, the
curated transformation needs new logic, and the dashboard needs a
currency column — or leadership sees a silently wrong revenue number.

## S4 · STEPS CARD (why Customer waits)

Customer lineage stays undocumented for now. With three unreconciled
source copies and no declared authoritative source, any diagram drawn
today would just formalize the same confusion behind the Lesson 1
incident.

## S5 · OUTRO CARD

Next: Lesson 9 declares LTV Global's authoritative sources — exactly
the decision Customer lineage has been waiting on.
