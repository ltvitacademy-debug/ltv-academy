# Script — Helm Basics

## Segment 1 (title)

Northbridge Retail's product-catalog service needs a Deployment, a Service, an Ingress, a ConfigMap, a Secret, and an HPA — and dev, staging, and production each need slightly different settings applied to that same structure. Copy-pasting YAML between environments doesn't scale. This lesson introduces Helm, the package manager for Kubernetes.

## Segment 2 (steps)

Hand-maintained YAML across environments drifts: someone updates the image tag in staging and forgets production. Resource limits get set manually and inconsistently. And when a bad change ships, reverting means hunting down the old YAML for every affected file and reapplying it by hand — there's no single, trusted record of what's actually running.

## Segment 3 (code)

Helm bundles templated manifests and default configuration into a chart. Installing a chart creates a release — a named, tracked instance with specific values applied. helm install creates it, helm upgrade changes only what's different, and because every change is a recorded revision, helm rollback can undo an upgrade in one command.

## Segment 4 (steps)

Every chart shares the same three pieces: Chart.yaml holds the name and version, values.yaml holds default configuration, and templates holds the actual Kubernetes manifests with placeholders that values fill in. Different environments just supply a different values file against those same templates — the templates themselves never change.

## Segment 5 (outro)

That's Helm from the outside looking in. Next lesson, we build this exact chart for Northbridge's product-catalog service from scratch — Chart.yaml, values.yaml, and templates, piece by piece.
