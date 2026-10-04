# Lesson 18 — Writing SQL Data Quality Checks · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

This is the hands-on core of the chapter — the actual patterns you'll
reuse for every check you ever write.

## S2 · SCREENSHOT — Connect

Every check session starts the same way. Connect, Database Engine,
point it at the right server.

## S3 · SCREENSHOT — New Query

Then a New Query window, opened against that connection — right-click
the server, or use the toolbar button. This is where every check gets
written.

## S4 · CODE — Anatomy of a check query

Nearly every check has the same shape: select the key columns, from
the table, where the condition is true only when the row is bad. Build
the habit early — write the WHERE clause for the failure, not the
success. You're not selecting good rows, you're hunting the ones that
need attention.

## S5 · SCREENSHOT — Execute

Click Execute, or press F5, and the check runs against the connected
database — exactly the same way any other query would.

## S6 · CODE — Combining checks with UNION ALL

One check is useful once. A failures report — every rule's violations
in a single result set, labeled by which rule fired — is what you
actually want to run daily. UNION ALL stitches multiple rules into one
scannable list.

## S7 · SCREENSHOT — Reading the results

This is what that combined report looks like once it comes back — one
row per violation, labeled by rule, in a plain SSMS results grid.

## S8 · STEPS — Best practices

Keep checks read-only — never update or delete inside a check. Write
SARGable WHERE clauses so the engine can actually use your indexes.
Cast keys consistently across UNION branches. And once these are
automated, schedule the heavy ones outside business hours.

## S9 · OUTRO

You now have the full pattern: connect, write, run, combine. Next up:
referential integrity checks — the specific pattern for catching
orphaned rows between related tables.
