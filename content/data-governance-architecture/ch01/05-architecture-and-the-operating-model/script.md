# Lesson 5 — Architecture and the Operating Model · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

We've covered principles, patterns, and a capability map. This lesson closes Chapter 1 by connecting them to the operating model — and opens the door into Chapter 2.

## S2 · STEPS — The model constrains the build

Foundations covered the operating model as an org question: who holds authority, and where. Architecture implements that decision. Once a model is chosen, it rules out some reference-architecture patterns and strongly favors others.

## S3 · STEPS — Three real pairings

Three real pairings. Centralized governance pairs with hub-and-spoke — one team, one hub, every platform feeding in directly. Federated pairs with catalog-of-catalogs — a shared index while domains keep local authority. Data mesh pairs with a mesh of catalogs — no center at all, just shared standards.

## S4 · STEPS — The one that isn't a pattern

Decentralized governance is different. It typically has no shared architecture at all — each team chose its own tools independently. That's not a fourth legitimate pattern. It's usually the default when nobody architects anything deliberately, and it recreates exactly the inconsistent-definitions problem governance exists to prevent.

## S5 · CODE — The pairing, at a glance

At a glance: centralized maps to hub-and-spoke, federated to catalog-of-catalogs, data mesh to mesh-of-catalogs, and decentralized to no shared pattern at all. Carry this into Chapter 2.

## S6 · OUTRO

Chapter 2 revisits each of these operating models architecturally — starting with centralized governance, and what its hub-and-spoke system actually looks like when it's built.
