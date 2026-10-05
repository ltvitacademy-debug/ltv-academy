# Lesson 4 — Landing Zones and Data Governance · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

A landing zone is where governance starts before a single workload resource exists. This lesson covers both clouds' versions.

## S2 · STEPS — What a landing zone is

A landing zone is a pre-configured, pre-governed subscription or account a workload lands into — already wired with identity, networking, logging, and policy guardrails. The alternative, handing a team a blank subscription and trusting them to configure governance themselves, is how most sprawl actually happens. A landing zone makes governance the starting state, not something bolted on later.

## S3 · STEPS — Azure Landing Zones

Azure Landing Zones is Microsoft's reference architecture under the Cloud Adoption Framework. A Platform management group holds shared services — Management, Connectivity, and Identity subscriptions. New workload subscriptions land under the Landing Zones management group and inherit policy assignments, RBAC, and network connectivity automatically, with no per-subscription setup required.

## S4 · STEPS — AWS Control Tower

AWS's equivalent is Control Tower, built on AWS Organizations. It sets up a dedicated Audit account for centralized logging and a separate Log Archive account. Guardrails — both preventive and detective — apply automatically to every account. When a new account is needed, Control Tower's Account Factory provisions it pre-wired with those guardrails already active.

## S5 · OUTRO

Next lesson: keeping this governance consistent across dev, test, and prod — not just at the moment a landing zone is created.
