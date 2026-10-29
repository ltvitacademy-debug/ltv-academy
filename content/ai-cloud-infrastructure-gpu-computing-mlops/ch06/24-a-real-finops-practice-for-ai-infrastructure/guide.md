# Lesson 24 — A Real FinOps Practice for AI Infrastructure

**Chapter 6 · Cost Optimization for AI and GPU Workloads · Lesson 24 of 32**

## What you'll learn

- How to apply the tagging-for-cost-allocation practice from the
  FinOps course earlier in this path specifically to GPU training jobs
- Why training jobs need tighter tagging discipline than most other
  workloads, given how fast and how unevenly GPU spend accumulates
- Why budget alerts deserve a dedicated, tighter configuration on GPU
  spend than on general cloud spend
- How to put tagging, budgets, right-sizing, and spot/checkpointing
  together into one working cost-governance loop for AI infrastructure

## Start from what you already know: tagging for cost allocation

Earlier in this path, the FinOps course covered tagging as the
mechanism that makes grouping and filtering cloud spend meaningful in
the first place — a consistent `team`, `project` (or `cost-center`),
`environment`, and `application` taxonomy, enforced with Azure Policy
or AWS Organizations tag policies so an untagged resource can't be
deployed in the first place. None of that changes for AI
infrastructure. What changes is how urgently it matters.

A standard web-tier VM that goes untagged sits in an "Untagged"
bucket, uncounted, for a bounded and modest amount of money. A GPU
training job that goes untagged sits in the same uncounted bucket for
spend that's an order of magnitude larger per hour (Lesson 21).
Every untagged GPU resource is a bigger blind spot than an untagged
CPU resource, simply because of what it costs per hour it stays
invisible.

## Tagging a training job specifically

Apply the same taxonomy, with the same enforcement mechanism, to the
resources a training job actually touches: the GPU instance or
Kubernetes GPU node pool, the storage holding datasets and
checkpoints, and any managed training service being used. A training
job's tags should answer, at minimum:

| Tag key | Example value | What it answers |
|---|---|---|
| `team` or `owner` | `ml-platform` | Who is accountable for this job's spend |
| `project` | `recsys-v3-finetune` | Which initiative this training run belongs to |
| `environment` | `experiment`, `prod-training` | Whether this is a disposable experiment or a production retrain |
| `job-type` | `training`, `hyperparameter-sweep` | Separates training spend from inference spend in cost reports |

That last tag matters more here than it does for general-purpose
workloads: because training and inference have such different
right-sizing profiles (Lesson 23), separating them in cost reports is
what lets a FinOps review tell "training costs are up because we
launched a bigger pretraining run" apart from "inference costs are up
because serving traffic grew" — two completely different
conversations that a single undifferentiated GPU-spend number
collapses into one.

Enforce it the same way Lesson 19 of the FinOps course described:
Azure Policy denying deployment of an untagged GPU resource, or an AWS
Organizations tag policy requiring `team` and `project` on any GPU
instance type. The mechanism doesn't change for GPU infrastructure —
only the cost of skipping it gets worse.

## Why GPU spend needs its own budget alert, not just a shared one

The FinOps course's Lesson 20 covered budgets and anomaly detection as
a general practice: a threshold that notifies when crossed, and
anomaly detection that catches an unusual spike without needing a
threshold at all. Both apply directly to GPU infrastructure, and both
deserve a dedicated configuration rather than being folded into one
subscription-wide budget.

The reasoning follows straight from Lesson 21: GPU spend has much
higher cost velocity than the rest of a typical cloud bill. A general
subscription-wide budget set at, say, 80% and 100% of a monthly total
might not trip until GPU overspend has already been accumulating for
days, because it's diluted inside everything else. A budget scoped
specifically to the `job-type: training` tag (or to a GPU-specific
resource group / cost-allocation tag) catches the same dollar amount
of overspend far earlier, because it's watching a narrower, faster-
moving number instead of waiting for it to move the whole bill.
Practically, that means:

- An **Azure Budget** scoped by a tag filter to GPU-tagged resources,
  with tighter alert thresholds (illustrative example: 50% and 80%,
  rather than waiting for 100%) specifically because the dollar
  velocity is higher.
- An **AWS Budget**, similarly scoped to GPU-tagged spend or a GPU
  cost-allocation tag, ideally using a forecasted-spend threshold so
  the alert fires before the month even ends, not after.
- **Azure Cost Management anomaly detection** or **AWS Cost Anomaly
  Detection**, scoped to the same GPU tag or resource group, to catch
  a sudden spike — a forgotten notebook instance, a stuck job, a
  duplicate training run — within the window of hours or a day it
  actually matters, not whenever the next scheduled report happens.

## Putting the whole loop together

This chapter's four lessons form one practice, not four separate
tips: understanding why GPU spend moves faster than anything else
(Lesson 21) is the reason spot GPUs paired with checkpointing (Lesson
22) and disciplined training-versus-inference right-sizing (Lesson
23) matter so much more here than on general compute — and tagging
every training job plus running a dedicated, tighter GPU budget and
anomaly-detection setup (this lesson) is what makes all of that
visible and accountable instead of discovered after the fact. A team
that does all four has a real FinOps practice for AI infrastructure.
A team that only does the general-purpose version it learned for
standard compute will keep getting surprised, because the dollar
velocity here is categorically different.

## Key terms

| Term | Meaning |
|---|---|
| Job-type tag | A tag (e.g., `job-type: training`) separating training spend from inference spend in cost reports, given how differently they right-size |
| GPU-scoped budget | A budget filtered to GPU-tagged resources specifically, with tighter thresholds than a general subscription-wide budget |
| Forecasted threshold | A budget alert that fires based on projected month-end spend, not just actual spend to date — catches runaway GPU cost earlier |
| Cost-governance loop | Tagging + right-sizing + spot/checkpointing + GPU-specific budgets and anomaly detection working together as one ongoing practice |

## Check yourself

You're ready to move to Chapter 7 when you can explain, without
looking: why does an untagged GPU resource create a bigger blind spot
than an untagged CPU resource, and why would a team set tighter,
GPU-specific budget thresholds rather than relying on one
subscription-wide budget?
