# Lesson 9 — Data Mesh Governance

**Chapter 2 · Operating Models · Lesson 9 of 30**

## What you'll learn

- Where data mesh comes from, and the four principles it's actually built on
- What "federated computational governance" means specifically, and how it differs from the generic federated model in Lesson 7
- The architecture components a data mesh needs beyond a shared schema: domains, data products, and a self-serve platform
- Why mesh's governance model is federation plus automation, not federation alone

## Where this pattern comes from

Data mesh is a real, named architectural approach, first described by Zhamak Dehghani in a 2019 article and developed fully in her 2022 book *Data Mesh: Delivering Data-Driven Value at Scale* (O'Reilly). It isn't a generic synonym for "distributed governance" — it's a specific architecture built on four stated principles, and the governance model this lesson focuses on, federated computational governance, is one of those four, not a separate idea layered on top.

## The four principles

1. **Domain-oriented decentralized data ownership and architecture.** Each business domain owns and architects its own data, with its own team responsible for it — the same decentralization of responsibility Lesson 8 covered, but deliberate rather than accidental.
2. **Data as a product.** Each domain treats the data it produces as a product with real consumers: discoverable, addressable, trustworthy, and documented, with a defined interface other domains can actually build on. Lesson 10 goes deep on this principle specifically.
3. **Self-serve data infrastructure as a platform.** A shared, domain-agnostic platform provides the common infrastructure — provisioning, storage, pipelines, access-control primitives — so each domain team can build and serve its own data products without rebuilding infrastructure from scratch.
4. **Federated computational governance.** A federation of domain representatives (plus the platform team) agrees on the global rules that have to hold across every domain — interoperability standards, global security and access policies, data product documentation requirements — and those rules get embedded as automated guardrails in the self-serve platform, not enforced through manual review.

## Why "federated computational governance" is more specific than Lesson 7's federated model

Lesson 7's generic federated governance already splits authority between a central body and domain teams. Data mesh's version adds two specific things on top of that split: who sits on the governing body, and how the rules actually get enforced.

- **Who governs:** not a separate central team sitting above the domains, but a federation *of* domain representatives themselves, together with the platform team — governance is something domains do together, not something imposed on them from outside.
- **How it's enforced — the "computational" part:** the agreed-upon global rules are built directly into the self-serve platform as automated checks, so a domain publishing a new data product that violates a global standard (say, a required access-control tag) gets blocked or flagged automatically by the platform, rather than caught later by a reviewer.

## What this architecture needs, beyond a shared schema

A data mesh needs all three things Lesson 7's federated model needs (a shared schema, a way to discover domain-owned data, and a policy split) — plus a self-serve platform substantial enough to actually embed governance computationally, and clearly defined data-product interfaces (Lesson 10) for the platform to check against. This is why data mesh is the most architecturally demanding of the four models in this chapter: it requires real platform engineering investment before the governance model can function at all, not just an organizational agreement to split authority.

## Key terms

| Term | Meaning |
|---|---|
| Data mesh | The domain-oriented, product-based distributed data architecture described by Zhamak Dehghani |
| Federated computational governance | A federation of domain representatives and the platform team who agree on global rules, enforced automatically by the self-serve platform |
| Self-serve data infrastructure platform | The shared, domain-agnostic platform providing common infrastructure so domains can build their own data products |

## Lab

For an organization you know that's considered or adopted data mesh (or just distributed domain ownership), identify whether its governance rules are actually enforced computationally (built into shared platform tooling) or still rely on manual review. What would it take to move one specific rule from manual to computational?

## Check yourself

Can you name data mesh's four principles and its originator, and explain in one sentence what makes "federated computational governance" different from the generic federated model in Lesson 7?
