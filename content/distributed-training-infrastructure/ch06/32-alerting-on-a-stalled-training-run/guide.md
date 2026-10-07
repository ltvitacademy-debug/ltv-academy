# Alerting on a Stalled Training Run

Lesson 31 covered how to check whether a training job is healthy — status conditions, logs, loss curves. All of it requires someone to actually go look. On a run that takes days to weeks, nobody is watching a dashboard continuously, which is exactly the gap alerting closes: turning "a human would notice this if they looked" into "a human gets paged automatically." This lesson covers how the Solara ML Platform team builds alerts specifically for the failure mode that's easy to miss — a training run that's technically still "Running" but has silently stalled.

## What you'll learn

- Why a stalled run is a specific, distinct failure mode from a crashed one
- How to write a PromQL expression that detects a stalled loss or GPU idle pattern
- The anatomy of a Prometheus Alertmanager rule, start to finish
- How alert routing uses the `training-lm` / `training-mm` namespace split to reach the right team

## Why "stalled" is its own failure mode

A crashed job is easy to catch — the `PyTorchJob` status flips to `Failed`, and that's a clear, discrete signal. A **stalled** job is harder: the process is alive, the pods are `Running`, GPUs might even show non-zero utilization, but training has effectively stopped making progress — a deadlocked NCCL collective, a data loader that's wedged, or a loss that's stopped decreasing. Nothing crashes, so nothing fires the obvious alert. Catching this requires watching a *trend* over time, not a single state.

## Detecting a stall with PromQL

Two independent signals catch most real stalls. First, GPU utilization dropping to near-zero for a job that's still marked `Running` — using the DCGM metrics from Lesson 29:

```
avg(DCGM_FI_DEV_GPU_UTIL{namespace="training-lm"}) by (job_name) < 5
```

Second, and more directly tied to actual training progress, a loss metric (exported by the training script as a custom Prometheus metric) that hasn't moved over an extended window:

```
# True when the loss value is unchanged for the last 30 minutes
changes(solara_training_loss{namespace="training-lm"}[30m]) == 0
```

Neither signal alone is perfect — a brief GPU dip during checkpointing (Chapter 4) is normal, and a loss can plateau briefly for legitimate reasons — which is why Alertmanager rules use a sustained duration (`for: 15m`), not an instant trigger, before firing.

## A full Alertmanager rule

```yaml
groups:
  - name: solara-training-stalls
    rules:
      - alert: TrainingJobStalled
        expr: |
          avg(DCGM_FI_DEV_GPU_UTIL{namespace=~"training-lm|training-mm"}) by (namespace, job_name) < 5
        for: 15m
        labels:
          severity: critical
        annotations:
          summary: "Training job {{ $labels.job_name }} in {{ $labels.namespace }} looks stalled"
          description: "GPU utilization has been under 5% for 15+ minutes while the job is still Running."
```

`for: 15m` means the condition has to hold continuously for 15 minutes before the alert actually fires — the sustained-duration requirement that filters out normal, brief dips.

## Routing alerts to the right team

Because `namespace` is a label on the alert itself, Alertmanager's routing config can send `training-lm` alerts to the language-modeling team and `training-mm` alerts to the multimodal team automatically, instead of paging the whole Solara ML Platform team for every stall:

```yaml
route:
  routes:
    - match:
        namespace: training-lm
      receiver: lm-team-slack
    - match:
        namespace: training-mm
      receiver: mm-team-slack
```

This is the same namespace split from Lessons 29 and 30, doing a third job: making sure the alert reaches whoever can actually act on it.

## Key terms

- **Stalled run** — a job still reporting `Running` whose actual training progress has stopped
- **PromQL `changes()`** — counts how many times a metric's value changed over a time window; zero means it's frozen
- **`for:` duration** — the sustained-condition window an Alertmanager rule requires before firing, filtering out brief, normal dips
- **Alert routing** — directing an alert to a specific receiver based on its labels, such as `namespace`

## Recap

A stalled run is a distinct failure mode from a crash — detected by watching GPU utilization and loss-metric trends over a sustained window, and routed to the right team using the same namespace labels that drove monitoring and cost attribution. That's the last of the course's monitoring and cost lessons. Next, Lesson 33 is the capstone: standing up a small training cluster that puts the whole course together.
