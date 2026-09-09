# Lesson 19 — Exception Handling · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Real data always has a few bad rows in it. Exception handling is how
you make sure one of them doesn't take down your entire job.

## S2 · CODE CARD (the problem)

Here's the problem, unhandled. Trying to convert a text value like N
slash A into a number raises an error — and without handling it, that
error crashes the whole program. If this is inside a loop over ten
thousand rows, one bad row stops all ten thousand.

## S3 · CODE CARD (try/except)

Try and except fix that. Python runs the try block, and if that
specific error happens, control jumps to except instead of crashing.
And catch the SPECIFIC exception type — value error, key error — not
just a bare except that catches everything. A bare except can
accidentally hide a real bug you actually needed to see.

## S4 · CODE CARD (real pattern)

Here's the real pattern. Loop through raw values, try converting each
one, and if it fails, skip it and keep going. This is exactly the
resilience Lesson 27's ETL script — and every real production
pipeline — actually needs, because real files always have a few
genuinely bad rows.

## S5 · OUTRO CARD

Catch what you expect, skip what's broken, keep the job running. Next
lesson: working with files — opening, reading, and writing real files
on disk. See you there.
