# Script — Designing for Idempotency · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

A write can succeed, then its confirmation gets lost, and the caller retries. Across a large enough system, this will happen — idempotency is what makes running the same write twice as safe as running it once.

## S2 · CODE CARD (idempotency keys)

An idempotency key lets a retry recognize itself. The caller generates it once per logical operation; a retry carrying the same key gets the original result back, instead of being treated as a brand-new request.

## S3 · CODE CARD (MERGE as the mechanism)

Databricks Lesson 22's MERGE INTO is the real mechanism — matching on a stable key, a reprocessed batch updates existing rows instead of duplicating them. Plain append has no such protection.

## S4 · CODE CARD (natural vs. surrogate keys)

MERGE has to match on a natural key — one that exists in the source data itself — because a surrogate key generated fresh on each load isn't stable across retries. Dimensions can use surrogate keys for joins; dedup can't.

## S5 · OUTRO CARD

Idempotent writes are what let a system survive retries safely. Next up: exactly-once versus at-least-once delivery — where idempotency turns out to be the real answer.
