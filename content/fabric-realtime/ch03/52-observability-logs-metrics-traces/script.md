# Lesson 52 — Observability: Logs, Metrics, and Traces · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Observability — logs, metrics, and traces. Filling in what it
actually means for a pipeline to be observable.

## S2 · CODE CARD (three pillars)

Logs tell you what exactly happened at a specific moment. Metrics
tell you how something's behaving over time. Traces show how one
specific event moved through every stage. None of the three
replaces the others.

## S3 · CODE CARD (a metric and a log)

A metric answers is latency trending up. A log answers what
specifically failed at two twelve PM. Genuinely different
questions, neither one a substitute for the other.

## S4 · STEPS CARD (choosing where to look first)

A real incident starts with a metric or an alert noticing
something's off, moves to logs to find the specific error, and
only reaches for a trace when the failure spans multiple stages.

## S5 · OUTRO CARD

Starting with the wrong pillar wastes time. Next up: setting up
alerts for pipeline failures — turning observability into an
actual notification.
