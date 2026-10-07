# Straggler Nodes & Synchronization

Lesson 36 covered nodes that crash or hang outright. This lesson covers a quieter but surprisingly costly problem: a node that never fails at all, it just runs slower than the rest of the fleet, step after step. In synchronous data-parallel training, that's enough to drag down every other GPU in the job, because they all have to wait for it.

## What you'll learn

- Why synchronous data parallelism makes the whole job as slow as its slowest member
- Common causes of straggler nodes: hardware variance, thermal throttling, network topology, noisy neighbors
- How to detect a straggler using per-step timing, not just aggregate throughput
- Mitigations: NCCL timeout tuning, node draining, and why asynchronous training isn't the usual fix
- How straggler detection fits alongside the fault-tolerance machinery from Lesson 36

## Why one slow node slows down everyone

In standard synchronous data parallelism, every rank computes its local gradients and then participates in an all-reduce to average them across all ranks before anyone takes an optimizer step. An all-reduce is a *synchronization point* — every participating rank has to arrive at it before any of them can proceed past it. If one rank takes 20% longer to finish its forward and backward pass than the rest, every other rank sits idle for that extra 20%, waiting at the all-reduce. The job's effective throughput is bounded by its single slowest member in every step, not by the average — one chronically slow GPU among a thousand can measurably tax the entire run's wall-clock time.

## What causes a straggler

A node can be the straggler for reasons that have nothing to do with a fault serious enough to crash it: manufacturing variance means no two GPUs are perfectly identical in clock behavior under load; thermal throttling kicks in when a specific node's cooling is marginally worse and it heats up faster under sustained load, clocking itself down to stay within thermal limits; network topology means nodes farther from the switch fabric's center, or sharing a network link with other noisy jobs on a shared cluster, see higher latency on their collective communication; and a "noisy neighbor" — another job or process competing for the same shared resources (network bandwidth, storage I/O) — can intermittently slow a node without that node itself being unhealthy at all.

## Detecting a straggler

Aggregate job throughput (tokens/sec across the whole run) will drop if there's a straggler, but it won't tell you *which* node is responsible. The useful signal is per-rank, per-step timing: logging how long each rank spends in its forward/backward pass before it reaches the all-reduce, and comparing ranks against each other rather than against a global average. A rank that's consistently, say, 15-20% slower than its peers across many consecutive steps — not just an occasional blip — is a straggler worth investigating, as distinct from the general network jitter that affects every rank a little.

```python
import time
import torch.distributed as dist

start = time.perf_counter()
loss.backward()
local_compute_time = time.perf_counter() - start

# Gather timing from all ranks to rank 0 for comparison
gathered = [None] * dist.get_world_size()
dist.all_gather_object(gathered, local_compute_time)
```

## Mitigations

There's no single fix, because the causes differ: thermal and hardware-variance stragglers are often best handled by draining the slow node out of the job and letting the elastic restart machinery from Lesson 36 bring in a replacement; network-topology stragglers may be reduced by rack-aware scheduling that keeps a job's ranks topologically close together. Tuning the NCCL timeout (`timeout` in `init_process_group`) doesn't fix a straggler, but it bounds how long the job will tolerate one before treating it as a hard failure and triggering recovery, which keeps a persistently slow node from silently taxing the run indefinitely. Fully asynchronous training (ranks not waiting for each other at all) sidesteps the synchronization bottleneck in principle, but it introduces gradient staleness that complicates convergence, which is why most large LLM training runs stay synchronous and manage stragglers operationally instead.

## Key terms

- **Straggler node** — a node that runs measurably slower than its peers without crashing or hanging outright
- **Synchronization point** — a point (like an all-reduce) where every rank must arrive before any can proceed
- **Thermal throttling** — a GPU reducing its clock speed to stay within temperature limits under sustained load
- **Noisy neighbor** — another workload competing for shared cluster resources, intermittently slowing a node that is otherwise healthy
- **Gradient staleness** — the lag between when a gradient was computed and when it's applied, a cost of relaxing strict synchronization
