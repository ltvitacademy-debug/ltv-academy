# Script — Autolaunched Flows

## Segment 1 (title)

Record-triggered, screen, scheduled — every flow type so far runs with nobody watching each step. Salesforce has a name for that: autolaunched. This lesson is about the flow type that makes autolaunched its whole identity.

## Segment 2 (screenshot: New Automation frequently-used cards)

Look closely at the New Automation screen's cards and "autolaunched" shows up in three different descriptions — Record-Triggered, Schedule-Triggered, and the one literally called Autolaunched. They're all background flows; what differs is only the trigger.

## Segment 3 (screenshot: autolaunched flows list)

Setup's Flows list makes that explicit: filter to Autolaunched Flows, add the Trigger column, and you'll see Schedule, Record before save, Record after save, Platform Event — four different triggers, and one row with no trigger at all. That blank row is today's flow type.

## Segment 4 (screenshot: Flow Builder canvas with Activate button)

Autolaunched Flow, No Trigger: no schedule, no object, no platform event, no screen. Just a Start, whatever you build, and an End. Like any flow, it has to be activated before anything can run it.

## Segment 5 (screenshot: classic New Button or Link)

But activated isn't the same as running — something still has to invoke it. Apex can call it directly, another flow can call it as a subflow, and a classic pattern still works too: a custom button pointed at the flow's URL, passing values in as parameters.

## Segment 6 (outro)

Next up: Subflows — the exact mechanism for calling one flow, including an autolaunched one, from inside another.
