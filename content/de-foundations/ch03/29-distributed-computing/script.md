# Lesson 29 — Distributed Computing · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Before Lesson 30 introduces Spark's specific parts, it's worth
understanding the general idea underneath all of it: distributed
computing.

## S2 · STEPS CARD (the general idea)

One machine works through twelve months of data sequentially. Twelve
machines, each handling one month at the same time, finish in roughly
the time it takes to process just one month — not twelve times that.

## S3 · CODE CARD (data locality)

But splitting the work isn't free. Moving data across a network is
slow — genuinely the actual bottleneck in most distributed systems.
So the real trick is data locality: send a tiny piece of code to
where the data already lives, instead of dragging the data somewhere
else.

## S4 · STEPS CARD (fault tolerance)

And with enough machines running long enough, one of them WILL fail
eventually — that's not an edge case, it's a certainty. Distributed
systems plan for exactly this: if a machine fails mid-task, that work
gets redone somewhere else in the cluster. The whole job doesn't fail
with it.

## S5 · OUTRO CARD

Move code to data. Plan for failure as normal. Next lesson: Spark's
actual architecture — the real components built specifically to
implement these two ideas. See you there.
