# Lesson 20 — Python vs. Power Query vs. DAX · Voiceover script

Segments map 1:1 to slides. Target: 2-3 minutes — write for 340-380 words
at this voice's ~120 words/min pace. This is the final lesson of the
entire course — the outro should feel like a genuine course completion.

---

## S1 · TITLE CARD

Lesson 1 opened this entire course with these exact same three tools,
described purely from the outside. Twenty lessons later, here's the
actual working decision framework, built genuinely from the inside.

## S2 · CODE: Runs once? Power Query -> Recalculates live? DAX -> Neither can do it? Python

Ask what the calculation genuinely needs to do first. Something that
runs once, shaping data before it loads, points clearly to Power Query.
Something that needs to recalculate live, per filter or per click,
points clearly to DAX. Only when neither of those two built-in tools can
actually do it at all does Python become the right answer — never a
default reach just because it's the tool you happened to learn most
recently in this course.

## S3 · CODE: Power Query in 3 clicks -> don't reach for Python instead

You genuinely can now rename a column or filter rows using Pandas
directly. But if Power Query's own interface already does that exact
same job in a few clicks, reaching for a Python script instead adds a
real dependency — a correctly working Python installation on every
single machine that ever refreshes this file — for essentially zero
actual benefit gained.

## S4 · CODE: DAX still non-negotiable

Eighteen lessons of genuinely real Python haven't changed this one fact
at all: DAX recalculates live, per filter context, exactly as someone
clicks around interacting with a report. Python runs precisely once and
hands back a static, unchanging result. A total that genuinely needs to
change the moment someone clicks a slicer has exactly one correct tool
available, and it was never Python.

## S5 · CODE: Statistics/ML -> genuine cleaning gaps -> custom visuals

Where Python genuinely earns its actual place in a real project:
statistical or machine-learning techniques with no built-in equivalent
anywhere in Power Query or DAX, cleaning patterns that are honestly a
few lines of Pandas versus a dozen awkward Power Query steps, and
specific visuals that no native chart type in the gallery actually
covers.

## S6 · OUTRO CARD

Twenty lessons, three tools, and now a genuine working framework for
choosing correctly between them instead of just guessing. Course
complete. Congratulations.
