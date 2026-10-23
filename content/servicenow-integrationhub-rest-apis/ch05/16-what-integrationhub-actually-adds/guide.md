# Lesson 16 — What IntegrationHub Actually Adds

**Chapter 5 · IntegrationHub · Lesson 16 of 29**

## What you'll learn

- A one-sentence recap of what you already saw in Flow Designer & Automation
- Why IntegrationHub is a separately-licensed add-on, not a feature that ships free with every edition
- The two real value propositions: Spokes, and the generic REST/SOAP steps
- How those two propositions fit together inside a single Flow
- Where this chapter is headed: from "what it adds" to "how to build your own piece of it"

## You've already touched this — here's the one-sentence recap

ServiceNow Flow Designer & Automation, Chapter 6, had you drop a generic REST step into a Flow
and call a spoke action someone else had already built. That lesson was about *using* IntegrationHub
from inside the flow canvas. This chapter is about understanding what IntegrationHub actually is,
what it costs, and — by Lesson 18 — how to build a brand-new spoke action yourself, something
course 4 never asked you to do.

## It's a licensed add-on, not a given

Here's the detail that earlier lessons glossed over: IntegrationHub is **not** bundled into
every ServiceNow edition the way, say, basic Flow Designer is. Depending on the customer's
contract, it ships as a separately-licensed add-on — the same commercial pattern you saw with
Performance Analytics back in course 2 (Reporting & Dashboards), which also required its own
license tier before a customer could use it. This matters for you as an admin or developer:
before you design a solution around a spoke or around custom actions, you confirm the instance
actually has an IntegrationHub entitlement. Building a flow around capabilities the customer
hasn't licensed is a design mistake that surfaces late, usually in a demo, never in a design
review.

## Value proposition one — Spokes reduce custom integration code

A Spoke is a packaged, ServiceNow-maintained set of actions for a specific external system —
Slack, Microsoft Teams, Workday, ServiceNow-to-ServiceNow, and dozens more. Before IntegrationHub,
connecting a Flow to Slack meant someone hand-rolling a REST Message (course 2's REST Message
record), hand-coding the authentication handshake, and hand-parsing the response — then
maintaining all of that when Slack changed its API. A Spoke replaces all of that hand-rolled
work with a drop-in action that ServiceNow itself keeps up to date. You get the integration;
ServiceNow carries the maintenance burden.

## Value proposition two — generic REST/SOAP steps inside Flow Designer

Not every external system has an official spoke. For those, IntegrationHub gives Flow Designer
a generic REST step and a generic SOAP step that live directly on the flow canvas — no
dedicated Script step, no hand-written `RESTMessageV2()` call. You configure the endpoint,
method, headers, and an Authentication Profile (Chapter 3) right there in the step's form, and
the response flows into the next step as structured data. It's the same underlying HTTP work
a REST Message does, just modeled as a first-class flow step instead of a scripted one.

## How the two propositions work together

A real-world flow often uses both in the same run: a Slack spoke action posts a notification,
while a generic REST step in the same flow calls a niche internal system no spoke covers. Spokes
handle the common, well-known integrations; the generic REST/SOAP steps handle everything else.
Together they mean a flow builder rarely needs to drop into a Script step just to make an
outbound call — which is exactly the gap IntegrationHub exists to close.

## Key terms

| Term | Meaning |
|---|---|
| IntegrationHub | A separately-licensed ServiceNow add-on providing Spokes and generic REST/SOAP flow steps |
| Spoke | A ServiceNow-maintained package of pre-built actions for one specific external system |
| Generic REST step | A Flow Designer step for calling any REST API without a dedicated Script step |
| Entitlement | The license grant that determines whether an instance can use IntegrationHub features |

## Check yourself

Without looking back: what are the two distinct things IntegrationHub actually adds on top of
plain Flow Designer, and which of the two would you reach for when no official spoke exists for
the system you need to call?
