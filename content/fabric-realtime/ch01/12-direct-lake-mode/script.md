# Lesson 12 — Direct Lake Mode · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Let's cover one of Fabric's real, genuine innovations — Direct
Lake mode.

## S2 · CODE CARD (two existing modes)

Power BI already had two modes. Import copies data in, fast but a
refreshed snapshot. DirectQuery sends a live query every time,
current but only as fast as the source engine. Every deployment
before Fabric had to accept one of those tradeoffs.

## S3 · CODE CARD (Direct Lake: neither)

Direct Lake is neither. Power BI reads a Delta table's actual
Parquet files directly, with no query engine in between at all —
live, and fast, because Delta's files are already columnar with a
real schema.

## S4 · CODE CARD (the transaction log)

And this only works because of Databricks Lesson 17's transaction
log — it tells Power BI exactly which files belong to the current
version. The same mechanism that already made time travel and
safe concurrent writes possible, paying off again here.

## S5 · OUTRO CARD

Speed and freshness, both at once — a real third option. Next
lesson: semantic models in Fabric, what Direct Lake mode actually
sits inside.
