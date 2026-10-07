# Script — Resuming a Large Training Job

## Segment 1 (title)

A checkpoint sitting in solara-checkpoints only matters if it can actually be loaded back correctly — same weights, same optimizer momentum, same step count. This lesson covers dcp.load, and how to confirm a resumed run is actually healthy before trusting it.

## Segment 2 (code)

Resuming mirrors the save. Build the same model and optimizer first, then dcp.load pulls each rank's shard directly into it, using the metadata written at save time. No rank ever has to download or hold the full seventy-billion-parameter checkpoint by itself.

## Segment 3 (steps)

Because DCP's save isn't tied to one specific rank layout, the job that resumes after a failure doesn't need the exact same node count the failed run had. If only sixty nodes are free instead of the original sixty-four, dcp.load can reshard the saved state across sixty nodes' worth of ranks instead. A plain torch.save ties tensors tightly to the exact layout that wrote them — this doesn't.

## Segment 4 (steps)

In practice, the launch script finds the highest step number under the checkpoint prefix and confirms its metadata is fully written before trusting it — a checkpoint interrupted by the same failure being recovered from might be only partially saved. And loading without an exception isn't proof the resume worked; the real check is whether loss at that step continues roughly where it left off, rather than spiking.

## Segment 5 (outro)

dcp.load's resharding is what makes it possible to resume onto a different node count than the run that failed — which matters a lot once the next lesson introduces spot instances that can disappear and come back in different quantities. Next up, lesson twenty-one: spot and preemptible instances.
