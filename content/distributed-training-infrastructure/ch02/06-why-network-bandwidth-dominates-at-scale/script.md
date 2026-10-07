# Script — Why Network Bandwidth Dominates at Scale

## Segment 1 (title)

Chapter one closed with a wall-clock estimate that assumed the network keeps up. This lesson is about why that assumption needs defending. At five hundred twelve GPUs, the amount of data that has to move between them every single step is enormous.

## Segment 2 (steps)

Solara-70B has seventy billion parameters. With FSDP's pattern of reduce-scatter and all-gather, both the parameters and the gradients have to move through the fabric — roughly two bytes each in BF16 — which works out to around two hundred eighty gigabytes moving collectively across all five hundred twelve GPUs, on every single step, every few seconds, for the entire thirty three point six day run.

## Segment 3 (code)

Here's the formula for how long a ring-style collective takes to move a payload of size S across N GPUs at bandwidth beta. As N grows large, the term N minus one over N approaches one — so the per-GPU communication time stays roughly constant no matter how many GPUs you add. That's good for scaling the algorithm itself, but it means the absolute time spent communicating doesn't shrink just because you added more compute.

## Segment 4 (steps)

Here's why that matters. Per-GPU compute time shrinks as you add more GPUs, since each one does less work. But per-GPU communication time stays flat. So the ratio of useful compute to communication gets worse, not better, as the cluster grows — which is exactly why bandwidth, something you could mostly ignore on one eight-GPU node, becomes the dominant constraint at five hundred twelve.

## Segment 5 (outro)

The mitigation isn't just more bandwidth — it's overlap, starting the communication for one layer's gradients while the backward pass still computes the next layer's. NCCL is built asynchronous specifically to make that possible. Up next, lesson seven: NCCL itself, the library that implements these collectives on solara-train.
