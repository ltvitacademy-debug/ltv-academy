# Lesson 2 — Architecture Principles for Governance · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Architecture decisions get easier and more consistent when they're checked against a written set of principles instead of re-argued from scratch every time. That matters especially in governance, where decisions get revisited constantly.

## S2 · STEPS — The standard shape

A usable principle has four parts: a name you can refer to in a sentence, a statement of the actual rule, a rationale for why it exists, and the implications of actually following it.

## S3 · STEPS — Core principles, part one

Three core principles to start with: data as a shared asset, not trapped in the system that produced it. A single source of truth — one authoritative definition per concept. And separation of concerns — metadata, policy, and storage stay independently changeable.

## S4 · STEPS — Core principles, part two

Two more: automate enforcement, because a rule that depends on someone remembering will eventually be broken at scale. And design for loose coupling — connect systems through defined interfaces, which is what makes federated and mesh-style models technically possible at all.

## S5 · CODE — One principle, written out in full

Here's one principle written in the full shape. Name: Automate Enforcement. Statement: checkable rules must be enforced by a running system. Rationale: manual enforcement doesn't scale. Implications: new policies must be expressible as code, or flagged as a known gap.

## S6 · OUTRO

Next lesson: reference architectures — the reusable patterns organizations build from principles like these.
