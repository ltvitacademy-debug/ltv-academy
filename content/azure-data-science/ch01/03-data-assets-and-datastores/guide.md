# Data Assets & Datastores

A model is only as reproducible as the data it was trained on. On a laptop, "the data" is a file path that quietly changes when someone edits the CSV. In Azure Machine Learning, data reaches your training job through two ideas: **datastores**, which say where data lives and how to connect, and **data assets**, which give a specific, versioned piece of data a friendly name. This lesson explains both and shows the versioning idea with code you can run.

As before, Azure code is illustrative (not run here) and follows the Microsoft Learn docs for SDK v2 as of this writing; check the current docs for details.

## What you'll learn

- What a datastore is, and which ones every workspace already has
- The three data asset types: `uri_file`, `uri_folder` and `mltable`
- How to create and reference a versioned data asset
- Why immutable versions make experiments reproducible

## Datastores: references to storage

An Azure ML datastore is a reference to an existing Azure storage account. It does not create storage; it links storage you already have so the workspace can use it. Supported storage services include Azure Blob containers, Azure Files shares and Azure Data Lake (Gen1 and Gen2), and per the docs OneLake is also supported. Access can be credential-based (a service principal, SAS token or account key, whose secrets are kept out of your scripts) or identity-based (your Microsoft Entra identity or a managed identity).

Every workspace comes with default datastores on its default storage account. The docs list, among others, `workspaceblobstore` (data uploads, job code snapshots and the pipeline data cache), `workspacefilestore`, `workspaceworkingdirectory` (notebook and compute instance files) and `workspaceartifactstore` (metrics, models and components). In the studio, the **Data** page has a **Data assets** tab and a **Datastores** tab, shown in the screenshot.

## Data assets: named, versioned pointers

The docs compare a data asset to a browser bookmark: instead of remembering a long storage path, you register it once and use a name and version, written `azureml:<name>:<version>`. The asset points to data; it does not copy it. Data assets give you:

- **Versioning**: each version is a separate registration.
- **Reproducibility**: once created, a version is immutable, so a job that consumed it can be reproduced.
- **Lineage**: you can see which jobs consumed an asset.

There are three types:

| Type | API name | Use it for |
|---|---|---|
| File | `uri_file` | A single file, such as one CSV |
| Folder | `uri_folder` | A folder of CSV/Parquet files, or images/text |
| Table | `mltable` | A table with a schema, or a subset of large data; also the format AutoML expects |

The `path` you register can be a local path (uploaded to the default datastore automatically), a datastore path like `azureml://datastores/workspaceblobstore/paths/churn/`, an `abfss://` or `wasbs://` storage URI, or a public https URL.

## Creating a data asset

```python
# Illustrative - not run here.
from azure.ai.ml.entities import Data
from azure.ai.ml.constants import AssetTypes

churn = Data(
    name="churn-data",
    version="1",
    type=AssetTypes.URI_FILE,
    description="Customer churn snapshot",
    path="./churn.csv",          # local path: uploaded for you
)
ml_client.data.create_or_update(churn)
```

In the studio you do the same thing through **Data > Data assets > Create**, choosing a type and a source (from a URI, from Azure storage, or from local files).

## Using an asset in a job

In the next lessons a job will receive the data as an input:

```python
# Illustrative - not run here.
from azure.ai.ml import Input

data_in = Input(type="uri_file", path="azureml:churn-data:1")
```

Your training script then just reads a path it is handed, for example `pd.read_csv(args.data)`. When you consume an asset in a job, the docs say you can either mount or download it onto the compute nodes. In a notebook you can also read straight from a datastore URI with pandas, using the `azureml-fsspec` package (the docs give a long-form `azureml://subscriptions/.../datastores/.../paths/...` format, and the studio can copy the URI for you).

## Why immutable versions matter (runs locally)

Here is a small analogy for the versioning idea, using the illustrative churn table from this course. We describe a file by name, version, row count and a content fingerprint, then "fix" the file and describe the new file as version 2:

```python
import hashlib, json
import pandas as pd

def sha(path):
    with open(path, "rb") as f:
        return hashlib.sha256(f.read()).hexdigest()[:12]

def describe(name, version, path):
    df = pd.read_csv(path)
    return {"name": name, "version": version, "type": "uri_file",
            "rows": len(df), "sha256": sha(path)}

print(json.dumps(describe("churn-data", "1", "churn.csv")))
# ... two rows are appended and saved as churn_v2.csv ...
print(json.dumps(describe("churn-data", "2", "churn_v2.csv")))
```

Real output on the course machine:

```
{"name": "churn-data", "version": "1", "type": "uri_file", "rows": 1000, "sha256": "b63a6f9b8831"}
{"name": "churn-data", "version": "2", "type": "uri_file", "rows": 1002, "sha256": "483202a28c60"}
```

(The fingerprints depend on the exact bytes of the file, so yours will differ.) The point: the edited file is a different thing. If you overwrote version 1 in place, every earlier accuracy number would silently refer to data that no longer exists. Azure ML's immutable versions are what prevent that, and this is only an illustration, not how the service computes anything.

## Recap

- Datastores link existing storage to the workspace; every workspace has defaults such as `workspaceblobstore`.
- Data assets are named, versioned, immutable pointers: `azureml:name:version`.
- Choose `uri_file`, `uri_folder` or `mltable` by shape of data.
- Reference assets as job inputs and let your script read the path it is handed.

Next up: working interactively in notebooks, and turning that work into jobs.
