# Lesson 50 — Date Functions · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Real pickup and dropoff times deserve real date functions.

## S2 · CODE CARD (year/month/dayofweek)

Year, month, and day of week pull specific parts out of a
timestamp. These only work correctly on a real timestamp column,
which is exactly why Lesson 48's cast matters here. And day of week
returns 1 for Sunday through 7 for Saturday — not zero-indexed like
Python's own date handling.

## S3 · CODE CARD (datediff)

Date diff returns the whole days between two dates. For this
dataset's minutes-long trips that's usually zero, but the same
function matters a lot for longer data — a shipment's transit time,
a subscription's active days. To date strips the time portion off
first, which is what date diff expects.

## S4 · CODE CARD (date_format)

And date format renders a timestamp as a display string, like Jan
15, 2024. That's purely for display — keep the real timestamp
underneath for any actual date math.

## S5 · OUTRO CARD

Year and month and day of week to extract, date diff for real
duration, date format just for display. Next lesson: null handling,
catching what earlier lessons left as null.
