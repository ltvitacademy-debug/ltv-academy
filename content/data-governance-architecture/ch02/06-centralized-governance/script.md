# Lesson 6 — Centralized Governance · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Chapter 2 revisits the operating models, architecturally. First up: centralized governance — not the org chart version, but the system.

## S2 · STEPS — Beyond the org chart

Foundations Lesson 11 covered centralized governance as an org question — one central team, maximum consistency, a potential bottleneck. This lesson asks: what system actually gets built to make that decision real?

## S3 · STEPS — Three required components

Three components, every time. A single enterprise metadata hub, where every platform's metadata lands. A single policy engine, applying one rule set everywhere. And a single access-provisioning queue — every request through the same team.

## S4 · STEPS — Strength and risk, same cause

The consistency and the bottleneck come from the same cause. There's no drift to reconcile, because there's only one copy of the policy and the schema. But there's also no way to parallelize, because every request passes through the exact same single path.

## S5 · CODE — The architecture, drawn out

Drawn out: every platform feeds into one hub and one policy engine, which feeds into one access-provisioning queue. That single path is both the architecture's strength and its ceiling.

## S6 · OUTRO

Next lesson: federated governance — the pattern that deliberately splits that single path into a shared core and local authority.
