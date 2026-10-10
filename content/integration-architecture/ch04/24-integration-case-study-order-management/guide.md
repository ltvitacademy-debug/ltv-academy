# Lesson 24 — Integration Case Study: Order Management

**Chapter 4 · Applying Integration Architecture · Lesson 24 of 28**

## What you'll learn

- A full, realistic order-management integration scenario, worked end to end using this course's concepts
- How the four-question framework (Lesson 11) plays out differently for three different flows within the same single business process
- Why a single business process (order-to-fulfillment) almost always decomposes into several integrations with different patterns, not one monolithic one
- How to apply the Lesson 21 review checklist to a complete, multi-flow design

## The scenario

A mid-size furniture retailer sells through Salesforce (Opportunities and Orders) and fulfills through a separate warehouse management system (WMS), with a third-party shipping-carrier API handling delivery. The business process — "a customer's order gets built, fulfilled, and shipped" — sounds like one integration need, but decomposes into three distinct flows, each with its own answers to the four questions from Lesson 1 and Lesson 11.

## Flow 1: Order created in Salesforce → sent to the WMS for fulfillment

Who initiates: Salesforce, the moment an Order is finalized. Frequency: per order, as they're placed — potentially hundreds per day during a sale. Volume: one order at a time, not a bulk batch. Urgency: the warehouse needs the order within minutes to start picking and packing, but doesn't need it within milliseconds — a short asynchronous delay is entirely acceptable. These answers point toward an **asynchronous request-reply pattern** (Lesson 7, Lesson 12): Salesforce publishes the order (via a Platform Event or a queued Apex callout) and the WMS later confirms receipt and an estimated fulfillment time, correlated back to the original order via an idempotency key (Lesson 15) — the order's unique Salesforce ID — so a retried publish after an ambiguous failure never risks the WMS picking the same order twice.

## Flow 2: Fulfillment status updates flow back from the WMS into Salesforce

Who initiates: the WMS, as fulfillment progresses through its own stages (picked, packed, shipped). Frequency: several updates per order over its fulfillment lifecycle, arriving on the WMS's own schedule, not Salesforce's. Volume: low per event, moderate in aggregate across many orders. Urgency: a rep or customer checking order status wants reasonably current information but doesn't need sub-second updates. This points toward an **event-driven, fire-and-forget pattern** (Lesson 7, Lesson 8): the WMS publishes a status-change event, and Salesforce (and potentially a customer-facing order-status page) subscribes independently, with eventual consistency being an entirely acceptable trade-off here — a status update arriving a few seconds late causes no real harm.

## Flow 3: Shipping-rate calculation at checkout

Who initiates: Salesforce, when a rep is finalizing an order and needs a shipping cost to quote the customer. Frequency: per order, at the specific moment of checkout. Volume: a single rate lookup. Urgency: genuinely immediate — the rep is staring at a screen waiting for a number before they can proceed. This is the one flow in this whole scenario that actually justifies **synchronous communication** (Lesson 6): a direct Apex callout to the shipping carrier's rate API, designed within the 100-callout and 120-second cumulative timeout limits (Lesson 19), with a sensible timeout and a fallback (a flat estimated rate, or a manual override) if the carrier's API doesn't respond in time, rather than leaving the rep stuck with no way to proceed at all.

## Why one business process became three different patterns

This case study's central lesson is that "order management integration" was never actually one integration — it was three flows with three different answers to the four questions, and forcing all three into the same pattern (say, making everything synchronous because that's the first flow a developer happened to build) would have made Flow 1 and Flow 2 needlessly fragile against WMS downtime, while a single-minded "everything must be asynchronous" instinct would have left Flow 3's rep staring at a blank screen with no shipping cost and no way to proceed. Decomposing a business process into its actual constituent flows, and answering the four questions honestly for each one separately, is exactly the discipline Lesson 11 argued for — this case study is what that discipline looks like applied to one realistic, multi-flow scenario end to end.

## Key terms

| Term | Meaning |
|---|---|
| Flow decomposition | Breaking one business process into its distinct underlying integration flows, each with its own pattern |

## Lab

Run Lesson 21's review checklist against Flow 1 (order created in Salesforce, sent asynchronously to the WMS with an idempotency key based on the order ID). Identify at least three checklist items from Lesson 21 that this lesson's description of Flow 1 has already addressed, and name one checklist item (such as monitoring or governance) that this lesson's description has not yet specified, and describe what you'd want to see answered before approving this design.

## Check yourself

Can you explain why this one business process decomposed into three separate integrations with three different patterns, rather than one? Can you state, for each of the three flows, which pattern was chosen and the specific answer to the four questions that drove that choice?
