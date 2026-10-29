# Lesson 21 — Why Helm Exists: Templating a Deployment Instead of Copy-Pasting YAML

**Chapter 6 · Deploying with Helm · Lesson 1 of 4**

## What you'll learn

- The exact pain that shows up once you're running the same app in
  dev, staging, and prod with plain Kubernetes manifests
- What Helm actually is — a package manager for Kubernetes, not a
  replacement for `kubectl`
- How a chart separates a **template** (the shape of your Deployment,
  Service, Ingress, etc.) from the **values** that fill it in
- Why this is the same problem you already solved once, in the
  Terraform course, with variables and `.tfvars` files

## The problem: three YAML files that are 95% identical

Go back to Chapter 3, where you wrote a Deployment manifest by hand
and applied it with `kubectl apply -f deployment.yaml`. That works
fine for one environment. The moment you need the same app running in
dev, staging, and production, you're staring at a real decision: do
you maintain three separate YAML files that are nearly identical, or
one file with some kind of find-and-replace step before `kubectl
apply`?

Neither answer is good. Three files means every real change —
bumping the image tag, adding an environment variable, adjusting a
resource limit — has to be made three times, correctly, in the right
order, or your environments silently drift apart. A shell script that
`sed`s values into a template file before applying it works, but
you've just built a fragile, undocumented templating engine out of
string replacement, with no way to see what changed between releases,
no built-in rollback, and no versioning of "what did we actually
deploy to prod last Tuesday."

This is the exact shape of the problem Terraform's workspaces and
`.tfvars` files solved for infrastructure code in the previous course:
one `main.tf` describing the resource, separate variable files
supplying the per-environment values. Helm exists to give you that
same discipline for Kubernetes manifests.

## What Helm actually is

Helm is a package manager for Kubernetes. Where `apt` or `winget`
installs a piece of software by resolving a package and its
dependencies, Helm installs an application onto a cluster by resolving
a **chart** — a bundled, versioned package of Kubernetes manifest
templates — against a set of values that customize it for a particular
installation. Helm does not replace `kubectl`; under the hood it still
generates plain Kubernetes YAML and applies it through the Kubernetes
API. What Helm adds is the templating layer, a release history, and a
single command (`helm install` / `helm upgrade`) that replaces running
`kubectl apply -f` against a folder of hand-edited files.

## Templates and values: separating the shape from the numbers

A Helm chart's `templates/` directory holds Kubernetes manifests
written in Go's templating syntax instead of plain YAML. Where a
hand-written Deployment hardcodes a replica count or an image tag, a
Helm template references a placeholder instead:

```yaml
spec:
  replicas: {{ .Values.replicaCount }}
  template:
    spec:
      containers:
        - name: web
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
```

Those `{{ .Values.x }}` expressions are filled in at install or
upgrade time from a `values.yaml` file (more on per-environment values
files in Lesson 23). The template itself never changes between dev,
staging, and prod — only the values fed into it do. That's the whole
trick: one template, many value sets, zero copy-pasted YAML.

## Key terms

| Term | Meaning |
|---|---|
| Helm | A package manager for Kubernetes; installs/upgrades/rolls back applications packaged as charts |
| Chart | A versioned, bundled package of Kubernetes manifest templates plus default values and metadata |
| Template | A manifest file in `templates/` written with `{{ }}` placeholders instead of hardcoded values |
| `values.yaml` | The file supplying the concrete values a chart's templates reference at install/upgrade time |
| Release | A specific, named, versioned instance of a chart installed into a cluster |

## Check yourself

You're ready for Lesson 22 when you can explain, without looking: why
is maintaining three near-identical Deployment YAML files for
dev/staging/prod a worse long-term bet than one templated chart with
three values files, and what role does Helm itself play that
`kubectl apply -f` never did on its own?
