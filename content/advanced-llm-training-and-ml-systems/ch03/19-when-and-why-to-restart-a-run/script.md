# Script — When & Why to Restart a Run

## Segment 1 (title)

The dashboard from last lesson exists to feed one recurring decision: given what's on screen right now, do you let the run keep going, or stop and resume from an earlier point? Get that call wrong in either direction and you waste real compute.

## Segment 2 (code)

None of this works without frequent checkpointing — saving model weights, optimizer state, and scheduler step to durable storage every few hundred to low-thousands of steps. Checkpoint too rarely and a bad event costs more before you can roll back; checkpoint too often and you pay in I/O overhead instead.

## Segment 3 (steps)

The unambiguous trigger is non-recovering divergence: loss and gradient norm spike and don't come back down within a reasonable window, commonly a few hundred steps. Past that point every additional step just moves the model further from usable, so you stop, find the last checkpoint before the spike, and resume from there.

## Segment 4 (steps)

Not every restart follows a dramatic crash, though. A gradual upward drift in gradient norm with no sharp spike, evaluation loss diverging from training loss over time, or discovering mid-run that a data-mixture weight was set wrong — all justify the same stop-and-resume decision, because continuing on a known-bad configuration wastes compute just as surely.

## Segment 5 (outro)

A single spike that recovers within a couple hundred steps, with gradient norm back in band, is usually just noise — restarting for that wastes more than it saves. That judgment call, blip versus trend, is the skill. Next up: testing design choices cheaply at small scale, before they're baked into the real run.
