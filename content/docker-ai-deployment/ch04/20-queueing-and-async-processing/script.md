# Script — Queueing & Async Processing

## Segment 1 (title)

A typical web request is fast, so scaling by adding instances smooths out load reasonably well. An AI inference request can take seconds to tens of seconds — and holding a connection open that whole time doesn't scale the same way.

## Segment 2 (code: sync vs. async)

A synchronous request holds the client's connection open for the entire wait. An asynchronous request returns a job ID immediately instead — a worker picks the job up when it's free, and the client polls, or gets a webhook, for the result later.

## Segment 3 (code: what a queue buys you)

With autoscaling alone, a traffic burst needs more instances right now — and GPU instances start in minutes, not seconds. A queue in front of autoscaling lets requests wait briefly while instances catch up. Nothing gets rejected, just delayed.

## Segment 4 (code: the dead-letter queue)

A failing job gets retried a few times, and then moved to a dead-letter queue instead of blocking everything behind it. Without one, a single poison-pill request — malformed input, a prompt that reliably crashes the model — can consume retry attempts and worker capacity forever.

## Segment 5 (outro)

A queue turns an instant-reaction problem into a catch-up-eventually problem, which matters enormously given how slow a GPU-backed cold start actually is. Next up: putting a dollar figure on everything this chapter has covered — cost-aware scaling.
