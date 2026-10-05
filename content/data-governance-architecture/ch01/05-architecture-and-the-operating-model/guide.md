# Lesson 5 — Architecture and the Operating Model

**Chapter 1 · Governance Architecture Foundations · Lesson 5 of 30**

## What you'll learn

- Why the operating model you choose constrains which reference architecture pattern actually fits
- How each operating model from Chapter 2 pairs with a reference architecture pattern from Lesson 3
- Why decentralized governance tends to produce no shared architecture at all — and why that's the risk, not a neutral choice
- How this closes Chapter 1 and sets up Chapter 2's deeper, architectural look at each model

## The operating model constrains the architecture

Data Governance Foundations Lessons 10 through 12 covered operating models as an organizational question: who holds decision authority, and where. Lesson 1 of this course made the point that governance architecture implements that decision rather than replacing it. This lesson makes the connection concrete: once an operating model is chosen, it doesn't just describe who's in charge — it rules out some of the reference-architecture patterns from Lesson 3 and strongly favors others. You cannot bolt a fully centralized hub-and-spoke architecture onto a genuinely federated operating model without undermining the autonomy that model is supposed to preserve, and you cannot run a true data mesh on top of a single central catalog that holds everyone's metadata directly.

## How each model pairs with a pattern

- **Centralized governance** (Lesson 6) pairs with **hub-and-spoke**: one team, one central catalog and policy engine, every platform feeding into it directly. The architecture mirrors the authority structure exactly.
- **Federated governance** (Lesson 7) pairs with **catalog-of-catalogs**: a central index and shared standards for what must be consistent, while domain catalogs retain real authority over their own detail — architecturally mirroring the split authority the model requires.
- **Data mesh governance** (Lesson 9) pairs with a **mesh of catalogs**: no central index at all, fully distributed domain ownership, discovery through shared standards and a self-serve platform rather than any central system.
- **Decentralized governance** (Lesson 8) typically pairs with *no shared reference architecture at all* — each team's catalog, if it has one, was chosen independently with no coordination. This isn't a fourth legitimate pattern; it's usually what happens by default when no one architects anything deliberately, and it's exactly why decentralized governance tends to recreate the inconsistent-definitions problem governance exists to prevent.

## Why this matters before Chapter 2

Chapter 2 revisits centralized, federated, decentralized, and data mesh governance — the same model types Foundations introduced — but from the architecture side: what each one actually looks like as a built system, what specifically breaks if the architecture doesn't match the model, and how data products (Lesson 10) and the final choice of a model (Lesson 11) fit into the picture. Carrying this lesson's pairings forward will make each of those lessons land as "the system that goes with this authority structure" rather than a repeat of Foundations' org-chart-level treatment.

## Key terms

| Term | Meaning |
|---|---|
| Model-architecture pairing | The reference-architecture pattern that structurally matches a given operating model's authority split |
| Architectural mismatch | Running a reference-architecture pattern that contradicts the chosen operating model's authority structure |
| Default architecture | An unplanned, inconsistent architecture that emerges when no model is deliberately chosen |

## Lab

For an organization you know (or used in Lesson 3's lab), state which operating model it's actually running (using Foundations Lesson 11's "signals" test) and which reference-architecture pattern its catalog setup actually resembles. Do they match? If not, name the specific friction that mismatch is likely causing.

## Check yourself

Can you state, from memory, which reference-architecture pattern pairs with each of centralized, federated, and data-mesh governance — and explain why decentralized governance typically has no shared pattern at all?
