# Silent Bugs vs. Loud Bugs

Every research engineer learns to fear one category of bug far more than the other. A loud bug — an exception, a stack trace, a shape mismatch that crashes the job — is actually the easy case: the program refuses to proceed until you fix it. A silent bug lets training run to completion, lets the loss curve go down, and produces a number that is simply wrong. This chapter is about building the habits that turn as many silent bugs as possible into loud ones, and catching the rest before they turn into a reported result.

## What you'll learn

- Why silent bugs are the dangerous category, and loud bugs are actually a gift
- The specific PyTorch/NumPy patterns that most often cause silent failures: broadcasting, train/eval mode, gradient accumulation
- How to add assertions and anomaly detection that convert silent failures into loud ones
- A mental checklist for "is this result real" before trusting a training curve

## Loud bugs are self-correcting; silent bugs are not

A loud bug announces itself: a `RuntimeError`, a shape mismatch, a `CUDA out of memory`. It is annoying, but it has a built-in correction mechanism — the job won't run until someone fixes it, so it never makes it into a reported result. A silent bug has no such mechanism. The job runs, the loss goes down, the plot looks reasonable, and the error is baked into a number that might get written into a report or a paper table before anyone notices. The engineering skill worth building deliberately is not "write code without bugs" — that's not achievable — it's "make the bugs loud."

## The classic silent-bug patterns

**Broadcasting instead of elementwise comparison.** This is the single most common silent bug in a research codebase:

```python
preds = model(x)          # shape (B,)
targets = y                # shape (B, 1)  -- an unintentional extra dim

loss = ((preds - targets) ** 2).mean()
# preds (B,) broadcasts against targets (B,1) to produce (B,B),
# not the elementwise (B,) comparison you meant. loss.mean() still
# runs, still produces a number, and that number is wrong.
```

The fix is to assert exact shapes immediately before any operation where a silent broadcast is possible:

```python
assert preds.shape == targets.shape, f"preds {preds.shape} vs targets {targets.shape}"
loss = ((preds - targets) ** 2).mean()
```

**Forgetting `model.eval()` / `model.train()`.** Dropout and batch norm behave differently in train vs. eval mode. Evaluating with `model.train()` still active silently injects dropout noise into your eval numbers and uses batch statistics instead of running stats in `BatchNorm` — no error, just a biased metric:

```python
model.eval()
with torch.no_grad():
    val_logits = model(val_x)
model.train()   # don't forget to flip it back for the next training step
```

**Gradient accumulation without zeroing.** Skipping `optimizer.zero_grad()` doesn't crash anything — gradients just silently accumulate across steps, inflating effective step size in a way that depends on how many steps you forgot to zero:

```python
for step, batch in enumerate(loader):
    optimizer.zero_grad()      # omit this line and gradients pile up silently
    loss = compute_loss(model, batch)
    loss.backward()
    optimizer.step()
```

**Label/index off-by-one in sequence models.** Shifting inputs and targets by the wrong offset for next-token prediction still trains — the model just learns to predict the wrong position, often still producing a loss curve that looks like it's working.

## Converting silent bugs into loud ones

The single highest-leverage habit is asserting the shape and dtype you expect at every boundary where a mistake wouldn't otherwise crash:

```python
def compute_loss(model, batch):
    logits = model(batch["input_ids"])
    assert logits.shape == (batch["input_ids"].shape[0], batch["input_ids"].shape[1], VOCAB_SIZE)
    assert logits.dtype == torch.float32
    loss = F.cross_entropy(logits.view(-1, VOCAB_SIZE), batch["labels"].view(-1))
    return loss
```

For numerical issues specifically (covered in depth next lesson), `torch.autograd.set_detect_anomaly(True)` turns a silent NaN propagating through backward into a loud, pinpointed exception at the operation that produced it — expensive to leave on for a full run, but very cheap to flip on for the first few hundred steps of any new experiment.

## A pre-trust checklist

Before trusting a training curve enough to report it, it's worth running through a short checklist, most of which costs seconds: does the loss on a single, hand-checkable batch match a value computed independently? Does overfitting a tiny subset of data to near-zero loss actually work (Lesson 31 covers this in depth)? Is eval mode actually active during evaluation? Are gradients actually flowing into every parameter that should be trainable? None of these catch everything, but together they catch the overwhelming majority of silent bugs before they become a reported, citable number.

## Key terms

- **Loud bug** — a bug that raises an exception or otherwise halts execution, forcing a fix before the job can proceed
- **Silent bug** — a bug that allows the program to run to completion and produce a plausible-looking but incorrect result
- **Broadcasting bug** — an unintended NumPy/PyTorch broadcast between mismatched tensor shapes that produces a wrong result without an error
- **Anomaly detection (`set_detect_anomaly`)** — a PyTorch debug mode that raises an exception at the exact operation that produced a NaN/Inf during backward, instead of letting it propagate silently
