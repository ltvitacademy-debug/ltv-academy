# Feature Versioning & Lineage

Chapter 2 closes with the question that connects back to the versioning thread named in Lesson 3: once a feature definition exists in a feature store, how do you track which version of it was used for a given model, and trace a problem backward from a bad prediction to the exact feature logic and data that produced it?

## What you'll learn

- Why feature definitions need versioning the same way code does, and what changes without versioning if you skip it
- How Feast ties feature definitions to source control, and what the registry actually stores
- What lineage means in this context, and the specific questions it needs to answer
- Why this matters more under regulation and incident response than it does during normal day-to-day work

## Why feature definitions need versioning

A `FeatureView` is code, and code changes: someone adjusts the window on a rolling average from 7 days to 14, or fixes a bug in a null-handling branch. If that change happens silently — no new name, no record of when it took effect — every model trained before the change and every model trained after it are implicitly using different features, even though both look like they're using `driver_hourly_stats:avg_daily_trips`. Nobody auditing a model later can tell which behavior they're looking at.

The fix mirrors ordinary software versioning: feature definitions live in **source control** (a Git repo), so every change to a `FeatureView` has a commit, an author, and a timestamp, the same as application code. Feast's own registry (`registry.db` in the `feature_store.yaml` from Lesson 6) stores the currently-applied definitions, and `feast apply` is the command that pushes a change from source control into that registry:

```bash
# from the feature repo directory, after editing a FeatureView in Python
feast apply
```

This means the registry always reflects exactly what's in source control at the moment `apply` was last run — there's no path for a feature definition to change without a corresponding commit.

## What lineage actually means

**Lineage** is the ability to answer, after the fact: for this specific prediction (or this specific model version), which exact feature definitions were used, computed from which exact raw data sources, as of which exact commit? It's the forward-looking twin of training/serving skew detection from Lesson 8 — instead of comparing two numbers live, you're reconstructing history to answer "what happened" after an incident, an audit, or a surprising result.

Three questions lineage needs to answer:

1. **Feature → source data.** Where did this feature's values actually come from? (The `FileSource`/`BigQuerySource` etc. declared on the `FeatureView`.)
2. **Feature → model.** Which model versions were trained using this exact feature definition, and which are still using an older one?
3. **Definition → time.** When did this feature's logic last change, and what did it look like before that change?

## Why this matters more than it seems

Day to day, most teams don't think about lineage until they need it urgently — a model's predictions change unexpectedly, and the first question is always "did a feature change underneath us?" Without versioning and lineage, answering that takes hours of manually diffing notebooks and guessing. With it, the answer is a commit log and a registry lookup. The same tracking is often a hard compliance requirement in regulated industries (finance, healthcare, insurance): auditors expect a company to be able to show exactly which data and logic produced a specific past decision, not just the decision itself.

## Key terms

| Term | Meaning |
|---|---|
| Feature versioning | Treating feature definitions as code subject to the same change-tracking (commits, authorship, timestamps) as application code |
| `feast apply` | The Feast CLI command that pushes feature definition changes from source control into the live registry |
| Lineage | The ability to trace a prediction or model version back to the exact feature definitions and raw data sources that produced it |
| Registry | Feast's store of currently-applied feature and entity definitions, kept in sync with source control via `apply` |

## Recap

Feature definitions need the same versioning discipline as application code — source control, commits, and a registry that reflects exactly what's been applied — so lineage questions (which features, from which data, as of which commit) can be answered after the fact instead of guessed at under pressure. That closes Chapter 2's look at feature stores. Up next, Chapter 3: experiment tracking and model registries — the next stop on a model's path from a `FeatureView` to a production decision.
