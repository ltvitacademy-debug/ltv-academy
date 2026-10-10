# Lesson 6 — Combining Patterns in One Landscape

**Chapter 1 · Enterprise Integration Case Studies · Lesson 6 of 20**

## What you'll learn

- Why a real integration landscape is never just one pattern from Lessons 1-5, but several running at once
- The difference between point-to-point integration and a middleware hub, and why the choice compounds over time
- How to sequence multiple integration initiatives so earlier decisions don't box in later ones
- Why a single shared event backbone reduces the coupling that accumulates as integrations multiply

## Doverfield's landscape, all at once

Lessons 1 through 5 looked at Doverfield's ERP, data warehouse, identity provider, customer portal, and external carrier API one at a time. In reality, all five exist simultaneously, built by different teams at different times, and none of them were designed with the other four in mind. That's the normal starting condition for this kind of architecture work: the job isn't choosing one pattern, it's rationalizing five patterns that already half-exist into something coherent.

## Point-to-point vs. a middleware hub

Doverfield's ERP integration (Lesson 1) was originally built as a direct, point-to-point connection: Apex callouts straight from Salesforce to the ERP's API, and a separate scheduled job calling straight back the other way. Each new integration since then added its own direct connection — Salesforce to the warehouse, Salesforce to the carrier API, each wired independently. This is **point-to-point integration**, and it has a real cost that doesn't show up on day one: every new system that needs to talk to Salesforce needs its own bespoke connection, and every change to one endpoint risks breaking every other connection built against assumptions about how it used to behave. The number of point-to-point connections grows roughly with the square of the number of systems involved, not linearly.

The alternative is a **middleware hub** (an integration platform like MuleSoft Anypoint, sitting between Salesforce and everything else): each system connects once, to the hub, and the hub handles translation, routing, and orchestration between them. Doverfield doesn't need to rip out its existing point-to-point connections overnight to get value from this — the realistic move is routing new integrations through the hub going forward, while migrating the highest-maintenance existing connections (the ERP sync, which already has the most failure history) onto it over time.

## Sequencing matters as much as the pattern itself

Doverfield's five integrations weren't built in a vacuum, and the order they were built in shaped what's possible now. The identity provider integration (Lesson 3) was built first and didn't anticipate that the customer portal (Lesson 4) would need its own, separate external-identity model — a decision that, in hindsight, should have been made alongside the employee SSO work rather than as an afterthought, since both touch "who is allowed to authenticate as what kind of user." A real architecture review has to look backward at sequencing, not just forward at the next integration: what got built first, what assumptions it baked in, and which of those assumptions the next initiative now has to work around rather than build cleanly from scratch.

## One event backbone instead of five bespoke listeners

Doverfield's ERP order-creation flow (Lesson 1) and its warehouse CDC subscriber (Lesson 2) are both, underneath, systems reacting to Salesforce events — but they were built as two separate, unrelated event consumers, each with its own subscription logic. A more coherent design treats **Platform Events and Change Data Capture as one shared event backbone**: a single place where "this Opportunity closed" or "this Account changed" gets published once, and any number of subscribers — the ERP order creator, the warehouse sync, a future notification system — listen to that same stream independently, rather than each building its own bespoke trigger-and-callout pipeline. This is the same decoupling principle from Lesson 1's event-driven pattern, just applied landscape-wide instead of integration-by-integration.

## Key terms

| Term | Meaning |
|---|---|
| Point-to-point integration | A direct, bespoke connection between two specific systems, with no shared intermediary |
| Middleware hub | An integration platform that each system connects to once, handling routing and translation between all of them |
| Integration debt | The accumulated maintenance cost of many independently-built, uncoordinated integrations |
| Event backbone | A shared event stream (Platform Events/CDC) that multiple subscribers can independently listen to, rather than each building its own pipeline |

## Lab

Doverfield is about to add a sixth integration: a marketing automation platform that needs to know whenever an Account's industry or employee-count field changes. Decide: (1) should this be built as a sixth point-to-point connection, routed through a new middleware hub connection, or subscribed to the existing event backbone from Lesson 2 — and justify your choice against the other two options, not just in isolation.

## Check yourself

Can you explain, without looking back, why point-to-point connections get disproportionately expensive as the number of integrated systems grows? Can you describe what it means to treat Platform Events and CDC as "one shared event backbone" rather than separate point solutions?
