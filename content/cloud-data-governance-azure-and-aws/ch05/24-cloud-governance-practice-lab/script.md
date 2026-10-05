# Lesson 24 — Cloud Governance Practice Lab · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

This lab doesn't need a live Azure or AWS subscription — just fifteen focused minutes and everything you've already learned. You're building a multi-cloud governance control map: one page, pairing every major control this course covered with its counterpart on the other cloud.

## S2 · STEPS CARD (the exercise, step 1)

This is a legitimate interview artifact — it shows you understand both clouds' native tools well enough to translate between them. Step one: pick a scenario, like Briarcliff from the last lesson, and write one sentence naming which cloud is primary, which is secondary, and why the secondary footprint exists.

## S3 · CODE CARD (step 2, identity)

Step two maps identity. Here's the real shape of a federated role trust, in AWS's own policy syntax — a role that trusts one specific account, gated by an External ID so only the intended trusted party can assume it. This is the same pattern behind Purview's AWS connector from two lessons ago.

## S4 · STEPS CARD (step 3)

Three more rows, same pattern. Storage governance — ADLS container ACLs against S3 bucket policies and Lake Formation. Cataloging — one Purview catalog with both sources registered. Policy enforcement — an Azure Policy initiative translated into an equivalent AWS service control policy.

## S5 · STEPS CARD (steps 4-5)

Step four adds a column most real control maps skip: who is responsible for keeping both sides in sync. "Unassigned" is an honest answer. Step five, the self-check: for each row, would the secondary cloud update automatically if the primary changed, or would someone have to remember by hand? Every "by hand" answer is a policy-drift risk.

## S6 · OUTRO CARD

Keep your finished control map — it's a real deliverable, not just an exercise. Next lesson closes out this course with a full review checklist pulling every chapter together.
