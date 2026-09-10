# Lesson 38 — Change Data Capture, Streamed · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Change data capture, streamed — every row-level change in a
database, as its own live event.

## S2 · CODE CARD (what a streamed CDC event looks like)

CDC records every insert, update, and delete as it happens. A
streamed CDC event carries the operation type, the row's state
before and after, and exactly when the change happened.

## S3 · CODE CARD (streamed vs. batch)

Databricks lesson 22 covered batch merge — comparing a snapshot on
a schedule. Streamed CDC solves the same problem continuously,
seeing every change in order instead of a periodic diff.

## S4 · STEPS CARD (why not poll the source)

Repeatedly polling a live production database for changes adds
real load to it. CDC instead reads the database's own change log,
which it's already maintaining anyway — no extra query load at
all.

## S5 · OUTRO CARD

Continuous sync, no extra load on the source. Next up: real-time
data quality — catching bad data before it spreads.
