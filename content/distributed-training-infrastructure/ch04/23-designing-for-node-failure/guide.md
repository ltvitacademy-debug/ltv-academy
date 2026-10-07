# Designing for Node Failure

Lessons 18 through 22 covered each piece separately: why failure is expected, how checkpointing limits the damage, how spot instances introduce controlled risk, and how elastic training re-forms a job automatically. This lesson closes Chapter 4 by walking through what actually happens, end to end, when a node in solara-train genuinely fails mid-run — tying scheduling (Chapter 3), checkpointing, and elasticity into one response instead of four separate ideas.

## What you'll learn

- The full failure-to-recovery timeline for a node going bad mid-training, start to finish
- How the platform detects a bad node before NCCL's own timeouts would eventually surface it
- What happens to the failed node itself (cordon, drain, replace) versus what happens to the training job
- Why designing for failure means assuming it will happen repeatedly over a run's lifetime, not planning for "a failure"

## The failure-to-recovery timeline

1. **Detection.** A GPU or NIC on a node starts throwing errors, or simply stops responding to NCCL's heartbeat within its collective timeout. Kubernetes' own node health checks (kubelet's node-status reporting, covered in the Kubernetes Orchestration course) may notice the node went `NotReady` around the same time, but for training specifically, the first visible symptom is often a hung or failed collective inside the job itself, not a node-level Kubernetes signal.
2. **Elastic agent reacts.** Surviving ranks hit the timeout on their current collective call, matching Lesson 22's elastic behavior, and begin tearing down the current process group.
3. **The bad node gets cordoned.** Whether through automation watching for repeated NCCL errors from a specific node, or the Kubernetes node controller marking it `NotReady` for too long, the node is cordoned (`kubectl cordon`) so the scheduler stops placing new Pods on it — including a future replacement Pod for this same job.
4. **The job's remaining ranks re-form** via `c10d` rendezvous at a reduced world size, per Lesson 22.
5. **Training resumes from the last checkpoint** via `dcp.load` (Lesson 20) — not from scratch, and not from the exact in-flight step, but from at most ~30 minutes earlier (Lesson 19's interval).
6. **Karpenter or the cluster's node pool provisions a replacement node** (Lesson 17), and once it's healthy, the elastic job can grow back toward full size, or Volcano's gang scheduler picks the next job that needs it.
7. **The bad node is drained and investigated** separately, off the training path entirely — hardware diagnostics happen asynchronously and don't block the job's recovery.

## Detecting trouble before NCCL's timeout does

Waiting for a hung collective to time out (which can take minutes, depending on configuration) is the slowest possible detection path. The Solara ML Platform team also runs node-level health checks independent of any specific job — periodic `nvidia-smi` queries for ECC errors and Xid errors, and NVLink/InfiniBand link-status checks — so a degrading GPU can be cordoned *before* it causes the next job's collective to hang at all. Catching problems at this layer, ahead of the training job's own failure detection, is what separates a mature fault-tolerance setup from one that only reacts after the damage is already done.

## Cordon and drain: separating the node's fate from the job's fate

`kubectl cordon <node>` marks a node unschedulable without touching what's already running on it; `kubectl drain <node>` additionally evicts existing Pods so hardware diagnostics (or a repair ticket) can proceed without any workload still depending on it. Crucially, these are actions on the *node*, decoupled from Lesson 22's elastic re-formation on the *job* — the job doesn't wait for the node to be fully drained and diagnosed before resuming; it moves on with the ranks it has, while the node's own remediation happens in parallel on its own timeline.

## Design for repeated failure, not "a" failure

Across a training run spanning weeks on 512 GPUs, Lesson 18's math says to expect this sequence — detect, cordon, re-form, resume, replace — to happen more than once. Every piece covered in this chapter (checkpoint interval, elastic restart budget, autoscaler responsiveness) needs to hold up under repetition, not just survive a single rehearsed failure, which is the actual bar the Solara ML Platform team designs and tests against.

## Key terms

| Term | Meaning |
|---|---|
| Cordon | Marking a node unschedulable for new Pods without evicting what's already running |
| Drain | Evicting a node's existing Pods so it can be safely removed or repaired |
| Node-level health check | Detecting hardware degradation (ECC/Xid errors, link status) independent of any running job |
| Failure-to-recovery timeline | The full sequence from detecting a bad node through resuming training at full scale |

## Recap

Node failure during a Solara-70B run isn't handled by any single mechanism — it's detection, cordon/drain, elastic re-formation, checkpoint resume, and replacement provisioning working together, repeatedly, over the life of a run. That closes out Chapter 4's look at fault tolerance and checkpointing. Chapter 5 turns to a different bottleneck entirely: High-Throughput Data Loading, keeping 512 GPUs fed with training data fast enough that none of them sit idle waiting on I/O.
