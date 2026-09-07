# Lesson 37 — SUM, COUNT, DISTINCTCOUNT & Basic Aggregations · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~2 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

Most measures you'll ever write start with one of a small handful of
functions. Let's meet them properly.

## S2 · CODE: SUM, AVERAGE, MIN, MAX

SUM, AVERAGE, MIN, MAX — a function name, a column to aggregate. Simple.
But three cousins trip people up: COUNT only counts numeric values.
COUNTA counts any non-blank value. COUNTROWS counts table rows directly,
ignoring column content. If you're counting rows, reach for COUNTROWS.

## S3 · CODE: DistinctOrders = DISTINCTCOUNT(ResellerSales_USD[SalesOrderNumber])

DISTINCTCOUNT counts unique values — how many distinct orders, not how
many order rows. And here's the catch: its totals don't add up. An order
containing both a bike and an accessory counts once in each category,
but only once in the grand total. Both numbers are correct — they're
just answering different questions.

## S4 · OUTRO CARD (SVG: next lesson, LTV seal)

Simple functions, but they're the foundation everything else in this
chapter builds on. Next: the concept that decides what these functions
actually calculate — row context versus filter context.
