# Comparing Runs & Ablations

This closes out Chapter 8 by putting everything else in it to work. You now know how to read a loss curve, catch silent bugs, track experiments, and make a run reproducible — an ablation study is where all of that combines into the actual method researchers and engineers use to find out which part of a model or training setup is actually responsible for a result.

## What you'll learn

- What an ablation study is and why it changes exactly one thing at a time
- How to structure a small sweep of configurations in code, instead of editing one script repeatedly
- Why holding the seed constant across an ablation matters as much as holding the config different
- How to read the resulting comparison table without fooling yourself

## What an ablation study actually is

An ablation study removes or changes exactly one component — a piece of architecture, a hyperparameter, a regularization technique — while holding everything else fixed, and measures the effect on a result you care about (usually validation loss or a downstream metric). "Does dropout actually help this model?" gets answered by training the same model with dropout and without it, changing nothing else, and comparing.

## Structuring a small sweep

Rather than editing one script and rerunning it by hand for each configuration, define your configurations as data and loop over them. This is also where last lesson's `set_seed` matters: call it identically before building each configuration's model, so the only difference between runs is the thing you're actually testing.

```python
configs = [
    {"name": "baseline",    "dropout": 0.1, "lr": 3e-4},
    {"name": "no_dropout",  "dropout": 0.0, "lr": 3e-4},
    {"name": "higher_lr",   "dropout": 0.1, "lr": 1e-3},
]

results = {}
for cfg in configs:
    set_seed(42)
    model = build_model(dropout=cfg["dropout"])
    optimizer = torch.optim.AdamW(model.parameters(), lr=cfg["lr"])
    final_val_loss = train(model, optimizer, train_loader, val_loader)
    results[cfg["name"]] = final_val_loss

for name, val_loss in results.items():
    print(f"{name:12s} val_loss={val_loss:.4f}")
```

Logging each configuration to an experiment tracker (Lesson 54) with its full config attached turns this from a one-off script into something you can revisit and extend later without re-reading old code.

## Change one thing at a time

The single most common mistake in an ablation is changing two things at once — say, removing dropout *and* bumping the learning rate in the same run — and then being unable to say which change caused the difference. If you want to test both, that's two separate ablations (or a small grid that tests the combination deliberately), not one run that conflates them.

## Reading the comparison honestly

A single run's validation loss is still a noisy estimate, especially on a small dataset — a difference of 0.01 between two configs may be within normal run-to-run noise rather than a real effect, particularly if you only ran each configuration once. Where it's practical, running each configuration with two or three different seeds and comparing the *range* of results, not just a single number, tells you whether a difference is likely to be real or just noise from that particular random initialization.

## Key terms

| Term | Meaning |
|---|---|
| Ablation study | Removing or changing exactly one component while holding everything else fixed, to isolate its effect |
| Config-as-data | Defining each run's settings as a dict/list you loop over, instead of hand-editing a script per run |
| Confound | Changing two things at once in an ablation, making it impossible to attribute the result to either one alone |
| Run-to-run noise | Variation in results from randomness alone; multiple seeds per config help distinguish noise from a real effect |
