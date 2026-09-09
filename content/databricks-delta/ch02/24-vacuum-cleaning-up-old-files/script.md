# Lesson 24 — VACUUM — Cleaning Up Old Files · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes (chapter finale).

---

## S1 · TITLE CARD

Chapter 2's finale — cleaning up what's been piling up all along.
Vacuum.

## S2 · CODE CARD (accumulation)

Every update, delete, merge, and optimize leaves old files behind
on disk — Lesson 17's point that a remove action doesn't delete a
file right away. Those files aren't part of the current version,
but they're not gone either — exactly what makes time travel
possible.

## S3 · CODE CARD (VACUUM)

Vacuum actually deletes them for good — but only files older than
the retention window, seven days by default. Anything younger is
left alone, specifically to protect time travel and any
long-running query still reading an older version.

## S4 · CODE CARD (the tension)

You can shorten that window, but it's genuinely risky — a
long-running query mid-read on an older version can have its files
deleted out from under it. This is exactly why time travel was
never meant to be a permanent backup.

## S5 · OUTRO CARD (chapter recap)

A transaction log, real ACID guarantees, schema enforcement, time
travel, safe merges, and the maintenance to keep it all bounded —
that's the whole chapter. Next: medallion architecture, putting
every one of these tools to work.
