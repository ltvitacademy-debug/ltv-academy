# Lesson 50 — Data Contracts · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Data contracts — making an unannounced breaking change a
violation, not just a surprise.

## S2 · CODE CARD (what a contract specifies)

A contract specifies more than structure. Semantics — what a field
actually means. And SLAs — how fresh, how reliable. The parts of
an agreement a schema alone can't capture.

## S3 · CODE CARD (enforcing it in CI)

A contract that's only a wiki document gets stale the moment
someone forgets. Wiring it into CI turns it into a promise the
pipeline itself can't break without a visible, blocked failure.

## S4 · STEPS CARD (vs. schema tests)

A schema test checks a pipeline's output against what it's
supposed to produce. A data contract is the thing that defines
what supposed to even means, agreed by both sides ahead of time.

## S5 · OUTRO CARD

Explicit, versioned, enforced. Next up: schema drift and breaking
changes — what happens when a contract actually has to change.
