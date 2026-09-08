# Lesson 43 — The FILTER Function · Voiceover script

Segments map 1:1 to slides. Target: 2-3 minutes — write for 340-380 words.

---

## S1 · TITLE CARD

Every filter condition you've written so far in this chapter checks one
row at a time and returns a simple true or false. FILTER does something
genuinely different — it hands back an entire table instead, ready to be
used as an ingredient in something bigger.

## S2 · CODE: FILTER(<table>, <condition>)

It takes a table to filter first, then a condition to check against
every single row in that table, one at a time. What comes back out the
other end is a brand new table, containing only the rows where that
condition actually held true — everything else simply gets left out
entirely, as if it had never existed in the first place.

## S3 · CODE: SUMX(FILTER(Sales, RELATED(Country[Name]) <> "United States"), Sales[Amount])

Here it is filtering on a related table's column specifically —
something a simple standalone boolean condition genuinely can't do on
its own, since that value doesn't even live in the same table. FILTER
checks every single row's country using RELATED, keeps only the ones
that aren't the United States, and SUMX then sums SalesAmount across
exactly that filtered table it just handed back — two functions,
working together, doing something neither could manage alone.

## S4 · OUTRO CARD

FILTER almost never stands entirely alone in real, practical formulas —
it genuinely feeds directly into CALCULATE, or into an iterator function
like SUMX that can actually make use of the table it hands back. On its
own, a table sitting there isn't useful yet; something else has to
consume it. Next: ALL and ALLEXCEPT, the specific functions for
deliberately removing filters instead of adding new ones.
