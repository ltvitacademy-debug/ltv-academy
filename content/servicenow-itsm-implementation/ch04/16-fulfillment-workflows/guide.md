# Lesson 16 — Fulfillment Workflows

**Chapter 4 · Implementing Request Management · Lesson 16 of 32**

## What you'll learn

- The real state model a Requested Item moves through: Open, Work in Progress, Closed Complete, Closed Incomplete/Cancelled
- Why Flow Designer — not legacy Workflow — is the standard way to build fulfillment logic today
- The implementation decision that actually matters: who, or what, moves the item through its states
- How a fully automated fulfillment flow closes itself using a REST step, instead of waiting on a human to update a field
- Why a stalled Requested Item is the most common real-world fulfillment failure, and what catches it

## The real state model on a Requested Item

Every `sc_req_item` record carries its own state, independent of its sibling items on the same request. Out of the box, that state model is: **Open** (the item has just been submitted, not yet picked up), **Work in Progress** (someone, or something, is actively fulfilling it), **Closed Complete** (fulfillment finished successfully), and **Closed Incomplete** or **Cancelled** (fulfillment was abandoned, rejected, or the requester withdrew it). This is the same shape of state model you've now seen three times in this course — incident, problem, and change all have their own version — but the transitions here are driven by fulfillment work, not by investigation or approval.

## Flow Designer is where this logic actually lives

Course 4's "Wiring a Catalog Item to a Flow" lesson had you connect a catalog item's checkout to a Flow Designer flow at all. This lesson is about what that flow actually does once it's wired up: it is the thing responsible for moving the Requested Item through Open, Work in Progress, and eventually to a closed state. Flow Designer is the current standard for this — legacy Workflow (the graphical, activity-based engine ServiceNow has been deprecating in favor of flows) still exists in older instances, but a new implementation should build fulfillment logic in Flow Designer, the same tool course 4's "Multi-Stage Approval Automation" lesson used for approvals. Fulfillment and approval are often stages in the *same* flow: approve first, then fulfill, with the Requested Item's state changing at each stage.

## Who — or what — actually moves the state forward

This is the implementation decision that separates a well-designed fulfillment flow from a sloppy one: deciding whether a human fulfiller manually advances the state, or whether the platform does it automatically. Some fulfillment genuinely requires a person — racking a physical server, walking a new hire through a badge pickup — and for those, the right design is a flow that creates a task for the fulfiller, waits for them to mark it complete, and only then moves the Requested Item to Closed Complete. Other fulfillment is fully mechanical: course 7's REST integration patterns showed you how a flow can call an external system directly. An access-request catalog item is the clearest example — once approved, the flow can call a REST step against the identity-provisioning system, get back a confirmation that the account was actually created, and close the Requested Item itself, with no human touching a state field at all.

## Letting a REST call drive the close

The implementation detail worth getting right here: a flow should never flip a Requested Item to Closed Complete just because it *sent* a provisioning request — it should wait for and check the REST response. A well-built flow calls the external system, inspects the response for a real success indicator, and only then sets state to Closed Complete. If the response comes back as a failure, the flow should route the item to Work in Progress with a note for a human to investigate, or to Closed Incomplete if the request was genuinely invalid — never to a silent "it's done" that isn't actually true.

## Stalled items are the real-world failure mode

The most common thing that goes wrong in production is not a flow error — it's a Requested Item that sits in Work in Progress indefinitely because the human fulfiller forgot about it, or the external system the REST step depends on is unreachable and nothing retries or escalates. A mature implementation pairs the fulfillment flow with the SLA from Lesson 15: when the Requested Item's SLA approaches breach, a notification fires to the fulfiller or their manager, catching the stall before the requester has to ask "where's my order?" themselves.

## Key terms

| Term | Meaning |
|---|---|
| Open | A Requested Item's initial state — submitted, not yet picked up for fulfillment |
| Work in Progress | The Requested Item is actively being fulfilled, by a person or an automated step |
| Closed Complete | Fulfillment finished successfully; the item's work is done |
| Closed Incomplete / Cancelled | Fulfillment was abandoned, rejected, or withdrawn before completion |
| Flow Designer | The current standard tool for building the fulfillment logic that moves a Requested Item through its states |

## Check yourself

You're ready for Lesson 17 when you can explain, without looking: for a catalog item whose fulfillment is a REST call to an external system, what should the flow check before setting the Requested Item to Closed Complete, and what should it do instead if that check fails?
