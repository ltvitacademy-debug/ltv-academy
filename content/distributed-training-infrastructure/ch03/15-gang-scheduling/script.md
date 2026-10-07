# Script — Gang Scheduling

## Segment 1 (title)

Imagine Kubernetes places fifty of Solara-70B's sixty-four required pods, then runs out of free GPUs because another job claimed the rest. Those fifty pods sit there, holding four hundred H100s idle, waiting for fourteen more that may not show up for hours. That's exactly the failure gang scheduling exists to prevent.

## Segment 2 (steps)

Kubernetes' default scheduler places pods one at a time, independently, as capacity frees up — fine for a service, actively harmful for training. A job with fifty of sixty-four pods running is doing nothing useful, because the master blocks waiting for every rank to join. Worse, two large jobs half-scheduled at once can deadlock, each holding GPUs the other one needs.

## Segment 3 (code)

Gang scheduling adds an all-or-nothing rule: pods are only placed once there's room for every single one of them at once. Volcano implements this with a PodGroup and a minMember field — here, all sixty-four pods, matched to a minResources request of the full five hundred twelve GPUs. Volcano holds everything pending until it can place the whole batch in one pass.

## Segment 4 (steps)

This matters because NCCL's collective operations are synchronous across every rank — there's no running a collective with the ranks you happen to have. Without gang scheduling, a partial start just means a hung rendezvous holding GPUs that are doing nothing. With it, either the whole job gets its full allocation, or none of its pods start consuming GPUs at all.

## Segment 5 (outro)

That all-or-nothing guarantee is the one thing the plain Kubernetes scheduler doesn't give you on its own. Next up, lesson sixteen: Kubernetes versus Slurm, pulling the last four lessons together into one comparison.
