# Training Run Observability

This chapter has covered checkpointing, fault tolerance, mixed precision, and straggler nodes — all things that either go wrong silently or require a human decision in the moment (restart? drain a node? lower the learning rate?). None of those decisions are possible without visibility into what the run is actually doing, step by step, across the whole cluster. This closing lesson of Chapter 6 covers what to log, what to watch for, and the tools that make a multi-week run legible instead of opaque.

## What you'll learn

- The core metrics every training run should log, and why each one matters
- What model FLOPs utilization (MFU) measures and why it's more informative than raw throughput alone
- Experiment tracking with Weights & Biases as the standard tool for run-level metrics
- Cluster-level observability (GPU health, network) as a separate layer from training metrics
- Why alerting on divergence matters more than dashboards nobody is watching at 3 a.m.

## The core metrics to log

At minimum, every training step should log: the training loss (and ideally a rolling average, since per-step loss is noisy), the gradient norm (a sudden spike often precedes or accompanies a loss spike, as covered in Lesson 17), the current learning rate (useful for sanity-checking the schedule is behaving as configured), and throughput in tokens per second. None of these alone tells the whole story — loss can look fine while throughput silently degrades from a straggler, and throughput can look fine while gradient norm spikes are about to destabilize training — which is why they're logged together, not as substitutes for each other.

## Model FLOPs utilization (MFU)

Raw tokens-per-second is useful but doesn't say whether the hardware is being used well, because it doesn't account for the model's size or the theoretical peak the hardware could deliver. Model FLOPs utilization expresses actual achieved FLOPs as a fraction of the GPU's theoretical peak FLOPs: `MFU = (tokens_per_second × 6 × num_params) / (num_gpus × peak_flops_per_gpu)` (the factor of 6 approximates FLOPs per token for a forward-plus-backward pass in a transformer). An MFU in the 40-55% range is considered good for large dense transformer training on modern GPU clusters; a number well below that signals the run isn't using the hardware it's paying for efficiently, pointing toward checking communication overhead, data loading bottlenecks, or kernel efficiency rather than assuming the model or data is the problem.

## Experiment tracking

```python
import wandb

wandb.init(project="llm-pretrain", config={"lr": 3e-4, "batch_size": 2048})

for step, batch in enumerate(dataloader):
    loss = train_step(model, batch, optimizer)
    wandb.log({
        "train/loss": loss.item(),
        "train/grad_norm": grad_norm,
        "train/lr": scheduler.get_last_lr()[0],
        "train/tokens_per_sec": tokens_per_sec,
        "train/mfu": mfu,
    }, step=step)
```

Weights & Biases (and comparable tools like TensorBoard) give the run a persistent, queryable history: comparing this run's loss curve against a previous run's, correlating a loss spike with a specific step and the hyperparameters active at that step, and sharing a live dashboard with the rest of the team without anyone needing shell access to the training machine.

## Cluster-level observability, separately

Training metrics (loss, throughput, MFU) answer "is the model learning well." A separate layer answers "is the hardware healthy": GPU utilization and memory, temperature, ECC error counts, and network link status, typically collected via NVIDIA's DCGM exporter feeding a Prometheus time-series database, visualized in Grafana dashboards alongside the rest of the cluster's infrastructure metrics. This is the layer that often surfaces a straggler (Lesson 38) or an impending hardware fault before it becomes a crash loud enough to need the fault-tolerance machinery from Lesson 36 at all.

## Alerting matters more than dashboards

A dashboard nobody is looking at during a 3 a.m. loss spike doesn't help. The practical discipline is setting alerts — a Slack or PagerDuty notification triggered when loss exceeds a threshold relative to its recent rolling average, when gradient norm spikes past a set multiple of its recent baseline, or when MFU drops below an expected floor for more than a few minutes — so a human gets pulled in automatically rather than discovering the problem hours later when they happen to check.

## Key terms

- **Gradient norm** — the magnitude of the gradient vector; a spike often precedes or accompanies training instability
- **Model FLOPs utilization (MFU)** — achieved compute as a fraction of a GPU's theoretical peak, a measure of hardware efficiency independent of raw throughput
- **Experiment tracking** — logging and persisting run metrics (loss, LR, throughput) to a queryable, shareable history, typically via Weights & Biases or TensorBoard
- **DCGM exporter** — NVIDIA's tool for exposing GPU health metrics (utilization, temperature, ECC errors) to monitoring systems like Prometheus
- **Divergence alerting** — automated notification when a training metric crosses an unhealthy threshold, rather than relying on a human watching a dashboard
