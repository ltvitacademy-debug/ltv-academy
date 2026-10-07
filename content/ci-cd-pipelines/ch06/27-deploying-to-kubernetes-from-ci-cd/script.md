# Script — Deploying to Kubernetes From CI/CD

## Segment 1 (title)

The last lesson's pipeline provisions Northbridge Retail's EKS cluster with Terraform. This lesson's pipeline ships the actual application — the cart service and the rest — onto that cluster, every single time code merges to main.

## Segment 2 (steps: four-stage shape)

Every container deploy pipeline follows the same four-stage shape, no matter what sits on top of Kubernetes. Build turns source code into a container image. Push uploads that image to a registry Kubernetes can actually pull from. Update points the Kubernetes manifest, or the Helm values, at the new image tag. And roll out applies that change to the cluster and confirms it actually worked.

## Segment 3 (code: build and push)

Northbridge Retail tags every image with the Git commit SHA, never latest. That way the exact code running in production is always traceable back to one specific commit, and two different builds never produce an indistinguishable image tag that nobody can tell apart later.

## Segment 4 (code: kubectl set image)

For most services, the pipeline updates the cluster directly with kubectl set image, which patches the deployment's pod template and triggers Kubernetes' own rolling update — new pods start and have to pass their readiness probe before any old, healthy pod is retired. Rollout status is the real gate here: it blocks the job until every new pod reports healthy, or fails the build outright after a timeout.

## Segment 5 (code: Helm upgrade)

For a service with more moving parts — multiple environments, templated configuration — the pipeline reaches for Helm instead of raw kubectl commands. Install makes the command safe to run even the very first time, upgrading or installing as needed, and wait blocks the job the same way rollout status does, until Kubernetes reports every new pod healthy.

## Segment 6 (outro)

Next lesson: instead of CI pushing changes straight into the cluster like this pipeline does, GitOps flips the direction entirely — the cluster itself pulls its changes from Git.
