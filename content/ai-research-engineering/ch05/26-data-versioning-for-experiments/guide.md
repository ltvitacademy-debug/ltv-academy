# Data Versioning for Experiments

Lesson 16 established that git plus a logged commit hash makes code and config fully recoverable for any run. Datasets break that model — a 200GB training corpus doesn't belong in a git repo, but "which exact version of the data produced this number" is exactly as important a provenance question as "which exact commit." Data versioning is the piece that closes the remaining gap.

## What you'll learn

- Why git alone can't version large datasets, and what breaks without a separate solution
- DVC (Data Version Control) as the most common git-adjacent approach
- Content-addressed storage and why it makes "which data" a precise, checkable question
- Practical conventions for referencing a dataset version in experiment-tracking runs

## Why git can't do this alone

Git stores every version of every file it tracks, forever, in the repo's history — tolerable for megabytes of code, unworkable for gigabytes of training data; cloning the repo would mean downloading every historical version of the dataset, not just the current one. Git LFS (Large File Storage) solves part of this by storing large files outside the main git object store and tracking only a pointer in git, but teams running frequent dataset changes often reach for a tool built specifically for this: DVC.

## DVC: git for data, without storing data in git

DVC tracks a lightweight pointer file in git, while the actual data lives in a separate remote (S3, GCS, or a local path):

```bash
dvc add data/training_corpus/
git add data/training_corpus.dvc .gitignore
git commit -m "Track training corpus v3 with DVC"

dvc remote add -d storage s3://my-bucket/dvc-storage
dvc push          # uploads the actual data to the remote
```

The `.dvc` file that gets committed to git is small — it contains a content hash and metadata, not the data itself. Checking out an old git commit also checks out the matching `.dvc` pointer, and `dvc pull` fetches the exact data version that pointer refers to:

```bash
git checkout <old-commit>
dvc pull            # downloads the data version matching this commit's .dvc file
```

This gives datasets the same "pin a commit, recover the exact state" property that Lesson 16 established for code.

## Content-addressed storage

The reason this works precisely, not approximately, is that DVC (like git itself) identifies data by a hash of its content, not by filename or path. Two files with the same content get the same hash regardless of what they're called; a single byte of difference produces a completely different hash. This makes "is this the same dataset version I used before" a question with an exact, checkable answer — compare hashes, not file sizes or modification dates, which can lie.

## Referencing a dataset version in tracking runs

The same discipline from Lesson 16 (log the commit hash with every run) extends naturally to data versions — log the DVC data hash or dataset tag alongside the git commit hash in the same tracking call:

```python
import subprocess, wandb

data_hash = subprocess.check_output(
    ["dvc", "get-url", "data/training_corpus.dvc"]
).decode().strip()

wandb.init(config={"git_commit": commit_hash, "data_version": data_hash, **cfg})
```

Now a run's provenance has all three pieces recoverable: the code (commit hash), the configuration (Hydra's resolved snapshot), and the data (DVC hash) — without any of them requiring a manual note from whoever happened to run it.

## Key terms

- **Git LFS** — a git extension that stores large files outside the main object store, tracking only a pointer in git
- **DVC (Data Version Control)** — a tool that tracks lightweight data pointers in git while storing the actual data in a separate remote
- **Content-addressed storage** — identifying data by a hash of its content rather than filename or path, making identity exact and checkable
- **Data provenance** — the ability to recover the exact dataset version that produced a given experimental result
