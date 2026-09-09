# Lesson 33 — Spark Partitions · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Lesson 9 promised this moment. Time to resolve that word collision,
properly — the Spark partition, and how it's genuinely nothing like
the storage kind.

## S2 · STEPS CARD (word collision resolved)

A storage partition, from Lesson 9, is a directory sitting on disk. A
Spark partition is completely different — a chunk of a DataFrame's
actual data, held in memory, on one Executor. Same word. Two
unrelated concepts.

## S3 · CODE CARD (where the number comes from)

When Spark reads a file, it automatically splits the data into
partitions, roughly based on file size and how many files there are.
And here's the connection to last lesson's Task: each Task processes
exactly ONE partition. More partitions, more independent chunks that
can genuinely run at the same time.

## S4 · STEPS CARD (too few, too many)

Get the count wrong in either direction, and it costs you. Too few
partitions, and most of your available cores just sit idle — your
cluster is bigger than the job can actually use. Too many, and each
one's tiny scheduling overhead adds up until you're spending more
time managing partitions than doing real work.

## S5 · OUTRO CARD

One partition, one Task, one core, at a time — multiply that across
everything you've got, and that's genuinely how Spark achieves
parallelism. Next lesson: lazy evaluation — why Spark doesn't run
anything until you actually ask it to. See you there.
