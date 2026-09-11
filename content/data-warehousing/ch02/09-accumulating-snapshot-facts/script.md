# Script — Accumulating Snapshot Facts

## Segment 1 (title)

Some business processes aren't a single event, and they aren't a regular-interval snapshot either — they're a pipeline with a beginning, a sequence of stages, and an end. That's what an accumulating snapshot fact table is built to track.

## Segment 2 (steps: order fulfillment milestones)

Picture one order moving through fulfillment: placed, picked, shipped, delivered. A row is inserted the moment the order is placed, with every other milestone's date key set to a special "not applicable yet" value. As that same order gets picked, then shipped, then delivered, the same row gets updated each time — filling in the next date key and calculating the duration since the last milestone.

## Segment 3 (code: f_OrderFulfillment)

In T-SQL, that means four separate date dimension keys — one per milestone — all pointing at the same physical Date dimension in four different roles. That's a role-playing dimension. And the measures aren't dollar amounts, they're durations: days to pick, days to ship, days to deliver. That's the real question this fact table answers — how long did the order sit at each stage.

## Segment 4 (outro)

This is the one fact table type that isn't insert-only — it requires an update-based load. The next lesson covers a very different kind of fact table: one that records an event but has no measure at all.
