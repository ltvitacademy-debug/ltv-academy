# Resuming a Large Training Job

A checkpoint sitting in `solara-checkpoints` only matters if the Solara ML Platform team can actually load it back and continue training correctly — same model weights, same optimizer momentum, same learning-rate schedule position, same step count for logging and the data loader to resume from. This lesson covers `dcp.load`, how the new PyTorchJob that replaces a failed one finds the right checkpoint, and how to confirm a resumed run is actually healthy before trusting it.

## What you'll learn

- How `torch.distributed.checkpoint.load` restores sharded state back into a running model and optimizer
- Why the new job after a failure can resume onto a different number of GPUs than the one that failed
- How to find and select "the latest valid checkpoint" automatically rather than hardcoding a path
- What to check before trusting a resumed run instead of just watching it start without erroring

## Loading a sharded checkpoint with dcp.load

Resuming is the mirror of Lesson 19's save: build the same-shaped model and optimizer first, then load each rank's shard directly into it:

```python
import torch.distributed.checkpoint as dcp

model = build_model()          # same architecture, FSDP-wrapped
optimizer = build_optimizer(model)

state_dict = {
    "model": model.state_dict(),
    "optimizer": optimizer.state_dict(),
    "step": 0,
}

dcp.load(
    state_dict=state_dict,
    checkpoint_id="s3://solara-checkpoints/solara-70b/step-012500/",
)

model.load_state_dict(state_dict["model"])
optimizer.load_state_dict(state_dict["optimizer"])
start_step = state_dict["step"]
```

Each rank requests only the pieces of the checkpoint matching the shard it's responsible for right now, using the metadata written at save time — it never has to download or materialize the full 70B-parameter checkpoint on one machine.

## Resuming onto a different topology

Because DCP's save isn't tied to a specific rank layout, the job that resumes after a node failure doesn't have to use the exact same 64-node topology the failed run had. If the Solara ML Platform team only has 60 nodes free when a replacement job is submitted, `dcp.load` can reshard the saved state across 60 nodes' worth of ranks instead of 64 — the shard boundaries just get redrawn to match whatever world size the new job launches with. This is what separates a true distributed checkpoint from a plain `torch.save`, which ties the saved tensors tightly to the exact device layout that wrote them.

## Finding the latest valid checkpoint automatically

Hardcoding `step-012500` only works once. In practice, the training launch script lists the checkpoint prefixes under `s3://solara-checkpoints/solara-70b/`, picks the highest step number, and confirms that checkpoint's metadata file is actually complete (a checkpoint interrupted by the same failure that's being recovered from might be only partially written) before handing it to `dcp.load`. If the latest checkpoint fails that completeness check, the launch script falls back to the next-most-recent one rather than trying to load a corrupt save.

## Verifying the resume actually worked

A resumed job starting without a Python exception isn't proof it resumed correctly — it's proof the checkpoint files were readable. The real check is whether training loss at `start_step` continues roughly where it left off rather than spiking, which would indicate a mismatch (wrong optimizer state, wrong learning-rate schedule position) rather than a clean resume. The Solara ML Platform team's launch automation logs the first several post-resume loss values specifically so a human can glance at the loss curve and confirm it picked up smoothly rather than discovering a silent resume bug a day later.

## Key terms

| Term | Meaning |
|---|---|
| dcp.load | DCP's API for loading a sharded checkpoint back into a model and optimizer |
| Resharding | Loading a checkpoint onto a different number of ranks/GPUs than saved it |
| Checkpoint completeness check | Confirming a checkpoint's metadata is fully written before trusting it to load |
| Loss continuity check | Verifying post-resume loss tracks pre-failure loss, not just that loading didn't error |

## Recap

`dcp.load` mirrors `dcp.save`'s sharded, parallel approach, and because it's based on metadata rather than a fixed device layout, it can resume onto a different number of nodes than the run that failed — which matters a great deal once Lesson 21 introduces spot instances that can disappear and come back in different quantities. Next lesson: Spot & Preemptible Instances.
