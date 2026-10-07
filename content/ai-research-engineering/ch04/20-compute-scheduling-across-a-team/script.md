# Script — Compute Scheduling Across a Team

## Segment 1 (title)

A research team never has unlimited GPUs. The moment more than one person wants to run experiments on a shared cluster, someone has to decide whose job runs now and whose waits — made deliberately by a scheduler and a policy, or made accidentally by whoever submits first.

## Segment 2 (steps)

Most cluster schedulers combine three mechanisms. Priority tags jobs with a tier that lets them jump the queue. Fair-share tracks each user's recent resource usage and lowers their effective priority the more they've already consumed, so one person's sweep doesn't dominate forever. Preemption lets a lower-priority running job be suspended to free resources for a higher-priority one, then automatically requeued.

## Segment 3 (code)

In Slurm, you submit with an explicit quality-of-service tag, and sshare shows your current fair-share factor — how your recent usage is affecting your priority right now.

## Segment 4 (code)

Kubernetes expresses the same idea with PriorityClass: a pod with a higher priority value can preempt a lower-priority one, which gets evicted and automatically requeued rather than simply failing.

## Segment 5 (outro)

Priority, fair-share, and preemption handle resource contention mechanically — but someone still has to decide which experiments are worth running in the first place. That's next: prioritizing experiments under compute constraints.
