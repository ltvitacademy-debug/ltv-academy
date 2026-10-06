# Script — Subflows

## Segment 1 (title)

Lesson 10 mentioned another flow can invoke an autolaunched flow. This lesson is exactly how: the Subflow element, which calls one flow from inside another and picks back up once it's done.

## Segment 2 (screenshot: Add Element, Interaction category)

Open Add Element and Subflow sits in the Interaction category, right next to Screen and Action. Same idea: it's one step in the canvas, except this step hands control to an entire second flow.

## Segment 3 (screenshot: Subflow element panel)

Configure one and you pick a Referenced Flow — the flow being called — plus Set Input Values, mapping data from the parent flow into the child flow's inputs. Here, the parent's Triggering Case Owner ID flows straight into the child flow's userMentionID.

## Segment 4 (screenshot: New Resource, Availability Outside the Flow)

But that only works for variables the child flow opted in. Every resource has an Availability Outside the Flow section — Available for input, Available for output. Leave both unchecked and a calling subflow can't touch it at all.

## Segment 5 (outro)

Next up: Platform Event-Triggered Flows — a flow type that launches the moment a message arrives on the event bus, no schedule and no record save involved.
