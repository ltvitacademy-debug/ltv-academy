# Lesson 11 — Raw, Cleansed, and Curated Zones · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Lesson 10 sketched raw and processed. Here's the real, standard
three-way split most production data lakes actually use.

## S2 · STEPS CARD (three zones)

Raw: an exact, untouched copy of the source, whatever format it
arrived in. Nothing gets validated or reshaped here. Cleansed: real
engineering applied — types enforced, bad rows removed, converted to
Parquet — but still roughly the same grain as the source. Curated:
business-ready. Aggregated, joined, shaped around a question someone
actually wants answered.

## S3 · CODE CARD (concrete example)

Here's what that looks like, start to finish, with this course's
actual taxi data. Raw holds exactly what N-Y-C published, including
negative fares and other bad rows. Cleansed removes those, enforces
types, converts to Parquet. Curated collapses individual trips all
the way down to one row per day per borough — that's what a real
dashboard would query.

## S4 · CODE CARD (why raw stays untouched)

And notice: raw never changes, no matter what. If you find out next
month that your cleansing rule had a bug, you reprocess straight from
the untouched raw files — not from already-cleaned data that might be
hiding the exact same mistake.

## S5 · OUTRO CARD

Next lesson introduces Bronze, Silver, Gold — and if that sounds
suspiciously familiar, it's because it's the exact same idea, just the
vocabulary Databricks and Delta Lake popularized. See you there.
