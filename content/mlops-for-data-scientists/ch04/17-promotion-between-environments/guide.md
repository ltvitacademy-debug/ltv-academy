# Promotion Between Environments

Lesson 16's gate says a candidate is good enough. That is still not the same as "it is live." Software teams move a build through **environments**, such as development, staging, and production, and each step is a deliberate act with rules. Models need the same discipline, with one useful advantage: a model is a file, so promotion can be as small as moving a pointer from one version to another. In this lesson we build a minimal, file-based model registry in Python, add promotion rules, and run it on the churn project. It is a teaching stand-in; real teams use a registry product (Chapter 2's registry lesson) and the same ideas.

## What you'll learn

- What an environment is for a model, and why promotion should not skip a stage
- Promotion rules: validation, immutability, approval, smoke test
- How rollback works when production is just a pointer
- How GitHub Environments add human approval to a workflow

## Build once, promote the same artifact

The most important rule: **do not rebuild the model for each environment.** Staging and production should run the *same file*, differing only in configuration. If production gets a freshly trained model, then what you tested in staging is not what is live.

Here is illustrative configuration (the URLs are made-up placeholders). Notice that only settings differ, never the model:

```yaml
# config/staging.yaml
endpoint: https://churn-staging.example.internal
min_replicas: 1
model_alias: staging

# config/production.yaml
endpoint: https://churn.example.internal
min_replicas: 2
model_alias: production
```

To prove the artifact is unchanged, record its **SHA-256 hash** when you register it, and check the hash before promoting. MLflow's registry documentation describes the same pointer idea as a *model alias*: a mutable, named reference to a version (for example, `champion`). Our `aliases.json` file plays that role.

## The promotion rules

`register()` copies a model file into `registry/v1/`, `registry/v2/`, and so on, and stores its hash and author. `promote()` moves the `staging` or `production` alias, but only if the rules pass:

```python
def promote(vid, to, approver=None):
    if to == "staging":
        report = validate(load(vid), load(prod), HOLDOUT)   # Lesson 16
        if not report["passed"]:
            raise PromotionError("validation failed")
    elif to == "production":
        if aliases.get("staging") != vid:
            raise PromotionError(f"{vid} must be in staging first")
        if sha256(model_file) != versions[vid]["sha256"]:
            raise PromotionError("artifact changed since registration")
        if not approver or approver == versions[vid]["author"]:
            raise PromotionError("needs approval from someone else")
        aliases["previous_production"] = aliases["production"]
    aliases[to] = vid
```

(The full file also runs a smoke test: it scores the golden customer and checks the result is a valid probability. A real smoke test would call the deployed staging endpoint, as in Lesson 13.) Every promotion and rollback is appended to an **audit log**, so anyone can later answer "what was live on Tuesday, and who approved it?"

## Run it

Version v1 is today's production model (author ana). We register v2 (candidate A from Lesson 16, author ben) and v3 (candidate B, the one that dropped a column, also ben):

```
REFUSED v2 straight to production: v2 must be in staging first
OK      v2 to staging
REFUSED v2 to production, no approver: needs approval from someone else
REFUSED v2 to production, approved by its author: needs approval from someone else
OK      v2 to production, approved by cy
aliases: {'production': 'v2', 'staging': 'v2', 'previous_production': 'v1'}
REFUSED v3 to staging: validation failed: ['vs_production']
```

Each refusal names its reason. In a separate check, we overwrote the registered v2 file with another model after it reached staging; promotion refused with "artifact changed since registration".

## Rollback is a pointer move

Because `previous_production` was saved, rollback is one line of logic:

```
after rollback: {'production': 'v1', 'staging': 'v2', 'previous_production': 'v1'}
```

No retraining, no rebuild. Speed of rollback is one of the best reasons to keep old versions in the registry. Pair it with the gradual traffic shift from Lesson 13, so that a bad model reaches only a small share of customers before you notice.

## Approval in GitHub

GitHub Actions has a matching feature: **environments**. A job that declares `environment: production` can be held until people approve it.

```yaml
jobs:
  to-staging:
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - uses: actions/checkout@v7
      # ... promotion steps for staging
  to-production:
    needs: to-staging
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v7
      # ... promotion steps for production
```

This snippet parses as valid YAML with PyYAML, but it was not run on GitHub. According to GitHub's documentation as of this writing, an environment can require up to six reviewers (only one needs to approve, and you can block self-review), can add a wait timer, can restrict which branches deploy, and can hold its own secrets that only jobs using that environment can read. Environments for private repositories depend on your GitHub plan, so check the current docs. When GitHub enforces approval, you do not need our script's `approver` argument in that path.

## Recap

Promote the same artifact through staging to production, changing only configuration. Gate each step: validation before staging, and staging, an unchanged hash, an independent approver, and a smoke test before production. Log every change and keep the previous version for instant rollback. Once a model is live, the work is not over: next, Chapter 5 begins with data drift and concept drift.
