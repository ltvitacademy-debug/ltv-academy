# Lesson 18 — Tradeoff Case Study: Integration Platform

**Chapter 3 · Applying Tradeoffs · Lesson 18 of 20**

## What you'll learn

- A full case study on designing an integration strategy across three systems with different needs
- How real-time vs. batch, build vs. buy, and sync vs. async combine in one integration decision
- Why "pick one integration pattern for everything" is usually the actual mistake
- A worked example treating different data flows inside one project differently, on purpose

## The scenario

A retail company is connecting Salesforce to two other systems as part of a unified customer-experience initiative: an ERP system that holds order and inventory data, and a marketing automation platform that needs customer and engagement data. Three distinct data flows are part of this one project:

1. **Inventory levels from ERP into Salesforce**, so sales reps can see accurate stock before promising delivery dates.
2. **A nightly full sync of closed-order history from Salesforce into the ERP's reporting warehouse**, for financial reconciliation.
3. **Customer record updates from Salesforce into the marketing platform**, so a customer's segment and consent status stay current for a marketing automation vendor that already offers a pre-built Salesforce connector as a managed package.

A team new to this kind of case study often tries to pick one integration architecture — "we're building a real-time, event-driven integration platform" — and apply it uniformly to all three flows. That instinct is exactly the mistake this case study is designed to expose.

## Flow 1: Inventory levels — real-time vs. batch, resolved toward real-time

A sales rep promising a delivery date needs current stock, not stock as of last night's batch run — a stale inventory number that's wrong by the time of the actual promise is worse than a slightly slower synchronous check. This flow genuinely needs the freshness that Lesson 7 said justifies the complexity of a real-time pattern: the ERP publishes inventory-change events (or Salesforce makes a synchronous callout to the ERP's API at the moment a rep views the product), and the added engineering discipline — monitoring for a dropped event, handling an ERP outage gracefully — is worth paying for specifically because the business cost of stale data here is real and immediate.

## Flow 2: Nightly order history — real-time vs. batch, resolved toward batch

Financial reconciliation runs on a daily or weekly cadence; nobody is checking the ERP's reporting warehouse for closed orders in real time. Building this as a real-time event stream would pay all the complexity and monitoring cost of Flow 1's pattern for a business process that gets zero benefit from the extra freshness. This is a textbook Bulk API 2.0 nightly job (Lesson 7): asynchronous, high-volume, and the right tool specifically because "a few hours old" costs nothing real here.

## Flow 3: Marketing platform sync — build vs. buy, resolved toward buy, with its own constraint

The marketing platform vendor already offers a managed-package connector. Lesson 4's build-vs-buy and Lesson 13's managed-package-specific analysis both apply: check the connector's functional-fit against this org's actual segment and consent-field requirements, and specifically check whether consent-status mapping — likely a compliance-sensitive field — is covered by a genuine, documented extension point or requires logic the package's hidden source doesn't expose. If the fit is strong and consent mapping is a supported extension point, buying and configuring is clearly faster and cheaper than building a custom sync job. If consent-status logic turns out to need a workaround the package doesn't support, that specific gap — not the whole decision — is what might need custom Apex alongside the package, per Lesson 13's extension-point analysis.

## Why treating these three flows identically would have been the real mistake

Picking one architecture for the whole project pays Flow 1's necessary complexity cost on Flow 2, where it buys nothing, and ignores Flow 3's actual available shortcut (the existing connector) in favor of building something custom that was never the only option. The actual architecture skill in a multi-system integration project isn't choosing one pattern — it's correctly classifying each distinct data flow against its own real requirements, even inside a single initiative that sounds like it should have one unified answer.

## Key terms

| Term | Meaning |
|---|---|
| Data flow | One distinct direction and purpose of data movement within a larger integration project, which may need its own pattern independent of the project's other flows |
| Uniform-architecture mistake | Applying one integration pattern to an entire project regardless of each data flow's actual, differing requirements |

## Lab

Write a one-paragraph ADR for each of the three data flows in this case study, each naming its specific tradeoff, the decision, the cost accepted, and a revisit trigger. Then write a single combined executive summary (per Lesson 15's structure) that explains to a non-technical stakeholder why this one initiative uses three different integration approaches rather than one.

## Check yourself

Can you explain, for each of the three data flows in this case study, which tradeoff from earlier in the course applies and which side it resolves toward? Can you articulate why "pick one integration pattern for the whole project" is identified as the actual mistake here, rather than any single flow's specific choice being wrong on its own?
