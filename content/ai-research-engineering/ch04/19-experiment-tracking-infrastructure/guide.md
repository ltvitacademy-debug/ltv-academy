# Experiment Tracking Infrastructure

A single run logged to Weights & Biases or MLflow is easy. The hard part is what happens once a team is running hundreds of runs a week across a sweep, several active projects, and several people — the tracking backend has to stay queryable, the storage has to stay affordable, and the team has to agree on what "the metric" even means across experiments.

## What you'll learn

- What a tracking backend actually needs to store per run, beyond the final metric
- Self-hosted vs. managed tracking infrastructure and the tradeoffs
- How to keep a growing run history queryable instead of an unsorted pile
- Artifact storage for checkpoints and datasets, and why it's a separate concern from metric logging

## What gets logged, not just the headline number

A tracking backend's job is to make a run's full story reconstructable, not just its final score. At minimum that means: the resolved config (every hyperparameter, post-override), the git commit hash (Lesson 16), per-step metrics (loss, learning rate, gradient norm — logged frequently enough to see the training curve, not just the endpoint), system metrics (GPU utilization, memory), and enough metadata to group the run with its sweep or project:

```python
import wandb

wandb.init(project="sparse-attention", config=cfg, tags=["sweep-214"])
for step, batch in enumerate(dataloader):
    loss = train_step(batch)
    wandb.log({"train/loss": loss, "train/lr": scheduler.get_last_lr()[0]}, step=step)
```

The per-step logging is what makes a run diagnosable after the fact — a final loss of 2.1 tells you almost nothing about whether training was stable, whereas the full curve tells you immediately.

## Self-hosted vs. managed

Weights & Biases and MLflow both offer a hosted option (wandb.ai's cloud, Databricks-managed MLflow) and a self-hosted one (W&B Server, or MLflow's open-source tracking server backed by your own Postgres + blob storage):

```bash
# Self-hosted MLflow tracking server
mlflow server \
  --backend-store-uri postgresql://user:pass@localhost/mlflow \
  --default-artifact-root s3://my-bucket/mlflow-artifacts \
  --host 0.0.0.0 --port 5000
```

Hosted infrastructure costs money per seat or per GB logged but removes an entire category of operational burden (uptime, backups, scaling the database as run count grows). Self-hosting is cheaper at scale and keeps data entirely in-house — a hard requirement for some labs with sensitive data — but someone on the team now owns keeping that Postgres instance and artifact store alive.

## Keeping run history queryable

A tracking backend's real value compounds as the run count grows, but only if runs are taggable and filterable. Both W&B and MLflow support tagging a run with its sweep ID, git branch, and dataset version, and both expose a query API:

```python
import wandb

api = wandb.Api()
runs = api.runs("my-entity/sparse-attention", filters={"tags": "sweep-214"})
best = min(runs, key=lambda r: r.summary.get("val_loss", float("inf")))
```

Without consistent tagging conventions agreed across the team, this kind of query becomes a manual scroll through hundreds of run names. The tagging discipline matters more than which tool you pick.

## Artifact storage is a separate concern

Model checkpoints and datasets are too large to log as metrics and need their own storage path — W&B Artifacts and MLflow's artifact store both version large binary files separately from the lightweight metric time series, typically backed by S3, GCS, or a local blob store:

```python
artifact = wandb.Artifact("model-checkpoint", type="model")
artifact.add_file("checkpoint.pt")
wandb.log_artifact(artifact)
```

Treating checkpoints as artifacts rather than attaching them to every log call keeps the metrics database fast to query, since it isn't bloated with multi-gigabyte blobs.

## Key terms

- **Resolved config logging** — recording the full post-override hyperparameter set alongside a run, not just the metrics
- **Self-hosted tracking server** — a tracking backend (MLflow server, W&B Server) run and maintained by the team's own infrastructure
- **Run tagging** — labeling runs with sweep ID, git branch, or dataset version so they can be queried as a team's run count grows
- **Artifact store** — a separate, blob-oriented storage path for large files like checkpoints and datasets, distinct from metric logging
