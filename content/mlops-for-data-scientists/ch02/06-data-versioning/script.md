# Script — Data Versioning

## Segment 1 (title)

Git remembers every version of your code. But what about the data? If someone asks which customer file trained the model in production, a folder of files named final, final two, and new is not an answer. This lesson fixes that with DVC.

## Segment 2 (steps)

Big data files do not fit well in Git. So DVC keeps the file in a separate cache, and Git tracks a tiny pointer file that says which content it should have. Change the data, and the pointer changes. Restore an old commit, and the old data comes back.

## Segment 3 (code)

You initialize DVC once, then run dvc add on the data file. It copies the data into its cache, and creates a small dot dvc file next to it, plus a gitignore entry so Git skips the big file. One catch: if the file is already in Git, DVC refuses. Remove it from Git first.

## Segment 4 (code)

The pointer holds a size and an md5 value. That is a fingerprint computed from the bytes of the file. We checked it with Python's hashlib, and it matched exactly. Commit the pointer, and this commit now names the exact dataset it used.

## Segment 5 (code)

Now we appended two hundred new customers. Git said nothing, but dvc status reported the file as modified. Running dvc add again updated the pointer, and Git showed a two line diff: a new fingerprint and a new size. Every data change is visible in history.

## Segment 6 (code)

To go back, check out the old pointer with Git, then run dvc checkout. The file returned to one thousand rows. Checking out the newer pointer brought back twelve hundred. Both versions live in the cache, so nothing is lost.

## Segment 7 (code)

The cache is on your machine, so teammates need a remote. We pushed to a shared folder, deleted the local data and cache, then ran dvc pull, and the file came back. In real projects, the remote is usually cloud storage, like S3 or Azure Blob.

## Segment 8 (outro)

Data is only half the story. Next, lesson seven: model versioning.
