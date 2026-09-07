# Lesson 48 — CALENDAR and Date Functions · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~2 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

No date table handy? Build one from scratch. Here's CALENDAR, and its
even lazier cousin.

## S2 · CODE: = CALENDAR(DATE(2015, 1, 1), DATE(2021, 12, 31))

The simplest version: fix a start and end date, get back one row per
day for every date in between. Exactly the shape a date table needs.

## S3 · CODE: = CALENDAR(MINX(Sales, [Date]), MAXX(Forecast, [Date]))

But a fixed range goes stale the moment new data arrives. Derive it
from your actual data instead — earliest date in Sales, latest date in
Forecast — and the range adjusts itself automatically as both tables
grow.

## S4 · CODE: CALENDARAUTO([fiscal_year_end_month])

CALENDARAUTO goes further still: no range to specify at all. It scans
every date column in your entire model and builds a calendar covering
all of them, rounded out to complete fiscal years.

## S5 · OUTRO CARD (SVG: next lesson, LTV seal)

Either function gives you a calculated table — add Year, Quarter, and
Month columns, then mark it as your date table from Lesson 47. Next:
DATEADD, for shifting a set of dates forward or back in time.
