# Lesson 51 — Schema Drift and Breaking Changes · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Schema drift and breaking changes — not every change to a contract
is actually breaking.

## S2 · CODE CARD (not every change is breaking)

Adding a new optional field is safe — a consumer reading specific
fields is unaffected by one it never asked for. Renaming or
changing the type of a field a consumer already relies on is
breaking, no matter how small it looks.

## S3 · CODE CARD (versioning instead of editing in place)

A breaking change gets a new contract version, published alongside
the old one, rather than edited in place. The old field stays
deprecated but present during the transition.

## S4 · STEPS CARD (the deprecation window)

Week one, both old and new fields are emitted. Consumers migrate
over the following weeks at their own pace. Only then does the old
field actually get removed.

## S5 · OUTRO CARD

Announced and staged, not silently substituted — exactly what
prevents the surprise lesson 39's drift detection exists to catch.
Next up: observability — logs, metrics, and traces.
