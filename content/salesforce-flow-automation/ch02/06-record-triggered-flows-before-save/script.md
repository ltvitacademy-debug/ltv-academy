# Script — Record-Triggered Flows: Before Save

## Segment 1 (title)

This is where Chapter 1's vocabulary becomes a real flow. A record-triggered flow runs automatically when a record is created, updated, or deleted — no screen, no user watching. This lesson covers the before-save version.

## Segment 2 (screenshot: New Flow, Record-Triggered selected)

You start it from New Flow by selecting Record-Triggered Flow.

## Segment 3 (screenshot: Configure Start trigger options)

Every record-triggered flow starts the same way: pick the object, then pick when it fires — created, updated, created or updated, or deleted. You can also set entry conditions so it doesn't run on every single save.

## Segment 4 (screenshot: Optimize the Flow For)

Scroll down and you hit the real fork: Optimize the Flow For. Fast Field Updates is the before-save option — it runs before the record saves, and it can only touch fields on that same triggering record. Nothing else. In exchange, it's meaningfully faster.

## Segment 5 (steps: before-save trade-off)

The trade-off: a before-save flow can't create records, can't update any other record, and can't run an Action. If all you need is to update a field on the record that triggered it, before-save is exactly right.

## Segment 6 (outro)

Next up: after-save — what you reach for the moment the flow needs to touch anything beyond the triggering record itself.
