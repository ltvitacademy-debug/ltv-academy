# Lesson 35 — Transformations vs. Actions · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Lessons 31 and 34 both hinted at this distinction. Today, the formal
names: transformations, and actions.

## S2 · CODE CARD (transformations)

A transformation takes a DataFrame and returns a brand new one,
describing one more step in the plan. Filter, select, with column,
group by, join — every one of these runs nothing on its own.

## S3 · CODE CARD (actions)

An action is what actually triggers real execution — every
transformation that led up to it, all at once. Show, count, collect,
write — call any of these, and the whole plan finally runs.

## S4 · CODE CARD (chaining)

Here's why this matters. Chain four transformations together, and
none of them run individually. Only when show finally gets called
does Spark run all four, together, in one single optimized pass over
the data — genuinely more efficient than running each step on its
own.

## S5 · OUTRO CARD

Returns a DataFrame you can keep chaining? Transformation. Finishes
something, gives you a real result? Action. Next lesson: SparkSession
— the real entry point behind every line of code you've seen so far.
See you there.
