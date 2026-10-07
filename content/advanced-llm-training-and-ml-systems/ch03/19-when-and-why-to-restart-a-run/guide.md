# When & Why to Restart a Run

The dashboard from the last lesson exists to feed one recurring decision: given what's on screen right now, do we let this run keep going, or do we stop it and resume from an earlier point? That decision — when to restart, from where, and with what changed — is one of the highest-leverage calls anyone running a large pretraining job makes. Get it wrong in either direction (restarting too eagerly, or not restarting soon enough) and you waste real compute.

## What you'll learn

- Why checkpointing, not just monitoring, is the prerequisite for any restart decision
- The clearest signal that a restart is warranted: non-recovering divergence
- Softer signals that justify a restart even without a hard crash
- What actually changes on restart: skipping data, adjusting the learning rate, nothing at all
- Why "just let it ride" is sometimes the correct call too

## Checkpointing is the prerequisite

None of this is possible without frequent checkpointing — periodically saving full model weights, optimizer state (including Adam's running moment estimates), and the current step/scheduler state to durable storage. Checkpoint frequency is itself a cost trade-off: checkpointing too rarely means a bad event costs more wasted compute before you can roll back to it; checkpointing too often adds I/O overhead and storage cost. Large-scale runs commonly checkpoint every few hundred to low-thousands of steps, saved with a tool like PyTorch's `torch.save` (or, at real multi-node scale, a distributed checkpointing library that shards the state across many files so saving isn't a single-process bottleneck).

```python
torch.save({
    "model": model.state_dict(),
    "optimizer": optimizer.state_dict(),
    "scheduler": scheduler.state_dict(),
    "step": step,
}, f"checkpoint-step-{step}.pt")
```

## The clearest signal: non-recovering divergence

The unambiguous case from Lesson 17: loss (and usually gradient norm) spikes and does not come back down within some reasonable window — commonly a few hundred steps. If training continues past that point, every additional step is spent moving the model further from a usable state, and the compute is simply wasted. The response is: stop the run, identify the last checkpoint saved *before* the spike began, and resume from there.

## Softer signals that still justify a restart

Not every restart follows a dramatic crash. A few other patterns commonly trigger the same decision:

- **A persistent, gradual gradient-norm drift upward** over thousands of steps, even without a single sharp spike, suggesting the run is approaching an unstable regime before it visibly breaks.
- **Evaluation loss diverging from training loss** over an extended period, suggesting a problem with the held-out set or, more rarely, something wrong with how data is being sampled.
- **A configuration or code bug discovered mid-run** — for example, realizing a data mixture weight (Lesson 13) was set incorrectly, or that a logging bug was masking a real problem. Once discovered, continuing on a known-bad configuration wastes compute just as surely as a loss spike does.

## What changes on restart

Simply resuming from the last good checkpoint with the exact same configuration is appropriate when the triggering event looks like a one-off bad batch — gradient clipping plus skipping that specific data shard (if it's been identified) is often sufficient. When the cause looks systemic — a learning rate that's clearly too aggressive for this phase of training, for instance — teams often resume with a slightly lowered learning rate from that point forward, rather than restarting the entire schedule from step zero. Restarting the whole schedule from scratch is reserved for the rare case where the root cause invalidates everything trained so far (for example, a severe, undetected data-quality bug baked into a huge fraction of the corpus already consumed).

## Why "let it ride" is sometimes right

Not every spike warrants a restart. A single-step spike that recovers within a few dozen to a couple hundred steps, with gradient norm back in its normal band and no corresponding drop in MFU, is often just noise from an unusually atypical batch — restarting for every such event would waste more compute (in checkpoint-reload overhead and lost progress) than it saves. The judgment call is exactly the pattern-recognition skill built in the previous lesson: distinguishing a blip from a trend.

## Key terms

- **Checkpoint** — a saved snapshot of model weights, optimizer state, and scheduler/step state, used as a restart point
- **Non-recovering divergence** — a loss/gradient-norm spike that does not return to its prior trend within a reasonable window
- **Rollback** — resuming training from a checkpoint saved before a problematic event
- **Distributed checkpointing** — sharding checkpoint state across many files/processes so saving scales at large multi-node runs
