# Script — Designing for Node Failure

## Segment 1 (title)

The last four lessons covered each piece separately: why failure is expected, how checkpointing limits the damage, how spot instances add controlled risk, and how elastic training re-forms a job automatically. This lesson closes the chapter by walking through what actually happens, end to end, when a node genuinely fails mid-run.

## Segment 2 (steps)

A GPU or NIC starts throwing errors, or stops responding within NCCL's timeout. Surviving ranks hit that timeout and begin tearing down the current process group. The bad node gets cordoned so the scheduler stops placing new pods there, and the job's remaining ranks re-form through rendezvous at a reduced size.

## Segment 3 (code)

Training resumes from the last checkpoint, not from scratch — at most about thirty minutes of progress lost. Meanwhile a replacement node gets provisioned separately, and the bad node is cordoned and drained for diagnostics on its own timeline. Cordon stops new pods from landing on it; drain evicts what's already running, so hardware repair can proceed without anything depending on it.

## Segment 4 (steps)

Waiting for a hung collective to time out is the slowest possible way to notice trouble. The platform team also runs node-level health checks independent of any job — checking for ECC and Xid errors, link status — so a degrading GPU can be cordoned before it ever causes a collective to hang in the first place.

## Segment 5 (outro)

Across a run spanning weeks on five hundred twelve GPUs, this whole sequence should be expected to repeat, not happen once — every piece in this chapter has to hold up under repetition. That closes out fault tolerance and checkpointing. Next up, chapter five, lesson twenty-four: high-throughput data loading, keeping five hundred twelve GPUs fed fast enough that none sit idle.
