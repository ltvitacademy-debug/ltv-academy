# Lesson 45 — filter() and where() · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Now let's keep only the rows we actually want — filter and where.

## S2 · CODE CARD (filter/where)

Filter keeps rows where a condition is true. This is the PySpark
version of Lesson 24's Pandas boolean indexing — same concept, a
method call instead of bracket syntax. And where does the exact
same thing — it's a SQL-flavored alias, so SQL-background readers
feel at home, since WHERE does this same job in Spark SQL later on.

## S3 · CODE CARD (the trap)

But here's a real trap: filter on trip distance greater than 10, as
a plain string, silently does the wrong thing. It just compares a
Python string to an integer, with no connection to the DataFrame at
all. Col is what actually builds a real Spark condition.

## S4 · CODE CARD (combining)

And to combine conditions, use ampersand and pipe — not Python's
and or or. Spark's column objects overload those bitwise operators
specifically for this, and each condition needs its own
parentheses.

## S5 · OUTRO CARD

Filter or where, col for real conditions, ampersand and pipe to
combine them. Next lesson: withColumn, for adding and changing
columns.
