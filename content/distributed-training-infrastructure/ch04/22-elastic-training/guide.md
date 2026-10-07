# Elastic Training

Lesson 21 left a gap: when a spot Worker node gets reclaimed, does the whole Solara-70B job have to stop and restart just because the node count changed? Not necessarily. **Elastic training** — PyTorch's `torch.distributed.elastic`, launched through torchrun's elastic flags — lets a job's membership shrink and grow at runtime, within limits, instead of treating every node-count change as a full job restart. This lesson covers how that actually works.

## What you'll learn

- What torchrun's elastic launch flags (`--nnodes`, `--max-restarts`, `--rdzv-backend`) actually configure
- How the `c10d` rendezvous backend lets ranks rejoin after a membership change without restarting the whole job
- The difference between an elastic *restart* (ranks reconnect, training resumes from the last checkpoint) and losing the job entirely
- Why elastic training has real limits — it's not infinite tolerance for nodes disappearing

## Elastic launch flags

Instead of a fixed `--nnodes=64`, an elastic launch specifies a range:

```bash
torchrun \
  --nnodes=1:64 \
  --nproc-per-node=8 \
  --max-restarts=3 \
  --rdzv-id=solara-70b-train \
  --rdzv-backend=c10d \
  --rdzv-endpoint=rdzv-host:29500 \
  train.py
```

`--nnodes=1:64` tells torchrun the job can run with anywhere from 1 to 64 nodes — not that it should prefer fewer, but that it's allowed to continue at a reduced size rather than failing outright if nodes drop out. `--max-restarts=3` caps how many times the elastic agent will attempt to reform the group before giving up and failing the job for real. `--rdzv-backend=c10d` is the piece that makes re-forming possible at all: it's a rendezvous backend built for this exact scenario, where surviving ranks need to re-discover each other and agree on a new group membership without a human re-launching anything.

## What actually happens when a Worker disappears

When a Worker node is reclaimed, torchrun's elastic agent on every surviving rank detects the failure (typically via a timeout on the next collective call), and all surviving ranks tear down their current process group and re-enter rendezvous together. Once the `c10d` backend has them agree on a new, smaller world size, training resumes — from the last checkpoint, per Lesson 20's `dcp.load`, not from scratch, since in-memory optimizer and model state on the surviving ranks is for the *old* world size and needs to be reloaded against the new one. This is why elastic training and checkpointing aren't two independent features for Solara AI — elastic training handles the *detection and re-formation*, checkpointing handles *what state the reformed job resumes from*.

## This is a restart, not a rescue of the exact in-flight step

It's worth being precise about what "elastic" buys: the in-flight training step that was running when the Worker disappeared is lost — there's no resuming a half-finished AllReduce. What elastic training avoids is the job being marked `Failed` and requiring the platform team (or automation watching the PyTorchJob) to notice and resubmit it. The group re-forms and resumes from the last checkpoint automatically, which for Solara-70B means losing at most the handful of minutes since the last `dcp.save`, not the hours it would take a human to notice a failed job and relaunch it manually.

## The real limits

Elastic training isn't unlimited tolerance. `--max-restarts=3` means a Worker that keeps flapping — reclaimed, rejoined, reclaimed again — will eventually exhaust the retry budget and fail the job for real rather than loop forever. And `--nnodes=1:64` sets a floor as well as a ceiling: Solara AI sets the floor well above 1 in practice, because training Solara-70B on a handful of nodes would be so slow it's not worth continuing versus just waiting for replacement capacity and resuming from checkpoint at full scale instead.

## Key terms

| Term | Meaning |
|---|---|
| Elastic training | Allowing a job's node/rank membership to change at runtime without a full restart |
| c10d rendezvous backend | PyTorch's backend letting surviving ranks re-discover each other after a membership change |
| max-restarts | Cap on how many times the elastic agent retries re-forming the group before failing the job |
| nnodes=min:max | The range of node counts an elastic job is allowed to run with |

## Recap

Elastic training's `c10d` rendezvous lets Solara-70B's job re-form around whatever Workers survive a spot reclamation and resume from the last checkpoint automatically, turning what would otherwise be a failed job needing manual resubmission into a short, self-healing pause. Next lesson: Designing for Node Failure, which pulls scheduling, checkpointing, spot handling, and elasticity together into one end-to-end failure response.
