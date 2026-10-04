# Lesson 11 — Centralized, Decentralized and Federated Governance

**Chapter 2 · Frameworks and Models · Lesson 11 of 30**

## What you'll learn

- The three major operating model types in detail: centralized, decentralized, federated
- The specific tradeoffs of each — consistency versus local responsiveness
- Why federated has become the most commonly recommended default for mid-size and large organizations
- Concrete signals that tell you which model an organization is actually running

## Centralized governance

In a **centralized** model, one central team owns governance decisions for the entire organization: policy, standards, and enforcement all flow from a single group. **Strength:** maximum consistency — one definition of "customer," enforced everywhere, with no room for drift between departments. **Weakness:** it doesn't scale well past a certain size or diversity of business units — a central team can become a bottleneck, and it often lacks the deep context local business units have about their own data. This model fits small, single-business-line organizations well, and struggles as the organization diversifies.

## Decentralized governance

In a **decentralized** model, each business unit or department governs its own data independently, with no central coordinating authority. **Strength:** speed and deep local context — the team closest to a dataset defines and manages it, with no waiting on a central group that may not understand their specific business. **Weakness:** this is exactly how the conflicting-definitions problem from Lesson 1 happens — without any central coordination, there's nothing forcing "active customer" to mean the same thing in two different departments. This model tends to emerge by default (not by deliberate design) in organizations that never built governance deliberately in the first place.

## Federated governance

A **federated** model splits the difference deliberately: a central governance body sets organization-wide standards, shared definitions for the data that genuinely needs to be consistent everywhere, and the overall policy framework — while individual business units retain authority over their own, local data decisions within that shared framework. **Strength:** it gets real consistency where consistency actually matters (shared metrics, regulated data, anything crossing business-unit lines) while preserving the speed and local context decentralized teams need for everything else. **Weakness:** it's the hardest model to design and run well — it requires a genuinely clear, well-maintained line between "this is centrally governed" and "this is locally governed," and that line has to be actively maintained as the organization changes.

## Why federated has become the common default recommendation

For mid-size and large organizations with more than one meaningfully distinct business unit, federated governance is the most commonly recommended starting point in current industry guidance — not because it's easiest (it isn't), but because pure centralized models don't scale past a certain size, and pure decentralized models reliably recreate the exact problems governance exists to solve. Federated isn't automatically right for every organization, though: Lesson 12 covers how to actually choose, rather than defaulting to federated by habit.

## Signals that tell you which model is actually running

Ask: when two departments disagree about a data definition, is there a single body with actual authority to resolve it (centralized or federated) or does the disagreement just persist (decentralized)? Do shared, cross-cutting metrics have one enforced definition (centralized/federated) or does each department compute them its own way (decentralized)? The answers tell you what's actually happening — which is often different from what an org chart or policy document claims.

## Key terms

| Term | Meaning |
|---|---|
| Centralized governance | One central team owns all governance decisions |
| Decentralized governance | Each business unit governs its own data independently, with no central authority |
| Federated governance | Central body governs shared/cross-cutting data; business units govern their own local data |

## Lab

For your own organization (or one you know), identify which of the three models is actually running today — using the "signals" test above, not the official org chart. Write two or three sentences explaining your evidence.

## Check yourself

Can you state the core strength and weakness of all three models, and explain in one sentence why federated has become the common default recommendation for larger, multi-business-unit organizations?
