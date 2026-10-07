# Learning Rate Warmup & Decay at Scale

Chinchilla's correction to earlier scaling-law guidance hinged on one detail: the learning-rate schedule has to actually match the run. At the scale of a real pretraining run — thousands of GPUs, weeks of wall-clock time, a single mistake costing real money — the learning-rate schedule is one of the few hyperparameters where getting it wrong doesn't just slow convergence, it can blow up the run entirely. This lesson covers the warmup-then-decay shape nearly every large pretraining run uses, and why each piece exists.

## What you'll learn

- Why a high learning rate from step zero destabilizes a freshly initialized large model
- The linear warmup phase: what it does and how long it typically lasts
- Cosine decay (and other decay shapes) for the rest of the run
- How peak learning rate is typically chosen relative to model size
- How this schedule connects to the loss-spike problems covered in the next lesson

## Why warmup exists

At initialization, a transformer's weights are random (drawn from some small-variance distribution) and its activations and gradients haven't yet settled into the ranges the optimizer and the rest of the stack expect. If you apply a large learning rate immediately, the first few optimizer steps can take weights far outside a stable region — especially with Adam-family optimizers, whose per-parameter adaptive step sizes are themselves unreliable until the running moment estimates have seen enough steps to become meaningful. The practical fix is **linear warmup**: start the learning rate at (or near) zero and ramp it linearly up to the target peak value over some number of steps, typically somewhere in the range of a few hundred to a few thousand steps for large-scale pretraining, often scaled with total batch size and total planned training steps.

## Decay: cosine and friends

Once warmup finishes, the learning rate needs to come back down over the rest of training, both to let the model settle into a good minimum and because very large learning rates sustained for the whole run tend to produce noisier, less stable late-training loss. The most common shape for large language model pretraining is **cosine decay**: the learning rate follows a cosine curve from the peak value down to some small minimum value (often 10% of peak, or sometimes all the way to zero) by the end of training.

```python
import math

def cosine_lr(step, total_steps, warmup_steps, peak_lr, min_lr=0.0):
    if step < warmup_steps:
        return peak_lr * step / warmup_steps
    progress = (step - warmup_steps) / max(1, total_steps - warmup_steps)
    progress = min(1.0, progress)
    cosine_decay = 0.5 * (1 + math.cos(math.pi * progress))
    return min_lr + (peak_lr - min_lr) * cosine_decay
```

In practice, most teams don't hand-roll this: Hugging Face's `transformers` library provides it directly via `get_cosine_schedule_with_warmup`, which wraps a PyTorch optimizer and `LambdaLR` under the hood.

```python
from transformers import get_cosine_schedule_with_warmup
from torch.optim import AdamW

optimizer = AdamW(model.parameters(), lr=3e-4, weight_decay=0.1)
scheduler = get_cosine_schedule_with_warmup(
    optimizer,
    num_warmup_steps=2000,
    num_training_steps=total_steps,
)

for step, batch in enumerate(dataloader):
    loss = model(**batch).loss
    loss.backward()
    optimizer.step()
    scheduler.step()
    optimizer.zero_grad()
```

Other decay shapes exist — linear decay to zero, and more recently warmup-stable-decay (WSD), which holds a constant peak rate for most of training and only decays sharply near the end, letting a team extend a run's token budget without having pre-committed to a total step count baked into a cosine curve. Cosine remains the most widely used default for standard pretraining runs.

## Choosing the peak learning rate

Peak learning rate is typically chosen as a function of model size: larger models generally use somewhat smaller peak learning rates, informed by published configurations from similar-scale models and small-scale learning-rate sweeps (often run at a smaller model size and extrapolated, using the same cheap-run-then-extrapolate logic as scaling laws). A peak rate that's too high is one of the most common root causes of the loss spikes discussed in the next lesson, which is why warmup and a conservative, well-chosen peak are treated as a stability measure, not just a convergence-speed tweak.

## Key terms

- **Linear warmup** — ramping the learning rate from near zero up to its peak value over the first N steps
- **Cosine decay** — a smooth cosine-shaped reduction in learning rate from peak down to a minimum over the rest of training
- **Peak learning rate** — the maximum learning rate reached at the end of warmup, chosen relative to model size
- **Warmup-stable-decay (WSD)** — an alternative schedule holding a constant rate, decaying sharply only near the end
- **`get_cosine_schedule_with_warmup`** — the Hugging Face `transformers` helper implementing warmup + cosine decay
