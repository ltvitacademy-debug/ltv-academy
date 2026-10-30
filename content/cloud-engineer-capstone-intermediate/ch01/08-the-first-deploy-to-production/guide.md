# Lesson 8 — The First Deploy to Production

**Chapter 1 · Intermediate Capstone: Containers, CI/CD, and a Real Misconfiguration · Lesson 8 of 16**

## What you'll learn

- How every piece built in Lessons 3 through 7 comes together for the first real production deploy
- What `terraform apply` actually stands up, start to finish, for the first time
- What the running cluster looks like immediately afterward
- Why this is a genuine milestone for both Priya and Casey — even though the story isn't over

## Standing up the real infrastructure

With the Dockerfile (Lesson 3), the Terraform configuration (Lesson 4), the CI/CD pipeline
(Lesson 5), the AWS backup bucket (Lesson 6), and the replication job (Lesson 7) all written,
Theo runs the full chain for the first time:

```bash
terraform apply
```

```
azurerm_resource_group.driftwood: Creating...
azurerm_virtual_network.driftwood: Creating...
azurerm_subnet.aks: Creating...
azurerm_container_registry.driftwood: Creating...
azurerm_kubernetes_cluster.driftwood: Creating...
helm_release.storefront: Creating...

Apply complete! Resources: 6 added, 0 changed, 0 destroyed.
```

`rg-driftwood-prod`, the VNet and subnet, `acrdriftwoodprod`, and `aks-driftwood-prod` all exist
for the first time — and in the same apply, the storefront chart installs onto the brand-new
cluster using `values-prod.yaml` exactly as Lesson 4 wrote it.

## The first real push to `main`

```bash
git push origin main
```

GitHub Actions picks it up: the CI job builds, tests, scans, and pushes the image to
`acrdriftwoodprod.azurecr.io/storefront:a1b2c3d`. The CD job logs into Azure over OIDC, points
`kubectl`/`helm` at `aks-driftwood-prod`, and runs `helm upgrade --install` with that image tag.
No one touches `kubectl` by hand anywhere in this sequence.

## Checking the running cluster

```bash
kubectl get pods -n driftwood-prod
```

```
NAME                          READY   STATUS    RESTARTS   AGE
storefront-7d9f8c6b5d-2k9p    1/1     Running   0          45s
storefront-7d9f8c6b5d-j4m2q   1/1     Running   0          45s
storefront-7d9f8c6b5d-p9k1z   1/1     Running   0          44s
storefront-7d9f8c6b5d-x7n3r   1/1     Running   0          44s
storefront-7d9f8c6b5d-q2v8t   1/1     Running   0          44s
storefront-7d9f8c6b5d-m5w1s   1/1     Running   0          44s
storefront-7d9f8c6b5d-k8d4y   1/1     Running   0          44s
storefront-7d9f8c6b5d-r3f9u   1/1     Running   0          44s
storefront-7d9f8c6b5d-t6h2b   1/1     Running   0          43s
storefront-7d9f8c6b5d-w9j5n   1/1     Running   0          43s
```

Ten pods, all `1/1 Running`, exactly matching `minReplicas: 10` from Lesson 4's `values-prod.yaml`
— the autoscaler brought the deployment straight to its configured floor on first install, the way
it's designed to. "Ten pods, more than we'll probably need this early, but better safe than sorry
before launch," Theo notes, checking it off the list and moving on to the smoke test. Nothing
about that number looks wrong; it's doing exactly what it was configured to do.

## Smoke test, and sign-off

```bash
kubectl rollout status deployment/storefront -n driftwood-prod
curl -f https://storefront.driftwoodoutdoor.example/healthz
```

Both come back clean. That night, the Lesson 7 replication job runs its first unattended pass —
a clean dry run of the exact job that will matter most once the Spring launch actually starts.

## A real milestone for both stakeholders

Priya checks that the storefront loads correctly and that there's now a nightly backup landing in
a second cloud — the single-point-of-failure problem from Lesson 2 is gone. Casey checks that
none of it required a person to run `kubectl` or click through the Azure portal — the whole chain
is in code, in a pipeline, reviewable by anyone on the team. Both sign off. Ten running pods, zero
manual deploy steps, and a backup landing in AWS every night reads like an unambiguous win — and
for now, it is one.

## Key terms

| Term | Meaning |
|---|---|
| `terraform apply` | Provisions every resource in the configuration for the first time, in dependency order |
| Production rollout | The first time a pipeline's CD job deploys a workload to the real cluster, not a test environment |
| Go-live | The point at which a system is handling real production traffic |
| Smoke test | A minimal post-deploy check confirming the app actually works before calling the deploy a success |

## Lab

Without looking back, write out the exact sequence of events between `git push origin main` and
ten running pods, citing which lesson introduced each step.

## Check yourself

You're ready for the next phase of this project when you can explain, without looking: how many
pods came up immediately after this first production deploy, why exactly that number, and which
earlier lesson's configuration determined it.
