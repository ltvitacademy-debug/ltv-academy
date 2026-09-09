# Lesson 38 — Spark SQL · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total. Chapter 3 finale.

---

## S1 · TITLE CARD

One more entry point, and Chapter 3 is complete. Spark SQL — writing
genuine SQL directly against a Spark DataFrame.

## S2 · CODE CARD (real SQL)

Register a DataFrame as a temporary view, and spark dot S-Q-L runs
real SQL against it — select, where, group by, all genuine. If
you've taken this site's T-SQL course, this should look almost
entirely familiar.

## S3 · CODE CARD (same underneath)

And here's something worth knowing: the SQL version and the
equivalent DataFrame code produce IDENTICAL results, because they
compile down to the exact same execution plan. Spark's own optimizer
doesn't care which syntax you started from. Use whichever is more
readable for the job in front of you.

## S4 · CODE CARD (still lazy)

And nothing here breaks anything you already learned. Spark dot
S-Q-L doesn't run immediately either — it returns a DataFrame
describing a plan, exactly like every transformation. Show is still
what actually triggers it.

## S5 · STEPS CARD (chapter recap)

And that's Chapter 3, complete. Why Spark exists, its real
architecture, how work actually runs, and every entry point into it
— SparkSession, DataFrames, and now SQL.

## S6 · OUTRO CARD

Eleven lessons, one real mental model for how Spark thinks. Next
chapter: PySpark — twenty four lessons of real, hands-on syntax for
every single concept you now already understand. See you there.
