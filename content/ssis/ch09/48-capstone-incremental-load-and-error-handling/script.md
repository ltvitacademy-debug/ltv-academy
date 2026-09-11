# Script — Capstone: Incremental Load & Error Handling

## Segment 1 (title)

Lesson 47's package works, but it cheats — it reloads the entire source
every single run. This lesson fixes that for real, and closes the other
gap it left open: rows that silently disappeared when they didn't
match. By the end, this package is shaped like something you'd actually
trust to run every night, unattended.

## Segment 2 (steps: watermark-pattern)

The fix is a watermark — one stored date marking how far the last
successful run got. Before the data flow runs, an Execute SQL Task
reads that stored date out of a small control table into a package
variable. The source query's WHERE clause then filters on
ModifiedDate greater than that watermark, so only orders that are new
or changed since the last run actually get extracted. And critically,
the watermark only gets updated after the load succeeds — so a failed
run doesn't quietly skip data on the next attempt. Run it twice with no
new orders in between, and the second run should load exactly zero
rows. That's the pattern working correctly, not a bug.

## Segment 3 (steps: error-handling)

The other fix is what happens to rows that fail. Right now, a row that
doesn't match the Lookup just vanishes — its error output gets ignored.
Changing that setting to Redirect Row sends unmatched rows into a real
CSV file instead, so nothing disappears without a trace. The OLE DB
Destination gets the same treatment, for rows that fail to insert. And
on top of both of those, an OnError event handler on the Data Flow Task
writes a row into a log table the moment anything actually fails — so
if this package breaks at three in the morning, there's a record
waiting for you the next day, not silence.

## Segment 4 (outro)

Add the watermark, redirect both error outputs, and wire up the event
handler — that's this lesson's build, on top of the package you already
have. Next lesson, we wrap this whole thing up and talk about how to
present it as a real piece of work.
