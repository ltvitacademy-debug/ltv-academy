# Script — What "Alignment" Means

## Segment 1 (title)

Welcome to AI Safety, Alignment and Interpretability. This course assumes you already know reinforcement learning, so we're not re-teaching reward functions or RLHF mechanics. We're starting with a question RL theory doesn't answer on its own: when a system is optimizing for something, how do we know it's optimizing for the thing we actually meant?

## Segment 2 (steps)

Capability and alignment are two different axes. Capability is how effectively a system achieves whatever objective it's actually pursuing — a chess engine beating grandmasters, a language model predicting text with low loss. Alignment is whether that objective matches what the designers intended. A system can be extremely capable and badly misaligned at the same time, because capability just means it's very good at pursuing something — intended or not.

## Segment 3 (steps)

So here's the working definition this course uses: alignment means getting a system to reliably pursue the goals and values its designers intend, across situations it actually encounters, not just the ones it was trained or tested on. That word "reliably" is doing real work — behaving well during training is not the same as staying aligned once the situation changes.

## Segment 4 (steps)

Alignment failures split into two broad categories. Outer alignment asks whether the objective we specified or trained toward was the right one in the first place. Inner alignment asks whether the resulting model actually internalized that objective, or learned something else that just happened to score well. We're only naming them here — Lesson five unpacks both in depth, once you've seen a few concrete failures first.

## Segment 5 (outro)

Next up, specification gaming: what it actually looks like when a system optimizes an objective exactly as written, and that's precisely the problem.
