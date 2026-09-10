# Lesson 18 — What Is Real-Time Intelligence? · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes (chapter opener).

---

## S1 · TITLE CARD

Chapter 2 starts here — what is real-time intelligence, actually?

## S2 · CODE CARD (the gap)

Databricks' entire third chapter covered structured streaming —
genuinely real streaming, built on Spark's general-purpose
engine. But it never covered a query language built specifically
for time-series data, sub-second alerting, or storage tuned for
extremely high-volume events.

## S3 · STEPS CARD (three new pieces)

Real-Time Intelligence is Fabric's name for exactly that gap —
three genuinely new pieces. Eventstream for ingesting and routing
events visually. Eventhouse and its KQL database, for storage and
query built for time-series data. And Activator, for sub-second
alerting with no scheduled job at all.

## S4 · CODE CARD (why real-time is specific)

And that's why real-time means something specific here.
Structured streaming's micro-batches process data seconds apart
at best. This toolset targets sub-second latency — an alert
firing within milliseconds, not the next batch interval.

## S5 · OUTRO CARD

None of this existed in the previous course — genuinely new
territory. Next lesson: Eventstreams, ingesting streaming data,
for real.
