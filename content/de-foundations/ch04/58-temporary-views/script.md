# Lesson 58 — Temporary Views · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Now let's give a DataFrame a name that SQL can actually
reference — temporary views.

## S2 · CODE CARD (createOrReplaceTempView)

Create or replace temp view doesn't copy or move any data — it
registers the name trips as something Spark SQL can reference,
pointing at the exact same underlying DataFrame. Nothing about
trips itself changes.

## S3 · CODE CARD (lifetime)

And that view lives only as long as the Spark session that created
it. It's not saved to disk, not visible to another Spark
application, and disappears the moment the session ends —
completely unlike a real database table.

## S4 · CODE CARD (spark.sql preview)

This is exactly the setup step Lesson 59 relies on. Spark dot sql
runs a real SQL query against that registered name — without
registering it first, there'd be nothing for that query to find.

## S5 · OUTRO CARD

A name, not a copy, and it lives only as long as the session. Next
lesson: Spark SQL with DataFrames, two APIs, one engine underneath.
