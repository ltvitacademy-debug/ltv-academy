# Monitoring a Pretraining Run

Everything in the last two lessons — spotting a spike, judging whether the schedule is behaving — depends on actually watching the right signals while the run is in progress. A pretraining run can last weeks, costs can run into the hundreds of thousands or millions of dollars, and nobody is staring at raw terminal output the whole time. This lesson covers what a training dashboard actually shows, and which signals matter most.

## What you'll learn

- The core metrics every pretraining dashboard tracks, and what each one tells you
- Gradient norm as an early-warning signal, distinct from the loss curve itself
- Throughput metrics (tokens/sec, MFU) and why they matter for cost, not just correctness
- How experiment-tracking tools like Weights & Biases fit into the workflow
- What a healthy run looks like at a glance, vs. one that needs attention

## The core metrics

Every pretraining run logs a small set of metrics on every step (or every few steps) to an experiment tracker:

- **Training loss** — the primary signal, usually the cross-entropy loss on the current batch, logged as a (noisy) curve that should trend down.
- **Learning rate** — logged directly from the scheduler so you can visually correlate spikes or stalls with where you are in the warmup/decay curve.
- **Gradient norm** — the global L2 norm of gradients before clipping. This is often the earliest warning sign of trouble: a gradient-norm spike frequently precedes or coincides with a loss spike, and a gradual upward drift in typical gradient norm over many steps can indicate the run is drifting toward instability before loss visibly moves.
- **Evaluation loss / held-out perplexity** — loss computed periodically on a held-out validation set (not used for training), which catches overfitting or data-leakage issues that training loss alone won't show.

## Throughput: tokens/sec and MFU

Correctness metrics tell you if the run is working; throughput metrics tell you if it's working *efficiently*, which matters enormously at this cost scale:

- **Tokens per second** — raw training throughput, the most direct read on "are we on schedule to finish."
- **Model FLOPs utilization (MFU)** — the fraction of a GPU's theoretical peak FLOPs that's actually being used for useful model computation. A well-tuned large-scale run commonly achieves MFU somewhere in the 30-55% range on modern accelerators; a sudden drop in MFU with no change in loss behavior usually points to an infrastructure problem (a slow node, a data-loading bottleneck, a communication stall between GPUs) rather than anything about the model itself.

```python
# Minimal example of what gets logged per step
import wandb

wandb.init(project="pretrain-run", config={"peak_lr": 3e-4, "warmup_steps": 2000})

for step, batch in enumerate(dataloader):
    loss = model(**batch).loss
    loss.backward()
    grad_norm = torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
    optimizer.step()
    scheduler.step()
    optimizer.zero_grad()

    wandb.log({
        "train/loss": loss.item(),
        "train/grad_norm": grad_norm.item(),
        "train/lr": scheduler.get_last_lr()[0],
        "train/tokens_per_sec": tokens_this_step / step_time,
    }, step=step)
```

## Experiment tracking in practice

Tools such as Weights & Biases (`wandb`) or TensorBoard turn this stream of logged scalars into live, shareable dashboards: loss and gradient-norm curves updating in real time, the ability to compare the current run against a previous one on the same chart, and alerting when a metric crosses a threshold. In practice, the person on call for a pretraining run is watching a dashboard, not a terminal — and the specific habit worth building is checking gradient norm and loss together, since a spike that shows up in both is a much stronger signal than either one alone.

## What healthy vs. unhealthy looks like

A healthy run shows: loss trending down with typical noise, gradient norm fluctuating in a stable band without a sustained upward drift, MFU roughly flat at whatever level the infrastructure was tuned to deliver, and evaluation loss tracking training loss without a widening gap. An unhealthy run shows one or more of: a loss or gradient-norm spike that doesn't recover within a few hundred steps, MFU dropping and staying down (an infra issue, not a model issue), or evaluation loss diverging upward while training loss keeps falling (a sign of a problem with the held-out data itself, or in rarer cases, leakage). Recognizing these patterns quickly is what lets a team decide, in the next lesson, exactly when a restart is warranted.

## Key terms

- **Gradient norm** — the global L2 norm of gradients before clipping; often the earliest warning of instability
- **MFU (Model FLOPs Utilization)** — the fraction of a GPU's theoretical peak FLOPs actually used productively
- **Held-out evaluation loss** — loss on data never used for training, logged periodically to catch overfitting or leakage
- **Experiment tracker (e.g., Weights & Biases, TensorBoard)** — the dashboard tooling that turns logged scalars into live, shareable charts
