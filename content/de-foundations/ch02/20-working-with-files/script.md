# Lesson 20 — Working With Files · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Before Pandas does all of this for you starting next lesson, it's
worth understanding what actually happens when Python opens, reads,
and writes a real file.

## S2 · CODE CARD (open/with)

Open takes a path and a mode — r for read, w for write. And with is a
context manager — it guarantees the file closes automatically when
you're done, even if something goes wrong inside that block. No
forgetting to close it, ever.

## S3 · CODE CARD (reading line by line)

Looping over a file object reads one line at a time — which matters,
because it never loads the entire file into memory at once. Strip
removes the trailing newline, split breaks a line into its
comma-separated fields — a manual version of what real CSV parsing
does properly.

## S4 · CODE CARD (writing)

Writing works the same way. W mode creates the file, or overwrites it
completely if it already exists. A, for append, would add to the end
instead, without erasing what's already there.

## S5 · OUTRO CARD

You'll rarely call open directly on a CSV again after this — but when
something goes wrong later, an encoding error, a file that won't
close, this is exactly what's happening underneath. Next lesson:
Pandas DataFrames, doing all of this properly. See you there.
