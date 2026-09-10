# Lesson 5 — Choosing a Processing Model · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Choosing a processing model — batch, streaming, or hybrid, and the
one requirement that decides it.

## S2 · CODE CARD (streaming isn't better batch)

Streaming isn't just a better version of batch. It's fresher, but
genuinely more complex — windowing, watermarks, and production
practices exist because streaming makes things harder, not easier.

## S3 · CODE CARD (hybrid, a real answer)

Hybrid runs a fast streaming path for freshness alongside a
slower, thoroughly correct batch path for the historical record.
That's not indecision — it's matching each requirement to the
right tool.

## S4 · OUTRO CARD

Choosing streaming when batch would satisfy the requirement is
needless cost for no real benefit. Next up: the lambda
architecture — one standard shape a hybrid design takes.
