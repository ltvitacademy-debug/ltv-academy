# Script — Designing a Serving Layer · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Gold holds business-ready data. The serving layer is what actually puts it in front of whoever needs it — an analyst, an application, a dashboard. Serve gold badly, and everything upstream still ends in a slow or wrong answer.

## S2 · CODE CARD (four real serving choices)

A warehouse fits an analyst team running ad hoc T-SQL. A semantic model fits a BI tool needing consistent, named business logic. An API fits application code needing a stable shape. None of these is universally correct.

## S3 · CODE CARD (Direct Lake)

Fabric's Direct Lake mode is what a serving layer looks like done well — instead of choosing between Import's staleness and DirectQuery's latency, it reads gold's Delta files directly, leaning on the same transaction log from Databricks Lesson 17.

## S4 · CODE CARD (read- vs. write-optimized)

The serving layer should be tuned for concurrent reads at low latency, even trading away some of the write flexibility the transformation layer needed one step earlier. Optimizing gold for writes it rarely gets is the trade-off backward.

## S5 · OUTRO CARD

Serving is often more than one choice — the same gold table can feed a warehouse and a semantic model at once. Next up: caching strategies, for when even a well-served gold table isn't fast enough.
