# Lesson 22 — Master Data Quality · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

A quality problem in a one-off report is a one-off problem. A quality
problem in master data is multiplied, because master data is shared —
a wrong phone number flows out to every system that consumes it.

## S2 · STEPS CARD (why it compounds)

Matching, from Chapter 2, solves how many records exist for one entity.
Quality asks a different question: is that one surviving record
actually any good. A record can be perfectly deduplicated and still be
missing an email address, an invalid postal code, or a stale job title.

## S3 · STEPS CARD (six dimensions)

Six dimensions, applied to master data: completeness, are required
fields populated. Accuracy, does the value reflect reality. Consistency,
does the same fact agree across systems. Timeliness, is it current.
Uniqueness, is this the one record for this entity. Validity, does it
conform to its defined format or code list.

## S4 · STEPS CARD (scorecard and fix at source)

A scorecard tracks percent complete, percent valid, duplicate rate, and
staleness over time, with a named owner when it slips. But the durable
fix isn't patching bad data inside the hub — it's pushing validation
back to the system that originates the record in the first place.

## S5 · OUTRO CARD

Next lesson: master data integration patterns — registry, consolidation,
coexistence, and centralized hub styles, and how master data actually
moves between the hub and every system that consumes it.
