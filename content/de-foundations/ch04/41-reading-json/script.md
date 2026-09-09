# Lesson 41 — Reading JSON · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Same read API, different file format — this time, JSON.

## S2 · CODE CARD (read.json)

Notice this looks almost exactly like last lesson's read dot csv
call. That's the pattern across all of spark dot read — csv, json,
parquet in the next lesson — same shape, different reader
underneath.

## S3 · CODE CARD (line-delimited)

Spark expects one JSON object per line, not one giant array wrapping
everything. That matters because Spark splits a file across many
workers, and one object per line lets each worker parse its own
chunk independently — a single giant array can't be split that way.

## S4 · CODE CARD (nested struct)

And a nested field, like a pickup location with lat and lon inside
it, becomes a nested struct column. Dot notation reaches into it —
pickup dot lat — the same way you'd reach into a nested Python
dictionary.

## S5 · OUTRO CARD

One object per line, and dot notation for anything nested. Next
lesson: Parquet, the format actually built for real analytics work.
