# Capstone: Reproducing the Core Result

With a paper selected and a proposal written, this lesson is where you actually run it. Everything here is the Lesson 7 reproduction playbook applied for real, on your own result, wired into the repo structure and config system from Chapter 3 and the tracking infrastructure from Chapter 4. Nothing in this lesson is new theory — it's the first time you do all of it together, on something that matters to your grade and your portfolio.

## What you'll learn

- How to sequence the work: official code running first, your own wrapper second
- How to match hyperparameters exactly instead of approximately, and where to find the ones the paper omits
- How to wire the run into a Hydra config and an experiment tracker before you start iterating
- How to write down, in advance, what "reproduced" will mean for your specific number

## Step one: get the official code running, unmodified

Before touching your own repo, clone the authors' code and run their own documented command, using their defaults, ideally with any released checkpoint, exactly as Lesson 7 described. Your only goal at this step is confirming the official code reproduces its own claimed number in your environment. If it doesn't, stop — you've found an environment or dependency mismatch that has nothing to do with your eventual reimplementation, and it's far cheaper to debug now than after you've mixed in your own code.

```bash
# scripts/run_baseline.sh — run this before anything else
git clone https://github.com/<authors>/<repo>.git vendor/official
cd vendor/official
pip install -r requirements.txt
python train.py --config configs/paper_default.yaml   # their command, their defaults
```

## Step two: match hyperparameters exactly, not approximately

Once the official code runs, pull every setting it actually used — learning rate, batch size, optimizer and its exact betas or momentum, schedule, warmup, weight decay, seed handling, and data preprocessing — into your own Hydra config, as covered in Lesson 12. Where the paper and the code disagree, the code wins; note the discrepancy rather than silently picking one.

```yaml
# configs/experiment/reproduction.yaml
defaults:
  - model: resnet20
  - optimizer: sgd
  - _self_

optimizer:
  lr: 0.1
  momentum: 0.9
  weight_decay: 0.0001
train:
  epochs: 164
  batch_size: 128
  lr_schedule: [81, 122]   # decay steps lifted straight from the official code
seed: 0
```

## Step three: track the run before you start iterating

Wire the run into W&B or MLflow from the first attempt, not after something looks promising. Log the config itself alongside the metrics, so every run is self-describing.

```python
import wandb

wandb.init(project="capstone-reproduction", config=dict(cfg))
for epoch in range(cfg.train.epochs):
    train_metrics = train_one_epoch(model, loader, optimizer)
    wandb.log({"epoch": epoch, **train_metrics})
wandb.log({"final_test_error": test_error})
```

A small comparison script at the end of the run pulls your result and the paper's reported number into one place, so "did this reproduce" has a single answer instead of a vibe:

```python
reported = 8.75   # paper's reported CIFAR-10 test error, percent
yours = wandb.Api().run("capstone-reproduction/<run-id>").summary["final_test_error"]
print(f"reported={reported}  yours={yours}  delta={abs(reported - yours):.2f}pp")
```

## Step four: decide what "reproduced" means before you look at the number

Lesson 7 named three tiers — exact match within noise, match within a reasonable tolerance, and qualitative trend match. Pick one of these *before* your run finishes, based on your compute budget and how much seed variance you can actually estimate. Deciding after you see the number is how reproductions get quietly redefined to look successful.

## Key terms

- **Baseline-first sequencing** — running the official, unmodified code before introducing any of your own
- **Hyperparameter fidelity** — matching every setting the code actually used, not an approximation of the paper's prose
- **Run tracking** — logging config and metrics together from the first attempt, so every run is self-describing
- **Pre-committed reproduction tier** — deciding what "reproduced" means before the number comes in, not after
