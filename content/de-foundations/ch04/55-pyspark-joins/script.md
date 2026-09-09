# Lesson 55 — PySpark Joins · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Now let's combine two DataFrames together — PySpark joins.

## S2 · CODE CARD (basic join)

This is the real payoff of this dataset having a separate zone
lookup table at all. Trip records only store a numeric pickup
location I-D — this join is what turns that into an actual readable
zone and borough.

## S3 · CODE CARD (four join types)

There are four core join types: inner keeps only matches on both
sides, and it's the default if you leave it out. Left keeps every
trip, matched or not. Right keeps every zone. Full keeps everything
from both sides. For this dataset, left is usually the right call —
you want every trip kept, even the rare one whose location doesn't
match the lookup.

## S4 · CODE CARD (ambiguous columns)

And a left join keeps that unmatched row anyway — the joined zone
and borough columns just come back null, rather than the row
disappearing. Checking for that afterward is the exact same is null
pattern from Lesson 51.

## S5 · OUTRO CARD

Join on a shared key, pick the right type, and expect nulls from an
unmatched left join. Next lesson: union, for stacking two DataFrames
together.
