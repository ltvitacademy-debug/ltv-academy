# Lesson 14 — Working with Dates · Voiceover script

Segments map 1:1 to slides. Target: 2-3 minutes — write for 340-380 words
at this voice's ~120 words/min pace.

---

## S1 · TITLE CARD

Dates are a predictable, specific version of the exact problem Lesson 13
just covered — and they genuinely show up in nearly every real dataset
you'll ever work with.

## S2 · CODE: "2026-01-15" is text, not a date

A date column loaded from a CSV file almost always arrives as plain
text. Twenty twenty six, dash, oh one, dash fifteen looks unmistakably
like a date to a human reading it, but Pandas actually sees an
eleven-character string underneath — the exact same object dtype
problem from Lesson 13, just wearing a date's clothing on top of it.

## S3 · CODE: pd.to_datetime(df["Order Date"])

to underscore datetime converts that plain text into Pandas' actual,
real date type underneath. Once properly converted, the column supports
genuine date operations — comparing two dates correctly, sorting rows
chronologically, calculating the difference between dates — none of
which work correctly on a plain text string, no matter how date-shaped
that string happens to look on the surface.

## S4 · CODE: df["Order Date"].dt.year -> .dt.month

Every single part of a real datetime64 column is available through dot
d-t, which is the date equivalent of the dot s-t-r prefix from Lesson
10. Year, month, day, even day name and quarter, all follow this exact
same pattern for pulling out whichever specific piece of the date you
actually need for your analysis.

## S5 · CODE: Building a clean date structure, in Python, before Power BI

This connects directly back to the main Power BI course's DimDate table,
built entirely by hand in DAX. to underscore datetime plus the d-t
accessors do that same essential job from Python's side of things
instead — genuinely typed, reliable dates, built before the data ever
even reaches Power BI at all.

## S6 · OUTRO CARD

That closes Chapter Four entirely — cleaning text, missing data,
duplicates, data types, and now dates. Chapter Five turns from cleaning
existing data to actually building something brand new: calculated
columns.
