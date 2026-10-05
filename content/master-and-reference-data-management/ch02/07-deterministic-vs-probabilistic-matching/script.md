# Lesson 7 — Deterministic vs. Probabilistic Matching · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Two fundamentally different ways to decide if two records are the same
entity: exact rules, or weighted scoring across multiple fields.

## S2 · STEPS CARD (deterministic)

Deterministic matching applies exact rules: tax ID matches exactly, full
stop, same entity. Simple, fast, completely explainable. But brittle —
it breaks the moment someone types "Robert" instead of "Bob."

## S3 · STEPS CARD (probabilistic)

Probabilistic matching scores similarity across multiple fields and
weights them together into one overall confidence. A tax ID match might
weigh far more than a city match. It handles the fuzzy, typo-prone cases
deterministic rules can't.

## S4 · CODE CARD (score to decision)

The decision uses two thresholds, not one. Above the upper threshold:
auto-match. Below the lower threshold: no match. In between: too
uncertain to decide automatically, so it routes to a human steward. That
middle band is deliberate — forcing one cutoff either merges too
aggressively or misses too much.

## S5 · OUTRO CARD

Next: deduplication — applying this matching logic inside a single
system to find and resolve duplicate records of the same entity.
