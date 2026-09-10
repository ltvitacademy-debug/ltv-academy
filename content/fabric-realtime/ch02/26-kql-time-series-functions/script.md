# Lesson 26 — KQL: Time Series Functions · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Let's go deeper into the functions that make KQL genuinely
different — time series functions.

## S2 · CODE CARD (bin intervals)

Bin accepts any real duration — five minutes, an hour, a day.
Choosing the right bucket size is a real decision — five-minute
buckets for a live dashboard, daily buckets for a trend chart
spanning months.

## S3 · CODE CARD (ago)

Ago of one hour means one hour before this exact query runs — a
moving reference point, not a fixed timestamp. That's the real
mechanism behind a live show-me-the-last-hour dashboard,
recalculating automatically every time it runs.

## S4 · CODE CARD (make-series)

And make series goes further than plain summarize by bin — it
fills in every interval in a range, including genuine zeros. On a
real chart, a missing bucket would otherwise look like missing
data instead of an honest zero.

## S5 · OUTRO CARD

These are the real, first-class operations a KQL database exists
for. Next lesson: ingesting data into a KQL database, beyond just
an eventstream destination.
