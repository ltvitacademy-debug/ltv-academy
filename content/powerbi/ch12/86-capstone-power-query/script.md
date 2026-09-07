# Lesson 86 — Clean & Transform With Power Query · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

AdventureWorksDW2014 is already well-built, so this cleanup is
lighter than Chapter Three — but it isn't nothing.

## S2 · CODE: Trim unused columns -> Rename for readability -> Check data types

Three real tasks. Decide for real which of Lesson 85's extra columns
to keep. Rename warehouse names into something a report can show.
Confirm every date column actually loaded as a date.

## S3 · CODE: Renaming and removing -> row count never changes

One check that catches mistakes early: renaming and removing columns
should never change a table's row count. If it did, a stray filter
step snuck in.

## S4 · OUTRO CARD

Close and Apply commits it all. Lesson 87 is where these cleaned
tables actually become a star schema.
