# Script — Audit Logging for Agent Actions

## Segment 1 (title)

A decision that isn't written down durably might as well not have happened, when someone asks why the agent did that three weeks later. Audit logging answers that question before it's even asked.

## Segment 2 (code: what belongs in an entry)

An entry is built almost directly from the tool-calling round trip you already have: timestamp, the tool name and exact input, the session it happened in, whether approval was required and who gave it, and what the result actually was. The tool_use_id ties it back to the real API exchange.

## Segment 3 (steps: what to log)

Log more than successes. Log rejections — they're evidence your checkpoints are actually catching things. Log escalations — they show the pattern of who's actually deciding. And repeated rejections on the same tool are a signal the tool or the prompting needs fixing, not just that one call.

## Segment 4 (steps: append-only discipline)

One more rule. Write entries once, never edit them in place. If something needs correcting, append a new entry that references the original. A log that can be silently changed after the fact isn't an audit trail — it's just a note that looks like one.

## Segment 5 (outro)

A log tells you what happened. It doesn't undo it. Next up: what to do when an approved action turns out to be wrong after all — undo and rollback.
