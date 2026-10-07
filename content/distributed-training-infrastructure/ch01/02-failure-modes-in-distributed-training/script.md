# Script — Failure Modes in Distributed Training

## Segment 1 (title)

A training run on solara-train can take days to weeks across all five hundred twelve GPUs. At that scale and duration, something failing isn't an edge case — it's an expected, recurring event. This lesson catalogs what actually breaks.

## Segment 2 (steps)

There are four broad categories. GPU hardware failures, where a memory error escalates into what NVIDIA calls an Xid error, and the GPU gets drained for a reboot. Network partitions, where a node drops off the fabric and NCCL blocks waiting on it. Stragglers — a rank that's still running, just noticeably slower, which quietly caps the whole job's throughput with no crash at all. And, rarest of all, silent data corruption, where a bit flip corrupts a gradient without raising any error whatsoever.

## Segment 3 (code)

NCCL won't let a hung collective wait forever. With NCCL_DEBUG set to INFO, a stuck AllReduce eventually surfaces a timeout warning that names the exact rank it was waiting on — turning a silent hang into something you can actually act on.

## Segment 4 (steps)

Here's why a single bad GPU can stall all five hundred twelve, not just itself. Collectives like AllReduce are synchronous — every rank has to arrive before any of them can proceed. So one straggler, one GPU running a little hot or stuck on a half-speed NIC, sets the pace for the entire job, and there's no error message telling you that's what happened. You have to know how to look, which is exactly what lesson eleven covers.

## Segment 5 (outro)

Hardware faults, network partitions, stragglers, silent corruption — that's the failure taxonomy this whole course's fault-tolerance chapter responds to. Up next, lesson three: drawing the line between this infrastructure work and the training algorithms running on top of it.
