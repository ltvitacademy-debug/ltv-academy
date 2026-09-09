# Lesson 50 — Converting and Formatting Data (CAST/CONVERT) · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Sooner or later, you'll need to turn a number into text, or reformat a
date for display. That's what CAST and CONVERT are for — two different
tools for the same basic job, with one real difference between them.

## S2 · CODE CARD (CAST example)

CAST list price as VARCHAR 20, as price as text. This is CAST — value,
the word AS, then the target type. It's ANSI standard syntax, meaning it
works the same way across most database systems, not just SQL Server.

## S3 · CODE CARD (CONVERT with style codes)

CONVERT does the same basic conversion, but notice the argument order
flips — the type comes FIRST here, then the value. The real reason to
reach for CONVERT is its optional third argument: a style code that
controls formatting. Style 101 gives you US format, month-day-year. Style
103 gives you UK format, day-month-year. CAST has no equivalent — it
always uses the type's plain default format.

## S4 · CODE CARD (conversion gotcha)

And here's a real gotcha worth knowing: converting text that isn't
actually numeric fails at runtime, not before. Cast the literal text "not
a number" to an integer, and it errors out the moment it runs. Always be
confident your source data can genuinely convert before casting it — we'll
cover a safer, validating version of this later in the course.

## S5 · OUTRO CARD

CAST for portable, standard conversions; CONVERT when you specifically
need formatting control, especially on dates. Next lesson closes out
Chapter 5: deleting duplicate rows. See you there.
