# Script — Loss Spikes & Training Instability

## Segment 1 (title)

A loss curve that's smoothly decreasing for days and then suddenly jumps upward is one of the most stressful events in a large pretraining run. Left alone, a bad spike can permanently damage the model; caught correctly, it's routine. Here's why spikes happen and how teams prepare for them.

## Segment 2 (steps)

Three causes show up again and again. A single pathological batch — corrupted bytes, a degenerate repeated token, or an unusually atypical document — can produce an unusually large gradient. A learning rate that's too aggressive for where training currently is, often right as warmup hits its peak. And numerical overflow in low precision, especially fp16's narrow exponent range, which requires loss scaling just to stay usable.

## Segment 3 (code)

That's why bf16 has become the default for large-scale pretraining — it trades some mantissa precision for fp32's wide exponent range, so it rarely overflows the way fp16 does. Paired with gradient clipping by global norm, usually capped around 1.0, any single bad step gets bounded instead of blowing up the whole run.

## Segment 4 (steps)

Clipping doesn't prevent every spike. When monitoring shows loss isn't recovering on its own — true divergence — the standard response is to roll back to the last good checkpoint, often skipping the offending data shard or trimming the learning rate slightly before resuming.

## Segment 5 (outro)

Bad shards, too-high learning rates, and precision overflow — those are the three to watch for. Up next: how you actually catch a spike in real time, before it costs a week of wasted compute.
