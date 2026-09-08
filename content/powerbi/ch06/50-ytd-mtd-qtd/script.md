# Lesson 50 — YTD, MTD & QTD · Voiceover script

Segments map 1:1 to slides. Target: 2-3 minutes — write for 320-360 words.

---

## S1 · TITLE CARD

Running totals that genuinely reset on a fixed schedule — year-to-date,
month-to-date, quarter-to-date. Some of the most consistently requested
numbers in all of business reporting, and DAX genuinely has a dedicated
function built for each and every one of them.

## S2 · CODE: TOTALYTD([Total Sales], Dates[Date])

Broken out by month on a chart, March shows January plus February plus
March all combined together — genuinely not just March's own individual
total sitting alone. Come January of the next year, it resets cleanly
back down to zero and starts climbing all over again from scratch.

## S3 · CODE: TOTALMTD(...) -> TOTALQTD(...)

Same exact underlying pattern here, just running on shorter cycles —
one of these resets every single month, the other resets every single
quarter instead, but the accumulating logic underneath is genuinely
identical to what year-to-date already does.

## S4 · CODE: TOTALYTD([Total Sales], Dates[Date], "6/30")

Running a fiscal year that genuinely doesn't start in January? Pass the
fiscal year's actual last day in as an optional third argument, and the
entire year boundary shifts automatically to match it — July through
June, or genuinely whatever specific cycle your own organization
actually uses internally.

## S5 · OUTRO CARD

TOTALYTD is really just convenient shorthand for CALCULATE combined with
DATESYTD underneath the surface. Next lesson, we use that exact same
combination directly and explicitly — specifically for the cases this
shorthand version genuinely can't quite reach on its own.
