# Lesson 67 — Cursors: Declaring and Fetching · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Every query so far returns its entire result set at once. A cursor does
something different: it lets you step through those results one row at a
time, in code — useful on the rare occasion you genuinely need to act on
each row individually.

## S2 · CODE CARD (five-step cursor pattern)

Five pieces work together here. Declare product_cursor, cursor for, a
select statement — that defines the underlying query. Open runs it and
positions the cursor right before the first row. Fetch next pulls one
row's values into a variable and moves the cursor forward. And that
WHILE loop keeps going as long as at-at fetch status equals zero — a
system function that returns zero while a fetch succeeded, and something
nonzero the moment there are no rows left. That's what actually drives
the loop and stops it automatically.

## S3 · STEPS CARD (the five pieces)

And don't skip the cleanup at the end. CLOSE releases the result set.
DEALLOCATE removes the cursor definition entirely. Both are required —
skip either one, and you leave resources tied up unnecessarily.

## S4 · OUTRO CARD

One honest warning, even stronger than last lesson's about WHILE:
cursors are the most expensive row-by-row option in all of T-SQL —
slower than a WHILE loop over a temp table in most cases, and
dramatically slower than an equivalent set-based query. Reach for one
only when a set-based approach genuinely cannot do the job — certain
administrative tasks, like looping over table names, are the classic
legitimate case. If you're processing ordinary business data row by row
with a cursor, there's almost always a faster join or update sitting
right there instead. Next lesson: stored procedures, for saving a whole
script under a name. See you there.
