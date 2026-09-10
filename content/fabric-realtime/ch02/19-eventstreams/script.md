# Lesson 19 — Eventstreams · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Let's actually ingest a continuous flow of events —
Eventstreams.

## S2 · CODE CARD (sources/transforms/destinations)

An event hub source, filtered in flight, can land in both an
eventhouse for real-time queries and a lakehouse for later batch
analysis — the same stream, more than one destination.

## S3 · STEPS CARD (creating one)

New eventstream, add a source, add a destination, publish — and
it starts running immediately, continuously, the same always-on
idea as a processing-time trigger.

## S4 · CODE CARD (parallel to Autoloader)

This is conceptually the same job as Autoloader — picking up new
data automatically, no manual intervention — just for a genuinely
different shape: a continuous stream of events, not files landing
periodically.

## S5 · OUTRO CARD

Source, transformation, destination — and destinations can
genuinely be plural. Next lesson: event sources, Azure Event Hubs
and IoT Hub, for real.
