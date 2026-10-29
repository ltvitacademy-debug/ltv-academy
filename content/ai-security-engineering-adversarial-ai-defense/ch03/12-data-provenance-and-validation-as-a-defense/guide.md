# Lesson 12 — Data Provenance and Validation as a Defense

**Chapter 3 · Data Poisoning and Training-Time Attacks · Lesson 4 of 4**

## What you'll learn

- Why data provenance — knowing where training data came from and how
  it changed — is a real, practiced MLOps and data-governance
  discipline, not a theoretical ideal
- How dataset versioning and automated validation catch poisoning
  and ordinary data-quality problems with the same tooling
- Real tools used for this today: TensorFlow Data Validation, Great
  Expectations, and dataset/data versioning systems
- How to assemble everything from this chapter into one practical
  defense checklist

## Provenance: the chain-of-custody idea applied to data

Every attack this chapter covered — poisoning, supply chain risk,
backdoors — depends on the same opening: an attacker gets unverified
data into a pipeline that feeds a model. **Data provenance** is the
direct countermeasure: tracking exactly where every piece of training
data came from, who collected or modified it, and when, so that
unexplained or unauthorized changes become visible instead of silently
flowing into the next training run. This is conceptually identical to
chain-of-custody practice in digital forensics, and it's the same idea
Lesson 10's software-supply-chain discussion applies to source
code — just pointed at datasets instead of dependencies.

## Dataset versioning

Treating a dataset like source code — versioned, diffable, and
reviewable before it's used — is now a standard MLOps practice. Tools
like **DVC (Data Version Control)**, **lakeFS**, and dataset tracking
built into **MLflow** let a team see exactly what changed between one
training run's data and the next, the same way `git diff` shows what
changed in code. If a dataset's statistics shift unexpectedly between
versions — a sudden spike in one label, an unusual cluster of near-
identical samples — that diff is often the first visible sign of a
poisoning attempt, caught before training even starts.

## Automated data validation

Beyond versioning, real validation frameworks check a dataset's shape
and statistics automatically before it's allowed into a training run.
**TensorFlow Data Validation (TFDV)** computes and compares schema and
distribution statistics across dataset versions, flagging drift and
anomalies. **Great Expectations** lets a team write explicit
"expectations" about data — value ranges, allowed categories, expected
null rates — and fails the pipeline automatically when a batch
violates them. Neither tool was built specifically to catch poisoning,
but both catch its most common symptom: data that doesn't look
statistically like what came before, whether the cause is an attacker
or an upstream data-quality bug.

## Documentation as a defense: data and model cards

Lesson 10 introduced model cards and dataset cards as self-reported
publisher documentation. Inside your own pipeline, the same practice
works as an internal control: documenting a dataset's source, known
limitations, and collection method at the point it's approved for
training creates a record that makes later questions — "did this data
change, and did anyone sign off on it?" — answerable instead of
guesswork.

## Putting the chapter together: a practical checklist

- **Know your sources.** Every dataset and pretrained model has a
  documented origin before it's approved for use (Lessons 9 and 10).
- **Version your data.** Changes between training runs are diffable,
  not silent.
- **Validate automatically, every run.** Schema and distribution
  checks run before training starts, not only during post-hoc review.
- **Keep an untouched holdout set.** A validation set the data
  pipeline never writes to gives you a clean baseline to evaluate
  against — including the backdoor-detection techniques from Lesson 11.
- **Control and audit write access.** Anyone who can modify training
  data is a credential your access-control review needs to cover,
  same as any other sensitive system.

## Key terms

| Term | Meaning |
|---|---|
| Data provenance | A tracked record of where training data came from, who touched it, and when |
| Dataset versioning | Treating datasets like source code — versioned and diffable (DVC, lakeFS, MLflow) |
| TFDV / Great Expectations | Automated tools that validate a dataset's schema and statistics before training |
| Data card / model card | Documentation of a dataset's or model's source, limitations, and approval history |

## Check yourself

You're ready for Chapter 4 when you can explain, without looking: how
does dataset versioning combined with automated statistical
validation catch the same poisoning attempts that activation
clustering catches from Lesson 11 — using entirely different tooling?
