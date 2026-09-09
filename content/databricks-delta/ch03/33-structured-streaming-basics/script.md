# Lesson 33 — Structured Streaming Basics · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Let's cover the engine underneath Autoloader itself — structured
streaming basics.

## S2 · CODE CARD (unbounded table)

The core idea: treat a continuously arriving source as a table
that just keeps growing, one micro batch at a time. This isn't a
different API — it's the exact same DataFrame concept from
Foundations' Chapter 4, just fed continuously instead of once.

## S3 · CODE CARD (readStream/writeStream)

Read stream instead of read is structurally almost the whole
difference. Filter works exactly the same on a streaming DataFrame
as a batch one — nearly everything you already know still
applies.

## S4 · CODE CARD (triggers)

Triggers control how often the stream checks. Processing time runs
forever, on a fixed interval — a genuine always-on pipeline.
Available now processes what's there right now, once, then
stops — exactly what fits a scheduled job.

## S5 · OUTRO CARD

Almost everything from Foundations still works — checkpoints and
triggers are really the only genuinely new pieces. Next lesson:
streaming from bronze to silver, putting this to real use.
