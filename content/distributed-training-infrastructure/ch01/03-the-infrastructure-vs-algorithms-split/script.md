# Script — The Infrastructure vs. Algorithms Split

## Segment 1 (title)

Lesson one mentioned that this course draws a hard line between infrastructure and algorithms. This lesson makes that line precise, because it's the most useful way to decide what belongs here versus in the companion course, Advanced LLM Training and ML Systems.

## Segment 2 (steps)

Here's the test. Ask: if you changed this decision, would the model's final weights come out numerically different, given the same hardware? If yes, that's an algorithm decision. If the model is mathematically indifferent to it — it just runs faster or slower, or survives failures better — that's an infrastructure decision.

## Segment 3 (steps)

On the infrastructure side, this course's four chapters map directly onto that test. Does the network keep compute as the bottleneck, not communication? Does scheduling share the cluster fairly between two research teams? Does fault tolerance let a job resume from its last checkpoint instead of starting over? And does storage feed data loaders fast enough that GPUs never sit idle? None of those change the model's final weights — they only change speed and reliability.

## Segment 4 (code)

Here's where it gets interesting. FSDP sits on both sides at once. Choosing to use FSDP, and choosing exactly how to shard parameters across GPUs, is an algorithms decision — it changes memory use and communication patterns. But once that choice is made, actually launching it correctly across sixty-four nodes, and making sure NCCL moves its traffic fast, is squarely this course's job.

## Segment 5 (outro)

One test: does it change the weights? If yes, algorithms. If it only changes speed or reliability, infrastructure — and that's what the rest of this course covers. Up next, lesson four: reading a cluster topology diagram, your first concrete infrastructure skill.
