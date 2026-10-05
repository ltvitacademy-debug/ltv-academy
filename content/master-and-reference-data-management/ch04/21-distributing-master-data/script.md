# Lesson 21 — Distributing Master Data · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

A golden record built in Chapter 2 doesn't pay off until it actually
reaches every system that needs it. This lesson covers getting it there.

## S2 · STEPS CARD (half the job)

Matching, deduplication, survivorship produce one trusted version of a
record — but that work means nothing until e-commerce, billing, and the
warehouse all have the current version. Distribution is getting master
data from its system of record out to every consumer, reliably.

## S3 · STEPS CARD (batch vs real-time)

Batch distribution sends updates on a schedule — simple, but every
consumer is stale between runs, which is fine for most reference and
master data. Real-time distribution sends updates the instant they
happen, reserved for cases where staleness causes real harm, like a
credit hold.

## S4 · STEPS CARD (publish-subscribe)

Point-to-point works for two or three systems, then becomes unmanageable
— a tenth consumer means a tenth custom integration. Publish-subscribe
flips it: the source publishes to a channel, consumers subscribe, and
adding an eleventh consumer doesn't touch the publisher at all.

## S5 · STEPS CARD (ongoing operational reality)

Distribution isn't a project that finishes — it's a running system.
A consumer that silently stops receiving updates drifts out of sync
invisibly. Mature programs monitor distribution itself: did the consumer
actually apply the last update, not just did the source send it.

## S6 · OUTRO CARD

That's chapter four. Chapter five turns to enterprise consistency in
full — master data quality, integration patterns, and the tools that
run all of this at scale.
