# Lesson 26 — Deliverables: Implementation Roadmap

**Chapter 5 · Deliverables · Lesson 26 of 33**

## What you'll learn

- How to sequence LTV Global's entire build into a single implementation roadmap
- Why the roadmap's phases follow dependency order, not the order chapters were taught in this course
- How Lesson 20's migration waves integrate into the broader roadmap rather than standing alone
- Why a roadmap without explicit dependencies is just a wish-dated list

## A roadmap is sequencing, not a summary

An **implementation roadmap** answers one specific question a client always asks: in what order does this actually get built, and what has to finish before what else can start? It is not a restatement of this course's chapters — this course taught application architecture before integration architecture for pedagogical reasons, but that's not necessarily the build order a real engagement would follow, since some foundational work (environment setup, core data model) has to exist before business-unit-specific features can be built on top of it, regardless of which order a course happened to teach the underlying concepts.

## LTV Global's roadmap phases

- **Phase 0 — Foundations.** Environment and DevOps setup (Lesson 18), core shared data model build (Lesson 9's shared objects), and the identity/SSO configuration (Lesson 12) — all of this has to exist before any business-unit feature work can be built or tested against it.
- **Phase 1 — Core platform build.** Security and sharing model (Lesson 11), the integration hub's foundational connections to Meridian and LedgerPoint (Lessons 13-14), and the first business-unit objects (Equipment Asset, initial Opportunity configuration).
- **Phase 2 — Business-unit rollout and EMEA migration wave.** Field Service and Service Cloud configuration, paired with EMEA's Wave 1 migration and EuroCRM parallel-run (Lesson 20) — sequenced together because EMEA's go-live depends on Service Cloud actually being built first, not on an arbitrary calendar date.
- **Phase 3 — Parts & Aftermarket and Dealer Portal.** The highest-volume business unit and its Experience Cloud site (Lesson 16), including the LDV strategy (Lesson 10) and parts-pricing API integration (Lesson 15) — deliberately sequenced after Phase 2's integration hub is already proven in production with real EMEA traffic, not as the very first thing built.
- **Phase 4 — Equipment Financing, Customer Portal, and remaining migration waves.** The most regulated business unit, the consumer-facing portal, and North America's and APAC's migration waves (Lesson 20), closing out the full rollout.

## Why dependency order matters more than teaching order

Phase 3 (Parts & Aftermarket, the highest-volume, highest-stakes business unit for performance) deliberately comes after Phase 2, not first, even though Lesson 3 named Parts & Aftermarket's VP as the most performance-sensitive stakeholder. The reasoning is dependency, not priority: the integration hub needs to be proven against real production traffic from a lower-risk business unit before it carries the highest-volume unit's load, and the LDV strategy from Lesson 10 is far safer to validate against a smaller business unit's actual production behavior first. A roadmap driven by "whoever is loudest goes first" instead of genuine dependency produces exactly the kind of fragile sequencing a Chapter 6 board member would catch immediately.

## Connecting the roadmap to the migration waves

Lesson 20's three migration waves aren't a separate project running in parallel to this roadmap — they're embedded inside it, at the phase where each wave's prerequisite platform capability is actually ready. EMEA's wave can't start until Service Cloud exists to receive EuroCRM's migrated data; APAC's wave, being the lightest-footprint rollout, slots in at the end specifically because it benefits most from everything already proven in earlier phases.

## Key terms

| Term | Meaning |
|---|---|
| Implementation roadmap | A sequenced build plan showing what has to finish before what else can start |
| Dependency order | Sequencing driven by what each piece of work actually requires to exist first, not by priority or convenience |
| Phase | A grouped, ordered stage of the roadmap, defined by its prerequisites being satisfied |

## Lab

A stakeholder asks why Equipment Financing — a genuinely important business unit — is scheduled in the last phase rather than earlier. Using this lesson's dependency-order reasoning (not "it's just less important"), write three or four sentences justifying the sequencing, referencing what Equipment Financing's build actually depends on from earlier phases.

## Check yourself

Can you name LTV Global's five roadmap phases in order and state, for each, the one dependency that justifies its position? Can you explain why Parts & Aftermarket — the highest-volume, most performance-sensitive business unit — is deliberately not built first, even though its stakeholder is the most vocal about performance?
