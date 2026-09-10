# Lesson 37 — Activator: Real-Time Alerting · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Activator — Fabric's item for turning a condition into an actual
action.

## S2 · CODE CARD (objects and properties)

Activator models what it watches as objects with properties — a
trip object with a fare amount property. Rules attach to those
properties, triggering a teams message or a power automate flow.

## S3 · CODE CARD (threshold vs. change)

A threshold rule fires every time it's re-evaluated while true. A
change rule fires once, only when the property newly becomes true
— without that distinction, a sustained condition would spam the
same alert over and over.

## S4 · STEPS CARD (where Activator connects)

Activator can watch an eventstream directly, a KQL query's
results, or a real-time dashboard tile — the same mechanism no
matter which upstream piece it's watching.

## S5 · OUTRO CARD

Routing gets a flagged event somewhere separate — activator is
what watches it and reacts. Next up: change data capture, streamed
— CDC, but arriving continuously.
