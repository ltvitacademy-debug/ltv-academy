# Training Job Observability

Lessons 29 and 30 covered hardware signals — GPU utilization and cost — that exist whether or not anyone's watching. This lesson is about a different layer: observing the **training job itself**. Is the `PyTorchJob` actually running, or stuck in a pending state waiting for GPUs? Are all the worker pods healthy? Is the loss curve moving the way it should? A node full of busy, correctly-utilized H100s doesn't help if the job wrapped around them has silently stopped making progress.

## What you'll learn

- How to read a `PyTorchJob`'s own status conditions, separate from pod-level health
- Where the Kubeflow Central Dashboard fits as a navigation point across notebooks, pipelines, and training jobs
- How to pull logs from a multi-pod distributed job without checking each pod by hand
- Why loss-curve observability (via TensorBoard) is a different concern from infrastructure metrics

## Reading `PyTorchJob` status directly

The Kubeflow Training Operator tracks a `PyTorchJob`'s lifecycle as its own Kubernetes object, independent of the health of any individual pod:

```bash
kubectl get pytorchjobs -n training-lm

NAME                READY   STATE     AGE
solara70b-run-114   8/8     Running   14h

kubectl describe pytorchjob solara70b-run-114 -n training-lm
# Conditions: Created -> Running -> (Succeeded | Failed)
```

A job can show `Running` while one of its worker pods is actually in `CrashLoopBackOff` — the Training Operator reports the job-level condition, but catching *why* a job is unhealthy still means looking at pod-level status underneath it. The two layers answer different questions: job status says what the Training Operator believes the job's lifecycle state is; pod status says what's actually happening to the containers running it.

## The Kubeflow Central Dashboard

Kubeflow's **Central Dashboard** is the web UI the Solara ML Platform team and both research teams use as a starting point for navigating everything Kubeflow manages — notebooks, pipelines, and, via the linked documentation, the Training Operator managing every `PyTorchJob`:

![The Kubeflow Central Dashboard homepage, showing a left navigation sidebar (Notebooks, TensorBoards, Volumes, Katib Experiments, Pipelines) and panels for Quick Shortcuts, Recent Notebooks, Recent Pipelines, and Recent Pipeline Runs](/courses/distributed-training-infrastructure/ch06/31-training-job-observability/kubeflow-central-dashboard.png)
*The real Kubeflow Central Dashboard homepage — the entry point researchers on both the language-modeling and multimodal teams use to reach their notebooks, pipeline runs, and training job tooling.*

A researcher checking on a run doesn't typically start with raw `kubectl` — they start here, then drill into the specific tool (TensorBoard for loss curves, a notebook for ad-hoc debugging, or `kubectl`/Grafana for the platform-team-level view this course has been building toward).

## Pulling logs across many pods at once

A `PyTorchJob` training Solara-70B across 64 nodes means 64 separate worker pods, each producing its own logs. Checking them one at a time doesn't scale:

```bash
kubectl logs -n training-lm -l training.kubeflow.org/job-name=solara70b-run-114 \
  --all-containers --prefix --tail=50
```

The label selector (`training.kubeflow.org/job-name`) is set automatically by the Training Operator on every pod belonging to the job, which is what makes a single log query across all 64 workers possible instead of 64 manual ones.

## Loss curves: a different kind of signal

GPU utilization and job status both answer "is the infrastructure healthy." They don't answer "is the model actually learning." For that, the Solara ML Platform team relies on **TensorBoard**, fed by scalar summaries the training script writes out during each step — loss, learning rate, gradient norm. A job can be `Running`, fully utilizing its GPUs, and still be training on a diverging loss curve; infrastructure observability and training observability are genuinely separate concerns, and a healthy dashboard on one doesn't guarantee the other.

## Key terms

- **PyTorchJob status conditions** — the Training Operator's own tracked lifecycle state for a job (Created, Running, Succeeded, Failed)
- **Kubeflow Central Dashboard** — the web UI for navigating notebooks, pipelines, and training tooling
- **Label selector** — a Kubernetes query (e.g. by `job-name`) used to target all pods belonging to one distributed job at once
- **TensorBoard** — the tool used to observe training-level signals like loss curves, separate from infrastructure metrics

## Recap

Training job observability means watching the job's own status conditions, pulling logs across every worker pod at once with a label selector, and tracking loss curves in TensorBoard — a layer entirely separate from, and just as necessary as, the GPU-level metrics Lesson 29 covered. Next, Lesson 32 turns observability into action: alerting automatically when a training run stalls.
