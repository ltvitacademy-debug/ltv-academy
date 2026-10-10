# Lesson 17 — Solution Architecture

**Chapter 4 · Delivery Domains · Lesson 17 of 19**

## What you'll learn

- Why solution architecture is a cross-cutting practice rather than a sixth domain alongside the other five
- How a solution architect balances trade-offs across data, integration, identity, security, and delivery for one specific solution
- A worked example showing all five domains pulling in different directions on the same decision
- Why the "best" domain-specific answer isn't always the right answer for the solution as a whole

## Not a sixth domain — the practice of weighing the other five together

Lesson 4 flagged this early: solution architecture isn't a parallel domain sitting next to data, integration, identity, security, and delivery. It's the discipline of taking a specific business solution and finding the design that balances all five of those domains together, rather than optimizing any single one in isolation. A data architect optimizing purely for data architecture might choose the cleanest possible object model. A security architect optimizing purely for security might choose the most restrictive possible access model. Both choices could be individually excellent and still combine into a solution that's slow to build, hard to use, or doesn't actually fit the business's real constraints. Solution architecture is the job of finding the design that's genuinely good across all five dimensions at once, even if it isn't the single best possible answer in any one of them alone.

## A worked example: one decision, five domains pulling differently

Imagine a business wants external distributors to submit orders directly into Salesforce. Walk the same decision through each domain's native instinct:

- **Data architecture**, optimizing alone, might want a dedicated Distributor Order object cleanly separated from internal Opportunities, with its own tailored fields — the cleanest possible model for this one use case.
- **Integration architecture**, optimizing alone, might prefer the distributors' existing order system push data in via a scheduled batch sync, minimizing real-time dependency and build complexity.
- **Identity and access management**, optimizing alone, might prefer issuing each distributor their own named Salesforce user with full login access, since that's the most flexible, fully-featured way to interact with the platform.
- **Security and sharing**, optimizing alone, might prefer the most restrictive possible setup: a separate, heavily sandboxed integration path that never lets distributor-originated data touch the core Opportunity object directly, minimizing any chance of distributor error cascading into core sales data.
- **Development lifecycle and deployment**, optimizing alone, might prefer deferring this entirely until a full sandbox testing cycle and staged rollout plan exists, prioritizing safety over speed.

Every one of those five answers is individually defensible. They don't combine automatically into one coherent solution — named distributor logins (identity's preference) might conflict with the heavily sandboxed isolation security wants; a clean dedicated object (data's preference) might not play well with a scheduled batch sync if the business actually needs near-real-time order visibility; and a fully deferred rollout (delivery's preference) might not survive contact with a sponsor who has a hard external commitment. Solution architecture is the job of actually resolving those five instincts into one real, buildable design — likely landing somewhere like: a dedicated lightweight object for distributor orders, fed via a moderate-frequency batch sync rather than real time, accessed through a tightly scoped Experience Cloud or API-only integration user rather than full named logins, with a phased rollout starting with one pilot distributor before a full launch.

## Why the "best" domain answer isn't always the right answer

This is the central lesson: a solution architect's job is not to find the best data architecture, the best security posture, and the best integration pattern independently and staple them together. It's to find the combination that's good enough across every domain while being genuinely buildable, secure, and usable as one coherent whole — which sometimes means every individual domain gives up a little of its own ideal outcome in exchange for a design that actually works end to end. This is Lesson 5's trade-off habit and Lesson 4's cross-domain principle, now applied at the level of an entire solution rather than one isolated decision.

## Key terms

| Term | Meaning |
|---|---|
| Solution architecture | The cross-cutting practice of balancing trade-offs across all architecture domains for one specific solution |
| Domain-optimal answer | The best possible choice from a single domain's perspective in isolation |
| Solution-optimal answer | The design that balances all domains together, even if it isn't the single best answer in any one |

## Lab

Take the distributor-order scenario from this lesson, but change one fact: the business has a hard, already-committed deadline of four weeks from now. Re-walk the five domain instincts briefly, then write two or three sentences proposing a revised solution-level compromise that still resolves the domains together but now also respects that tighter deadline constraint — naming what gets given up to make the timeline work.

## Check yourself

Can you explain why solution architecture is described as a cross-cutting practice rather than a sixth domain? Can you walk through the distributor-order example and explain what each domain would prefer in isolation, and why those preferences don't automatically combine? Can you explain, in your own words, why the best domain-specific answer isn't always the right solution-level answer?
