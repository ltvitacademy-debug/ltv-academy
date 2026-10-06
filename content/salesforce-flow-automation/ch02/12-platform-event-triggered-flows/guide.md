**Chapter 2 · Flow Types · Lesson 12 of 31**

# Platform Event-Triggered Flows

Every flow type in this chapter so far launches because of something happening inside
Salesforce: a record saved, a clock ticking, a user clicking. A **Platform Event-Triggered Flow**
launches because of a message — a **platform event** — published onto Salesforce's event bus,
often by something entirely outside the org: an external system, a middleware integration, or
Apex code reacting to its own logic.

This is the last flow type in Chapter 2. Once it clicks, you'll have met every way a flow can
start.

## What launches it

Setup's New Flow screen lists Platform Event-Triggered Flow right alongside the flow types from
Lessons 6-10, and its description draws the same background-process line the others do:

![Platform Event-Triggered Flow selected on Setup's New Flow screen, described as launching when a platform event message is received, as an autolaunched flow running in the background.](/courses/salesforce-flow-automation/ch02/12-platform-event-triggered-flows/new-flow-platform-event-selected.png)

"Launches when a platform event message is received." Like a scheduled flow or an autolaunched
flow, it runs in the background — no screen, nobody watching. What's different is the trigger
itself: not a date, not a record save, but a message.

## Choosing the event at the Start element

Build one and the Start element asks for exactly one thing before anything else: which platform
event to subscribe to.

![The Start element for a Platform Event-Triggered Flow, with a single option: + Choose Platform Event.](/courses/salesforce-flow-automation/ch02/12-platform-event-triggered-flows/platform-event-start-element.png)

Pick the event, and from that point on, every message published to that event — from anywhere,
inside the org or out — launches a fresh run of this flow.

## A related but different mechanism: pausing for an event

Platform events don't only start flows. A flow that's already running — built as any
autolaunched type, not necessarily this one — can use a **Pause** element to stop mid-flow and
wait for a platform event message before continuing. Here's a real example: a flow submits an
order with a vendor, then pauses until the vendor publishes a "Vendor Response" event confirming
it shipped:

![A Pause element's Resume Event configuration: "Pause Until... A Platform Event Message is Received," Platform Event set to Vendor Response, filter conditions on Order_Number__c and Order_Status__c equal to "Shipped," and the result stored in a {!vendorResponse} variable.](/courses/salesforce-flow-automation/ch02/12-platform-event-triggered-flows/platform-event-pause-resume.png)

This is a different mechanism from the Start-element subscription above. A Platform
Event-Triggered Flow is *born* from an event message. A Pause element lets *any* flow stop and
wait for one partway through, with filter conditions narrowing down exactly which message
message counts, then storing the result in a variable for the rest of the flow to use.

## Why this flow type exists

Platform events are how Salesforce orgs — and the systems around them — talk to each other
without being directly wired together. A shipping system doesn't need a webhook into a specific
flow; it just publishes a Vendor Response event, and any Platform Event-Triggered Flow (or any
flow with a Pause element) subscribed to it reacts. That decoupling is the whole point: publishers
and subscribers never need to know about each other directly.

## Key terms

| Term | Meaning |
|---|---|
| Platform event | A message published onto Salesforce's event bus, which flows and other subscribers can react to |
| Platform Event-Triggered Flow | A flow type whose Start element subscribes to a platform event and launches when one arrives |
| Choose Platform Event | The Start-element setting that picks which event this flow subscribes to |
| Pause (Resume Event) | A separate mechanism: any flow can pause mid-run and wait for a platform event message before resuming |

## Check yourself

What's the difference between a flow launching because its Start element is set to Platform
Event-Triggered, versus a flow pausing mid-run to wait for a platform event at a Pause element?
