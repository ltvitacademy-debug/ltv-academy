# Lesson 39 — Real-Time Data Quality · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Real-time data quality — catching bad data before it spreads, not
after it's already been seen.

## S2 · CODE CARD (three checks worth running in-stream)

Null checks catch missing fields. Range checks catch present but
nonsensical values, like a negative fare. Schema checks catch a
source's field shape changing unexpectedly.

## S3 · CODE CARD (no new tool needed)

No new tool needed — the filter node catches bad events before
they land, routing sends failures to their own destination, and
activator can alert on an unusual failure rate.

## S4 · STEPS CARD (streaming raises the stakes)

Databricks lesson 36 covered the same checks on a batch schedule —
a missed record there just delays a report. A missed record in a
live stream is in front of a dispatcher right now.

## S5 · OUTRO CARD

Same category of bug, much smaller blast-radius window, much
higher stake. Next up: comparing fabric real-time to databricks
structured streaming, head to head.
