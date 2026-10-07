# Model Versioning Strategies

Registering a model gives it a version number automatically — but a number alone doesn't make a model reproducible. Version 7 of `fraud-detector` is only useful if you can answer, months later, exactly what produced it: which code, which data, which hyperparameters, which libraries. This lesson is about what should travel with every version so the number actually means something.

## What you'll learn

- How MLflow auto-increments versions, and why that number alone isn't enough
- The four things that must travel with a version to make it reproducible by construction
- How to attach that information with tags, not comments or wiki pages
- Aliases vs. the deprecated stage field, revisited from a versioning angle
- Why reproducibility has to be designed into the pipeline, not patched on afterward

## The version number is just a pointer

When you call `mlflow.register_model(uri, "fraud-detector")`, MLflow assigns the next integer — 1, 2, 3 — and that's it. The number is a stable handle, nothing more. It tells you nothing about what's inside. Two different teams could both register "version 4" of their own models and the numbers would mean completely unrelated things, because the number is scoped to the registered model name, not to any shared standard of quality or content.

This is fine, as long as you don't expect the number to carry meaning it was never designed to carry. What it needs is metadata riding alongside it.

## The four things every version needs

For a version to be reproducible by construction — rebuildable by someone who wasn't in the room when it was trained — four pieces of information have to travel with it:

1. **Code version** — the exact git commit that trained this model, not "the main branch" (which changes).
2. **Data version** — the exact dataset snapshot or hash used, not "the users table" (which also changes).
3. **Hyperparameters** — every value that controlled training, not just the ones someone remembered were important.
4. **Environment** — the exact library versions (a lockfile, or better, a container image digest), because `scikit-learn==1.3.0` and `scikit-learn==1.5.0` can silently produce different numbers from identical code.

If a run was tracked properly in Lesson 10, most of this is already attached to the run MLflow registered the model from — a registry version is only as reproducible as the run behind it.

## Attaching it as tags, not tribal knowledge

MLflow autologs some of this for you — a run started inside a git repository is tagged with `mlflow.source.git.commit` automatically. The rest, attach explicitly with tags on the model version itself, so it's queryable without opening the original run:

```python
from mlflow import MlflowClient

client = MlflowClient()
mv = client.get_model_version("fraud-detector", 7)

client.set_model_version_tag(
    "fraud-detector", "7", "git_commit", "a1b2c3d9"
)
client.set_model_version_tag(
    "fraud-detector", "7", "dataset_version", "2026-09-30_snapshot"
)
client.set_model_version_tag(
    "fraud-detector", "7", "env_digest", "sha256:9f8e7d..."
)
```

A tag is queryable the way a comment in a notebook or a note in Slack never is: `client.search_model_versions("tags.dataset_version = '2026-09-30_snapshot'")` finds every version trained on that snapshot instantly, which matters enormously the day that snapshot turns out to have had a data quality bug.

## Semantic-ish version intent, without fighting MLflow's integers

MLflow's registry version is always a plain auto-incrementing integer — you can't rename it to `v2.1.0`. Teams that want semantic meaning (major changes vs. minor retrains) add it as a tag instead of fighting the registry's numbering:

```python
client.set_model_version_tag("fraud-detector", "7", "release_type", "minor")
```

This keeps the registry's own integer as the unambiguous, collision-free identifier, while still letting a release process reason about "was this a retrain on the same architecture, or a new approach."

## Aliases, revisited: a version's role isn't its identity

Lesson 11 introduced aliases (`champion`, `challenger`) as the lifecycle mechanism that replaced stages. From a versioning angle, the distinction matters again here: the version number identifies *what this model is* (immutable, permanent), while an alias identifies *what role it's currently playing* (mutable, reassignable). Conflating the two — the old stage field did exactly this — is what made the stage-based lifecycle brittle. Keep the version number as pure identity, and let aliases and tags carry everything that changes over time.

## Why this has to be designed in, not patched on

None of this works if it's optional. A training pipeline that sometimes logs the git commit and sometimes doesn't produces a registry that's only reproducible for the versions where someone remembered. The fix is structural: every training pipeline run (Chapter 4 covers exactly this) should log code version, data version, hyperparameters, and environment automatically, every time, as part of what it means to call the pipeline "done" — not as a manual step a human can skip under deadline pressure.

## Key terms

| Term | Meaning |
|---|---|
| Reproducible by construction | A version whose code, data, hyperparameters, and environment are all captured automatically, not added after the fact |
| Data version | A specific, fixed dataset snapshot or hash, as opposed to a mutable table reference |
| Environment digest | An exact record of library versions or a container image hash, not a loose version range |
| Semantic tag | A human-meaning label (e.g. "major"/"minor") added via a tag, since the registry's own version number is a plain integer |

## Recap

A registry's auto-incrementing version number is a stable identity, not a description — reproducibility by construction requires code version, data version, hyperparameters, and environment to travel alongside it as tags, queryable long after the original run is forgotten. Aliases still carry the mutable "what role is this playing" information, kept deliberately separate from the immutable version identity. Next, in Lesson 13, you'll follow this same chain of information one step further back — all the way to the data that started it.
