# Data Versioning

Git remembers every version of your code, and lesson 5 made the environment reproducible. The data is still loose. Last month's `customers.csv` had 1,000 rows; this month's has 1,200. If someone asks "which data trained the model in production?", a shared drive full of `customers_final_v2_NEW.csv` is not an answer. This lesson introduces **DVC** (Data Version Control), an open-source tool that gives large files the same commit-and-restore workflow Git gives to code. We used the `churn-project` from lesson 3 and ran every command below with DVC 3.67.1 on Python 3.9, in a scratch folder outside the course repo. The customer table is illustrative, and the file sizes and hashes will differ on your machine.

## What you'll learn

- Why data and models do not belong in Git, and what DVC does instead
- How `dvc add` turns a data file into a tiny pointer that Git can track
- How to see that a dataset changed, and which version a commit used
- How to go back to an older dataset, and how to share data through a remote

## The idea: Git tracks a pointer, DVC stores the file

Git works well for small text files. A real dataset can be hundreds of megabytes or more, is often binary, and gets replaced rather than edited line by line. DVC keeps the big file in a separate **cache** and lets Git track a small text file, ending in `.dvc`, that says which content the file should have. Change the data, and the pointer changes, so Git shows exactly when and how. Restoring an old commit restores an old pointer, and DVC fetches the matching data.

## Set it up

Inside a Git repository, install DVC (`pip install dvc`), initialize it, and commit the small config files it creates:

```
dvc init
git add .dvc .dvcignore
git commit -m "Initialize DVC"
```

Then track the dataset:

```
$ dvc add data/raw/customers.csv
To track the changes with git, run:
    git add 'data\raw\.gitignore' 'data\raw\customers.csv.dvc'
```

One thing went wrong the first time we tried this. We had already run `git add` on the CSV, and DVC refused: `output 'data\raw\customers.csv' is already tracked by SCM (e.g. Git)`. A file can have only one owner. If a data file is already in Git, remove it with `git rm -r --cached` first, as the error message suggests.

## What actually got created

`dvc add` made two files next to the CSV. The first is `customers.csv.dvc`, the pointer:

```
outs:
- md5: a2b24aa07a70ba43821da06985264855
  size: 29883
  hash: md5
  path: customers.csv
```

The second is a `.gitignore` line that keeps the CSV itself out of Git. The md5 value is a **content fingerprint**: a hash computed from the bytes of the file. We checked it independently with Python's `hashlib.md5(...)` and got the same value, `a2b24aa07a70ba43821da06985264855`. The data itself was copied into DVC's cache under `.dvc/cache/`, in a path built from that hash. Commit the pointer:

```
git add data/raw/customers.csv.dvc data/raw/.gitignore
git commit -m "Track customers.csv v1 (1000 rows)"
```

## Change the data and see it

We appended 200 new customers, making 1,200 rows. Git says nothing, because the CSV is ignored. DVC notices:

```
$ dvc status
data\raw\customers.csv.dvc:
    changed outs:
        modified:           data\raw\customers.csv
```

Running `dvc add` again updates the pointer, and Git shows a small, readable diff:

```
-- md5: a2b24aa07a70ba43821da06985264855
-  size: 29883
+- md5: b0189fd5dc0b907e23e3925a413d50e5
+  size: 35760
```

After we committed it, `dvc diff 544cda6 54e31bb` (the two commit ids) reported `Modified: data\raw\customers.csv`. Every commit now records which data version the code was run against. (On macOS and Linux the paths use forward slashes.)

## Time travel and sharing

To get version 1 back, restore its pointer from the old commit and tell DVC to sync the file:

```
git checkout 544cda6 -- data/raw/customers.csv.dvc
dvc checkout
```

The CSV went back to 1,000 rows. Checking out the pointer from `main` and running `dvc checkout` again returned it to 1,200. Nothing was lost, because both versions live in the cache.

The cache is on your machine, so teammates cannot see it. A **remote** is shared storage for it. We used a plain folder to keep the demo simple:

```
dvc remote add -d storage ../dvc-remote
dvc push
```

Both versions were pushed. We then deleted the CSV and the local cache, ran `dvc pull`, and got `1 file fetched and 1 file added`, with 1,200 rows back. In real projects the remote is usually cloud storage. Not run here: the syntax for an S3 bucket is `dvc remote add -d storage s3://my-bucket/churn`, and it needs the S3 extra (`pip install "dvc[s3]"`); Azure Blob and Google Cloud Storage work similarly. Check dvc.org for the current options.

## Recap

Git holds the code and the small `.dvc` pointer; DVC holds the data in a cache and, when you push, in a remote. `dvc add` records a version, `dvc status` and `dvc diff` show change, `dvc checkout` restores a version, and `dvc push` and `dvc pull` share it. DVC can also define whole pipelines and cache their outputs (`dvc.yaml`, `dvc repro`); we did not run those here. Data is only half of the story, though. Next, we version the other output of training: the model itself.
