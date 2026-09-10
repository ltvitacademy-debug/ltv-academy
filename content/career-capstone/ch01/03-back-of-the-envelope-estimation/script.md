# Lesson 3 — Back-of-the-Envelope Estimation · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Back-of-the-envelope estimation — turning last lesson's
requirements into actual, usable numbers.

## S2 · CODE CARD (a worked estimate)

Two hundred thousand trips a day, at roughly 500 bytes each, comes
out to about 2 to 3 events per second on average, and around 36
and a half gigabytes a year. Deliberately rough — round numbers,
simple math.

## S3 · CODE CARD (how scale changes tools)

That scale fits comfortably in a single KQL database, no sharding
needed. A hundred times that scale is a genuinely different
problem, where partitioning and capacity planning actually start
to matter.

## S4 · OUTRO CARD

The order of magnitude, done fast, beats a precise number done
never. Next up: choosing storage — OLTP versus OLAP versus object
storage, now that the scale is known.
