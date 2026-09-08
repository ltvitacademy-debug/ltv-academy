# Lesson 49 — DATEADD · Voiceover script

Segments map 1:1 to slides. Target: 2-3 minutes — write for 320-360 words.

---

## S1 · TITLE CARD

Comparing this exact period against the same period a year ago is
genuinely one of the single most common reporting requests there is
anywhere. Here's the specific function built exactly for that.

## S2 · CODE: DATEADD(<dates>, <number_of_intervals>, <interval>)

It takes a date column, a number of intervals to shift by, and a unit —
year, quarter, month, week, or day, written completely unquoted in the
formula. A positive number moves the dates forward in time. A negative
number moves them backward instead.

## S3 · CODE: CALCULATE([Total Sales], DATEADD(Dates[Date], -1, YEAR))

Whatever month happens to currently be in context on the report, this
formula shifts every one of those specific dates back a full year, and
CALCULATE then sums sales over that entire shifted set instead of the
original one. Compare that result against plain Total Sales, broken out
side by side by month, and you get a genuinely clean year-over-year
comparison with almost no extra effort.

## S4 · CODE: Why not just subtract 365 days?

Why not simply subtract three hundred sixty five days instead? Leap
years, plus months of genuinely different lengths, would throw that
naive approach off pretty quickly. DATEADD works in real calendar terms
instead — a year back always lands correctly on the same month and day,
and a month back correctly handles February versus March without any
manual adjustment from you.

## S5 · OUTRO CARD

Next: the shorthand functions built specifically for year-to-date,
month-to-date, and quarter-to-date running totals — three genuinely
common calculations that deserve their own dedicated functions.
