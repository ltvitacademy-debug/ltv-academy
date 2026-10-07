# Deployment Approval Gates

Not every deployment decision should be automated, and not every one should require a human either. An approval gate is where a pipeline deliberately stops and waits for an explicit "yes" before continuing — the formal place where the "route to a human" branch from Lesson 24 actually lives.

## What you'll learn

- Why automated validation gates and human approval gates serve different purposes
- How to configure a GitHub Actions `environment` with required reviewers
- How a GitLab CI pipeline implements a manual approval step
- What information an approver actually needs to make a good decision in under a minute
- Where in the pipeline an approval gate belongs, and where it doesn't

## Automated gates vs. approval gates

Lesson 22's validation gate (`assert auc >= min_auc`) is automated: it's a yes/no check against a number, and it runs the same way every time. An approval gate is different on purpose — it exists for decisions that don't reduce cleanly to a threshold: is this an acceptable business tradeoff, does this change need sign-off from compliance, is now actually a good time to deploy given what else is happening. Automating a decision that genuinely needs judgment just hides the judgment call; it doesn't remove it.

## GitHub Actions: required reviewers on an environment

```yaml
jobs:
  deploy-production:
    needs: deploy-staging
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://ml-serving.internal/fraud-detector
    steps:
      - name: Deploy to production
        run: kubectl apply -f k8s/production/inference-service.yaml
```

The `environment: production` block references a GitHub environment configured (in the repository's Settings → Environments) with required reviewers. When this job is reached, the workflow pauses — it does not run `kubectl apply` — until one of the listed reviewers approves it from the Actions UI. Nothing in the YAML itself enforces the pause; the environment's protection rules do.

## GitLab CI: a manual job

```yaml
deploy_production:
  stage: deploy
  script:
    - kubectl apply -f k8s/production/inference-service.yaml
  when: manual
  environment:
    name: production
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'
```

`when: manual` means this job appears in the pipeline but sits idle until someone with the right permissions clicks "run" in the GitLab UI. Combined with `environment: production` and GitLab's protected environments feature, you can also restrict exactly who is allowed to click it.

## What an approver actually needs to see

An approval gate that just says "approve production deploy?" with no context forces the reviewer to go dig for the information themselves, which either slows everyone down or trains reviewers to click approve without really checking. A well-designed gate surfaces, right next to the approval button:

- The validation metrics from Lesson 22 (AUC, baseline comparison) for this specific candidate
- A link to the canary or shadow results if the model has already seen partial live traffic
- A diff of what changed: model version, feature set, any config
- Who requested the deploy and why (a ticket link, a retraining trigger)

## Where approval gates belong — and don't

Put an approval gate at the boundary into production, and sometimes at the boundary into an expanded canary percentage for a high-stakes model (credit decisions, medical triage). Don't put one in front of every staging deploy, every canary step at 5%, or every shadow deployment — those are low-risk by design, and gating them just slows down the feedback loop that canary and shadow exist to provide in the first place.

## Key terms

| Term | Meaning |
|---|---|
| Approval gate | A pipeline stage that pauses for an explicit human decision before continuing |
| Validation gate | An automated, threshold-based check (contrast with approval gate) |
| GitHub environment | A named deployment target that can be configured with required reviewers |
| `when: manual` (GitLab) | Marks a job as idle until a permitted user triggers it |
| Protected environment | A deployment target restricted to specific approvers |

## Recap

An approval gate is the deliberate, human-reviewed pause in an otherwise automated pipeline — implemented as a required-reviewer GitHub environment or a `when: manual` GitLab job — reserved for decisions that genuinely need judgment, with enough context surfaced that the approver can actually make one. Next, in Lesson 26, you'll see blue-green deployment, a strategy that sidesteps gradual traffic shifting entirely by keeping two full environments ready and cutting over atomically.
