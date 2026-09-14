# Script — Designing an Ingestion Layer · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Everything this course has built toward still has to actually get data in the door first. The ingestion layer is that entry point — get it wrong, and everything downstream is working with bad data from the start.

## S2 · CODE CARD (batch vs. streaming ingestion)

Lesson 5's framework decides this: freshness requirements, not preference. A nightly warehouse update is Autoloader watching a folder; "today's orders as they happen" is an Eventstream that never stops running.

## S3 · CODE CARD (schema-on-write vs. schema-on-read)

A strict, well-governed source can afford schema-on-write, rejecting bad data at the door. A messy source usually needs schema-on-read, so the pipeline doesn't halt on a field it didn't anticipate.

## S4 · CODE CARD (the landing zone pattern)

Ingestion's real job is landing data into a raw, untouched zone — DE Foundations' raw zone, Databricks's bronze layer. Deciding what "clean" means is the next layer's problem, not this one's.

## S5 · OUTRO CARD

Ingestion gets data in the door safely. Next up: designing a transformation layer — what actually happens to that raw data next.
