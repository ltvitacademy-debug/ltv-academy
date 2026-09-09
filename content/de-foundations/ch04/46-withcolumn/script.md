# Lesson 46 — withColumn() · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Now let's actually add and change columns — withColumn.

## S2 · CODE CARD (add column)

withColumn takes two things: a name, and a col-based expression for
what goes in it — exactly why col got introduced early. And
remember Lesson 37: DataFrames are immutable, so this returns a
brand new DataFrame rather than changing trips in place, which is
why we reassign it back to trips.

## S3 · CODE CARD (overwrite)

Pass the name of a column that already exists, and withColumn
replaces it instead of adding a new one. Nothing marks that
differently in the syntax — the name alone decides add versus
replace.

## S4 · CODE CARD (chaining)

And since every withColumn call returns a new DataFrame, chaining
several of them in a row works completely normally — the exact same
pattern Lesson 27's Pandas E-T-L script used.

## S5 · OUTRO CARD

Name plus expression, same name replaces, chain as many as you
need. Next lesson: when, for building actual if-else logic as a
column expression.
