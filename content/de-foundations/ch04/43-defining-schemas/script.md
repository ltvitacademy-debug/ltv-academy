# Lesson 43 — Defining Schemas · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Now let's write a schema ourselves, by hand, instead of asking Spark
to guess.

## S2 · CODE CARD (StructType)

Struct type takes a list of struct fields, and each one names three
things: the column name, the type — called, not just named, note
the parentheses — and whether nulls are allowed.

## S3 · CODE CARD (using schema=)

Pass it to spark dot read dot csv as schema, and there's no infer
schema needed at all. In practice these two are mutually
exclusive — once you hand Spark a schema, it trusts it completely
instead of inspecting the actual data.

## S4 · CODE CARD (nullable)

But here's the catch: setting nullable to false doesn't actually
make Spark reject a null on read. It's mostly a hint for Spark's
optimizer. If the real data has an unexpected null anyway, Spark
will generally still load it — the mismatch shows up later as a
bug. Real null validation is Lesson 51's job, not this flag's.

## S5 · OUTRO CARD

Name, type, and a nullable hint — not a guarantee. Next lesson:
select, choosing exactly the columns you actually need.
