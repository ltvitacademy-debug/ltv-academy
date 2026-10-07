# What a Training Run Actually Costs

Lesson 2 gave you the FLOPs-to-GPU-hours math. This lesson zooms out from a single formula to everything that shows up on the real invoice (or the real headcount sheet) for a large training run — because raw compute, while the biggest line item, is rarely the only one that matters.

## What you'll learn

- How to build a back-of-envelope compute-cost estimate from a reported GPU-hour figure
- The other cost categories beyond raw GPU time: data, failed runs, evaluation, and engineering time
- Why publicly reported GPU-hour figures are a useful real-world anchor for your own estimates
- Why "cost per training run" and "cost to reach a given capability" are different questions

## Starting from a real, published number

Meta's Llama 2 technical report publicly disclosed the GPU-hours used to pretrain each model size in the family, which gives us a real anchor point instead of a purely theoretical one. The 70B model in that family was reported to have used roughly 1.7 million A100-80GB GPU-hours of pretraining compute.

```python
def compute_cost(gpu_hours: float, dollars_per_gpu_hour: float) -> float:
    """Back-of-envelope compute cost from a GPU-hour figure."""
    return gpu_hours * dollars_per_gpu_hour

# Example using the Llama 2 70B reported GPU-hour figure
gpu_hours = 1_720_320  # as reported in the Llama 2 technical report
# Plug in whatever your own cluster's realistic $/GPU-hour is --
# on-demand list prices and negotiated large-cluster rates differ enormously.
example_rate = 2.00
print(f"${compute_cost(gpu_hours, example_rate):,.0f} at ${example_rate:.2f}/GPU-hour")
```

Treat the dollar figure in the code above as illustrative, not a market quote — real negotiated large-cluster pricing varies widely by provider, commitment length, and point in time, which is exactly why "GPU-hours" rather than a dollar figure is the number labs actually publish.

## The costs that don't show up in a FLOPs formula

- **Data acquisition and curation** — licensing deals, crawling and storage infrastructure, and the human and compute cost of the entire pipeline from Lesson 3 (extraction, filtering, deduplication) all happen *before* a single training token is consumed.
- **Failed and restarted runs** — large distributed training jobs experience hardware failures, loss spikes, and instability; a run that has to be rolled back and resumed from an earlier checkpoint effectively spends GPU-hours twice on the same stretch of training.
- **Evaluation** — running a candidate checkpoint against benchmark suites, held-out data, and (for alignment-tuned models) human or model-based preference evaluations, repeated at many checkpoints throughout training, not just once at the end.
- **Engineering and research headcount** — the people designing the architecture, tuning the data mixture, debugging distributed training infrastructure, and running the ablation experiments that inform the final run's hyperparameters.
- **Storage and networking** — checkpoints for a large model can be hundreds of gigabytes each, saved repeatedly throughout a run, plus the high-bandwidth interconnect (e.g., InfiniBand) required to keep GPUs fed during distributed training.

## "Cost of a run" vs. "cost of a capability"

A subtle but important distinction: the final, successful training run's GPU-hours are not the same thing as the total cost of reaching a given model's capability level. Most of that total cost is typically spent on smaller-scale experiments — ablations on data mixture, architecture variants, learning-rate schedules — that inform the decisions baked into the final large run. When you see a GPU-hour figure in a technical report, it usually describes only that final run, not the (often much larger) research investment that preceded it.

## Key terms

- **GPU-hour** — one GPU running for one hour; the standard unit labs use to report real training cost
- **Compute cost** — GPU-hours multiplied by a $/GPU-hour rate; highly sensitive to negotiated pricing
- **Ablation** — a smaller controlled experiment used to inform a design decision before committing to a full-scale run
- **Checkpoint** — a saved snapshot of model weights/optimizer state during training, used for resuming after failures

## Recap

Published GPU-hour figures like Llama 2's give a real anchor for compute-cost estimates, but the full cost of a training run also includes data curation, failed/restarted runs, repeated evaluation, engineering headcount, and storage/networking — and the final run's cost is only a fraction of what it took to reach that capability through earlier research and ablations. Next up, Lesson 6: how to actually read a model's technical report to find (or infer) numbers like these.
