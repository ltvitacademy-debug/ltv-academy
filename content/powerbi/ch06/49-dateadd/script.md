# Lesson 49 — DATEADD · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~2 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

Comparing this period against the same period a year ago is one of the
most common reporting asks there is. Here's the function built for it.

## S2 · CODE: DATEADD(<dates>, <number_of_intervals>, <interval>)

A date column, a number of intervals, and a unit — year, quarter,
month, week, or day, written unquoted. Positive moves forward in time.
Negative moves back.

## S3 · CODE: CALCULATE(SUM(FactInternetSales[SalesAmount]), DATEADD(DimDate[FullDateAlternateKey], -1, YEAR))

Whatever month is currently in context, this shifts every one of those
dates back a full year, and CALCULATE sums sales over that shifted set.
Compare it against plain Total Sales, broken out by month, and you get
a clean year-over-year comparison.

## S4 · CODE: DATEADD understands calendar units, not fixed day counts

Why not just subtract 365 days? Leap years, and months of different
lengths, would throw that off. DATEADD works in real calendar terms —
a year back always lands on the same month and day; a month back
correctly handles February versus March.

## S5 · OUTRO CARD (SVG: next lesson, LTV seal)

Next: the shorthand functions built specifically for year-to-date,
month-to-date, and quarter-to-date running totals.
