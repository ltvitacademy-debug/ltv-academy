# Lesson 20 — Model Monitoring and Detecting Drift in Production

**Chapter 5 · MLOps Pipelines for Model Lifecycle Management · Lesson 4 of 4**

## What you'll learn

- Why a model's accuracy at deployment time tells you nothing about its
  accuracy six months later
- The difference between **data drift** and **model drift**, and why
  they're detected differently
- What statistical tests and metrics a real monitoring system actually
  runs to catch drift before it becomes a visible business problem
- How a drift alert becomes the trigger that closes the MLOps loop back
  to lesson 19's automated retraining pipeline

## Why a model's accuracy decays over time

A trained model is a frozen snapshot of patterns learned from a particular
slice of data at a particular point in time. The real world does not stay
frozen alongside it. Customer behavior shifts, fraud patterns evolve
specifically to evade whatever is currently deployed, a product catalog
changes, a macroeconomic shock changes spending patterns overnight — any
of these can make a model's learned patterns stale without a single line
of its code changing. This is why "the model scored 94% on the test set at
deployment" is a claim about one moment in time, not a permanent guarantee,
and why monitoring in production isn't optional polish — it's the stage
that catches the gap between those two claims.

## Data drift vs. model drift

**Data drift** (also called feature drift or covariate shift) is a change
in the statistical distribution of the *input* data the model receives in
production, compared to the data it was trained on — without necessarily
any change yet in how well the model performs. A monitoring system detects
this by comparing live input feature distributions against the training
set's distributions, using statistical tests like the
**Kolmogorov–Smirnov test** or **Population Stability Index (PSI)** for
individual features.

```python
from scipy.stats import ks_2samp

stat, p_value = ks_2samp(training_feature, production_feature)
if p_value < 0.05:
    alert("data drift detected: distribution has shifted")
```

**Model drift** (also called concept drift) is the more direct concern: a
measurable drop in the model's actual predictive performance in
production — accuracy, precision, recall, or whatever metric matters for
the use case — compared to what it scored at training or deployment time.
Model drift requires ground-truth labels to detect directly (did the
prediction turn out to be right?), which arrive on a delay in most real
systems — a fraud label might not be confirmed for days. Data drift is
often the earlier warning sign precisely because it doesn't need to wait
for labels.

## What a real monitoring setup tracks

A production monitoring system typically tracks, continuously:

- **Input distribution checks** — per-feature statistical tests comparing
  live traffic to the training baseline (catches data drift early)
- **Prediction distribution** — is the model suddenly predicting the
  positive class far more or less often than historical norms, even
  without labels yet available?
- **Performance metrics against delayed ground truth** — accuracy,
  precision/recall, or business metrics, recalculated as labels arrive
  (catches model drift directly)
- **Operational health** — latency and error rates from the serving
  infrastructure in Chapter 4, since a "drift" symptom is sometimes
  actually an infrastructure problem

## Closing the loop: from alert to retrain

None of this monitoring is useful if an alert just sits in a dashboard
nobody checks. The entire point, matching lesson 19's pipeline design, is
that a drift alert fires the retraining trigger directly — the
`repository_dispatch` event from lesson 19's pipeline definition is exactly
this alert. Monitoring detects the problem, the CI/CD pipeline retrains and
re-evaluates automatically, the evaluation gate decides if the new model is
actually better, and — if it clears the gate — the registry promotion
ships it. That full circuit, from lesson 17's five stages through lesson
18's tracking, lesson 19's gated CI/CD, and this lesson's monitoring, is
the complete MLOps pipeline.

## Key terms

| Term | Meaning |
|---|---|
| Data drift | A shift in the statistical distribution of input features in production compared to training data, detected via tests like KS or PSI, independent of whether performance has dropped yet |
| Model drift | A measurable drop in the model's actual predictive performance in production compared to training/deployment time, also called concept drift |
| Population Stability Index (PSI) | A common metric for measuring how much a feature's distribution has shifted between two samples, used to flag data drift |
| Ground truth label | The eventual real-world outcome (fraud confirmed, customer churned) used to measure actual model performance, often arriving on a delay |

## Check yourself

This closes Chapter 5. You should be able to explain the difference
between data drift and model drift, why data drift is often detected
earlier than model drift, and trace the full loop from a drift alert back
through the CI/CD pipeline to a registry promotion.
