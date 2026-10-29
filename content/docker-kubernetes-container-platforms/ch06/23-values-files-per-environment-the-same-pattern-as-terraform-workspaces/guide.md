# Lesson 23 — Values Files Per Environment: The Same Pattern as Terraform Workspaces

**Chapter 6 · Deploying with Helm · Lesson 3 of 4**

## What you'll learn

- How to structure a base `values.yaml` alongside per-environment
  override files
- The exact `helm` flags that layer one values file on top of another
- Why this is, deliberately, the same mental model as Terraform's
  `-var-file` and workspace-scoped `.tfvars` files from the IaC course
- Where the parallel breaks down, and what Helm has instead of a
  Terraform workspace

## Base values, then environment overrides

The chart from Lesson 22 ships one `values.yaml` with sane defaults —
the values you'd want if nobody overrode anything:

```yaml
# values.yaml  (defaults — effectively "dev")
replicaCount: 1
image:
  repository: registry.example.com/myapp
  tag: "2.1.4"
resources:
  requests:
    cpu: 100m
    memory: 128Mi
  limits:
    cpu: 250m
    memory: 256Mi
ingress:
  enabled: false
```

A second file holds only what's different for production — not a
full copy of every key, just the overrides:

```yaml
# values-prod.yaml  (only the overrides)
replicaCount: 6
image:
  tag: "2.1.4"
resources:
  requests:
    cpu: 500m
    memory: 512Mi
  limits:
    cpu: "1"
    memory: 1Gi
ingress:
  enabled: true
  host: myapp.example.com
```

Helm merges files left to right, so the later file's keys win for
anything it specifies, and everything it doesn't mention falls back to
`values.yaml`:

```
helm upgrade --install myapp ./myapp \
  --values values.yaml \
  --values values-prod.yaml \
  --namespace prod
```

A `values-staging.yaml` with its own, smaller overrides follows the
identical pattern for staging.

## The direct parallel to Terraform

You've already lived this exact workflow once. In the Terraform
course, one `main.tf` described a resource, and separate `.tfvars`
files supplied the values per environment:

```
terraform apply -var-file="prod.tfvars"
```

Helm's `--values` stacking does the same job for Kubernetes manifests
that `-var-file` did for infrastructure code: one template/resource
definition, environment-specific files supplying only what changes,
applied with an explicit flag naming which file to use. Neither tool
makes you duplicate the thing being defined — only the handful of
values that legitimately differ per environment.

## Where the parallel isn't exact

Terraform workspaces also isolate **state** — each workspace tracks
its own resources independently, so `terraform workspace select prod`
changes which state file subsequent commands read and write. Helm has
no direct equivalent to a workspace for isolating *state* the same
way, because a Helm release's state (what's installed, with which
values) lives in the cluster itself, tracked per release name and
namespace. The practical equivalent is combining a distinct Kubernetes
**namespace** (`--namespace prod`) with a distinct **release name**
(`helm upgrade --install myapp-prod ...`) — that pairing is what keeps
your dev, staging, and prod installations of the same chart from
colliding, the way a Terraform workspace keeps environments from
colliding in state.

## Key terms

| Term | Meaning |
|---|---|
| Base `values.yaml` | The chart's default values; what applies if nothing overrides it |
| Override file (`values-prod.yaml`) | Holds only the keys that differ for that environment, not a full copy |
| `--values` (stackable) | Each `--values` flag layers on top of the previous one; later files win on conflicting keys |
| Release name + namespace | Helm's practical equivalent of a Terraform workspace: keeps per-environment installs from colliding |

## Check yourself

You're ready for Lesson 24 when you can explain, without looking: why
does a `values-prod.yaml` file typically contain only a handful of
keys rather than a full copy of `values.yaml`, and what combination of
Helm concepts plays the role that a Terraform workspace played for
isolating environment state?
