# Lesson 111 — Data Warehouse vs. Data Lake vs. Data Mart · Voiceover script

Segments map 1:1 to slides. Target: ~2 minutes total.

---

## S1 · TITLE CARD

Three lessons, three concepts. Time to put them side by side and see how
they actually fit together, rather than competing for the same job.

## S2 · STEPS CARD (side by side)

A warehouse covers the whole organization, structured and integrated,
schema locked in before data loads. A mart narrows that down to one
business function. A lake holds anything, from anywhere, raw, with
schema applied only when someone actually reads it.

## S3 · CODE CARD (warehouse vs mart)

In a real pipeline, these aren't competing choices. The warehouse layer
answers broad, company-wide questions. The mart layer is the exact same
warehouse, just narrowed down to one team's function — reseller sales
instead of everything. A mart is usually carved FROM a warehouse, not
built instead of one.

## S4 · CODE CARD (lakehouse)

And increasingly, platforms blur lake and warehouse together into
something called a lakehouse — raw files stored lake-style, cheap and
flexible, but with a structured, warehouse-like query layer built right
on top. You get the lake's low cost AND the warehouse's reliable
structure, without copying the data twice.

## S5 · OUTRO CARD

Lake first, warehouse second, mart third — a pipeline, not a menu of
alternatives. Next lesson: how data actually MOVES through that
pipeline — ETL versus ELT. See you there.
