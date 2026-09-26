# Capstone Kickoff: Train, Deploy and Monitor a Model on AWS

You have now met the AWS pieces one at a time: S3 and IAM for data and access, SageMaker for training, tuning and pipelines, endpoints and batch transform for serving, the registry for governance, monitoring for drift, and cost habits to keep the bill honest. The capstone joins them into one project you can show a hiring manager: a business problem taken from raw data to a deployed, monitored, documented model. This lesson is the kickoff. You will frame the problem, write the success criteria before you model, sketch the architecture, and build the baseline that everything later has to beat.

## What you'll learn

- How to turn a vague request into a testable brief
- The six-stage architecture, and which stages you can run without an AWS account
- Why a naive baseline comes first, and what it looks like in numbers
- A repository layout that a reviewer can navigate in minutes

## The brief

The scenario is a meal-kit subscription company, Riverbend Meals (a made-up name; the data is synthetic and illustrative). The retention team can phone only so many customers each week. They want a **churn risk score** per customer in two forms: instantly on the support screen, and in bulk every night for the campaign list. They also want to hear when the model can no longer be trusted.

Before touching a model, write down what done means. These targets are my choices for the exercise, not AWS requirements:

1. The model beats a naive baseline on held-out test data with ROC AUC of at least 0.75.
2. Recall is reported per subscription plan, not only overall, so weak segments are visible.
3. Training and inference code follow SageMaker's script-mode and inference-handler contracts, and the handlers are tested locally.
4. A drift check flags input shifts, and model quality is tracked once labels arrive.
5. A model card records data, metrics, limits and misuse.
6. A cleanup checklist is completed so nothing keeps billing.

## The architecture

Six stages, each a lesson you have already seen:

1. **Data and baseline** (this lesson): data in S3 channels, a simple benchmark.
2. **Train**: a SageMaker training job running a script-mode `train.py`.
3. **Register**: a model group and a version awaiting approval.
4. **Deploy**: a real-time endpoint with data capture; batch transform for the nightly list.
5. **Monitor**: drift on captured inputs, quality on delayed labels.
6. **Review and present**: segment checks, model card, cleanup, portfolio write-up.

There is no AWS account in this course, so anything that only exists in the cloud (training jobs, registry calls, endpoints) is shown as clearly labeled, illustrative code adapted from the AWS documentation. Everything else runs on your laptop: scikit-learn training, the inference handlers, the packaging, the drift logic. If you do have an account, the same code can point at it, with one rule: an endpoint bills while it exists, so delete it when you finish. One more caution: the SageMaker scikit-learn container supports specific scikit-learn versions (the current docs list several, such as 1.2-1 and 1.4-2), and a model pickled with one version may not load under another. In a real run, train inside the container so training and serving match. My local scikit-learn is 1.1.2, which is fine for a local rehearsal.

## Build the baseline

The data comes from a seeded generator, so results are reproducible. Each customer has `tenure_months`, `orders_last_90d`, `avg_order_value`, `support_tickets` and `plan`, plus the `churned` label. I split it 60/20/20 into train, validation and test, so training and validation map to two SageMaker input channels and the test set stays untouched:

```
(6000, 6) churn rate 0.381
 tenure_months  orders_last_90d  avg_order_value  support_tickets    plan  churned
            57               12            81.52                1  weekly        0
            38               10            61.45                0 monthly        1
            42                3            47.88                0 monthly        0
rows train/val/test: 3600 1200 1200
```

With 38% churn, always predicting "will not churn" is right 62% of the time while finding no churners at all. On the test set:

```
baseline accuracy 0.619 AUC 0.5 recall 0.0
first model: test AUC 0.798 recall@0.5 0.556 accuracy 0.743
```

The first model is a logistic regression pipeline with scaling and one-hot encoding inside it, so a deployed endpoint can accept raw columns. It clears criterion 1 with an AUC of 0.798.

## A first look at the segments

Criterion 2 pays off immediately:

```
  biweekly  n= 413 churn=0.34 recall=0.417
  monthly   n= 414 churn=0.60 recall=0.740
  weekly    n= 373 churn=0.18 recall=0.162
```

Overall recall of 0.556 hides a weak spot: the model finds only 16% of churners on weekly plans. Churn is much rarer there (18%), so a 0.5 threshold rarely triggers. We will not fix it now; we will record it and revisit it in the wrap-up.

## Repository layout

```
churn-capstone/
  data/make_data.py
  src/train.py
  src/inference.py
  monitor/drift.py
  docs/MODEL_CARD.md
  README.md
```

## Recap

- Write the brief and the success criteria before modeling; decide how the model is consumed and watched.
- Each stage maps to a lesson; cloud-only steps here are illustrative and labeled.
- The baseline (AUC 0.5, zero recall) is the number to beat; the first pipeline reached AUC 0.798.
- Report metrics by segment from day one; overall numbers hide weak spots.

Next lesson you build it.
