# Lesson 71 — The MERGE Statement · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Keeping one table synced with another normally takes three separate
statements — an update, an insert, sometimes a delete, each with its own
matching logic. This lesson closes out Chapter 7 with MERGE, which
combines all three into one single statement.

## S2 · CODE CARD (MERGE example)

MERGE Product as target, using a source query, on matching product IDs.
Then three WHEN clauses. When matched, update the price. When not
matched by target — meaning it's in source but not target — insert it.
When not matched by source — meaning it's in target but not source —
delete it. In a real synchronization, that source would almost always be
a genuinely different table, like a staging table getting synced into a
permanent one.

## S3 · STEPS CARD (MATCHED/NOT MATCHED BY TARGET/SOURCE = join logic)

And notice something: these three WHEN clauses map directly onto the
join logic from Chapter 3. Matched is exactly INNER JOIN's definition —
exists on both sides. Not matched by target is the LEFT JOIN gap — exists
only in source. Not matched by source is the mirror image — exists only
in target. MERGE is really just "do something different depending on
which side of the join a row falls on," instead of simply filtering.

## S4 · OUTRO CARD

This is the standard tool for loading a data warehouse — syncing fresh
staging data into a permanent table, updating what changed, inserting
what's new, all atomically, in one statement. We'll see MERGE again
properly in Chapter 12. That wraps up Chapter 7. You can now write T-SQL
as a real programming language — variables, batches, branching, loops,
cursors, parameterized stored procedures, safe dynamic SQL, and
multi-action synchronization with MERGE. Chapter 8 moves into
transactions and error handling — making sure your scripts behave
correctly when something actually goes wrong. See you there.
