# Script — Log Parsing & Reporting

## Segment 1 (title)

Northbridge's checkout service writes thousands of log lines a night, and almost nobody reads them until something breaks. This lesson parses every line with a regular expression, counts what matters, and writes a short daily report instead of a wall of text nobody has time for.

## Segment 2 (code)

A single regex with named capture groups pulls the timestamp, level, order, status, and an optional failure reason out of each log line in one pass. Naming a group with the P-name syntax means you retrieve it by name through match.group, instead of counting parentheses to find the right one.

## Segment 3 (code)

Reading the file line by line and running each one through the pattern turns thousands of lines into a handful of counts. Counter is a dictionary built exactly for this — incrementing a key that hasn't been seen yet just works instead of raising an error, and most_common hands back the results already sorted.

## Segment 4 (steps)

The pattern that makes this scale to any log is parse once, tally with Counter, then summarize in words. Raw counts are useful, but three sentences someone can read during an on-call handoff get read; a dump of numbers usually doesn't.

## Segment 5 (code)

The summary prints the total orders, the failures, and a failure rate as one readable line. The same numbers also go into a CSV row opened in append mode, so each day's run adds a new row to a growing history instead of overwriting yesterday's number.

## Segment 6 (outro)

Parse, tally, summarize — that pattern works for any structured log, not just checkout. Next, lesson 20 automates another recurring admin task: backups and cleanup jobs.
