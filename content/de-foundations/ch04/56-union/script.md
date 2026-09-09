# Lesson 56 — union() · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Now let's stack DataFrames on top of each other — union.

## S2 · CODE CARD (union)

Union stacks rows from one DataFrame directly beneath another — the
opposite of last lesson's join, which combines columns side by
side. The real common use case here: NYC taxi data ships as one
file per month, and union is how you'd combine several months into
one DataFrame.

## S3 · CODE CARD (position risk)

But here's the real danger: union matches columns purely by
position, not by name. If two files happen to have columns in a
different order — which genuinely happens across a year of monthly
files — union silently swaps the data instead of raising any error
at all.

## S4 · CODE CARD (unionByName)

Union by name fixes this — it looks up each column by its actual
name instead of its position, sidestepping that entire silent-swap
risk. Unless you have a specific reason not to, union by name is
the safer default.

## S5 · OUTRO CARD

Union stacks rows, but matches by position — union by name matches
by name instead, and that's the safer choice. Next lesson: window
functions, calculations that see neighboring rows.
