# Script — Building a Simple Event Listener Service

## Segment 1 (title)

A toy contract.on call is a one-liner. A listener you'd actually run in production has four real jobs.

## Segment 2 (code: four jobs)

Connect through a resilient provider, catch up on anything missed while it was offline, listen for new events, and confirm before treating anything as final. A bare .on() call is only step three.

## Segment 3 (code: connect and setup)

Connect uses the Lesson 6 failover provider. The event ABI and the progress file are the only other setup — last-block.json is the simplest honest version of "remember where I left off."

## Segment 4 (code: confirm)

Before this service acts on a Transfer, it checks how many blocks deep the receipt is. Fewer than five confirmations, it skips for now rather than treating something a reorg could still erase as final.

## Segment 5 (code: catch up and listen)

On startup it backfills everything between the last saved block and now with queryFilter, processes it through the same confirm-gated handler, then attaches a live listener for everything from this point forward.

## Segment 6 (outro)

Skip persisting progress and every restart silently drops whatever happened while the service was down. Chapter 3 is what happens when a flat JSON file isn't enough anymore, and you need to index history at scale.
