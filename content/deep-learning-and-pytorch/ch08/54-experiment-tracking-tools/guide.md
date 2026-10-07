# Experiment Tracking Tools

Printing loss to the terminal works fine for one run. It stops working the moment you're comparing twenty runs with different learning rates, or trying to remember which configuration produced last week's best checkpoint. Experiment tracking tools exist to solve exactly that: they log your metrics, hyperparameters, and sometimes artifacts to a place you can browse, search, and compare later. This lesson covers the two most common ones you'll run into: TensorBoard and Weights & Biases.

## What you'll learn

- How to log scalars during training with PyTorch's built-in `SummaryWriter` (TensorBoard)
- How to log the same metrics to Weights & Biases (`wandb`) with a comparable amount of code
- What each tool is actually good at, and when you'd reach for one over the other
- The habit to build now: log config alongside metrics, not metrics alone

## TensorBoard: built into PyTorch

`torch.utils.tensorboard.SummaryWriter` writes log files that the `tensorboard` command-line tool then serves as a local dashboard. No account, no external service — everything stays on your machine.

```python
from torch.utils.tensorboard import SummaryWriter

writer = SummaryWriter(log_dir="runs/exp1")

for step, (inputs, targets) in enumerate(train_loader):
    loss = train_step(model, inputs, targets, optimizer)
    writer.add_scalar("loss/train", loss, step)

writer.close()
# then, from a terminal: tensorboard --logdir runs
```

Because it's part of PyTorch itself (no extra service, no API key), TensorBoard is a reasonable default for solo work and for the lab-style experimentation you've been doing throughout this course.

## Weights & Biases: hosted, built for comparing runs

`wandb` is a third-party service (with a free tier) built specifically around comparing many runs side by side — overlaying loss curves from different hyperparameter choices in one view, and keeping every run's configuration searchable. The logging code looks almost identical to TensorBoard's:

```python
import wandb

wandb.init(project="tiny-gpt", config={"lr": 3e-4, "batch_size": 64})

for step, (inputs, targets) in enumerate(train_loader):
    loss = train_step(model, inputs, targets, optimizer)
    wandb.log({"loss/train": loss, "step": step})

wandb.finish()
```

The real difference isn't the logging call — it's what happens on the other end. `wandb.init(config=...)` attaches the hyperparameters to that specific run permanently, so weeks later you can filter "show me every run with `lr` above 1e-3" without digging through old scripts or commit history.

## Which one, when

TensorBoard costs nothing to set up, runs entirely locally, and is genuinely enough for a lot of work — especially if you're the only one looking at the results. Reach for `wandb` (or a similar hosted tool) once you're running enough experiments that comparing them by eye in separate TensorBoard tabs stops scaling, or once more than one person needs to look at the same runs. Both tools can log scalars, images, histograms, and more; the comparison in this lesson is scoped to the scalar logging you'll use constantly.

## The habit: log config, not just metrics

Whichever tool you use, the mistake to avoid is logging loss curves without also logging the hyperparameters that produced them. A loss curve with no record of its learning rate, batch size, or model size is much less useful six runs later, when you're trying to figure out which change actually helped.

## Key terms

| Term | Meaning |
|---|---|
| `SummaryWriter` | PyTorch's built-in TensorBoard logger; writes local log files, no external account |
| `tensorboard --logdir` | The command that serves TensorBoard's dashboard from logged files |
| `wandb.init(config=...)` | Starts a tracked run and permanently attaches its hyperparameters for later filtering |
| Experiment tracking | Logging metrics and configuration somewhere searchable, instead of only printing to a terminal |
