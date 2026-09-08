# Lesson 41 — Iterator Functions: SUMX and Friends · Voiceover script

Segments map 1:1 to slides. Target: 2-3 minutes — write for 320-360 words.

---

## S1 · TITLE CARD

SUM aggregates a column that already exists, directly, in one step.
Iterator functions do something genuinely different — they walk across
an entire table one row at a time. Here's SUMX, the one you'll reach for
first and most often.

## S2 · CODE: SUMX(Sales, Sales[Quantity] * Sales[UnitPrice])

Sometimes the number you actually need isn't sitting in a stored column
at all — only Quantity and UnitPrice exist separately in the table.
SUMX evaluates Quantity times UnitPrice completely fresh for every
single row, one at a time, and then adds up all of those individual
results together. Plain SUM alone genuinely has no way to express a
calculation like that at all.

## S3 · CODE: SUMX(FILTER(Sales, ...), Sales[Amount])

And SUMX's table argument doesn't actually have to be the entire table
either — pair it directly with FILTER, and you can sum a value across
only the specific rows that match some condition. Here, that's every
single sale except the ones tied specifically to the United States,
filtered out before SUMX ever touches them.

## S4 · CODE: SUMX -> AVERAGEX -> MAXX -> COUNTX

Every basic aggregation function has an X-suffixed cousin, and every one
of them follows this exact same shape: iterate across a table, evaluate
an expression fresh for each individual row, then combine all of those
results together into one final answer. Reach for one of these whenever
the value genuinely has to be calculated fresh, row by row, instead of
already existing as a stored column somewhere.

## S5 · OUTRO CARD

Next: back to CALCULATE one more time, specifically for the
filter-modifier functions that give it even finer, more precise control
over exactly what gets filtered and what doesn't.
