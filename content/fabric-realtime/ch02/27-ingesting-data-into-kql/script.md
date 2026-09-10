# Lesson 27 — Ingesting Data Into a KQL Database · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Let's cover both real ways data actually lands in a KQL
database — ingestion.

## S2 · CODE CARD (streaming, revisited)

The streaming path is Lesson 21's main one — an eventstream
destination pointed at the KQL database, events flowing in
continuously as they're produced. No separate step required.

## S3 · CODE CARD (batch ingestion)

But sometimes historical data already exists as files. Dot
ingest into table pulls a batch of existing data in directly,
once — the real KQL equivalent of a one-time read and save as
table.

## S4 · CODE CARD (choosing the right path)

Historical months, already files, fit batch ingestion better.
Live simulated events, with no file to begin with, fit streaming
better. And both land in the exact same table, queryable
identically either way.

## S5 · OUTRO CARD

Streaming for what's genuinely continuous, batch for what already
exists. Next lesson: real-time dashboards, where all this KQL
actually gets seen.
