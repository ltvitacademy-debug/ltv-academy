# Lesson 16 — A Real Promotion Workflow: Dev to Staging to Prod

**Chapter 4 · GitOps in Practice · Lesson 4 of 4**

## What you'll learn

- The concrete, step-by-step path a single change takes from a
  developer's PR to running in production under GitOps
- Why the rule is "promote the artifact, not rebuild it" — and what
  breaks when teams violate it
- How an image tag or digest moves between overlays through
  reviewable pull requests instead of ad hoc commands
- Where ArgoCD/Flux reconciliation and automated tests each fit into
  the sequence, and what a rollback actually looks like

## The rule: promote the artifact, not rebuild it

The single most important discipline in a GitOps promotion workflow
is this: **the exact same built artifact — the same container image,
identified by an immutable tag or digest — moves unchanged through
dev, staging, and prod.** Only the Git-tracked configuration (which
overlay points at which tag) changes between environments. Nothing
ever gets rebuilt from source a second time for staging or a third
time for prod.

This matters because rebuilding per environment reopens the door to
the exact class of bug GitOps exists to close: "it worked in staging"
stops meaning anything if staging's build and prod's build weren't
actually the same bytes — a different base image layer cached, a
dependency that resolved to a newer patch version, a build-time flag
left on by accident. Building once and promoting the result removes
that variable entirely.

## The workflow, step by step

**1. A developer merges a PR to the application's main branch.**
CI builds a container image once, tags it with something immutable —
a Git SHA or a semver release — and pushes it to the registry. That
tag or digest never changes again for this build.

**2. CI (or a bot) opens a PR against the dev overlay.**
Using the directory-per-environment layout from Lesson 15, a small
automated step bumps the image tag in `overlays/dev/kustomization.yaml`:

```yaml
# overlays/dev/kustomization.yaml
images:
  - name: payments-api
    newTag: a1b2c3d   # the Git SHA just built
```

That PR merges (often auto-approved for dev), and ArgoCD or Flux
picks up the change and reconciles it into the dev namespace within
minutes.

**3. Automated validation runs against dev.**
Smoke tests, integration tests, or a synthetic traffic check confirm
the new build actually works, not just that it deployed.

**4. A promotion PR copies the same tag into the staging overlay.**

```yaml
# overlays/staging/kustomization.yaml
images:
  - name: payments-api
    newTag: a1b2c3d   # identical tag — copied, not re-tagged
```

This is the step where "promote, don't rebuild" is enforced in
practice: the PR diff should show only the tag moving from dev's
overlay into staging's, nothing else changing and nothing rebuilding.
Many teams script this (`kustomize edit set image` or a small `yq`
command) so a human only reviews and approves the diff, rather than
typing the tag by hand.

**5. Staging validation, often with a human in the loop.**
Further automated tests plus manual QA or a stakeholder sign-off.
Staging exists specifically to catch what dev's smaller test suite or
traffic pattern wouldn't.

**6. A second promotion PR copies the same tag into the prod overlay.**
Same mechanism as step 4, now targeting
`overlays/prod/kustomization.yaml` — usually gated by required
reviewers, a protected branch rule, or a change-management approval,
since this PR is the one that actually changes what customers see.

**7. ArgoCD or Flux reconciles prod, and health status confirms it.**
Sync status turns `Synced`; health status is what actually tells you
whether the rollout succeeded — watch it, don't just watch the sync.

**8. Rollback, if needed, is reverting the PR.**
Because the promotion was a Git commit changing one tag value, undoing
it is `git revert` on that commit, and ArgoCD/Flux reconciles the
cluster straight back to the previous known-good tag. No manual
`kubectl rollout undo`, no guessing which version was running before —
Git already has the answer.

## Why this is safer than it looks tedious

Every step above produces a reviewable artifact: a PR with a diff
that's often one line. That means every promotion has a timestamp, an
author, an approver, and a rollback path, for free, just from using
pull requests as the mechanism — which is the entire point of GitOps
applied to a release process instead of just to day-to-day
configuration.

## Key terms

| Term | Meaning |
|---|---|
| Immutable tag/digest | A build identifier (Git SHA, digest, or semver release) that never gets reused or overwritten once pushed |
| Promote the artifact | Moving the same built image reference between environment overlays, never rebuilding it for a later stage |
| Promotion PR | A pull request whose only change is bumping an image tag/digest in the next environment's overlay |
| Rollback via revert | Undoing a bad promotion by reverting its Git commit, letting ArgoCD/Flux reconcile back automatically |

## Check yourself

You're ready to move on when you can explain, without looking: what
specifically goes wrong if staging and prod each rebuild the
application from source instead of promoting the same image tag, and
what does reverting a promotion PR actually cause ArgoCD or Flux to
do?
