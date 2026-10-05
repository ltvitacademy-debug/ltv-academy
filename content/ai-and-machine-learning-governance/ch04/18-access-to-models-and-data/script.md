# Lesson 18 — Access to Models and Data · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

"Who has access to the fraud model" sounds like a one-answer question. It isn't. This lesson breaks down why.

## S2 · STEPS — More surfaces than people assume

There are really four access surfaces under one model's name: the training data it learned from, the model weights themselves, the registry entry and documentation, and the live inference endpoint most people actually touch. Treating these as one access point means either over-granting or under-granting — never real governance.

## S3 · STEPS — Least privilege, per surface

Applied here: a customer-facing app calling for predictions needs inference access only. A data scientist retraining needs data and registry write access, not production credentials. A risk reviewer needs read access to documentation and results, not the raw training data. Each role gets exactly what it needs — nothing shared by default.

## S4 · STEPS — Why the distinction matters

Here's a real shape of mistake: a dashboard built to explain model decisions gets wired up with a service account that already has full training-data access, because it was convenient. Now every business user with dashboard access can, in principle, pull raw regulated data through a feature that was only ever meant to explain predictions.

## S5 · STEPS — What to log and review

Granting access isn't the finish line. Log every access to training data and weights, not just inference calls. Review permissions on a cadence tied to the model's risk tier. And revoke access the moment a role changes, not only when someone leaves entirely.

## S6 · OUTRO

Next lesson: generative AI adds a surface none of this covers yet — the prompt itself. That's prompt and output governance.
