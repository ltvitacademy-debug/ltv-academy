# Lesson 14 — Record Producers

**Chapter 3 · Service Catalog Administration · Lesson 14 of 36**

## What you'll learn

- What a Record Producer (`sc_cat_item_producer`) actually is, and how it differs from a standard catalog item
- Why a Record Producer creates a record directly on a target table instead of a Request/Requested Item
- The real use case this lesson walks through: a "Report an Outage" form that creates an Incident
- How variables map to target-table fields on a Record Producer
- When to choose a Record Producer over a standard catalog item, and when not to

## A catalog item that skips the standard fulfillment path

Every catalog item covered in Lesson 11 follows the same path when ordered: it generates a Request (`sc_request`) and one or more Requested Items (`sc_req_item`), which then move through the standard fulfillment process — approvals, assignment, task tracking, the whole Service Request Management lifecycle. A **Record Producer** is a special type of catalog item, stored on `sc_cat_item_producer`, that breaks from that path entirely. When a requester submits a Record Producer, it creates a record directly on a **target table of the administrator's choosing** — often `incident`, but it could just as easily be a custom table built for a specific process. There is no `sc_request` or `sc_req_item` generated at all; the Record Producer's submission *is* the new record.

## The real use case: Report an Outage

Imagine an end user who just wants to report that the building's Wi-Fi is down. Sending them through the full Service Catalog request-and-fulfillment flow is overkill for something that's really just an incident with a friendly face. A Record Producer called "Report an Outage" solves this cleanly:

- The requester sees a simple catalog item with a short, approachable form — maybe three or four variables: "What's affected?" (Choice), "Where?" (Single Line Text), "How many people affected?" (Choice), "Description" (Multi Line Text).
- Behind the scenes, the Record Producer's target table is set to `incident`.
- Each variable is mapped to a real field on the Incident form: "What's affected?" maps to `category` or `short_description`, "Description" maps to `description`, and so on.
- The moment the requester clicks submit, ServiceNow creates a real Incident record, populated from those mappings, and routes the requester straight to it (or a confirmation page) — no intermediate Request or Requested Item ever exists.

From the requester's point of view, they used "the catalog." From the system's point of view, they filed an incident directly, with the friendlier Service Catalog form acting purely as a simplified front end onto the Incident table.

## How the field mapping actually works

A Record Producer's configuration includes a script (or, in many cases, straightforward field-to-variable mappings) that runs on submission and writes each variable's captured value into the corresponding field on the target table's new record. This is conceptually similar to how a standard catalog item's variables eventually populate values on a Requested Item — except a Record Producer writes directly to whatever table you've pointed it at, with no `sc_req_item` layer in between.

## Choosing a Record Producer vs. a standard catalog item

The decision comes down to one real question: **does this request need the standard request-fulfillment lifecycle, or does it need to become something else entirely?**

- Choose a **standard catalog item** when the request should be tracked as a Requested Item moving through approvals and fulfillment tasks — most hardware requests, access requests, and software installs fit here, because they benefit from that lifecycle's tracking, SLAs, and approval chains.
- Choose a **Record Producer** when the real goal is to create a record on a different table altogether — an Incident, a Problem, a custom request type — and the standard Request/Requested Item structure would just be an unnecessary extra layer with no fulfillment value of its own.

Getting this choice wrong in either direction causes real pain: forcing an outage report through the full request-and-approval lifecycle delays something that should be triaged like any other incident; building a Record Producer for something that genuinely needs approval chains and fulfillment-task tracking throws away functionality the standard catalog item would have given you for free.

## Key terms

| Term | Meaning |
|---|---|
| `sc_cat_item_producer` | The table storing Record Producer catalog items |
| Target table | The table a Record Producer creates its new record on (e.g., `incident`) |
| `sc_request` / `sc_req_item` | The standard Request/Requested Item records a normal catalog item generates — skipped entirely by a Record Producer |
| Field mapping | How a Record Producer's variables populate fields on the new target-table record |
| Fulfillment lifecycle | The approvals/assignment/task tracking a standard catalog item goes through that a Record Producer bypasses |

## Check yourself

A manager wants a simplified "Request New Software" form that still needs manager approval and a fulfillment task assigned to the Software team before the software is installed. Should this be built as a Record Producer or a standard catalog item, and why does the other option fall short here?
