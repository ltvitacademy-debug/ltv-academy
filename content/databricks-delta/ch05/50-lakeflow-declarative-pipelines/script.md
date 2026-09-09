# Lesson 50 — Lakeflow Declarative Pipelines · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Now let's build the same pipeline a completely different way —
Lakeflow Declarative Pipelines.

## S2 · CODE CARD (imperative)

Chapter 3's pipeline was imperative — you wrote the exact steps
and manually wired task one, into task two, into task three
yourself. Correct, but every dependency was something you had to
notice and express by hand.

## S3 · CODE CARD (declarative)

Declarative flips that. Silver trips calling read stream bronze
trips — that single reference is the entire dependency
declaration. Nobody wrote task two depends on task one; the
framework infers the whole order automatically.

## S4 · CODE CARD (dependency graph)

Lakeflow builds a real dependency graph from these function
references — exactly Lesson 25's bronze, silver, gold flow, and
exactly Lesson 30's chaining, just discovered by reading the code
instead of declared by hand. Add a new table later, and it slots
in automatically.

## S5 · OUTRO CARD

And nothing about the underlying PySpark changes — casting,
deduplication, joins, all still available. Only how the structure
gets expressed changes. Next lesson: the real dlt dot table
syntax, in full.
