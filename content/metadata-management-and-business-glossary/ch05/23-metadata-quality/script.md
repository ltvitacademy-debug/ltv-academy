# Lesson 23 — Metadata Quality · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Data Quality Management covered accuracy, completeness, consistency,
validity, uniqueness, and timeliness — as dimensions of the data.
Metadata is itself a kind of data, so it's reasonable to ask: does
metadata have quality problems the same way?

## S2 · STEPS CARD (same dimensions, applied differently)

It does. A catalog full of low-quality metadata is barely better than
no catalog, for exactly the same reason data of unknown quality can't
be trusted for decisions.

## S3 · STEPS CARD (four dimensions)

Four metadata-specific dimensions. Coverage — what percentage of
objects have any metadata at all. Freshness — how old is the
last-reviewed date. Correctness — does the description actually match
what's there right now. Consistency — do similar concepts use
consistent terminology.

## S4 · CODE CARD (two failures, one entry)

Consider one entry with two different failures. A coverage failure: the
entry exists but has no description filled in — obvious, easy to spot.
A correctness failure: it has a description, but the business redefined
active from 90 days to 60 eight months ago, and nobody updated it. The
metadata is present, but wrong — and that failure is silent.

## S5 · OUTRO CARD

The structural-drift query pattern from Lesson 15 generalizes into a
basic scorecard — coverage, freshness, and periodically-sampled
correctness, reviewed quarterly. Next lesson: catalog adoption — a
perfect catalog nobody uses has the same value as no catalog.
