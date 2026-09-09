# Lesson 53 — Pipeline Modes: Triggered vs. Continuous · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

How often does this whole pipeline actually run? Pipeline modes —
triggered versus continuous.

## S2 · CODE CARD (triggered)

A triggered pipeline runs once — it processes everything currently
available, across every table, in dependency order, then shuts
down. This is Lesson 33's available-now trigger, now applying to
the entire pipeline instead of one write stream call.

## S3 · CODE CARD (continuous)

A continuous pipeline starts up and keeps running indefinitely,
processing new data across every table as it arrives — Lesson 33's
processing time trigger, at the whole pipeline level. No next
scheduled run to wait for.

## S4 · CODE CARD (cost tradeoff)

And there's a real cost difference. Triggered spins up, processes,
spins down — billed only while running. Continuous stays up
indefinitely — billed continuously. The same tradeoff Lesson 5's
job clusters and Lesson 23's maintenance cadence already touched
on.

## S5 · OUTRO CARD

NYC Taxi data arrives in monthly files — genuinely bursty.
Triggered, on a schedule, is clearly right here; continuous only
earns its cost for something arriving by the second. Next lesson:
Lakeflow Jobs, orchestration.
