# Lesson 15 — Structuring a GitOps Repo for Multiple Environments

**Chapter 4 · GitOps in Practice · Lesson 3 of 4**

## What you'll learn

- The three common patterns for representing dev/staging/prod in a
  GitOps repo: directory-per-environment, branch-per-environment, and
  repo-per-environment
- How Kustomize's base-plus-overlays structure implements the
  directory pattern concretely
- The real tradeoffs of each pattern — not which one is "correct,"
  but what each one costs you
- Why most ArgoCD and Flux shops converge on directories with
  Kustomize overlays in one repo, and when that's the wrong call

## Why structure is a real decision

ArgoCD's `Application` and Flux's `Kustomization` both just point at
"a path in a repo." Neither tool tells you how to organize that repo
across environments — that's a design decision you make once, early,
and live with for a long time. There are three common shapes.

## Pattern 1: directory-per-environment (Kustomize overlays)

One repo, one `base/` directory with the environment-agnostic
manifests, and one overlay directory per environment that patches
just what differs:

```
apps/payments-api/
├── base/
│   ├── deployment.yaml
│   ├── service.yaml
│   └── kustomization.yaml
└── overlays/
    ├── dev/
    │   └── kustomization.yaml      # replicas: 1, image tag: dev
    ├── staging/
    │   └── kustomization.yaml      # replicas: 2, image tag: v1.4.2
    └── prod/
        └── kustomization.yaml      # replicas: 6, image tag: v1.4.2
```

A `kustomization.yaml` overlay references the base and patches only
what changes — replica count, resource limits, the image tag:

```yaml
# overlays/staging/kustomization.yaml
resources:
  - ../../base
patches:
  - path: replica-patch.yaml
images:
  - name: payments-api
    newTag: v1.4.2
```

**Tradeoffs:** everything is visible side by side in one `git diff` —
you can literally see what's different between staging and prod in a
single view, and a promotion is often a one-line tag bump in a PR.
The cost is that one repo now holds every environment's config, so
access control is coarser unless you layer branch protection or
`CODEOWNERS` rules per path.

## Pattern 2: branch-per-environment

Each environment tracks a separate branch — `dev`, `staging`,
`main` (prod) — and "promotion" means merging one branch into the
next:

```
git checkout staging
git merge dev
git push
```

**Tradeoffs:** this maps cleanly onto a GitFlow-style mental model
people already know, and branch protection rules give you a natural
approval gate per environment. But it has real costs: comparing
staging to prod means diffing two branches instead of two folders,
which is less visible at a glance; merge conflicts show up exactly
when you're promoting; and because ArgoCD/Flux now track revision by
branch instead of by path, a hotfix applied directly to `main` can
drift ahead of `staging` in a way that's easy to miss.

## Pattern 3: repo-per-environment (or app-repo vs. config-repo)

Either the whole config repo is forked per environment, or — more
commonly — application source code lives in one repo while a
separate **config repo** holds only the rendered or overlay manifests
that ArgoCD/Flux actually watch. The app repo's CI pushes a new image
tag into the config repo; it never touches cluster manifests
directly.

**Tradeoffs:** strongest isolation — you can give prod's config repo
a completely different access-control policy, required reviewers,
and audit trail than dev's. It's also how most serious production
setups separate "who can merge app code" from "who can approve a
production deploy." The cost is operational: more repos to keep in
sync, more cross-repo automation to promote a change, and no single
`git diff` that shows you every environment at once.

## What most shops actually do

In practice, most ArgoCD and Flux installations land on **directories
with Kustomize overlays inside one config repo**, often combined with
a separate app-source repo for the CI build step — getting the
single-diff visibility of Pattern 1 while still keeping "build the
image" and "deploy the image" as separate concerns. Branch-per-environment
shows up more in older or migrating setups; full repo-per-environment
shows up where compliance genuinely requires separate audit trails
per environment, not just separate folders.

## Key terms

| Term | Meaning |
|---|---|
| Base (Kustomize) | The environment-agnostic manifests every overlay builds on top of |
| Overlay | A per-environment directory that references a base and patches only what differs there |
| Branch-per-environment | Each environment tracked by its own Git branch; promotion = merging forward |
| Config repo | A repo holding only deployable manifests/overlays, separate from application source code |

## Check yourself

You're ready for Lesson 16 when you can explain, without looking:
what does a Kustomize overlay actually contain versus what lives in
`base/`, and what specific visibility do you lose when you switch
from directory-per-environment to branch-per-environment?
