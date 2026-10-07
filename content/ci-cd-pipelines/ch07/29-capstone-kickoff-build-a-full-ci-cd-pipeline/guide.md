# Capstone Kickoff: Build a Full CI/CD Pipeline

You've spent six chapters learning pieces: GitHub Actions, Azure DevOps, testing and quality gates, deployment strategies, and pipelines for infrastructure and Kubernetes. This capstone puts every piece together on one project: a complete CI/CD pipeline for **Northbridge Retail's** `storefront-api`, the containerized service behind its product catalog and checkout flow. This lesson is the kickoff — defining exactly what you're going to build before you build it.

## What you'll learn

- The capstone's scope: what `storefront-api` is, and exactly what the finished pipeline must do
- The four stages your pipeline needs, mapped to chapters you've already completed
- The deliverables you'll produce by the end of Lesson 30
- How to scope the project down if you're short on time, without skipping the parts that matter most

## The project: `storefront-api`

Northbridge Retail's `storefront-api` is a small but realistic service: a containerized REST API (any language is fine — the pipeline design is what matters, not the app code) with a handful of endpoints, a unit test suite, and a Dockerfile. It's intentionally modest, the same way `retail-orders-analytics` was modest in the earlier Git & GitHub course in this path — small enough to build end to end in a few focused sessions, realistic enough that the pipeline pattern transfers directly to a 50-service system at a real job.

## What the finished pipeline must do

By the end of Lesson 30, your pipeline (built in GitHub Actions, Azure Pipelines, or both — your choice) must:

1. **Trigger** on every pull request and every push to `main` (Chapter 2, Lesson 6).
2. **Build and test** — install dependencies, run the unit test suite, and fail the pipeline if any test fails (Chapter 4, Lessons 16 and 18).
3. **Build a container image** for `storefront-api` and push it to a registry, tagged with the commit SHA or a version number (Chapter 4, Lesson 19).
4. **Deploy to a staging environment** on every successful merge to `main`, automatically — this is Continuous Deployment to staging (Chapter 1, Lesson 3; Chapter 5, Lesson 21).
5. **Require manual approval before deploying to production** — this is Continuous Delivery, not Deployment, for the environment your customers actually reach (Chapter 5, Lesson 22).
6. **Deploy to Kubernetes** using the manifests or GitOps pattern from Chapter 6 (Lessons 27-28) — a Deployment, a Service, and (if you completed Lesson 23) a rollout strategy more careful than a single abrupt swap.

## Scoping it to the time you have

If you're tight on time, here's the order to cut from, least damaging first: skip the production approval gate and deploy straight to staging only (cut step 5 first); skip GitOps and apply Kubernetes manifests directly from the pipeline instead of via Argo CD/Flux (cut step 6's GitOps half next); skip the container registry push and just build the image locally in the pipeline to prove it builds (cut step 3's push last — the build itself still matters). Don't cut step 2 (automated tests) under any circumstance — a "CI/CD pipeline" with no tests in it isn't demonstrating the thing this whole course taught.

## Your deliverables

1. A `storefront-api` repository (or reused service from an earlier course) with a working Dockerfile and test suite.
2. One or two complete workflow/pipeline YAML files implementing steps 1-6 above, to whatever extent you scoped them.
3. A short written note (a paragraph is enough) explaining which deployment strategy you used and why — this becomes the backbone of your Lesson 31 portfolio writeup.

## Key terms

- **Capstone** — a final project that applies everything taught across a course's chapters to one real, end-to-end build
- **Staging environment** — a pre-production environment that mirrors production closely enough to catch problems before customers see them
- **Scoping** — deliberately deciding what to cut when time is limited, prioritizing the parts that demonstrate the core skill
