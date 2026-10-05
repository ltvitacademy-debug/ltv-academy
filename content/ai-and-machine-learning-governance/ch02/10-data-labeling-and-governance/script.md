# Lesson 10 — Data Labeling and Governance · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Supervised learning depends on labels — the correct answers a model learns to predict. This lesson covers labeling as its own governed activity.

## S2 · STEPS — What labeling is

A model is shown examples paired with a label — a photo tagged "stop sign," a ticket tagged "billing issue" — and learns to predict that label for new cases. The model trusts these as ground truth. Wrong, inconsistent, or biased labels become exactly what the model inherits.

## S3 · STEPS — Where human judgment enters

Labeling is usually where the most direct human judgment happens. Two labelers can reasonably disagree about whether something is toxic, or fraudulent — and whichever judgment gets recorded becomes the model's objective truth for that example. That's the label bias from the previous lesson, concretely.

## S4 · STEPS — Governance concerns

Inter-rater agreement — how often labelers agree with each other, and what low agreement signals. Labeling instructions as a governed document — they function like policy, determining what the model learns as true. Who's doing the labeling — in-house, vendor, or crowdsourced, each with its own questions.

## S5 · STEPS — What to check before trusting it

Are the labeling instructions documented? Was agreement between labelers ever measured? Can a specific label be traced back to who or what produced it, and under which instructions? Without all three, a "labeled" dataset is really an unverified one.

## S6 · OUTRO

Next lesson: synthetic data — what changes, and what doesn't, when the training data isn't about real people at all.
