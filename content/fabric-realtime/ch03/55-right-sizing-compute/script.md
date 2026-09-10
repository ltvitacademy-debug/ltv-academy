# Lesson 55 — Right-Sizing Compute · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Right-sizing compute — two symmetric mistakes, and how to avoid
both.

## S2 · CODE CARD (two mistakes, same root cause)

An oversized capacity wastes budget on headroom nobody uses. An
undersized one bursts and throttles constantly. Both come from
sizing off a one-time guess instead of measured behavior.

## S3 · CODE CARD (reading bursting as a signal)

Bursting once during an unusual spike is normal. Bursting every
single day at the same hour means the baseline itself has actually
outgrown the SKU.

## S4 · STEPS CARD (sizing by evidence)

Start with a reasonably conservative SKU. Watch utilization for a
few weeks. Adjust based on real evidence, then repeat the
observation period — this never fully settles, it just gets
rechecked.

## S5 · OUTRO CARD

Evidence over guesswork, revisited over time. Next up: SLAs and
SLOs — turning good enough into a real number.
