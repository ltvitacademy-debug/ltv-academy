# Script — Data Versioning for Experiments

## Segment 1 (title)

Git plus a logged commit hash makes code and config fully recoverable for any run. Datasets break that model — a 200 gigabyte corpus doesn't belong in a git repo, but which exact version of the data produced a number is just as important a provenance question as which commit.

## Segment 2 (steps)

Git keeps every version of every tracked file forever, which is unworkable for gigabytes of training data. Git LFS solves part of this by storing large files outside the main git object store. DVC is built specifically for this: a lightweight pointer lives in git, the actual data lives in a separate remote like S3.

## Segment 3 (code)

dvc add and dvc push track the data and upload it to the remote, while the committed .dvc file itself is just a content hash and metadata. Checking out an old git commit also checks out the matching pointer, and dvc pull fetches the exact data version that pointer refers to — the same pin-a-commit, recover-the-exact-state property Lesson 16 established for code.

## Segment 4 (code)

The same discipline extends naturally to data: log the DVC data hash alongside the git commit hash in the same tracking call. Now a run's provenance has all three pieces recoverable — the code, the configuration, and the data — without a manual note from whoever happened to run it.

## Segment 5 (outro)

That closes the provenance picture started back in Chapter 3. Closing Chapter 5 next: shared infrastructure across a research team — the norms that keep tracking, clusters, and data stores usable as more people share them.
