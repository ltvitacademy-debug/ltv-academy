# Loss Spikes & Training Instability

A loss curve that's smoothly decreasing for days and then suddenly jumps upward — a "loss spike" — is one of the most common and most stressful events in a large pretraining run. Left alone, a bad spike can permanently damage the model's weights; caught and handled correctly, it's a routine, recoverable event. This lesson covers why spikes happen and the standard mitigations teams build in before they're needed.

## What you'll learn

- What a loss spike looks like on a monitoring dashboard, and why it matters
- The three most common root causes: bad data shards, learning rate too high, and numerical instability in low precision
- Gradient clipping as a first line of defense
- How mixed-precision training (bf16 vs. fp16) changes the instability picture
- Why checkpointing exists specifically to make spikes recoverable rather than catastrophic

## What a loss spike looks like

On a loss-vs-step chart, healthy pretraining loss decreases with a gently noisy downward trend. A loss spike is a sudden, sharp jump upward, sometimes followed by recovery over the next several hundred steps, and sometimes followed by the loss never recovering, drifting upward or oscillating for the rest of the run ("divergence"). The dangerous version is the one that doesn't recover on its own — if training continues past that point without intervention, the optimizer can keep pushing weights further from a usable region, wasting every subsequent GPU-hour.

## Root cause 1: bad data shards

Pretraining corpora are enormous, and even after the deduplication and quality filtering from Chapter 2, a shard of training data can still occasionally contain pathological content — a near-infinite repeated token, corrupted binary bytes that slipped through decoding, or a wildly atypical document (a huge table of numbers, degenerate text) that produces an unusually large, badly scaled gradient. A single bad batch can move the model noticeably more than the typical batch, which is visible as a spike right at the step where that batch was consumed.

## Root cause 2: learning rate too high

As covered in the previous lesson, a learning rate that's too aggressive for the model's current scale is one of the most common root causes of instability — not just at step zero (which warmup addresses) but throughout training, since the "right" learning rate can depend on how training dynamics evolve. Spikes clustered in a particular phase of the schedule (often right as warmup ends and the rate hits its peak) often point here.

## Root cause 3: numerical instability in low precision

Large models are almost always trained in reduced precision to save memory and increase throughput, but the precision choice interacts directly with stability:

- **fp16** (16-bit float, 10-bit mantissa, 5-bit exponent) has a narrow dynamic range. Gradients or activations that grow large can overflow to `inf`, and `inf` propagating through a backward pass corrupts the whole update. fp16 training requires loss scaling (artificially multiplying the loss before backward, then dividing gradients after, to keep small values representable) to be usable at all.
- **bf16** (16-bit float, 7-bit mantissa, 8-bit exponent) trades mantissa precision for the same exponent range as fp32. It's far less prone to overflow, which is why bf16 has become the default for large-scale pretraining on hardware that supports it (modern NVIDIA and AMD accelerators), without needing loss scaling.

```python
import torch

model = model.to(torch.bfloat16)  # bf16: wide exponent range, fewer overflow spikes
# or, with autocast for mixed precision:
with torch.autocast(device_type="cuda", dtype=torch.bfloat16):
    loss = model(**batch).loss
loss.backward()
```

## Gradient clipping: the first line of defense

Regardless of root cause, gradient clipping limits how large a single update can be, bounding the damage from any one bad batch. Clipping by global norm is standard: compute the L2 norm across all parameter gradients, and if it exceeds a threshold, rescale every gradient down proportionally.

```python
import torch

loss.backward()
torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
optimizer.step()
```

A max norm around 1.0 is a common default for large language model pretraining. Clipping doesn't prevent every spike, but it caps how much any single step can move the model, which is often the difference between a brief, recoverable blip and permanent divergence.

## Checkpointing makes spikes survivable

The deepest-level mitigation is procedural, not algorithmic: checkpoint frequently enough that a bad spike never costs more than a bounded amount of wasted compute. If monitoring (next lesson) flags a spike that isn't recovering, the standard response is to roll back to the last good checkpoint before the spike and resume — sometimes skipping the offending data shard, sometimes lowering the learning rate slightly for the restart. This is exactly the workflow covered in Lesson 19.

## Key terms

- **Loss spike** — a sudden upward jump in training loss, which may or may not self-recover
- **Divergence** — a spike that does not recover, with loss drifting upward or oscillating indefinitely
- **Gradient clipping (by global norm)** — rescaling all gradients when their combined L2 norm exceeds a threshold
- **bf16 vs. fp16** — bf16's wider exponent range makes it far less prone to overflow-driven spikes than fp16
- **Loss scaling** — the technique fp16 training requires to keep small gradient values representable
