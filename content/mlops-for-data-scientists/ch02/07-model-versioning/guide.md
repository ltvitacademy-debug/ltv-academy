# Model Versioning

In lesson 6 we gave the training data a version. The trained model is the other output of a run, and it needs the same treatment. Picture the question a colleague will ask you three months from now: "The churn model we shipped in June: which file was it, what data trained it, which settings, and how good was it?" If the answer is "probably `churn_final_v3.joblib`", you cannot debug it, reproduce it or roll back to it. In this lesson we version the churn model from the `churn-project` using a file fingerprint, a metadata sidecar, DVC and Git tags. Everything below was run for real on Python 3.9 (scikit-learn 1.1.2) in a scratch folder outside the course repo, on the illustrative customer table from lesson 6 (1,200 rows).

## What you'll learn

- What a model version consists of, beyond the model file
- How to fingerprint a model file with a hash and write a JSON metadata sidecar
- How to track the model with DVC and label versions with Git tags
- How to restore an old version and check it before using it

## A version is more than a file

A saved model is a `.joblib` file, which is a Python pickle (lesson 5). To make it a *version* you record four things next to it:

- **A fingerprint**: a hash of the file's bytes, so you can tell files apart and detect corruption.
- **The data**: the hash of the training data, from lesson 6.
- **The recipe**: the settings (`C` for our logistic regression) and the library versions from lesson 5.
- **The result**: the evaluation metrics on the held-out test set.

## Fingerprint and sidecar

We added a small module, `churn/versioning.py`, that hashes the file with SHA-256 and writes a JSON sidecar beside the model:

```python
import hashlib

def file_hash(path, algo="sha256"):
    h = hashlib.new(algo)
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()
```

Training now calls `save_versioned(model, path, data_path, params, metrics)`, which runs `joblib.dump`, hashes the result, and writes `models/churn.meta.json` with the model id (the first 12 characters of the hash), the hash, the data's md5, the parameters, the metrics, and the Python, scikit-learn, pandas, NumPy and joblib versions. Here is the real sidecar for our first model, trimmed for space:

```
{
  "model_id": "80491b53de98",
  "data_md5": "b0189fd5dc0b907e23e3925a413d50e5",
  "params": {"C": 1.0},
  "metrics": {"accuracy": 0.753, "auc": 0.799},
  "python": "3.9.13",
  "scikit-learn": "1.1.2"
}
```

The sidecar is plain text, so it goes into Git and its history is readable. The `data_md5` is the same value that DVC stores in `customers.csv.dvc`, which ties this model to one exact dataset.

## Does the same recipe give the same hash?

We trained the model with `C = 1.0` three times, and with `C = 0.1` once:

```
$ python -m churn.train 1.0   ->  auc 0.799  ->  80491b53de98
$ python -m churn.train 1.0   ->  auc 0.799  ->  80491b53de98
$ python -m churn.train 0.1   ->  auc 0.795  ->  9d8ffe4fa947
```

The same code, data, settings and libraries produced a byte-identical file, and a different setting produced a different one. That is a good sign of reproducibility, but do not count on it in general: models with random elements, multi-threaded training, or different library versions can produce different bytes from the same recipe. Treat the hash as the identity of *a file*, and the sidecar as the record of how it was made.

## Track it with DVC and Git

Model files are binary and change on every retrain, so they follow the data workflow from lesson 6. Then tag each version so it has a human-readable name:

```
dvc add models/churn.joblib
git add models/churn.joblib.dvc models/churn.meta.json
git commit -m "Model v1: C=1.0, auc 0.799"
git tag model-v1
dvc push
```

After retraining with `C = 0.1` and repeating the steps with the tag `model-v2`, the history looked like this:

```
5363c74 (HEAD -> main, tag: model-v2) Model v2: C=0.1, auc 0.795
ad74b9d (tag: model-v1) Model v1: C=1.0, auc 0.799
```

`git diff model-v1 model-v2 -- models/churn.meta.json` showed exactly what changed: the model id, the hash, the timestamp, `C` and the AUC. Every other line, including the data hash and library versions, was identical, so the difference between the two models was the setting alone. Tags are one convention; lesson 9 introduces a model registry, which adds stages such as staging and production on top of versions.

## Restore and verify

To bring back version 1, restore its pointer and sidecar from the tag and sync the file:

```
git checkout model-v1 -- models/churn.joblib.dvc models/churn.meta.json
dvc checkout
```

Before serving a model, check that what you loaded is what the metadata describes. We added `load_verified`, which recomputes the hash, compares it with the sidecar, and compares the installed scikit-learn version with the training one. On the restored file it printed `loaded 80491b53de98 C = 1.0 auc = 0.799`. When we appended a single byte to the model file, it raised `ValueError: model file does not match its metadata`. Pickles run code when loaded, so never load a model whose hash you cannot account for.

## Recap

A model version is the file plus a fingerprint, the data hash, the settings, the library versions and the metrics. Write that as a sidecar, track the file with DVC and the sidecar with Git, tag each release, and verify before loading. Doing this by hand is a good way to understand it, but it gets tedious across many experiments. Next, lesson 8 introduces MLflow, which records parameters, metrics and model files for every training run automatically.
