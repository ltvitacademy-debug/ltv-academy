A model is only as reproducible as the data it was trained on. On a laptop, the data is a file path that quietly changes when someone edits the CSV. Azure Machine Learning uses two ideas to fix that: datastores and data assets.

A datastore is a reference to storage you already have: Blob containers, Azure Files, Data Lake. It links the storage to the workspace, using either credentials kept out of your scripts or your own Entra identity. On top of that, a data asset is a named, versioned pointer to specific data, which a job receives as an input.

In the studio, the Data page has two tabs: data assets and datastores. Every workspace already has default datastores, like workspaceblobstore, where uploads and job code snapshots are kept.

This code is illustrative, not run here. You give the asset a name, a version, a type, and a path. Uri file is for a single file, uri folder is for a folder of files, and mltable is for tables with a schema, which is also what automated ML expects. A local path is uploaded for you.

Once registered, you refer to the asset by name and version, written azureml, colon, name, colon, version. Each version is immutable, and the workspace tracks which jobs used it.

Here is the idea in miniature, and this is real output. Describing our churn file by row count and content fingerprint, then appending two rows, gives a different fingerprint. If you overwrote version one in place, every earlier accuracy number would point at data that no longer exists.

Next lesson: notebooks and jobs, working interactively and then turning that work into something repeatable.
