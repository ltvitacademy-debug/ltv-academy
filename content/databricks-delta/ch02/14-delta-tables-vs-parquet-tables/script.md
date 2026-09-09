# Lesson 14 — Delta Tables vs. Parquet Tables · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Let's make the difference from last lesson completely concrete —
Delta tables versus Parquet tables.

## S2 · CODE CARD (same data, two formats)

The only code difference is one extra dot format delta call.
Inspect the actual files inside either folder, and they look
identical — Delta really is Parquet underneath, made completely
literal here.

## S3 · CODE CARD (DESCRIBE HISTORY)

But describe history only works on the Delta table — it reads
directly from the underscore delta underscore log from last
lesson. The plain Parquet folder has nothing like this, because
there's no log to describe the history of at all.

## S4 · CODE CARD (concurrent writes)

And here's the real-world payoff: two jobs writing to the same
plain Parquet folder at once risk half-written, inconsistent files.
The same two jobs writing to a Delta table get resolved cleanly by
the transaction log — one write succeeds, or fails, never half.

## S5 · OUTRO CARD

One extra word on the write, one log underneath, and a real safety
guarantee neither Parquet alone has. Next lesson: creating a Delta
table, the real syntax, start to finish.
