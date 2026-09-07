# Lesson 41 — Iterator Functions: SUMX and Friends · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~2 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

SUM aggregates a column directly. Iterator functions do something
different — they walk a table row by row. Here's SUMX, the one you'll
reach for first.

## S2 · CODE: Total Revenue = SUMX(Sales, Sales[Quantity] * Sales[UnitPrice])

Sometimes the number you need isn't a stored column at all — only
Quantity and UnitPrice exist. SUMX evaluates Quantity times UnitPrice
fresh for every row, then adds up the results. SUM alone has no way to
express that.

## S3 · CODE: SUMX(FILTER('InternetSales', RELATED('SalesTerritory'[Country]) <> "United States"), 'InternetSales'[SalesAmount])

And SUMX's table argument doesn't have to be the whole table — pair it
with FILTER, and you sum a value across only the rows matching a
condition. Here, every sale except the ones tied to the United States.

## S4 · CODE: AVERAGEX, COUNTX, MAXX, MINX, RANKX

Every aggregation has an X-suffixed cousin, all following the same
shape: iterate a table, evaluate an expression per row, combine the
results. Reach for one whenever the value has to be calculated fresh,
row by row, instead of already existing as a column.

## S5 · OUTRO CARD (SVG: next lesson, LTV seal)

Next: back to CALCULATE, for the filter-modifier functions that give it
even finer control.
