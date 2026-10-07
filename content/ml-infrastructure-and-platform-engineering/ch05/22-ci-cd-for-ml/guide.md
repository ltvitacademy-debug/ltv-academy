# CI/CD for ML

Regular software CI/CD answers one question: does the code work? ML CI/CD has to answer a second one at the same time: does the *model* still work? A pipeline that only runs `pytest` and ships a container will happily deploy a model whose accuracy quietly dropped 15 points, because nothing in a normal test suite checks that. This lesson builds a pipeline that gates on both.

## What you'll learn

- Why ML pipelines need a continuous training (CT) stage that plain CI/CD doesn't have
- How to structure a GitHub Actions workflow that tests code, validates a model, and only then deploys
- What a model validation gate actually checks before promotion
- Where human approval fits into an otherwise automated pipeline
- The difference between deploying code and deploying a model artifact

## CI, CD, and CT

Traditional CI/CD has two stages: **continuous integration** (every commit is built and tested) and **continuous delivery/deployment** (a passing build is automatically shipped). ML systems add a third: **continuous training (CT)** — the pipeline that retrains a model on fresh data and re-validates it, independent of any code change. A full ML CI/CD pipeline has to support both triggers: a code change (new feature engineering logic) and a data/schedule change (nightly retrain), and both have to pass validation before anything reaches production.

## A GitHub Actions pipeline for ML

```yaml
name: ml-deploy
on:
  push:
    branches: [main]
  schedule:
    - cron: "0 3 * * *"

jobs:
  test-and-train:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install deps
        run: pip install -r requirements.txt
      - name: Run unit tests
        run: pytest tests/
      - name: Train model
        run: python train.py --output model.pkl
      - name: Validate model
        run: python validate.py --model model.pkl --min-auc 0.85
      - name: Upload artifact
        uses: actions/upload-artifact@v4
        with:
          name: model
          path: model.pkl

  deploy-staging:
    needs: test-and-train
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to staging
        run: kubectl apply -f k8s/staging/inference-service.yaml

  deploy-production:
    needs: deploy-staging
    runs-on: ubuntu-latest
    environment: production
    steps:
      - name: Deploy to production
        run: kubectl apply -f k8s/production/inference-service.yaml
```

Three jobs, three different kinds of gate: `test-and-train` gates on code correctness *and* model quality in the same job, `deploy-staging` runs automatically once that passes, and `deploy-production` uses a GitHub `environment` — which you'll configure in Lesson 25 to require a human reviewer before it runs.

## What a model validation gate checks

The `validate.py` step isn't a formality — it's the line between "the training script ran" and "this model is good enough to serve traffic." A real validation gate typically checks:

- **Offline metrics against a threshold** — AUC, F1, RMSE compared to a fixed minimum, not just "better than nothing"
- **Comparison against the current production model** — the new model must beat (or at least not meaningfully regress) the model it would replace, evaluated on the same held-out set
- **Slice-level performance** — aggregate accuracy can hide a model that got worse for a specific segment (a region, a customer tier); a good gate checks slices, not just the overall number
- **Schema and input-contract checks** — the model still accepts the feature schema the serving layer will send it

```python
def validate(model, X_test, y_test, baseline_auc, min_auc=0.85):
    preds = model.predict_proba(X_test)[:, 1]
    auc = roc_auc_score(y_test, preds)
    assert auc >= min_auc, f"AUC {auc:.3f} below minimum {min_auc}"
    assert auc >= baseline_auc - 0.01, f"AUC regressed vs. baseline {baseline_auc:.3f}"
    return auc
```

If this step fails, the pipeline stops — nothing downstream runs, and no model artifact gets uploaded for a deploy job to pick up.

## Deploying code vs. deploying a model

A subtlety worth naming explicitly: a code deploy and a model deploy are not the same event, and good ML CI/CD keeps them separable. You can ship a code change (a new preprocessing step, a bug fix in the serving handler) without retraining, and you can ship a newly retrained model without any code change at all. Coupling them into a single "deploy" step makes it harder to tell, during an incident, which of the two actually changed.

## Key terms

| Term | Meaning |
|---|---|
| Continuous Integration (CI) | Automatically building and testing every code change |
| Continuous Delivery/Deployment (CD) | Automatically shipping a passing build |
| Continuous Training (CT) | Automatically retraining and re-validating a model on a schedule or data trigger |
| Validation gate | A pipeline step that blocks promotion unless the model meets a quality bar |
| Baseline comparison | Checking a new model against the currently deployed model, not just an absolute threshold |

## Recap

ML CI/CD extends ordinary CI/CD with a continuous training stage and a validation gate that checks model quality, not just code correctness, before anything is allowed to deploy. Staging deploys automatically once that gate passes; production deploys behind a human-reviewed environment. Next, in Lesson 23, you'll see how a model that passes validation still gets introduced to real traffic gradually, through canary and shadow deployments, instead of all at once.
