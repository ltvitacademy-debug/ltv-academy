# Lesson 51 — DATESYTD & TOTALYTD · Voiceover script

Segments map 1:1 to slides. Target: 2-3 minutes — write for 320-360 words.

---

## S1 · TITLE CARD

TOTALYTD, from last lesson, is genuinely just shorthand for CALCULATE
combined with DATESYTD underneath. Here's exactly when spelling that
combination out the long way actually pays off in practice.

## S2 · CODE: CALCULATE([Total Sales], DATESYTD(Dates[Date]), Sales[Country] <> "US")

TOTALYTD only genuinely accepts one single extra filter argument beyond
the date column itself. Need a second condition running alongside your
year-to-date calculation — like restricting the whole thing to non-US
sales specifically — and DATESYTD spelled out explicitly inside
CALCULATE gives you room for as many additional filters as you actually
need, with no real limit.

## S3 · CODE: DATESBETWEEN(Dates[Date], StartDate, EndDate)

And for date ranges that genuinely don't follow any calendar pattern at
all — not a full year, not a calendar month, just two specific dates you
name explicitly yourself — DATESBETWEEN is genuinely the right tool to
reach for here instead of any of the YTD-family functions.

## S4 · CODE: CALCULATE([Total Sales], DATESBETWEEN(Dates[Date], BLANK(), MAX(Dates[Date])))

A genuine life-to-date measure, built this way: BLANK finds the earliest
possible date completely automatically, and MAX finds the latest date
actually sitting in the current context. The result genuinely never
resets at any point — it simply keeps accumulating continuously, all the
way since day one of the entire dataset.

## S5 · OUTRO CARD

A date table, CALENDAR to build one from scratch, DATEADD to shift dates
around, and the whole YTD family to accumulate them properly — every
single function in this chapter has genuinely just been CALCULATE,
applied specifically to dates. Next up: Chapter Seven, Building Reports
and Visualizations.
