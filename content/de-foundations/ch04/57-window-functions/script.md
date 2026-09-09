# Lesson 57 — Window Functions · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Group by collapses rows into one per group — sometimes you don't
want that. Window functions.

## S2 · CODE CARD (Window.partitionBy)

Partition by plays the same role group by's columns did — it
defines the groups. Order by decides the order within each one.
Together they describe a neighborhood for every row, without
actually collapsing anything yet.

## S3 · CODE CARD (row_number)

Row number then numbers each row within its own partition, in the
order specified — the highest fare per vendor gets rank one. Notice
dot over — that's what tells Spark to apply the ranking per window
instead of across the whole DataFrame.

## S4 · CODE CARD (dedup with window)

And this properly solves Lesson 52's dropped-duplicates problem:
rank the duplicates by whatever should decide the winner, then keep
only the rows ranked number one — full control, instead of an
arbitrary survivor.

## S5 · OUTRO CARD

Partition and order define the neighborhood, row number ranks
within it, and every row survives. Next lesson: temporary views,
for querying a DataFrame with real SQL.
