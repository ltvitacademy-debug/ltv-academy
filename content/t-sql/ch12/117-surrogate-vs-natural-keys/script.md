# Lesson 117 — Surrogate Keys vs. Natural Keys · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

One more key distinction before the course wraps up. AdventureWorks
D-W's Dim Product keeps two different kinds of identifier, side by
side, on purpose.

## S2 · CODE CARD (the real pair)

Product Key is the surrogate key — the warehouse's own auto-generated
integer, meaningless outside this one table. Product Alternate Key is
the natural key — the actual original Product ID from AdventureWorks
twenty twelve, the real source system, kept around so you can always
trace a row back to where it really came from.

## S3 · STEPS CARD (two kinds)

A natural key means something in the real world. A surrogate key is
deliberately meaningless — it exists purely to identify a row.

## S4 · CODE CARD (why Type 2 needs it)

And here's why that distinction actually matters. Lesson 116's Type 2
history inserts a brand new row with a new key every time something
changes, while keeping the old row around. If Dim Product used the
natural key as its primary key, that would be flatly impossible — a
primary key can't repeat. The surrogate key solves it: the SAME product
ID can show up on multiple surrogate-key rows, one per historical
version, because it's the surrogate key that actually has to stay
unique.

## S5 · OUTRO CARD

One more reason to like surrogate keys: they're smaller and faster to
join on than a long natural key, and they insulate the warehouse from a
source system someday changing its own numbering. Next lesson — the
final lesson of the entire course — ties everything together: where
T-SQL actually fits in the whole BI and warehousing pipeline. See you
there.
