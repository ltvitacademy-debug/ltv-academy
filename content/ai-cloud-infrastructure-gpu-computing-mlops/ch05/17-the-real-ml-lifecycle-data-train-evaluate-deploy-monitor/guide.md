# Lesson 17 — The Real ML Lifecycle: Data, Train, Evaluate, Deploy, Monitor

**Chapter 5 · MLOps Pipelines for Model Lifecycle Management · Lesson 1 of 4**

## What you'll learn

- Why production ML is a repeatable **pipeline**, not a one-off notebook run
- The five stages every real ML lifecycle moves through: data preparation,
  training, evaluation, deployment, and monitoring
- Why "it worked once in a notebook" and "it's safe to run in production"
  are two completely different claims, and what closes that gap
- How monitoring output feeds back into data preparation, turning the
  lifecycle into a loop instead of a dead end

## A notebook is not a pipeline

Every ML project starts the same way: a data scientist opens a notebook,
loads a CSV, trains a model, and gets a promising accuracy number. That's a
real result, but it is not production ML — it's a single, manual,
unrepeatable experiment. Nothing about it can be re-run automatically next
month on fresh data, nothing about it was versioned so you could reproduce
it later, and nothing about it checked whether the model is still accurate
six weeks after you deployed it.

MLOps exists to turn that one-off experiment into a **repeatable pipeline**:
a sequence of automated, versioned stages that can run again — on a
schedule, on new data, or on demand — and produce the same category of
result every time. The stages are the same five every real ML system goes
through: **data, train, evaluate, deploy, monitor.** You already know this
shape from course 12's CI/CD and GitOps pipelines; this chapter applies the
same discipline to models instead of application code.

## Stage 1: Data preparation

Before any training happens, raw data has to become training-ready data:
pulled from its source (a warehouse, an event stream, a feature store),
cleaned, validated against an expected schema, and split into training,
validation, and test sets. In a pipeline, this stage is code — a script or
DAG step, not a person manually exporting a spreadsheet — so the exact same
transformation runs identically whether it's lesson one's manual trigger or
next month's scheduled retrain. Data validation belongs here too: checking
that incoming data still matches the expected shape, ranges, and types
before training wastes compute on garbage input.

## Stage 2: Training

The training stage takes the prepared data and a model architecture plus a
set of **hyperparameters** (learning rate, batch size, number of trees,
regularization strength — whatever the algorithm exposes) and produces a
trained model artifact. In a mature pipeline this stage runs on the GPU or
CPU infrastructure from earlier chapters, logs every hyperparameter and
resulting metric as it goes (lesson 18 covers this in depth), and saves the
resulting weights as a versioned artifact rather than a file sitting in
someone's home directory.

## Stage 3: Evaluation

A freshly trained model is not automatically a good model. The evaluation
stage scores it against the held-out test set using metrics that match the
business problem — accuracy, F1, AUC, RMSE, or something domain-specific —
and compares that score against a **gate**: the currently deployed model's
score, or a fixed minimum bar. This is the stage that decides whether a
model is even allowed to move forward. Lesson 19 turns this gate into an
automated check inside a CI/CD pipeline instead of a human eyeballing a
number.

## Stage 4: Deployment

A model that passes evaluation gets deployed — packaged behind the serving
infrastructure from Chapter 4, rolled out gradually (shadow traffic, canary,
or blue/green, the same patterns you already know from application
deployments), and promoted to "production" status in a model registry
(lesson 18). Deployment is the stage most teams get right first, because it
looks the most like deploying any other service — but a model deployment
is never the end of the story the way a stable application deployment often
is.

## Stage 5: Monitoring, and the loop back to stage 1

Once a model is live, its job is to keep being accurate against data it has
never seen — and the real world keeps changing underneath it. The
monitoring stage tracks live prediction quality and the statistical shape of
incoming data, watching for **drift**: the point where production data or
model behavior has diverged enough from training time that accuracy is
silently degrading. Lesson 20 covers how that's actually detected. Critically,
a drift alert doesn't end the pipeline — it feeds straight back into stage
1, triggering a fresh data pull and retrain. That feedback loop, not any
single stage, is what makes this a lifecycle instead of a one-time project.

## Key terms

| Term | Meaning |
|---|---|
| ML pipeline | A repeatable, automated sequence of data, train, evaluate, deploy, and monitor stages, versioned and re-runnable, as opposed to a manual notebook experiment |
| Hyperparameter | A training-time setting (learning rate, batch size, tree depth, etc.) chosen before training, not learned from the data itself |
| Evaluation gate | A minimum metric threshold or comparison against the current production model that a newly trained model must clear before it can be promoted |
| Drift | The point where live production data or model performance has diverged enough from training-time conditions to trigger retraining |

## Check yourself

You're ready for Lesson 18 when you can list all five stages of the ML
lifecycle in order, explain what makes a notebook experiment different from
a pipeline stage, and explain why monitoring feeds back into data
preparation instead of simply ending the process.
