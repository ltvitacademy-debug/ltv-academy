# Shared Infrastructure Across a Research Team

Every piece of infrastructure covered in this chapter — the cluster, the scheduler, the tracking backend, the data store — exists as a shared resource the moment more than one person uses it. Shared resources need explicit norms, not because researchers are careless, but because a norm that's obvious to the person who set up the infrastructure is invisible to everyone who joined after.

## What you'll learn

- Why shared infrastructure fails silently without documented conventions
- Naming and tagging conventions that keep shared resources navigable
- Storage hygiene: checkpoint retention, cleanup, and quota management
- Onboarding a new team member onto shared infrastructure without a week of tribal knowledge

## Conventions prevent silent failure, not loud failure

A cluster without agreed naming conventions doesn't crash — it just becomes slowly unusable. Job names like `job1`, `test`, and `asdf` pile up in `squeue` output; W&B projects accumulate runs with no tags distinguishing a sweep from a one-off debug run; checkpoints with generic filenames like `model.pt` get silently overwritten by the next person's run. None of this throws an error. It just makes the shared infrastructure progressively harder to use until someone spends a day reconstructing what should have been obvious from a consistent naming scheme.

```bash
# A naming convention, applied consistently, costs nothing extra to follow:
#SBATCH --job-name=<project>-<experiment>-<trial-or-seed>
# e.g. sparse-attn-sweep214-trial07
```

```python
wandb.init(project="sparse-attention", tags=["sweep-214", "git:a3f91c2"])
```

## Storage hygiene

Checkpoints and artifacts accumulate fast — a team running dozens of sweeps a month can fill a shared storage quota within weeks if nothing is ever deleted. A retention policy stated explicitly (e.g. "keep the best + latest checkpoint per run, delete the rest after 30 days unless tagged `keep`") prevents both failure modes: silently running out of space, and the opposite problem of someone manually deleting something another person still needed because there was no agreed rule.

```bash
# A retention script run periodically, respecting an explicit "keep" tag
find /shared/checkpoints -mtime +30 -not -name "*_keep_*" -delete
```

```bash
# Quota visibility -- know before you hit the wall, not after
df -h /shared/checkpoints
lfs quota -u $USER /shared   # Lustre filesystem example
```

## Onboarding without a week of tribal knowledge

The actual test of whether shared infrastructure conventions work is whether a new team member can be productive in a day rather than a week of asking around. That requires the conventions to be written down somewhere discoverable — a short `INFRASTRUCTURE.md` in the team's main repo covering: how to request cluster access and what partition/QoS to use, naming conventions for jobs and tracking runs, where shared datasets live and how to version a new one, and the storage retention policy — rather than living only in the memory of whoever set things up originally.

## Key terms

- **Silent infrastructure failure** — degradation (unusable job names, overwritten checkpoints, exhausted storage) that doesn't throw an error, making it easy to ignore until it's a real problem
- **Retention policy** — an explicit, agreed rule for how long checkpoints/artifacts are kept before cleanup, preventing both storage exhaustion and accidental deletion disputes
- **Naming convention** — a consistent job/run naming scheme that costs nothing to follow but makes shared resources navigable at scale
- **`INFRASTRUCTURE.md`** — a discoverable, written reference for a team's shared infrastructure conventions, as opposed to relying on tribal knowledge
