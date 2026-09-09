# Lesson 52 — Removing Duplicates · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Real data almost always has duplicates in it somewhere — let's
remove them, correctly.

## S2 · CODE CARD (distinct)

Distinct only calls two rows duplicates if every single column
matches exactly. Even one differing column — including a stray
whitespace difference last lesson would have caught — counts them
as different rows entirely.

## S3 · CODE CARD (dropDuplicates)

Drop duplicates lets you pick which columns actually matter,
ignoring everything else. This is usually what you really want —
for real trip data, matching on vendor ID and pickup and dropoff
time would catch a genuinely re-ingested duplicate, even if its
fare amount got recalculated slightly differently between copies.

## S4 · CODE CARD (which row survives)

But when multiple rows do match, drop duplicates keeps an arbitrary
one — there's no guaranteed keep-the-first or keep-the-most-recent
rule. If which row survives actually matters, sort first and reach
for window functions instead, which is exactly Lesson 57's job.

## S5 · OUTRO CARD

Distinct for every column, drop duplicates for just the columns
that define identity — always decide which one you actually mean
first. Next lesson: group by, for real aggregation.
