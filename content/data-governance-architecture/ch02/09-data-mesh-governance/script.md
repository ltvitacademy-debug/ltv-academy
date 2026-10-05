# Lesson 9 — Data Mesh Governance · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Data mesh is next — and unlike the last two models, this is a specific, named architectural approach, not a generic label for "distributed."

## S2 · STEPS — A named, specific pattern

Data mesh comes from Zhamak Dehghani, starting with a 2019 article and developed fully in her 2022 book. It's built on four stated principles, and today's governance model is one of those four, not something separate layered on top.

## S3 · STEPS — The four principles

The four principles: domain-oriented ownership, where each domain owns and architects its own data. Data as a product, which Lesson 10 covers in depth. A self-serve platform providing shared infrastructure. And federated computational governance — this lesson's focus.

## S4 · STEPS — More specific than Lesson 7

Federated computational governance is more specific than the generic federated model from Lesson 7 in two ways. Who governs: a federation of the domains themselves, plus the platform team, not a separate central authority. And how it's enforced: computationally — rules embedded as automated checks in the platform.

## S5 · CODE — The architecture, drawn out

Drawn out: each domain's data product feeds into a shared self-serve platform, which automatically enforces the rules the governance federation agreed on — rules set by domain representatives and the platform team together.

## S6 · OUTRO

Next lesson goes deep on the second principle specifically: data as a product, and exactly what governance attaches to at that product boundary.
