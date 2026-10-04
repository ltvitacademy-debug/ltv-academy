# Lesson 16 — Timeliness · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Every dimension so far has been about the data itself. Timeliness is
different — it's about the data's relationship to time.

## S2 · STEPS — Why timeliness is different

A value can be completely accurate, perfectly valid, fully consistent
— and still fail a timeliness check, just by being stale. A shipping
address captured correctly a year ago might not be where the customer
lives anymore. Nothing about the row changed. The real world did.

## S3 · STEPS — Freshness and latency

Two different things timeliness measures. Freshness: how old is this
data relative to how often it should be updated? Latency: how long did
it take for a real-world event to actually reach the data? Freshness
is about age. Latency is about pipeline speed.

## S4 · CODE — Checking freshness

If a table has a last-updated timestamp, freshness is a straight
comparison against right now. This flags every inventory row that
hasn't been refreshed in more than twenty-four hours.

## S5 · CODE — Checking latency

Latency needs two timestamps — when the event actually happened, and
when it landed in the system you're measuring. Anything past your
service-level expectation, fifteen minutes here, is a timeliness
failure, even if every other value in that row is flawless.

## S6 · CODE — A freshness rate

Same pattern as every other dimension in this chapter — aggregate
across the table and you get a single trackable freshness percentage
instead of a one-time flag.

## S7 · OUTRO

That's all six dimensions — accuracy, completeness, consistency,
validity, uniqueness, timeliness. Chapter four turns every one of them
into a formal, repeatable rule.
