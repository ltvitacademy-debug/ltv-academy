# Rollbacks & Recovery

Every safeguard in this chapter reduces risk; none of them eliminates it. Tests pass, approvals clear, a canary rollout looks fine at 10% of traffic and then degrades at 50% — Northbridge Retail still needs a plan for the moment something gets through anyway. That plan is this lesson: how to get back to a known-good state, fast, and how to figure out what actually happened afterward.

## What you'll learn

- Why "fix forward" and "roll back" are two different responses, and when each one is the right call
- The real `kubectl` commands for rolling back a Kubernetes deployment to its previous version
- Why Chapter 4's immutable, pinned image tags are what make rollback reliable instead of a guess
- Why a rollback is a starting point for investigation, not the end of the incident
- A full worked scenario: a pipeline whose tests pass but whose deployment step fails

## Fix forward vs. roll back

When production breaks, there are two honest responses:

- **Fix forward** — ship a small, targeted patch for the specific bug, as fast as possible. Makes sense when the fix is genuinely tiny and well-understood, and when redeploying an old version would reintroduce *other* problems that were already fixed since.
- **Roll back** — stop running the broken version and go back to the last known-good one. Makes sense when the fix isn't obvious yet, or isn't fast, and the priority is stopping customer impact *right now*, with root-causing to follow afterward.

Northbridge Retail's default is roll back first, investigate second — restoring service takes priority over understanding the bug, and a reverted deployment doesn't destroy any evidence needed for that investigation afterward.

## Rolling back a Kubernetes deployment

Because Kubernetes already tracks every revision of a `Deployment` object, rolling back doesn't require rebuilding anything:

```bash
# See the revision history
kubectl rollout history deployment/storefront-api

# Roll back to the immediately previous revision
kubectl rollout undo deployment/storefront-api

# Or roll back to a specific numbered revision
kubectl rollout undo deployment/storefront-api --to-revision=14

# Watch the rollback happen
kubectl rollout status deployment/storefront-api
```

`rollout undo` doesn't run a new build — it re-applies the pod spec (including the exact pinned image tag) from an earlier revision, using the same rolling-update mechanics from Lesson 23 to swap pods back gradually. This is exactly why Chapter 4's insistence on immutable, commit-SHA-tagged images matters here: `rollout undo` is only reliable because each revision points at a specific, unchanging image — if everything had been deployed as `latest`, there would be no earlier version to actually roll back to.

## Seeing the history that makes this possible

The same revision history exists in Azure DevOps, surfaced per environment rather than per Kubernetes object:

![Screenshot of an Azure DevOps environment's deployment history, listing past deployment runs with their status.](/courses/ci-cd-pipelines/ch05/25-rollbacks-and-recovery/environments-deployment-history.png)
*Every past deployment to this environment is listed here — exactly the record a rollback decision depends on.*
Source: [Microsoft Learn — Define approvals and checks](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/environments)

Whichever platform surfaces it, that history answers the two questions a rollback actually needs: what was running before this change, and when exactly did it change.

## A rollback is a start, not an ending

Rolling back stops the bleeding; it doesn't explain what happened. Northbridge Retail treats every rollback as the opening of an incident review, not the closing of one: what did the canary metrics from Lesson 23 actually show before things degraded, did an approval (Lesson 22) get rushed, did a quality gate (Lesson 18) get bypassed under pressure. The rollback buys the time to ask those questions without customers still experiencing the bug while you do.

## Troubleshooting scenario: tests pass, deployment fails

Rollback handles a bug that reached production. This scenario is different and arguably more
confusing: the pipeline's test stage is green, but the deployment itself never succeeds — nothing
customer-facing ever actually broke, because nothing new ever actually shipped.

**Problem description.** A PR for `storefront-api` merges to `main`. Lint, unit tests, and
integration tests all pass. The build step produces and pushes an image. The deploy step then
fails, and GitHub Actions marks the whole workflow run red — which makes it easy to assume
something is wrong with the code that just passed every test.

**Available evidence.**

```
✓ lint                      (14s)
✓ unit-tests                (42s)
✓ integration-tests         (1m 18s)
✓ build-and-push-image      (51s)
✗ deploy-to-production      (9s)

# deploy-to-production job log:
Run az aks get-credentials --resource-group rg-northbridge-prod --name aks-northbridge-prod
Run kubectl set image deployment/storefront-api storefront-api=...:a1b2c3d
Error from server (Forbidden): deployments.apps "storefront-api" is forbidden:
User "sp-github-actions-deploy" cannot patch resource "deployments" in API group "apps"
in the namespace "production"
```

**Diagnostic questions.**

- Did the test stages actually exercise anything related to the failure, or is the failure in a
  completely separate part of the pipeline (deployment permissions, not application code)?
- Is this a code problem at all, or a problem with what the pipeline's own identity is allowed
  to do?
- Did anything change recently about *permissions*, separately from anything about the
  application?

**Expected investigation sequence.**

```bash
# Step 1 -- read the actual error, not just the red X. "Forbidden" is
# an authorization error, not a test failure or a code bug.
# -> Error from server (Forbidden): ... cannot patch resource "deployments"

# Step 2 -- confirm this is new, not a pre-existing problem that
# happened to not get exercised before
kubectl auth can-i patch deployments --as=sp-github-actions-deploy -n production
no

# Step 3 -- check what changed around RBAC recently, since the
# application code itself was never the suspect once the error was read
git log --oneline -- infra/rbac/

a4f12e9  tighten production RBAC per least-privilege audit

# Step 4 -- confirm the fix target: the RoleBinding for this service
# account, not the application code or the test suite
kubectl get rolebinding -n production -o yaml | grep -A5 github-actions-deploy
```

**Correct resolution.** A recent, unrelated least-privilege tightening pass removed the
`deployments/patch` permission from the GitHub Actions deploy service account's Role in the
`production` namespace — a real security improvement that had an untested side effect on this
specific pipeline. The fix is adding `patch` back to that Role's `deployments` resource rule, not
touching `storefront-api`'s code or tests at all, since neither was ever the problem.

**Why this failure happens, and why the green test stages are a real clue, not a red herring.**
The test stages passing is actually diagnostic information: it tells you definitively that the
failure is downstream of the application code, somewhere in deployment mechanics — permissions,
cluster connectivity, a manifest error — not in anything the tests could have caught in the first
place. Treating a red pipeline run as "something's broken in my code" without first checking
*which stage* failed is the single most common way this kind of failure wastes time: a developer
re-reads their own diff for a bug that was never there.

**Prevention.** A dedicated `kubectl auth can-i` smoke-test step, run against a non-production
namespace as part of CI whenever RBAC/IAM configuration changes, would have caught this before it
ever reached a real deploy attempt. More generally: read which stage failed before reading what
the error says — stage identity alone already rules out entire categories of cause.

## Key terms

| Term | Meaning |
|---|---|
| Fix forward | Responding to an incident with a new, targeted patch instead of reverting |
| Rollback | Reverting a deployment to its last known-good, previously-running version |
| `kubectl rollout undo` | The command that reverts a Kubernetes Deployment to a prior revision |
| Revision history | The record of past deployments a rollback decision relies on |
| Stage-identity diagnosis | Using which pipeline stage failed (not just that one did) to rule out entire categories of root cause before reading error details |
