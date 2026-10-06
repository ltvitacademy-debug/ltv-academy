# Script — Platform Event-Triggered Flows

## Segment 1 (title)

Every flow type so far launches from something inside Salesforce — a record, a clock, a click. A Platform Event-Triggered Flow launches from a message: a platform event, published onto the event bus, often from a system entirely outside the org.

## Segment 2 (screenshot: New Flow, Platform Event-Triggered Flow selected)

Setup lists it right alongside the others: launches when a platform event message is received, runs in the background. Same autolaunched behavior — the trigger is just a message instead of a date or a record save.

## Segment 3 (screenshot: Start element, Choose Platform Event)

Build one and the Start element asks for exactly one thing: which platform event to subscribe to. From then on, any message published to that event launches a fresh run.

## Segment 4 (screenshot: Pause element resume event)

Platform events show up a second way too. A flow that's already running can pause mid-flow and wait for an event instead of starting from one — here, a flow submits an order, then waits for a Vendor Response event confirming it shipped before it continues.

## Segment 5 (outro)

That closes out Chapter 2's flow types. Next up: Chapter 3 begins with Decisions — the logic elements that make a flow branch.
