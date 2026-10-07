# Rollbacks & Recovery

Every safeguard in this chapter reduces risk; none of them eliminates it. Tests pass, approvals clear, a canary rollout looks fine at 10% of traffic and then degrades at 50% — Northbridge Retail still needs a plan for the moment something gets through anyway. That plan is this lesson: how to get back to a known-good state, fast, and how to figure out what actually happened afterward.

## What you'll learn

- Why "fix forward" and "roll back" are two different responses, and when each one is the right call
- The real `kubectl` commands for rolling back a Kubernetes deployment to its previous version
- Why Chapter 4's immutable, pinned image tags are what make rollback reliable instead of a guess
- Why a rollback is a starting point for investigation, not the end of the incident

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

## Key terms

| Term | Meaning |
|---|---|
| Fix forward | Responding to an incident with a new, targeted patch instead of reverting |
| Rollback | Reverting a deployment to its last known-good, previously-running version |
| `kubectl rollout undo` | The command that reverts a Kubernetes Deployment to a prior revision |
| Revision history | The record of past deployments a rollback decision relies on |
