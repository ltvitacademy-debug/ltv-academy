# Lesson 15 — The Request & Requested Item Tables

**Chapter 4 · Implementing Request Management · Lesson 15 of 32**

## What you'll learn

- Why ordering from the Service Catalog creates two different records, not one
- What `sc_request` represents, and what `sc_req_item` represents, and why that split exists
- How one Request can roll up a combined status from several Requested Items that are each in a different state
- Why an SLA in this process almost always belongs on the Requested Item, not the overall Request
- How the `request` reference field on `sc_req_item` is what ties the two tables together

## One checkout, two tables

Course 3's Service Catalog chapter had you build catalog items a user could order. This chapter is about what actually happens the moment a user clicks Checkout. ServiceNow does not create one record for that order — it creates two, on two different tables, with a real structural relationship between them. The **`sc_request`** table holds the overall order: one record per checkout, no matter how many items were in the cart. The **`sc_req_item`** table holds the individual line items: one record per catalog item ordered, every time. Order one item in a checkout, and you get one `sc_request` and one `sc_req_item`. Order three items — say, a laptop, a monitor, and a software license — in the same checkout, and you get one `sc_request` and three `sc_req_item` records, each one pointing back at that same request through a `request` reference field.

This is not an arbitrary design choice. A real catalog checkout is closer to an online shopping cart than a single support ticket: the user experiences it as one order, but fulfillment happens item by item, often by entirely different teams. IT hardware fulfills the laptop and monitor; a software licensing team fulfills the license. Modeling that as a single flat record would force every fulfiller to wade through fields that belong to someone else's item. Modeling it as request-plus-items lets each item carry its own state, its own assignment group, and its own fulfillment history, while the request stays the one place a requester checks for "where's my whole order."

## Why the Request needs its own rollup

Because a request can contain Requested Items in different states at the same time, `sc_request` carries its own `request_state`, and a well-implemented instance keeps that field accurate by rolling it up from the items underneath it, not by letting an agent set it independently. If all three Requested Items on a request are Closed Complete, the Request itself should read Closed Complete. If the laptop and monitor are done but the software license is still Work in Progress, the Request should reflect that it is not fully done yet — many instances expose this as a **Partially Complete** condition, calculated rather than hand-typed, so a requester checking on "my order" sees an honest answer instead of a request that closes the moment the first item finishes.

Get this rollup wrong — for example, by closing the Request as soon as any one item closes — and you create the exact failure mode Request Management exists to prevent: a requester told their order is done while a software license is still sitting unprovisioned in someone's queue.

## Why SLAs usually attach at the item level

Course 1 introduced Service Level Management concepts in general terms; this course's own SLA chapter (Chapter 6) will cover building SLA Definitions in detail. The implementation decision worth flagging now is *where* that SLA attaches. A commitment like "software license requests fulfilled within 2 business days" is a property of one specific catalog item's fulfillment path — not of the overall order, which might also contain a hardware item with a completely different, longer SLA. Attaching the SLA to `sc_req_item` lets each Requested Item carry its own due date, its own breach condition, and its own pause/stop triggers, matched to what that specific item actually requires. Attaching it to `sc_request` instead would force one SLA clock onto every item in the order regardless of what was actually ordered — accurate for single-item checkouts, wrong the moment a requester orders two different things with two different fulfillment realities in one cart.

## The field that ties it together

The mechanics of the relationship come down to one reference field: `sc_req_item.request` points at the parent `sc_request` record. Every report, every related list, and every rollup calculation in this process walks that single field. A Requested Item without a correctly populated `request` reference is an orphaned line item with no order to roll up into — which is why this field, inherited automatically whenever a catalog item is ordered through the standard checkout flow, should never be something a flow or script sets or changes by hand.

## Key terms

| Term | Meaning |
|---|---|
| `sc_request` | The overall order record — one per checkout, regardless of how many items it contains |
| `sc_req_item` | One record per individual catalog item ordered, each tracking its own fulfillment state |
| `request` (reference field) | The field on `sc_req_item` that points back at its parent `sc_request` |
| Rollup status | The Request's own state, calculated from the combined state of its Requested Items rather than set independently |
| Partially Complete | A rollup condition showing some Requested Items are done while others on the same request are not |

## Check yourself

You're ready for Lesson 16 when you can explain, without looking: if a user orders two different catalog items in one checkout, why should the SLA for fulfilling each one usually attach to the Requested Item rather than to the Request, and what should the Request's own state show while one item is done and the other is still in progress?
