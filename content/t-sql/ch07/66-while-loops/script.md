# Lesson 66 — WHILE Loops · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

IF and ELSE decide between two paths, once. Sometimes you need to repeat
something instead — as long as a condition holds true. That's WHILE.

## S2 · CODE CARD (basic WHILE loop)

Declare a counter starting at 1. WHILE counter is less than or equal to
5, print the iteration, then increment the counter. WHILE checks its
condition before every single pass, and keeps running that BEGIN-END
block for as long as it stays true. Notice the counter gets incremented
INSIDE the loop — that's not optional. Without something that eventually
makes the condition false, this loop runs forever.

## S3 · CODE CARD (BREAK example)

BREAK exits a loop immediately, no matter what the WHILE condition would
otherwise say. This loop is technically set up to run up to a hundred
times, but BREAK cuts it off the moment counter hits 5.

## S4 · CODE CARD (CONTINUE example)

CONTINUE is gentler — it skips just the rest of the current pass and
jumps straight back to re-checking the condition, without exiting the
loop entirely. Here, even numbers get skipped using the percent sign,
the modulo operator, but the loop itself keeps right on running.

## S5 · OUTRO CARD

One honest note before we move on: T-SQL is fundamentally set-based,
built to operate on entire tables at once, which is almost always faster
than looping row by row with WHILE. Experienced developers reach for
WHILE sparingly — administrative scripts, batching large deletes,
genuinely sequential logic. If you catch yourself writing a WHILE loop to
process rows one at a time, it's worth asking whether a JOIN or an UPDATE
could do the same job instead. Next lesson: cursors, for looping row by
row through an actual result set. See you there.
