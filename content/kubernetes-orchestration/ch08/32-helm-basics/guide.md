# Helm Basics

Northbridge Retail's product-catalog service already needs a Deployment, a Service, an Ingress, a ConfigMap, a Secret, and an HPA — and dev, staging, and production each need slightly different settings applied to that same structure. Copy-pasting and hand-editing YAML across environments doesn't scale, and it's exactly how a forgotten image-tag edit ends up live in production. This lesson introduces Helm, the package manager for Kubernetes that turns a pile of related manifests into one versioned, reusable package.

## What you'll learn

- The specific problem Helm solves, and why hand-maintained YAML stops working past one environment
- Core Helm vocabulary: chart, release, and values
- The everyday commands: `helm install`, `helm upgrade`, `helm rollback`, `helm list`, `helm uninstall`
- How one chart serves dev, staging, and production using different values files

## The problem: one app, three environments, one pile of YAML

Northbridge's product-catalog needs six or more manifest files, and every one of dev, staging, and production needs its own replica count, image tag, and resource limits applied to those same files. Maintaining that by hand creates predictable problems:

- **Drift** — someone updates the image tag in staging and forgets production, or vice versa.
- **No atomic rollback** — if a bad change ships, reverting means finding the old YAML for every affected file and reapplying it manually.
- **No single source of truth for "what's running"** — there's no record of exactly what configuration was applied, when, or by whom.

## What Helm actually is

Helm packages a set of templated Kubernetes manifests, plus a file of default configuration, into a single versioned unit called a **chart**. Installing a chart into a cluster creates a **release** — a named, tracked instance of that chart with a specific set of **values** applied. Every `helm install` or `helm upgrade` is recorded as a numbered revision, so you always know what's currently deployed and can step back to any earlier revision on demand.

## Chart anatomy, previewed

Every chart shares the same three pieces (the next lesson builds one from scratch):

```
product-catalog/
  Chart.yaml       # name, version, metadata
  values.yaml       # default configuration
  templates/        # Kubernetes manifests with {{ .Values.* }} placeholders
    deployment.yaml
    service.yaml
```

## Installing and managing a release

```bash
# Add and refresh a chart repository
helm repo add northbridgeretail https://charts.northbridgeretail.internal
helm repo update

# See what's available
helm search repo northbridgeretail/product-catalog

# Install a release with environment-specific values
helm install catalog northbridgeretail/product-catalog \
  --values values-prod.yaml

# Change just one setting without a new values file
helm upgrade catalog northbridgeretail/product-catalog \
  --set image.tag=1.6.0

# Inspect state and history
helm list
helm status catalog
helm history catalog

# Undo the last upgrade instantly
helm rollback catalog 1

# Remove the release entirely
helm uninstall catalog
```

`helm upgrade` compares the new chart and values against the currently running release and applies only what changed — it doesn't tear everything down and recreate it. `helm rollback <release> <revision>` reapplies a prior revision's manifests and values in one command, which is the atomic rollback hand-rolled YAML never had.

## Values: one chart, different settings per environment

The same chart serves every environment by swapping which values file is applied at install time:

```yaml
# values-prod.yaml
replicaCount: 6
image:
  tag: "1.5.2"
resources:
  requests:
    cpu: "250m"
    memory: "256Mi"
```

```yaml
# values-dev.yaml
replicaCount: 1
image:
  tag: "latest"
resources:
  requests:
    cpu: "50m"
    memory: "64Mi"
```

The templates in `templates/` never change between environments — only the values file passed with `--values` does.

## Key terms

- **Chart** — a versioned package of templated Kubernetes manifests plus default configuration
- **Release** — a named, tracked instance of a chart installed into a cluster with a specific set of values
- **Values** — the configuration (replica counts, image tags, resource limits, and so on) that fills in a chart's templates
- **Revision** — a numbered record of one install or upgrade of a release, used by `helm rollback`
