# Lesson 63 — Batches and GO · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

You've been typing GO at the top of every script since Lesson 2, and I
promised we'd cover it properly once we got here. Time to actually
explain what a batch is, and what GO really does.

## S2 · CODE CARD (GO is not T-SQL)

Here's the surprise: GO is not a T-SQL keyword at all. It's a signal
recognized by client tools — SSMS, sqlcmd, others — meaning everything
above this line is one batch, send it now, then start a fresh one. The
SQL Server engine itself never even sees the word GO. Your client tool
strips it out and sends each batch to the server separately.

## S3 · CODE CARD (variable doesn't survive GO)

And here's the real, practical consequence. Declare a variable, then hit
GO, then try to use that variable in the next block — and it fails. Why?
Because a variable only lives for the batch that declared it, and GO just
started a brand new batch. As far as SQL Server is concerned, that
variable never existed in this new batch at all, even though it's
sitting right there on your screen. The fix is simple: don't put a GO
between declaring a variable and using it.

## S4 · CODE CARD (USE ... ; GO pattern)

And that's exactly why every script in this course opens with USE, then
GO, before anything else. That GO makes sure the database-context switch
completes as its very own batch, first — a small habit, but a real one,
since some statements have to be the first thing in their batch to work
correctly.

## S5 · OUTRO CARD

GO isn't T-SQL — it's a batch boundary your client tool understands, and
variables never cross it. Next lesson: IF and ELSE, real branching logic
in T-SQL. See you there.
