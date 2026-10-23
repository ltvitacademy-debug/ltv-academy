# Lesson 17 — Request Management Lab

**Chapter 4 · Implementing Request Management · Lesson 17 of 32**

## What you'll learn

- How to trace a real checkout through the sc_request/sc_req_item relationship, line item by line item
- How to design the fulfillment flow for a catalog item that needs a human acknowledgment step
- How to decide — and justify — where an automated close belongs versus a human close
- How to connect a Requested Item's state model to a real REST-confirmed provisioning step
- How to spot the one design mistake that would make this fulfillment flow lie to the requester

## The scenario

You're implementing fulfillment for **"New Software License,"** the catalog item built back in course 3's Service Catalog chapter. A user opens the catalog, orders **2 licenses** in a single checkout alongside nothing else, and clicks Submit. Your job in this lab is to work through, in writing, exactly what records that creates, how the fulfillment flow should move those records through their states, and where the flow should close itself automatically versus wait on a person.

## Step 1 — Confirm the sc_request / sc_req_item relationship

Start with the structural question from Lesson 15. The user ordered one catalog item, "New Software License," but requested a quantity of 2 in one checkout. That is still **one checkout, one catalog item** — so ServiceNow creates exactly **one `sc_request`** record (the overall order) and **one `sc_req_item`** record for "New Software License," carrying a `quantity` field set to 2. This is the detail worth getting right: ordering 2 units of the *same* item in one cart is not the same as ordering 2 *different* items — the former is one Requested Item with quantity 2, the latter would be two separate Requested Items. If your fulfillment flow assumes "quantity 2" always means "two separate Requested Item records," it will miscount every multi-unit order on this catalog item. The flow needs to read and act on the `quantity` field, not assume one license request equals one item record.

## Step 2 — Design the Open → Work in Progress transition

Per Lesson 16, the implementation decision is who or what moves the state forward at each step. For "New Software License," assume IT licensing has to *acknowledge* the request before any provisioning starts — someone needs to confirm budget and seat availability before committing to a purchase. That makes the Open → Work in Progress transition a **human-fulfilled step**: the flow assigns the Requested Item to the IT Licensing assignment group, generates a task (or simply exposes the item in their work queue), and waits. The moment a licensing agent acknowledges the request — clicking a UI Action or completing a flow-generated approval/task step — the flow sets `sc_req_item.state` to **Work in Progress**. Until that acknowledgment happens, the item correctly sits in Open, which is also exactly the signal a manager's dashboard needs: Open items are unacknowledged work, not yet started.

## Step 3 — Design the automated Closed Complete step

Once acknowledged, provisioning itself is mechanical: the flow calls a REST step against the external licensing system's API, requesting 2 seats be provisioned against the user's account. Following the Lesson 16 pattern exactly, the flow must **not** close the item the moment it sends that REST call — it has to wait for the response and inspect it for a genuine success indicator (for example, a returned `license_ids` array with 2 entries, matching the requested quantity). Only on that confirmed success should the flow set `sc_req_item.state` to **Closed Complete**. If the external system returns a failure, or returns fewer seats than requested, the flow should route the item back to a human — setting state to Work in Progress with a note describing exactly what the API returned — rather than silently closing a request that wasn't actually fulfilled.

## Step 4 — The mistake this design avoids

The design flaw a less careful implementation would fall into: closing the Requested Item as soon as the REST call is *sent*, instead of waiting for and checking the response. That single shortcut would let the Requested Item read Closed Complete while the external licensing system silently failed to provision anything — the requester sees "done," IT licensing has no idea anything is wrong, and nobody finds out until the user tries to install software that was never actually licensed. Checking the real response before closing is what keeps the Requested Item's state trustworthy, which is the entire point of building a real state model instead of a single "finished" checkbox.

## Step 5 — What a manager's dashboard would show

With this design in place, walk through what a well-implemented instance surfaces at each point: a request sitting in Open means licensing hasn't acknowledged it yet; Work in Progress covers both "licensing is reviewing it" and "the REST call failed and a human needs to look"; Closed Complete means the external system *confirmed* 2 seats were actually provisioned. Every one of those states answers a real question someone will actually ask, which is the standard this entire chapter has been building toward.

## Key terms

| Term | Meaning |
|---|---|
| Quantity field | The field on sc_req_item recording how many units of one catalog item were ordered in a single line |
| Acknowledgment step | A human-fulfilled transition (here, Open → Work in Progress) gating automated work behind a person's confirmation |
| REST-confirmed close | Setting state to Closed Complete only after inspecting a real success response, not merely after sending the request |
| Fulfillment handback | Routing a Requested Item back to a human (state = Work in Progress, with a note) when an automated step fails |

## Check yourself

You're ready for Lesson 18 when you can explain, without looking: in this lab's design, what two separate things can cause a "New Software License" Requested Item to sit in Work in Progress, and why does the flow wait for the REST response's actual content — not just a successful call — before closing the item?
