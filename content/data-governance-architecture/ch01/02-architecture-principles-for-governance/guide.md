# Lesson 2 — Architecture Principles for Governance

**Chapter 1 · Governance Architecture Foundations · Lesson 2 of 30**

## What you'll learn

- The standard shape an architecture principle takes: name, statement, rationale, implications
- Five core principles that should guide almost any governance architecture design
- A worked example of one principle written out in full
- Why writing principles down matters more in governance architecture than almost anywhere else

## Why write principles down at all

Every architecture decision — which catalog to buy, whether to build one central policy engine or several, how tightly to couple two systems — gets easier and more consistent when it's checked against a small, written set of principles instead of re-argued from scratch each time. This is standard enterprise-architecture practice (TOGAF's architecture principles catalog is the most widely used template for this), and it matters more for governance specifically because governance architecture decisions get revisited constantly as the organization adds platforms, acquires companies, and changes operating models.

## The standard shape of a principle

A usable architecture principle isn't just a slogan. The common template — four parts — forces you to actually justify the principle rather than just asserting it:

- **Name.** A short label, so people can refer to it in a sentence.
- **Statement.** The actual rule, in one or two sentences.
- **Rationale.** Why this rule exists — what it protects against or enables.
- **Implications.** What has to be true, or has to change, for the organization to actually follow it.

## Five core principles for governance architecture

1. **Data as a shared asset.** Data belongs to the organization, not to the team that happens to produce it — architecture should make data discoverable and usable beyond its originating system, not trap it there.
2. **Single source of truth per concept.** Any given business concept (a customer, a product, a transaction status) should have exactly one authoritative definition and location that other systems reference, even if it's physically replicated.
3. **Separation of concerns.** The metadata layer, the policy layer, and the underlying data storage should be architecturally distinct — so a policy can change without touching storage, and storage can change without rewriting policy.
4. **Automate enforcement, don't rely on memory.** A rule that depends on a person remembering to apply it manually is a rule that will eventually be broken by accident, at scale. Architecture should turn rules into running controls wherever that's feasible.
5. **Design for loose coupling.** Platforms, catalogs, and policy engines should connect through defined interfaces, not tight, platform-specific integrations — so a platform can be swapped or added without rebuilding the whole architecture. This principle is what makes federated and mesh-style operating models (Chapter 2) technically possible at all.

## A worked example, in the full shape

**Name:** Automate Enforcement.
**Statement:** Governance rules that can be checked programmatically must be enforced by a running system, not left to manual review alone.
**Rationale:** Manual enforcement doesn't scale past a small number of people or a small number of rules, and silently degrades as the organization grows.
**Implications:** New policies need to be expressed in a form a system can actually check (Chapter 4 covers "policy as code" specifically); some policies that can't yet be automated should be flagged as a known gap, not quietly accepted as permanent.

## Key terms

| Term | Meaning |
|---|---|
| Architecture principle | A written rule, with a stated rationale and implications, used to guide design decisions consistently |
| Single source of truth | Exactly one authoritative definition and location for a given business concept |
| Separation of concerns | Keeping distinct architectural layers (metadata, policy, storage) independently changeable |
| Loose coupling | Connecting systems through defined interfaces rather than tight, platform-specific integration |

## Lab

Pick one of the five principles above. Write it out in the full four-part shape — name, statement, rationale, implications — for your own organization (or one you know), using a real example of where that principle is or isn't currently being followed.

## Check yourself

Can you name the four parts of the standard architecture-principle template, and state all five core governance-architecture principles from this lesson without looking back?
