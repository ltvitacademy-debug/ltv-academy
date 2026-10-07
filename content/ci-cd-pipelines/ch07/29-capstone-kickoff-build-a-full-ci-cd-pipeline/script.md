# Script — Capstone Kickoff: Build a Full CI/CD Pipeline

## Segment 1 (title)

You've spent six chapters learning pieces: GitHub Actions, Azure DevOps, testing and quality gates, deployment strategies, and pipelines for infrastructure and Kubernetes. This capstone puts every piece together on one project — a complete, working pipeline for Northbridge Retail's storefront API. This lesson is the kickoff, defining exactly what you're building.

## Segment 2 (steps)

The project is storefront-api: a small, containerized REST API with a handful of endpoints, a unit test suite, and a Dockerfile. It's intentionally modest, the same way retail-orders-analytics was modest in the earlier Git and GitHub course — small enough to build end to end in a few focused sessions, realistic enough that the pattern transfers directly to a 50-service system at a real job.

## Segment 3 (steps)

The finished pipeline needs six things: trigger on every pull request and push to main, build and test with a failing test blocking the pipeline, build and push a container image tagged with the commit SHA, auto-deploy to staging automatically, require manual approval before production, and deploy to Kubernetes using manifests or a GitOps pattern from chapter six.

## Segment 4 (steps)

If you're short on time, cut the production approval gate first and deploy straight to staging only, cut GitOps next and apply manifests directly instead, and only cut the registry push last. Never cut the automated test step under any circumstance — a CI slash CD pipeline with no tests in it isn't demonstrating what this course taught.

## Segment 5 (outro)

Your deliverables: a working repo with a Dockerfile and tests, one or two complete pipeline YAML files, and a short note on which deployment strategy you chose and why — that note becomes the backbone of your lesson thirty-one portfolio writeup. Up next, lesson thirty: actually building it.
