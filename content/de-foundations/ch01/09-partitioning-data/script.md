# Lesson 9 — Partitioning Data · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Lesson 3 covered directories as real objects. Partitioning is about
deliberately organizing those directories to mirror a column you
filter on constantly — for this course's taxi data, almost always the
pickup date.

## S2 · CODE CARD (Hive-style)

This key equals value naming — year equals 2024, month equals 01 — is
called Hive-style partitioning. It's not an Azure thing or a Spark
thing specifically. Spark, Databricks, Synapse, pretty much every
big-data tool recognizes this exact convention automatically.

## S3 · CODE CARD (pruning)

Here's why it matters. A query filtering on year 2024 and month 1
doesn't need month=02 or month=03 at all. The engine sees those
directories don't match and skips them completely — not just skipping
columns inside a file, skipping entire files, before a single one
gets opened. That's partition pruning.

## S4 · STEPS CARD (word collision)

One thing worth getting straight right now, because this course uses
the same word twice for two different things. THIS kind of partition
is a directory structure, sitting on disk. Lesson 33's Spark partition
is something completely different — a unit of in-memory parallelism
while Spark is actually processing data. Same word. Different layer of
the stack entirely.

## S5 · OUTRO CARD

Partition on what you actually filter by, keep the number of distinct
values manageable, and queries skip most of your data before they
even start. Next lesson: putting containers, directories, formats,
and partitioning together into one real data lake design. See you
there.
