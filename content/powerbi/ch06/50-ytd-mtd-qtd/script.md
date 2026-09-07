# Lesson 50 — YTD, MTD & QTD · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~2 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

Running totals that reset on a schedule — year-to-date, month-to-date,
quarter-to-date. Some of the most requested numbers in business
reporting, and DAX has a function built for each.

## S2 · CODE: = TOTALYTD(SUM(FactInternetSales[SalesAmount]), DimDate[FullDateAlternateKey])

Broken out by month, March shows January plus February plus March
combined — not just March's own total. Come January, it resets to zero
and climbs again.

## S3 · CODE: TOTALMTD(...) resets monthly. TOTALQTD(...) resets quarterly.

Same exact pattern, shorter cycles — one resets every month, the other
every quarter.

## S4 · CODE: TOTALYTD(..., "6/30")

Running a fiscal year that doesn't start in January? Pass the fiscal
year's last day as an optional argument, and the whole "year" boundary
shifts to match — July through June, or whatever your organization
uses.

## S5 · OUTRO CARD (SVG: next lesson, LTV seal)

TOTALYTD is shorthand for CALCULATE plus DATESYTD. Next lesson, we use
that combination directly — for the cases the shorthand can't quite
reach.
