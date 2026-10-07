# Data Versioning Tools

Git tracks code beautifully and tracks data terribly — a 50GB training set committed straight into a Git repository will make every clone, checkout, and diff miserable, if Git accepts it at all. Data versioning tools exist to give datasets the same "which exact version produced this result" guarantee Git gives code, without storing the data itself inside Git.

## What you'll learn

- Why Git by itself is the wrong tool for versioning large datasets
- How DVC separates a small pointer file (tracked by Git) from the actual data (stored elsewhere)
- The core DVC workflow: `dvc init`, `dvc add`, `dvc push`, and what a `.dvc` file actually contains
- How `dvc.yaml` turns a sequence of data/training steps into a reproducible, cached pipeline
- Where lakeFS and Delta Lake fit as alternatives, and when they make more sense than DVC

## Why Git alone doesn't work for data

Git was built to diff and merge text, and it keeps every version of every tracked file forever in `.git`. Point it at a dataset that changes every week and the repository balloons, every clone takes forever, and a binary file diff is meaningless anyway — Git can't show you "which rows changed." Large File Storage (Git LFS) helps with repo size but still doesn't solve lineage: it doesn't connect a specific dataset version to the specific training run, code commit, and model version that used it.

## DVC: Git for the pointer, object storage for the data

DVC's trick is to keep a tiny metadata file in Git and the actual data bytes in object storage (S3, GCS, Azure Blob, or a local path):

```bash
dvc init
dvc add data/train.csv
git add data/train.csv.dvc .gitignore
git commit -m "Track train.csv with DVC"
dvc remote add -d storage s3://ml-datasets/dvc-store
dvc push
```

`dvc add` moves `train.csv` into DVC's local cache, replaces it with a tiny `.dvc` file, and adds `train.csv` to `.gitignore` so Git never sees the actual data. The `.dvc` file itself is small enough to commit directly:

```yaml
outs:
  - md5: a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6
    size: 52428800
    path: train.csv
```

That `md5` hash is the entire trick: it's a content address. Anyone who checks out this commit and runs `dvc pull` gets back the exact bytes that hash represents, from whichever remote storage DVC is configured to use — Git tracks the pointer, DVC resolves it to real data.

## `dvc.yaml`: a cached, reproducible pipeline

Beyond tracking a single file, DVC can define a full pipeline of stages, each with declared dependencies and outputs:

```yaml
stages:
  prepare:
    cmd: python prepare.py data/raw.csv data/train.csv
    deps:
      - data/raw.csv
      - prepare.py
    outs:
      - data/train.csv
  train:
    cmd: python train.py data/train.csv model.pkl
    deps:
      - data/train.csv
      - train.py
    outs:
      - model.pkl
    metrics:
      - metrics.json
```

```bash
dvc repro
```

`dvc repro` walks the DAG and re-runs only the stages whose declared dependencies actually changed — if `train.py` changed but `data/train.csv` didn't, `prepare` is skipped entirely and DVC reuses its cached output. This is the same dependency-aware caching idea as a build tool like Make, applied to data and training steps instead of source files.

## Alternatives: lakeFS and Delta Lake

DVC's file-pointer model fits a typical ML repo well, but it isn't the only approach:

- **lakeFS** sits in front of an existing data lake (S3, GCS) and provides Git-like branching and commits over the *entire bucket* — you can branch a lake, write to the branch, and merge it back, which suits teams who need multiple people experimenting against overlapping data simultaneously.
- **Delta Lake** adds a transaction log on top of Parquet files in a data lake, giving every table built-in time travel (`VERSION AS OF`, `TIMESTAMP AS OF`) without a separate tool — a natural fit when the data already lives as Delta tables for other reasons (covered in the Databricks & Delta Lake course).

Pick DVC when your unit of versioning is "files in a repo next to code." Pick lakeFS or Delta Lake when the unit of versioning is "a table or bucket that many pipelines read and write concurrently."

## Key terms

| Term | Meaning |
|---|---|
| `.dvc` file | A small, Git-tracked pointer file containing a content hash for the real data |
| DVC remote | The object storage location (S3, GCS, etc.) where DVC's actual data lives |
| `dvc.yaml` | Defines a DAG of stages with dependencies, outputs, and metrics |
| `dvc repro` | Re-runs only the pipeline stages whose dependencies changed |
| lakeFS / Delta Lake | Alternatives that version an entire data lake or table rather than individual files |

## Recap

DVC separates a small, Git-tracked pointer from the actual data stored in object storage, and `dvc.yaml` extends that into a cached, dependency-aware pipeline that only re-runs what actually changed. lakeFS and Delta Lake solve the same problem at the scale of a whole data lake or table. Next, in Lesson 28, you'll see how data versioning fits into the bigger picture of making the entire ML lifecycle — not just the dataset — reproducible.
