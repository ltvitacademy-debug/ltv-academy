# Lesson 16 — Wiring a Catalog Item to a Flow

**Chapter 5 · Service Catalog Automation · Lesson 16 of 27**

## What you'll learn

- Why catalog fulfillment used to run on the legacy Workflow engine, and what replaces it now
- The real trigger mechanism that connects a specific catalog item to a specific flow
- How a flow reads a catalog item's variable values once it fires
- Why the trigger fires on the Requested Item, not the Request or the catalog item itself
- A real example wiring a software catalog item to a flow that branches on cost

## From Workflow to Flow Designer for catalog fulfillment

Course 3's Chapter 3 covered building catalog items, categories, and
variables — the request-facing side of the Service Catalog. None of
that work makes a request actually *do* anything on its own; something
still has to read what the requester selected and act on it. Older
ServiceNow implementations wired that fulfillment logic to the legacy
Workflow editor, attached directly to the catalog item. Flow Designer
replaces that path: fulfillment logic for a catalog item now lives in
a flow, and the connection between "this catalog item" and "this flow"
is made through a trigger, not through a setting on the catalog item
record itself.

## The real trigger: Requested Item, scoped to one catalog item

When someone submits a catalog item, ServiceNow creates a Request
(`sc_request`) and, beneath it, one Requested Item (`sc_req_item`) per
catalog item ordered. Flow Designer's Service Catalog trigger fires on
that Requested Item record — specifically, "Requested Item Created" —
and the trigger condition narrows it to one catalog item by filtering
on the Requested Item's `cat_item` reference field equaling the
specific item you're automating. That scoping matters: without it,
every catalog request on every item in the catalog would fire the
same flow. With it, a flow built to fulfill "New Software License
Request" only ever runs for requests of that exact item.

## Reading the requester's variable values

Once the trigger fires, the flow has a live Requested Item record
available as a data pill — the same data-pill mechanism from Lesson
5. Buried inside that record are the catalog item's variables from
Course 3's Chapter 3: whatever the requester typed into a single-line
text variable, picked from a choice list, or selected on a reference
field is stored against that Requested Item and exposed to the flow
as a pill, typically through a "Look Up Record" style reference into
the item's variable set. A software request's "License Cost" variable,
for instance, becomes a pill the flow can drag straight into an
If/Else condition (Lesson 6) or a Create Record action (Lesson 9) —
no re-typing, no separate lookup table.

## Why the Requested Item, not the Request

A single Request can contain several Requested Items — someone orders
a laptop and a monitor in the same cart checkout. Triggering on the
Request record would fire one flow execution covering every item in
that cart, with no clean way to isolate "the laptop's fulfillment
logic" from "the monitor's fulfillment logic." Triggering on the
Requested Item gives each item its own flow execution, scoped to its
own variables, running independently even when it shares a Request
with other items. This is also why the trigger filters on `cat_item`
rather than on anything at the Request level — the catalog item is a
property of the Requested Item, not of the Request as a whole.

## A real example

A "New Software License Request" catalog item collects a License Cost
variable and a Software Name variable. A flow is built with a Service
Catalog trigger condition set to "Requested Item Created" where
`cat_item` is "New Software License Request." The flow's first real
step looks up the Requested Item's License Cost variable as a data
pill, ready to feed an If/Else branch deciding whether the request
needs one approval stage or two — the subject of the next lesson.

## Key terms

| Term | Meaning |
|---|---|
| Requested Item (`sc_req_item`) | One catalog item's line within a Request; what the catalog trigger actually fires on |
| Request (`sc_request`) | The parent record covering everything a requester ordered in one checkout |
| Service Catalog trigger | A Flow Designer trigger scoped to Requested Item events for a specific catalog item |
| Variable value | A requester's answer on a catalog item's variable, exposed to the flow as a data pill |

## Check yourself

You're ready for Lesson 17 when you can explain: if a flow's Service
Catalog trigger were accidentally left without a `cat_item` filter,
what would actually go wrong the next time any catalog item in the
system was requested?
