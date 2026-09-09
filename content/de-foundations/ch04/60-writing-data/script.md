# Lesson 60 — Writing Data · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Read, clean, transform — now let's actually save the result.
Writing data.

## S2 · CODE CARD (write.parquet)

Write dot parquet is the natural endpoint of everything this
chapter's built. And Lesson 42 already explained why Parquet is the
real default choice for this.

## S3 · CODE CARD (folder of part-files)

But you won't get one single file back — you get a folder, full of
part files, plus a success marker. Remember Lesson 32: Spark
distributes work across partitions, and every partition writes its
own file independently, in parallel. One file was never really the
model.

## S4 · CODE CARD (overwrite mode)

And without mode overwrite, writing to a path that already exists
raises an error by default — Spark refuses to silently clobber
existing output. Overwrite replaces it on purpose; append adds new
files alongside instead.

## S5 · OUTRO CARD

Write, expect a folder of part files, and choose your mode
deliberately. Next lesson: partitioning output, organizing what
actually gets written, on disk.
