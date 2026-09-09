# Lesson 28 — Why Apache Spark? · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Chapter 2 built real skill in Pandas. This chapter starts with the
honest question: why does Spark even need to exist, when Pandas
already works?

## S2 · CODE CARD (where Pandas stops)

Here's exactly where Pandas stops working. One month of this course's
taxi data — a few million rows — fits fine, on one machine. But the
real, full historical dataset goes back to 2009. Hundreds of millions
of rows. Pandas doesn't fail gracefully there — it just runs out of
memory.

## S3 · STEPS CARD (the problem Spark solves)

That's the actual problem Spark solves. Instead of requiring
everything to fit on one machine, Spark spreads the data across a
cluster — many machines — and coordinates the whole thing so it
behaves, from your code's perspective, like one big computation.

## S4 · CODE CARD (Spark's origin)

Briefly, where this came from. Hadoop MapReduce solved the same
problem first, but it wrote intermediate results to disk between
every single step — reliable, but genuinely slow. Spark's real
innovation was keeping that work in memory instead, which is exactly
why it's dramatically faster for real, multi-step processing.

## S5 · OUTRO CARD

Eleven lessons build the foundation Chapter 4's real PySpark work
assumes you already have. Next lesson: distributed computing — how
work actually gets split across a cluster in the first place. See
you there.
