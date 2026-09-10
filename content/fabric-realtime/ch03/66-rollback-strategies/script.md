# Lesson 66 — Rollback Strategies · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Rollback strategies — two genuinely different things hiding
behind one word.

## S2 · CODE CARD (two different rollbacks)

A code rollback is simple — revert and redeploy through machinery
already built. A data rollback is harder — the bad code already
wrote real rows and showed real numbers before anyone noticed.

## S3 · CODE CARD (un-undoable side effects)

Rolling back code and even data still can't un-send an alert that
already reached someone, or un-make a decision a dispatcher
already acted on. That's exactly why mitigation matters as its own
step.

## S4 · STEPS CARD (rollback vs. forward fix)

Rollback is fast when the previous version was genuinely fine. A
forward fix is sometimes faster when the bug is small and well
understood. Choose whichever actually gets to correct sooner.

## S5 · OUTRO CARD

Rollback isn't automatically the safe default. Next up:
documentation that actually gets used — preventing the next
incident from being a mystery.
