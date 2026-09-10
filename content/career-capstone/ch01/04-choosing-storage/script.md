# Lesson 4 — Choosing Storage: OLTP vs. OLAP vs. Object Storage · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Choosing storage — OLTP versus OLAP versus object storage. Three
shapes you already know, recognized here as a real choice.

## S2 · CODE CARD (three shapes, three jobs)

OLTP is fast for single-row reads and writes. OLAP is fast for
aggregating across millions of rows. Object storage is cheap and
durable, with no fast query pattern built in yet.

## S3 · CODE CARD (fitting the taxi platform)

The vendor's booking app needs OLTP. Raw incoming files need
object storage. Aggregated dashboards need OLAP. Each piece of the
platform has a different read pattern.

## S4 · OUTRO CARD

The medallion architecture is this exact idea, formalized —
bronze, silver, gold. Next up: choosing a processing model — batch,
streaming, or hybrid, the same kind of choice, one layer up.
