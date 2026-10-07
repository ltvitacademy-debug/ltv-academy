# Artifact Storage Strategies

Every lesson so far has produced something that has to live somewhere: a dataset version, a model file, a container image, a reproducibility manifest. "Somewhere" is almost never one system — it's a deliberate split across a few kinds of storage, each suited to a different artifact, plus a retention policy, because none of this is free to keep forever.

## What you'll learn

- Why ML artifacts get split across object storage, a model registry's backing store, and a container registry instead of one system
- How to point MLflow's tracking server at an S3-backed artifact store
- How to write a lifecycle policy that moves or deletes old artifacts automatically
- The difference between artifacts you must keep forever and artifacts you can safely expire
- How retention policy and auditability (Lesson 30) pull in opposite directions, and how to resolve that

## Three kinds of storage, three kinds of artifact

- **Object storage (S3, GCS, Azure Blob)** — the default home for large, immutable blobs: datasets, serialized model files, training logs. Cheap per gigabyte, not optimized for being queried.
- **Model registry backing store** — the registry (MLflow, SageMaker Model Registry) itself usually stores *metadata* (versions, aliases, tags) in a database, while the actual model binary it points to still lives in object storage underneath.
- **Container registry (ECR, GCR, Docker Hub, Artifact Registry)** — a specialized store for container images, with its own layer-deduplication and digest-addressing, separate from the object storage used for data and models.

Mixing these up — storing a container image as a blob in your dataset bucket, or trying to make an object store do a container registry's job — works technically but throws away the tooling each system is actually built for.

## Pointing MLflow at an artifact store

MLflow's tracking server separates metadata (in its own database) from artifacts (in object storage you configure):

```bash
mlflow server \
  --backend-store-uri postgresql://mlflow:password@db:5432/mlflow \
  --default-artifact-root s3://ml-artifacts/mlflow \
  --host 0.0.0.0
```

Every `mlflow.log_model()` or `mlflow.log_artifact()` call writes bytes to `s3://ml-artifacts/mlflow/...` while the run's parameters, metrics, and tags go into the Postgres database — which is exactly the registry/object-storage split described above, just implemented concretely.

## A lifecycle policy for old artifacts

Not every artifact needs to live forever at full cost. An S3 lifecycle rule can automatically transition or delete objects by age:

```json
{
  "Rules": [
    {
      "ID": "expire-old-training-logs",
      "Filter": { "Prefix": "training-logs/" },
      "Status": "Enabled",
      "Transitions": [
        { "Days": 30, "StorageClass": "GLACIER" }
      ],
      "Expiration": { "Days": 365 }
    }
  ]
}
```

This rule moves training logs older than 30 days to cheaper, slower-to-retrieve storage, and deletes them outright after a year. Applying the same kind of rule to every artifact type without thinking about which ones actually need to survive that long is how storage costs quietly grow forever.

## What must be kept forever vs. what can expire

Not all artifacts carry the same retention requirement:

- **Deployed and recently-superseded model versions** — keep indefinitely, or at minimum for the regulatory retention window (Lesson 30); you may need to reproduce or re-audit a decision this model made
- **The reproducibility manifest for any model that was ever in production** — small, cheap, and exactly what an audit needs; almost never worth deleting
- **Intermediate training logs, scratch datasets, failed experiment artifacts** — safe to expire aggressively; nobody needs the logs from a hyperparameter sweep that didn't ship

## Where retention and auditability pull against each other

A naive cost-driven retention policy ("delete everything after 90 days") directly conflicts with the audit requirements you'll see in Lesson 30, which often require keeping lineage records for years. The resolution isn't "keep everything forever" — it's tiering: expire the large, cheap-to-regenerate artifacts (raw logs, intermediate data) aggressively, while keeping the small, audit-critical artifacts (manifests, model metadata, approval records) for the full regulatory window regardless of size, since they cost almost nothing to retain.

## Key terms

| Term | Meaning |
|---|---|
| Object storage | Blob storage (S3, GCS, Azure Blob) for datasets, model files, logs |
| Model registry backing store | Metadata database behind a registry; the binary itself still lives in object storage |
| Container registry | Specialized storage for container images with layer deduplication |
| Lifecycle policy | A rule that automatically transitions or deletes storage objects by age |
| Retention tiering | Expiring low-value artifacts quickly while keeping audit-critical ones long-term |

## Recap

ML artifacts split naturally across object storage, a registry's metadata store, and a container registry, each tuned for a different shape of artifact, and a lifecycle policy keeps that storage from growing forever by expiring what's safe to lose. Retention and auditability resolve through tiering, not blanket deletion. Next, in Lesson 30, you'll see exactly what a regulated environment requires you to keep, and for how long.
