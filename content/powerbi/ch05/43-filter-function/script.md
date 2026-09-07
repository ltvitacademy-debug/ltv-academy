# Lesson 43 — FILTER & Table Filter Expressions · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~1.5 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

Every filter you've written so far checks one row at a time. FILTER does
something different — it hands back an entire table.

## S2 · CODE: FILTER(<table>, <filter>)

A table to filter, a condition to check per row. What comes back is a
table containing only the rows where that condition held true.

## S3 · CODE: SUMX(FILTER('InternetSales', RELATED('SalesTerritory'[Country]) <> "United States"), 'InternetSales'[SalesAmount])

Here it is filtering on a related table's column — something a simple
Boolean condition can't do alone. FILTER checks every row's country via
RELATED, keeps the ones that aren't the United States, and SUMX sums
SalesAmount across exactly that filtered table.

## S4 · OUTRO CARD (SVG: next lesson, LTV seal)

FILTER almost never stands alone — it feeds into CALCULATE or an
iterator that can actually use the table it returns. Next: ALL and
ALLEXCEPT, the functions for removing filters instead of adding them.
