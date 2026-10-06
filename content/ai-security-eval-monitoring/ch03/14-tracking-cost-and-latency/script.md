# Script — Tracking Cost & Latency

## Segment 1 (title)

Cost and latency are different from the rest of this chapter — they're almost always working exactly as designed, and they still need watching, because "as designed" at ten times last month's traffic can mean a bill that triples and a product that suddenly feels slow.

## Segment 2 (screenshot: dashboard overview)

A single running total isn't enough to act on. A real dashboard breaks requests, cost, and latency out over time and by model and country — so a spike is traceable to a cause, not just a number that went up.

## Segment 3 (screenshot: session metrics)

But a single call's cost and latency are rarely the number that matters. A multi-step agent session can rack up a dozen calls before it ever returns an answer — looking at the whole session, not just its last call, is where the real expense actually shows up.

## Segment 4 (screenshot: caching)

One lever that moves both numbers at once: caching. If the same or a near-identical prompt comes in repeatedly, serving it from cache skips the model call entirely — cutting cost and latency to nearly zero on that repeat.

## Segment 5 (screenshot: model pricing)

The other lever is knowing what each model actually costs. Per-million-token prices can differ five to ten times between a frontier model and a smaller one doing the same job — the first step to routing intelligently is just knowing that gap exists.

## Segment 6 (outro)

Cost and latency scale with every token in and out, often without anyone changing a line of code. Next up: drift — what happens when the inputs themselves start to change.
