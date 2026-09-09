# Lesson 48 — Data Type Conversion · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Now let's talk about converting a column's actual data type —
casting.

## S2 · CODE CARD (cast)

Dot cast converts a column to a different type. Write it as a
string name like int, or as a type class like Integer Type,
imported from the same module Lesson 43 used for schemas. Both do
exactly the same thing.

## S3 · CODE CARD (silent failure)

But here's the trap: if fare amount is a string column and one row
actually contains N-slash-A instead of a number, casting it to
double doesn't error — that row just becomes null. PySpark
generally favors turning something that doesn't fit into null,
rather than crashing the whole job.

## S4 · CODE CARD (why it matters)

That's genuinely risky, because a silent cast failure is a real,
common way for bad data to hide in a pipeline undetected — and
Lesson 51 is exactly where you catch it. It's also the same
underlying idea as infer schema from Lesson 40 — that just does
this same casting automatically, behind the scenes, instead of by
hand.

## S5 · OUTRO CARD

Cast as a string or a type class, and always remember: a failed
cast becomes null, silently. Next lesson: string functions, for
cleaning up real text data.
