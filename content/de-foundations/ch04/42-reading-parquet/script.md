# Lesson 42 — Reading Parquet · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Now let's read the format real production pipelines actually
prefer — Parquet.

## S2 · CODE CARD (read.parquet)

No header equals true, no infer schema equals true — because
Parquet already knows exactly what its own columns and types are.
It stores its schema directly inside the file itself, at write
time, so reading it back doesn't require guessing anything.

## S3 · CODE CARD (columnar storage)

That's because of columnar storage. CSV stores every field of a row
together. Parquet stores every value of one column together
instead. So selecting just fare amount only reads fare amount's
actual bytes off disk — trip distance and everything else never get
touched.

## S4 · STEPS CARD (why real data ships as Parquet)

That's exactly why the real NYC Taxi and Limousine Commission
switched its official format from CSV to Parquet — smaller files,
faster reads, and a schema that's already built in, with no
guessing pass required.

## S5 · OUTRO CARD

Schema built in, columns stored separately, fewer bytes touched.
Next lesson: writing an explicit schema yourself, by hand.
