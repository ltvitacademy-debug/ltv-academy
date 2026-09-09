# Lesson 17 — The Delta Transaction Log · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Let's actually open the log Lesson 13 introduced — the Delta
transaction log.

## S2 · CODE CARD (reading a commit)

Each numbered json file inside underscore delta underscore log is
one commit — one atomic change. Open the very first one, and
you'll find a sequence of JSON records, each describing one action
taken during that write.

## S3 · CODE CARD (add/remove)

An add action means exactly one thing: this Parquet file is now
part of the table. A remove action, starting with Lesson 22's
update, delete, and merge, means the opposite — but critically, the
file itself usually isn't deleted from disk yet, just marked as no
longer current. That distinction is exactly what makes time travel
possible later.

## S4 · CODE CARD (checkpoints)

And after enough commits build up, Delta writes a checkpoint — a
Parquet summary of the whole table state, so a reader doesn't
replay every single commit from the beginning. Purely an internal
optimization, nothing you do changes.

## S5 · OUTRO CARD

Start from the checkpoint, replay what's after it, and you get
exactly the current, active files — no ambiguity, ever. Next
lesson: ACID transactions, naming the guarantee this log actually
provides.
