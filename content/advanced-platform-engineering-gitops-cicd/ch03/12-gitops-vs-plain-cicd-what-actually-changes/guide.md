# Lesson 12 — GitOps vs. Plain CI/CD: What Actually Changes

**Chapter 3 · GitOps Principles · Lesson 4 of 4**

## What you'll learn

- A direct, stage-by-stage comparison of a plain CI/CD pipeline that
  ends in `kubectl apply` against a real GitOps pipeline
- Exactly which responsibilities move out of CI and into Git plus an
  in-cluster agent, and which stay exactly where they were
- How environment promotion changes from "re-run the pipeline against
  a different target" to "open a pull request"
- How to recognize, from the four OpenGitOps principles covered across
  this chapter, whether a given pipeline is really doing GitOps or just
  keeping its YAML in a repo

## Same build, different ending

Nothing about building and testing your application changes. Both
pipelines still check out code, run tests, build a container image,
and push it to a registry. The split happens at the very last stage —
the one usually just labeled "Deploy":

```yaml
# plain CI/CD: deploy stage runs inside the pipeline
- build
- test
- push-image
- deploy:              # kubectl apply / helm upgrade, direct to cluster
    run: kubectl apply -f k8s/production/

# GitOps: the pipeline's last stage is a commit, not a deployment
- build
- test
- push-image
- update-manifest:      # bump the image tag in Git, open a PR
    run: |
      yq eval '.spec.template.spec.containers[0].image = "registry/app:${TAG}"' \
        -i apps/payments-api/overlays/production/deployment.yaml
      git commit -am "bump payments-api to ${TAG}"
      git push && gh pr create
```

That's the whole shift in one comparison. In the plain model, CI's last
act is to touch the cluster. In the GitOps model, CI's last act is to
touch Git — and an in-cluster agent, covered across Lessons 10 and 11,
is the only thing that ever touches the cluster from here on.

## What moves, stage by stage

| Responsibility | Plain CI/CD | GitOps |
|---|---|---|
| Build and test | CI pipeline | CI pipeline — unchanged |
| Holds cluster credentials | CI pipeline (push-based, Lesson 10) | Nothing external; the in-cluster agent only |
| Triggers the deploy | A pipeline run finishing | A Git commit landing on the watched branch |
| Detects config drift | Nothing does — it's invisible until someone notices | The agent's continuous reconciliation loop (Lesson 11) |
| Rollback | Re-run a previous pipeline, or guess at the prior `kubectl` state | `git revert`, which the agent then re-applies automatically |
| Audit trail | Pipeline run logs, if retained | Full Git history: every change, reviewed and timestamped |
| Change review | Optional, often skipped under pressure | A pull request against the manifest repo — hard to bypass |

## Promotion becomes a pull request, not a pipeline parameter

In plain CI/CD, promoting a build from staging to production usually
means re-running the same pipeline with a different target — a
different `kubectl context`, a different set of credentials, maybe a
manual approval gate in the pipeline tool itself. The actual mechanism
by which "staging" and "production" differ often lives in pipeline
configuration, not in anything versioned alongside the application.

In GitOps, promotion is a **Git operation**: the staging overlay
already has the new image tag (because CI committed it there first),
and promoting to production means opening a pull request that copies
that change into the production overlay — exactly the `base` /
`overlays/staging` / `overlays/production` structure from Lesson 9.
Whoever reviews that PR is reviewing the literal diff of what's about
to run in production, line by line, before it happens — not trusting
that a pipeline parameter was set correctly.

## The honest caveat: GitOps needs discipline too

None of this is free. Merging to the branch a GitOps agent watches
**is** the deploy — there's no separate "are you sure?" button once
that merge lands, so branch protection and PR review on the manifest
repo become exactly as important as the deploy approval step they
replace. And none of it works at all without the four things this
chapter has walked through in order: state declared declaratively
(Lesson 9), stored with full version history, pulled by an in-cluster
agent instead of pushed by CI (Lesson 10), and continuously reconciled
against drift (Lesson 11). A team that keeps YAML in a repo but still
lets CI run `kubectl apply` directly hasn't adopted GitOps — it's kept
the push model and just moved the files.

## Key terms

| Term | Meaning |
|---|---|
| Deploy stage (plain CI/CD) | The pipeline stage that applies changes directly to the cluster, requiring the pipeline to hold cluster credentials |
| Manifest update (GitOps) | The pipeline's final stage in GitOps: committing a change (like a new image tag) to the Git repo instead of touching the cluster |
| Promotion | Moving a validated change from one environment to the next; in GitOps this is a pull request merging an overlay change, not a pipeline re-run |
| Branch protection | Review/approval rules on the branch a GitOps agent watches, which effectively replace the old manual deploy-approval gate |

## Check yourself

You've completed this chapter when you can explain, without looking:
in a GitOps pipeline, what is CI's very last action before a change
reaches production, what performs the actual deployment instead, and
which of the four OpenGitOps principles from this chapter would be
violated by a team that stores YAML in Git but still lets its CI
pipeline run `kubectl apply` directly against the cluster?
