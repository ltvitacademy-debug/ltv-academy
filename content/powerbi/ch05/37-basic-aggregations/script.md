# Lesson 37 — SUM, COUNT, DISTINCTCOUNT & Basic Aggregations · Voiceover script

Segments map 1:1 to slides. Target: 2-3 minutes — write for 320-360 words.

---

## S1 · TITLE CARD

Most measures you'll ever actually write start with one of a genuinely
small handful of functions. Let's meet the core ones properly, once and
for all.

## S2 · CODE: SUM(Sales[Amount]) -> AVERAGE(...) -> COUNTROWS(...)

SUM, AVERAGE, MIN, MAX — each one takes a function name and a column to
aggregate. Genuinely simple on their own. But three close cousins trip
people up constantly: COUNT only counts numeric values in a column,
ignoring text and blanks entirely. COUNTA counts any non-blank value,
text included. COUNTROWS counts table rows directly, completely ignoring
whatever's actually inside those columns. If what you actually want is
the number of rows, always reach for COUNTROWS specifically.

## S3 · CODE: DistinctOrders = DISTINCTCOUNT(ResellerSales_USD[SalesOrderNumber])

DISTINCTCOUNT counts unique values specifically — how many distinct
orders exist, not how many order rows exist in total. And here's the
genuine catch worth remembering: its totals won't simply add up the way
you might expect. An order containing both a bike and an accessory
counts once in each of those two categories separately, but only once in
the overall grand total. Both numbers are completely correct here —
they're simply answering two different questions about the same data.

## S4 · OUTRO CARD

Simple functions on the surface, but they're genuinely the foundation
everything else in this chapter gets built on top of. Next: the concept
that actually decides what these functions calculate in the first place
— row context versus filter context, the real core mental model behind
all of DAX.
