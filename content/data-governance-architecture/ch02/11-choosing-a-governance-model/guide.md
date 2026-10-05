# Lesson 11 — Choosing a Governance Model

**Chapter 2 · Operating Models · Lesson 11 of 30**

## What you'll learn

- An architectural decision framework for choosing a governance model, building on Foundations Lesson 12's organizational one
- Five factors that determine which model and reference-architecture pattern actually fits, beyond "how many business units"
- A worked example applying the framework to a realistic multi-domain organization
- How this closes Chapter 2 and sets up Chapter 3's deep dive into metadata and catalog architecture

## Building on Foundations' framework, architecturally

Data Governance Foundations Lesson 12 gave a five-question organizational framework for choosing an operating model: how many distinct business units, how much cross-cutting data, current maturity, executive sponsorship, and speed needs. That framework still applies and this lesson doesn't repeat it. What it adds is the architectural layer on top: once you have a sense of which operating model fits organizationally, these five factors determine which reference-architecture pattern and which specific model — centralized, federated, decentralized, or data mesh — you can actually build, not just which one sounds right on paper.

## Five architectural factors

1. **What does the capability map (Lesson 4) already show?** An organization with strong metadata management but weak lineage shouldn't rebuild what's already working — the gap, not the whole architecture, usually drives the next investment.
2. **Which pattern does the current operating model already imply (Lesson 5)?** Centralized pairs with hub-and-spoke, federated with catalog-of-catalogs, mesh with mesh-of-catalogs. Starting from the implied pattern is faster than designing from scratch, even if it later needs adjusting.
3. **How much platform-engineering investment can actually be funded?** Centralized and federated architectures can run on comparatively modest platform investment. Data mesh specifically requires a real, funded self-serve platform (Lesson 9) before its computational governance can function at all — choosing mesh without that investment produces decentralization with mesh vocabulary, not actual mesh.
4. **How many genuinely distinct domains are there, and how much of their data is cross-cutting?** Few domains, mostly cross-cutting data, leans centralized. Several domains, a narrow cross-cutting slice, leans federated. Many domains each capable of running real product discipline independently leans toward mesh — but only with factor 3 satisfied.
5. **Is data-product discipline (Lesson 10) realistic to adopt now, or does it need staging?** An organization whose datasets don't yet meet the basic data-product characteristics isn't ready for mesh's governance model yet, regardless of how many domains it has — that discipline has to come first, or alongside a staged rollout.

## A worked example

Picture a mid-size insurance company with three domains: claims, underwriting, and marketing. Claims and underwriting both touch regulated customer and policy data that has to stay consistent for compliance reporting — a real cross-cutting need. Marketing's data is largely independent of the other two. The capability map shows decent metadata management already in place, but weak lineage and no shared schema today. There's no budget yet for a full self-serve data platform. The factors point toward federated governance, scoped narrowly: a shared schema and catalog-of-catalogs covering claims and underwriting's regulated data specifically, with marketing left running its own, separately governed architecture for now. Data mesh stays a future option, revisited once platform investment and data-product discipline are both in place — not a default reached for because it sounds more advanced.

## Closing Chapter 2

Chapter 2 has now covered all four operating models architecturally — centralized, federated, decentralized, and data mesh — plus the data-product principle that underlies mesh's second pillar, and this framework for choosing between them. Chapter 3 moves into the capability this chapter leaned on repeatedly without building out in full: metadata and catalog architecture itself, starting with how an enterprise metadata layer is actually designed.

## Key terms

| Term | Meaning |
|---|---|
| Architectural decision framework | The five factors (beyond Foundations' organizational ones) that determine which pattern an organization can actually build |
| Platform investment | The funded engineering work required to build a self-serve platform substantial enough for computational governance |
| Staged data-product adoption | Bringing datasets up to data-product characteristics before or alongside adopting a product-based governance model |

## Lab

Apply this lesson's five factors to an organization you know (you can reuse the one from Foundations Lesson 12's lab). State which reference-architecture pattern and model the factors point to, and whether that matches what Lesson 5's "signals" would say is actually running today.

## Check yourself

Can you list this lesson's five architectural factors, and explain in one sentence why choosing data mesh without funding its self-serve platform produces decentralization with mesh vocabulary, not real mesh?
