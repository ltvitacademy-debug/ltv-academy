# Lesson 21 — Case Study: A Real-Time Fraud Detection System · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Case study: a real-time fraud detection system — where batch was
never actually an option.

## S2 · CODE CARD (streaming only)

A transaction has to be scored before it completes, not after, so
there's no sensible batch path. One always-running Kappa pipeline,
with a tight latency budget and a system that has to stay available
under load.

## S3 · CODE CARD (idempotent scoring)

Delivery guarantees matter here: a duplicated event could score a
transaction twice, or flag a duplicate as new fraud. Every scoring
write is keyed on transaction_id and merged, so scoring twice is a
no-op, not a second signal.

## S4 · CODE CARD (leaning AP on purpose)

During a partition, this system favors availability — refusing to
score because a feature might be a few seconds stale just blocks
legitimate purchases. It scores against slightly stale rolling
features rather than erroring out.

## S5 · OUTRO CARD

Eventstream ingests, rolling features get computed with watermarks
for late data, and Activator turns a crossed threshold into a real
alert. Next up: a retail inventory data platform.
