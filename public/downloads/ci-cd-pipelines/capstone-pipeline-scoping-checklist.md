# CI/CD Pipeline Capstone — Scoping Checklist

Built from Lesson 29's capstone kickoff and the course's full chapter map.
Use this to scope your own pipeline project — for the course capstone or
for a real pipeline at work — and to cut scope deliberately instead of by
accident when time runs short.

## What the finished pipeline should do (full scope)

- [ ] **Trigger** on every pull request and every push to `main`
      _(Ch.1 L3, Ch.2 L6)_
- [ ] **Build and test** — install dependencies, run the unit test suite,
      fail the pipeline on any test failure _(Ch.4 L16)_
- [ ] **Static analysis / lint** as its own gate, separate from tests
      _(Ch.4 L17)_
- [ ] **Coverage quality gate** — fail the build if coverage drops below
      an agreed threshold _(Ch.4 L18)_
- [ ] **Build a container image**, tagged with the commit SHA, pushed to
      a registry _(Ch.4 L19-20)_
- [ ] **Deploy to staging automatically** on every successful merge to
      `main` — Continuous Deployment _(Ch.1 L3, Ch.5 L21)_
- [ ] **Require manual approval before production** — Continuous
      Delivery, not Deployment, for the environment customers reach
      _(Ch.5 L22)_
- [ ] **Deploy with a strategy more careful than an abrupt swap** —
      rolling, blue-green, or canary, matched to the change's blast
      radius _(Ch.5 L23)_
- [ ] **Deploy to Kubernetes**, ideally via GitOps (Argo CD/Flux) rather
      than CI pushing `kubectl` directly _(Ch.6 L27-28)_
- [ ] **A rollback plan** that's actually been thought through, not
      assumed _(Ch.5 L25)_

## Cutting scope — in this order, if time is short

Cut from the bottom of this list first; never cut automated tests:

1. Skip the production approval gate — deploy straight to staging only.
2. Skip GitOps — apply Kubernetes manifests directly from the pipeline
   instead of via Argo CD/Flux.
3. Skip the registry push — build the image locally in the pipeline just
   to prove it builds, without publishing it anywhere.
4. **Never cut:** the automated test step. A "CI/CD pipeline" with no
   tests in it isn't demonstrating the thing this course taught.

## Deliverables to produce alongside the pipeline

- [ ] A repository with a working Dockerfile and test suite
- [ ] One or two complete workflow/pipeline YAML files
- [ ] A short written note: which deployment strategy was used, and why —
      this becomes the backbone of a portfolio writeup _(Ch.7 L31)_

## Tracking whether it's actually working

Once the pipeline is live, track the four DORA metrics (Ch.1 L4) over
several weeks, not from a single run — see the companion DORA metrics
tracker template in this resource vault.
