# Script — Logging AI Inputs & Outputs, Responsibly

## Segment 1 (title)

An LLM call isn't deterministic — the same prompt can return a different answer every time. The only way to debug a bad response after the fact is to see exactly what was sent and exactly what came back. That's what logging gives you in production.

## Segment 2 (steps: what a log entry captures)

A useful log entry is more than prompt-in, text-out. Request ID and timestamp so you can find the one call someone's asking about. Model and version, since behavior shifts across versions. The actual input and output. Tokens, latency, and cost. Status. And a user or session ID tying the call back to the person it happened to.

## Segment 3 (screenshot: full request detail)

Here's what that looks like captured in full — the complete chat body, model, token count, latency, and status for one real logged call. Convenient for debugging. But it also means your log store can quietly become the most sensitive database in your whole stack.

## Segment 4 (screenshot: filtering requests)

And at production volume — millions of calls a month — a log you can't filter is close to useless. Filtering by status, by user, by model turns a flood of logged calls into the one call that actually matters right now.

## Segment 5 (screenshot: omit modes, annotated)

The fix isn't to stop logging. It's choosing, deliberately, what gets captured. Four modes here — Normal, Omit Request, Omit Response, or Omit Both — set per endpoint, so a team keeps full detail where it's safe and strips the body where it isn't.

## Segment 6 (screenshot: metrics survive omission)

And omitting the body doesn't mean flying blind. Status, model, latency, and cost keep flowing even when the prompt and response text are dropped — Lesson 14's dashboards still work.

## Segment 7 (outro)

Capture enough to debug, strip what you don't need to keep. Next up: turning that same logged metadata into cost and latency tracking you can actually watch.
