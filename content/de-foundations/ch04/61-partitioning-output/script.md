# Lesson 61 — Partitioning Output · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Now let's organize what actually gets written, on disk —
partitioning output.

## S2 · CODE CARD (partitionBy write)

Partition by on a write organizes the output into real subfolders
by column. And this uses exactly the pickup year and pickup month
columns we built back in Lesson 50 — this is the payoff that lesson
was setting up all along.

## S3 · CODE CARD (folder structure)

The result is the exact same key equals value directory convention
Lesson 9 covered back in Chapter 1's storage material. Spark's
write-side partitioning and a data lake's storage partitioning are
the same underlying idea, just arrived at from opposite ends of the
pipeline.

## S4 · CODE CARD (partition pruning)

And that's exactly why a filtered query gets dramatically faster —
this is called partition pruning. Spark can see from the folder
names alone which subfolders could even contain the data you're
asking for, and it skips every other folder entirely, without ever
opening those files.

## S5 · OUTRO CARD

Partition on a column real queries actually filter on, with a
sensible number of distinct values. Next lesson: Spark performance
fundamentals — the course finale.
