# Lesson 31 — Case Study: A Training Run That Silently Wasted a Week's Worth of GPU Spend

**Chapter 8 · Capstone: Building Production AI Infrastructure · Lesson 31 of 32**

**This lesson is an illustrative, fictional scenario** built on the Solari Vision Labs storyline
from Lessons 29–30, written to make Chapter 6's FinOps warnings concrete rather than abstract. It
is not a report of a real company or a real incident.

## What you'll learn

- How a training job can finish or stall internally while its Kubernetes Job object still shows
  `Running`, and why that gap is exactly what lets GPU spend keep accumulating unnoticed
- Why "the job is still running" and "the GPU is still doing useful work" are two different
  claims, and why monitoring only the first one misses this entire failure mode
- What a job-completion alert and an idle-GPU-utilization alert each catch that the other one
  doesn't
- How this incident is the direct, concrete version of the abstract cost-velocity warning from
  Chapter 6, Lesson 21

## The incident

Solari Vision Labs' six-GPU training cluster from Lesson 29 is healthy and the serving endpoint
from Lesson 30 is live. An ML engineer kicks off a routine fine-tuning run on a Friday afternoon —
the same `defect-model-training-run-42`-style Job from Lesson 29, this time requesting four GPUs
for an expected six-to-eight-hour run — and goes home for the weekend, trusting the Job to finish
and the cluster to carry on as normal.

The training script does finish its forty epochs late Friday night and writes its final
checkpoint successfully. But the script also launched a background thread earlier, for
asynchronously uploading training-curve images to an internal dashboard, and that thread is not a
daemon thread — it never exits on its own. The main training loop returns, but the Python process
itself never terminates, because a non-daemon thread is still technically alive. Kubernetes sees a
container that is still running, because from its perspective, nothing is wrong: the process has
not exited, so the Job is not marked `Completed`, and the four GPUs it requested are still held,
`Running`, all weekend and into the following week.

## Why nobody noticed for days

Two separate monitoring gaps let this run completely unnoticed until the following Thursday, when
someone reviewing the week's cloud bill flags an unfamiliar spike:

**No alert on job duration.** Nothing in Solari's monitoring asked "is this training Job still
`Running` well past how long a training Job like this normally takes?" A Job object showing
`Running` for six hours looks identical, to any dashboard that only checks job *status*, to one
showing `Running` for six days. Status alone can't distinguish a healthy long job from a stalled
one — only comparing elapsed time against an expected duration can.

**No alert on idle GPU utilization.** Once the training loop actually finished, the four GPUs it
held sat essentially idle — periodically touched by the stray upload thread, but with GPU
utilization dropped to roughly 1–2%, far below any level actually doing training work. Chapter 6,
Lesson 24 covered tagging and GPU-scoped budgets, but Solari hadn't yet put a GPU-scoped budget or
anomaly-detection alert in place at the time — the gap this case study is really about is the
monitoring layer underneath that: nothing was watching the DCGM `GPU_UTIL` metric itself for a
training node sitting near zero for hours at a stretch, which is the earliest and most direct
signal that something stalled, well before any dollar figure would show up on a bill.

## What finally surfaced it, and how much it cost

The Thursday cloud-bill review is what actually caught it — four days after the job should have
finished, not hours. Four `Standard_NC24ads_A100_v4` GPUs, held idle at the premium rate Chapter 6,
Lesson 21 described, for roughly four extra days, is the kind of mistake that "would take a whole
fleet of idle web servers to match," in that lesson's words — except here it was one stuck thread,
not a fleet-wide problem, that did it.

## The two alerts that should have existed from the start

```yaml
# PrometheusRule: catch a Job that's run far longer than expected
groups:
  - name: training-job-health
    rules:
      - alert: TrainingJobRunningTooLong
        expr: time() - kube_job_status_start_time{job_name=~".*-training-run-.*"} > 28800
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "Training job {{ $labels.job_name }} has been running over 8 hours"
```

```yaml
# PrometheusRule: catch GPUs sitting idle on an expensive training node
groups:
  - name: idle-gpu-alert
    rules:
      - alert: TrainingGPUIdle
        expr: avg_over_time(DCGM_FI_DEV_GPU_UTIL{node_role="gpu-training"}[30m]) < 5
        for: 30m
        labels:
          severity: warning
        annotations:
          summary: "GPU utilization under 5% for 30+ min on a training node -- job likely stalled or finished without exiting"
```

Neither alert alone would have been enough on its own to fully explain the problem, but either one
would have caught it within an hour of the job actually finishing, instead of four days later. The
duration alert catches "this took too long" regardless of why; the utilization alert catches "this
GPU isn't doing real work anymore" regardless of what Kubernetes thinks the Job's status is — and
together they're the concrete version of Chapter 6's abstract warning that GPU cost velocity gives
you far less room for delay than a general cloud-cost review does.

## Key terms

| Term | Meaning |
|---|---|
| Non-daemon thread | A background thread that keeps a process alive even after its main logic has returned, blocking a container from exiting |
| Job status vs. GPU utilization | Two independent signals -- a Job can show `Running` while its GPUs are doing no real work at all |
| Job-duration alert | Fires when a Job has been `Running` longer than its expected duration, regardless of what's actually happening inside it |
| Idle-GPU alert | Fires on sustained low DCGM GPU utilization on a training node, catching a stalled job even if Kubernetes still sees it as healthy |

## Check yourself

You're ready for Lesson 32 when you can explain, without looking: why could Solari's training Job
show `Running` in Kubernetes for days after the actual training work had finished, and which of
the two alerts in this lesson would have caught the problem first -- and why would you want both,
not just one?
