# Lesson 62 — Spark Performance Fundamentals · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total (course finale).

---

## S1 · TITLE CARD

This is it — the final lesson. Spark performance fundamentals.

## S2 · CODE CARD (cache)

Cache keeps a computed DataFrame in memory, so later actions don't
recompute the same lazy plan from scratch. Remember Lesson 34 —
every action normally reruns everything. If you're running several
actions against the same cleaned data, cache stops that waste.

## S3 · CODE CARD (repartition/coalesce)

Repartition and coalesce both change how many partitions a
DataFrame has. Repartition can go up or down, but always shuffles.
Coalesce can only go down, and it avoids a full shuffle where it
can — the cheaper choice before a final write.

## S4 · CODE CARD (broadcast)

A shuffle is Spark physically moving data between worker nodes so
matching keys end up together — required by joins and group by, and
usually the single most expensive part of a job. Broadcast avoids
it entirely for a small table: send a full copy to every worker,
instead of shuffling the giant side across the whole cluster.

## S5 · STEPS CARD (course recap)

Storage, then Python, then Spark's own architecture, then finally
PySpark itself — that's this whole course, in order.

## S6 · OUTRO CARD

Sixty-two lessons, real NYC Taxi data, start to finish.
Congratulations on finishing Data Engineering Foundations.
