# Lesson 15 — Model Versioning and Change Control

**Chapter 3 · Model Governance · Lesson 15 of 30**

## What you'll learn

- Why "the model" is never actually one stable thing, but a sequence of versions
- What counts as a new version versus a routine update — and why that distinction matters
- What a change-control record needs to capture for each version
- How aliases (covered in the registry lesson) fit into a disciplined versioning scheme

## "The model" is a moving target

Say "the fraud model" out loud and you've implicitly named something that doesn't stay still. It gets retrained monthly as new data arrives. Someone tweaks a threshold. Someone else adds a new feature. Six months from now, "the fraud model" making decisions is, in every meaningful sense, a different model than the one that existed today — same name, different behavior.

Without disciplined versioning, that drift is invisible. Nobody can answer "which version flagged this transaction" or "did the behavior change because of the retrain last Tuesday." With it, every version is a distinct, identifiable, comparable artifact — which is the entire point.

## What counts as a new version

Not every change is equal, and treating them as equal either buries real changes in noise or lets real changes slip through undocumented. A useful way to think about it, borrowed from software's semantic versioning convention:

- **A breaking change** — retrained on a materially different dataset, a new feature set, a different input schema. Downstream consumers may need to adjust.
- **A meaningful but non-breaking change** — added an explainability output, improved calibration, retrained on fresher data with the same schema. Behavior may shift, but nothing downstream breaks.
- **A patch** — a bug fix in preprocessing, a dependency update that doesn't change predictions. Low risk, but still needs a record.

```
model: fraud-detector
version: 2.4.0
  MAJOR (2): retrained on expanded feature set — input schema changed
  MINOR (.4): added SHAP explainability output to the response
  PATCH (.0): fixed null-handling bug in the preprocessing step

changelog:
  2.4.0 — 2026-06-02 — retrained with new features, schema change
  2.3.1 — 2026-04-18 — bugfix: null handling in preprocessing
  2.3.0 — 2026-03-11 — added explainability output
```

*An illustrative versioning and changelog scheme — the shape a disciplined record takes, not output from any specific tool.*

## What a change-control record needs

Every new version, however small, needs a record that captures:

- **What changed** — data, features, code, hyperparameters, or some combination
- **Why it changed** — scheduled retrain, bug fix, performance improvement, response to drift (Lesson 21)
- **Who approved it** — tying versioning to the approval workflow in the next lesson
- **What was tested** — the evaluation results that justified releasing this version

This is the same discipline a software release process already has, applied to an artifact that's easy to treat as "just data" instead of "a thing that needs a release process."

## Where aliases fit in

Lesson 13 introduced aliases — a mutable pointer like `Champion` that names which version is actually live. Versioning and aliasing solve two different problems together: versioning gives you an immutable historical record of everything that ever existed; aliasing gives you a single, safe way to say which one is in production right now, without anyone needing to remember a specific version number. A disciplined program needs both — version history you can audit, and a current pointer you can trust.

## Key terms

| Term | Meaning |
|---|---|
| Model version | A specific, immutable snapshot of a model's data, code, and parameters at one point in time |
| Change control | The discipline of recording what changed, why, who approved it, and what was tested, for every version |
| Semantic versioning | A convention (major.minor.patch) for signaling the size and risk of a change |
| Breaking change | A version change that alters inputs or behavior enough that downstream consumers may need to adjust |

## Lab

Take a model you know about (or the fraud-detector example above) and write a three-line changelog for its last three "changes," classifying each as major, minor, or patch using the convention above. If you don't know the real history, invent a plausible one and label it clearly as hypothetical.

## Check yourself

Can you explain the difference between a breaking change, a meaningful non-breaking change, and a patch for a model, and describe what a change-control record needs to capture for each new version?
