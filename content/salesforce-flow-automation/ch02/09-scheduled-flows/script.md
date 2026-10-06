# Script — Scheduled Flows

## Segment 1 (title)

Lessons 6 and 7 covered flows triggered by a record save. A scheduled flow launches for a different reason entirely: the clock. No user, no record save, no screen — just a date, a time, and a frequency.

## Segment 2 (screenshot: New Flow screen, Schedule-Triggered Flow selected)

Setup's New Flow screen lists it as Schedule-Triggered Flow, and its own description says it plainly: launches at a specified time and frequency for each record in a batch, running in the background.

## Segment 3 (screenshot: Start element schedule menu)

Open one and the Start element gives you two things: Set Schedule, for the date, time, and frequency — Once, Daily, or Weekly — and Choose Object, optional, which turns this into a batch job against every record that matches.

## Segment 4 (screenshot: scheduled flow canvas)

Here's one running daily at 1 AM: it gets high-priority Cases, counts them, and creates an archived metric record — every night, with nobody triggering a single step.

## Segment 5 (screenshot: one-time schedule example)

A schedule doesn't have to recur. Set Frequency to Once with an object and a condition, and the flow runs a single time against every record that currently matches — here, Opportunities meeting one condition, then an Update Field.

## Segment 6 (outro)

Next up: Autolaunched Flows — the flow type scheduled flows and several others in this chapter actually run as, under the hood.
