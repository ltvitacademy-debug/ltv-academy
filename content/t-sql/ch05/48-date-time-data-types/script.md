# Lesson 48 — Date and Time Data Types · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

We're shifting from strings to dates now. Before working with dates, you
need to know how T-SQL actually stores them — because there isn't just
one date type, there are several, and picking the right one matters.

## S2 · STEPS CARD (DATE / TIME / DATETIME / DATETIME2)

Four types to know. DATE stores a calendar date only — no time at all,
perfect for something like a birth date. TIME is the mirror image — time
of day only, no date. DATETIME combines both, and it's been around since
long before more precise types existed. And DATETIME2 is its modern
replacement, fixing DATETIME's real limitations.

## S3 · CODE CARD (DATETIME quirks)

DATETIME has two quirks worth knowing. It can't store any date before
January 1st, 1753 — try, and it simply fails. And its precision rounds to
increments of about three and a third milliseconds, not a clean,
predictable fraction of a second. You'll see DATETIME constantly in
existing databases, including AdventureWorks2012 itself, which was built
years ago.

## S4 · CODE CARD (DATETIME2 benefits)

DATETIME2 fixes both of those problems: a much wider valid range,
reaching all the way back to the year 1, and genuinely precise fractional
seconds. For any new development, DATETIME2 is the recommended choice
over legacy DATETIME.

## S5 · OUTRO CARD

And just like CHAR versus VARCHAR back in Lesson 41, picking the
narrowest appropriate type communicates real intent. Store a birth date
as DATETIME, and you've implied a time-of-day that doesn't exist and
never meant anything — an invitation for confusion down the road. Next
lesson: actually working with dates — GETDATE, DATEADD, and DATEDIFF. See
you there.
