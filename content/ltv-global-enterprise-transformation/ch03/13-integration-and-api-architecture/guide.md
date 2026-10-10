# Lesson 13 — Integration and API Architecture

**Chapter 3 · Integration and Platform Architecture · Lesson 13 of 33**

## What you'll learn

- Why LTV Global rejects point-to-point integration in favor of a central integration hub
- How Enterprise Integration Patterns organize the hub's logic instead of ad hoc code
- Which integration style (synchronous callout, batch, or event-driven) fits each system, and why
- How this lesson's hub decision sets up Lessons 14 and 15's system-specific designs

## The point-to-point trap

With five major systems to connect — Salesforce, Meridian ERP, LedgerPoint, Snowflake, and Okta — plus external APIs, the naive approach is **point-to-point integration**: build a direct connection between each pair of systems that needs to talk. This fails at exactly LTV Global's scale. Five systems have ten possible pairs; add external APIs and the dealer/customer portal and the number of direct connections needed grows fast, each one with its own authentication, its own error handling, and its own undocumented quirks that only the person who built it fully understands. A new system joining the landscape later means building new connections to every existing system it needs to talk to, one at a time, with no reuse of anything already built.

## LTV Global's decision: a central integration hub

LTV Global routes integration traffic through a central **integration platform (iPaaS)** rather than direct point-to-point connections. Every system connects once, to the hub; the hub is responsible for translation, routing, and orchestration between them. This is a direct, deliberate rejection of the point-to-point alternative, and the reasoning is the one Chapter 6 will ask about: point-to-point doesn't scale past the first few integrations, creates no reusable logic, and makes a single integration developer's tribal knowledge a company-wide dependency; a hub concentrates integration logic somewhere it can be documented, monitored, and maintained by a team rather than by one person's memory.

## Enterprise Integration Patterns organize the hub's logic

Rather than the hub's logic being an unstructured pile of custom transformation code, LTV Global's integrations are built using the same named, reusable patterns this catalog's integration-architecture material already establishes: a **Message Router** decides which downstream system a given Salesforce event should reach (an order-status update might route to Snowflake only, or to both Snowflake and Meridian, depending on its type); a **Message Translator** converts each system's native data shape into the shape the next system expects (Salesforce's Opportunity JSON into the flat structure Meridian's order API expects, for instance); a **Content-Based Router** inspects a Parts Order's actual content to decide whether it needs manual credit review (routing to Equipment Financing) or can proceed straight through; and an **Aggregator** waits for all expected line items of a multi-line parts order to arrive before combining them into one order-confirmation event, rather than passing each line through as a separate, incomplete event. Naming these patterns gives LTV Global's integration team a shared vocabulary for design review, and it's directly the vocabulary a board member evaluating this design in Chapter 6 will expect to hear.

## Matching integration style to each system's actual nature

Not every connection through the hub uses the same mechanism, because not every system supports the same thing — this directly reflects Lesson 4's current-state constraints, not a one-size-fits-all policy:

| System | Integration style | Why |
|---|---|---|
| Meridian ERP | Synchronous REST callout (orders) + nightly Bulk API batch (product/inventory) | Meridian can do near-real-time, so order creation gets it; full product sync doesn't need to |
| LedgerPoint | Batch-only, nightly SFTP flat files, both directions | No API exists — this is a permanent constraint, not a temporary gap (Lesson 14 details this fully) |
| Snowflake | Nightly Bulk API extraction | Analytics doesn't need real-time; batch keeps load predictable (Lesson 15 details this fully) |
| Downstream event subscribers | Platform Events and Change Data Capture | Fan-out to multiple interested systems without Salesforce needing to know who's listening |

## Where this leads next

This lesson establishes the shape of the integration layer; Lesson 14 goes deep on the two hardest, most legacy-constrained connections (Meridian and LedgerPoint), and Lesson 15 covers Snowflake and the external APIs. Both of those lessons build directly on the hub-and-patterns decision made here — they don't re-argue it.

## Key terms

| Term | Meaning |
|---|---|
| Point-to-point integration | A direct connection built between each specific pair of systems, with no shared, reusable layer |
| Integration hub (iPaaS) | A central platform every system connects to once, responsible for routing and translation between them |
| Message Router / Translator / Content-Based Router / Aggregator | Named Enterprise Integration Patterns organizing the hub's logic |
| Event-driven integration | A system announcing something happened, with subscribers reacting independently, rather than a direct request/response callout |

## Lab

A new integration developer suggests building a quick, direct Apex callout from Salesforce straight to Meridian's order API, bypassing the integration hub, "just for this one order-sync feature, to save time." Using this lesson's reasoning, write three or four sentences explaining what LTV Global's architecture would lose if this one exception were allowed, and why "just this once" is exactly how point-to-point sprawl actually starts.

## Check yourself

Can you name the four Enterprise Integration Patterns this lesson applies to LTV Global's hub, and give a one-sentence LTV Global-specific example of each? Can you explain why LedgerPoint, Meridian, and Snowflake each use a different integration style, rather than LTV Global picking one mechanism and applying it everywhere?
