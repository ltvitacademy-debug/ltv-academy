# Lesson 21 — Drift and Performance Monitoring · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Last lesson's "output distribution" signal has a cause: drift. This lesson covers the three different ways a model actually stops matching reality.

## S2 · STEPS — Three ways a model stops matching reality

Data drift is when the input data's statistical shape shifts since training — a fraud model seeing transaction patterns that just look different now. Concept drift is when the relationship between inputs and the correct answer itself changes. Label delay is when the true outcome isn't even knowable yet, so real performance monitoring runs on a built-in lag.

## S3 · STEPS — Why performance alone isn't enough

If you only monitor against ground-truth labels, label delay means you find out a model degraded only after it's already been wrong for months. Data drift gives an earlier warning — you can detect the inputs shifted today, long before the outcomes needed to measure accuracy are even available.

## S4 · CODE — A real technique: PSI

Population Stability Index is a real, commonly used measure: it compares a baseline distribution to a current one and produces a single number. The common rule of thumb — under 0.1 is no significant shift, 0.1 to 0.2 is worth investigating, above 0.2 means retrain or review.

## S5 · STEPS — What happens once drift is confirmed

Detecting drift is a trigger, not a finish line. Investigate first to confirm it's real. Retrain if the underlying relationship still holds. Roll back or pause if the relationship has fundamentally changed, since a retrain won't fix concept drift. And document the whole response in the model's version history.

## S6 · OUTRO

Next lesson: when something actually goes wrong with a live model, what's the actual response process? That's incident response for AI.
