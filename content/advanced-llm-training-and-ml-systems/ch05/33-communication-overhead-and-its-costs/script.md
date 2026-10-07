# Script — Communication Overhead & Its Costs

## Segment 1 (title)

Every technique in this chapter has been described partly in terms of how much communication it needs -- all-reduces, all-gathers, point-to-point hand-offs. This lesson makes that cost concrete: what actually gets moved, what determines how long it takes, and why the same technique can be cheap on one cluster and expensive on another.

## Segment 2 (steps)

Communication cost has two separate parts: bandwidth, how much data can move per second once a transfer starts, and latency, the fixed delay before any data arrives at all. A big gradient all-reduce is mostly bandwidth-bound. Pipeline parallelism's frequent small point-to-point sends are more latency-sensitive -- lots of small messages, each with its own fixed overhead.

## Segment 3 (steps)

That's why the interconnect hierarchy matters so much. NVLink and NVSwitch, direct GPU-to-GPU links within a server, are the fastest tier by a wide margin -- hundreds of gigabytes per second. InfiniBand is the common choice between servers, built specifically for this kind of low-latency collective traffic. Standard Ethernet is far slower and higher-latency by comparison -- fine for less communication-intensive jobs, a poor fit for tightly coupled model-parallel training spanning multiple nodes.

## Segment 4 (code)

Rather than guessing where time goes, PyTorch's profiler shows it directly. Profile the CUDA activity around a backward pass and optimizer step, and the resulting table breaks down time by operation -- including the NCCL collective calls like all-reduce and all-gather -- so you can see clearly whether a run is compute-bound or actually stalling on communication.

## Segment 5 (outro)

The takeaway from this whole chapter: every parallelism choice is really a choice about which communication pattern crosses which network tier, and how much that tier can tolerate. Next, the final lesson of the chapter puts every lever covered so far into one real training configuration.
