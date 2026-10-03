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
run doesn't quietly skip data on the next attempt.

## Segment 3 (steps: error-handling)

The other fix is what happens to rows that fail. Right now, a row that
doesn't match the Lookup just vanishes. Changing that setting to
Redirect Row sends unmatched rows into a real CSV file instead. The
OLE DB Destination gets the same treatment, and an OnError event
handler on the Data Flow Task writes a row into a log table the moment
anything actually fails. Let's look at exactly where each of those
settings lives.

## Segment 4 (screenshot: configure-error-output-dialog.png)

Every data flow component shares this same Configure Error Output
dialog, and by default, every column is set to Fail component —
meaning one bad row takes down the whole thing. That's the setting
both the Lookup and the OLE DB Destination start with.

## Segment 5 (screenshot: redirect-row-selected.png)

Switch the Error column to Redirect row instead, for each column, and
the component keeps running — the offending row just goes down a
separate path instead of killing the task. That path is what feeds
your two new flat file destinations.

## Segment 6 (screenshot: event-handlers-tab.gif)

Event handlers live on their own tab, entirely separate from Control
Flow and Data Flow. Pick which executable raises the event — here,
your Data Flow Task — and which event to handle, then build the actual
logging logic on this blank design surface, the same way you'd build
any other control flow.

## Segment 7 (screenshot: event-handler-dropdown.png)

The Event handler dropdown is where that choice gets made — eleven
events total, everything from OnPreExecute to OnVariableValueChanged.
OnError is the one this lesson cares about: it fires the moment
something inside that executable actually breaks, which is exactly
when you want a row written to CapstoneRunLog.

## Segment 8 (outro)

Add the watermark, redirect both error outputs, and wire up the event
handler — that's this lesson's build, on top of the package you already
have. Next lesson, we wrap this whole thing up and talk about how to
present it as a real piece of work.
