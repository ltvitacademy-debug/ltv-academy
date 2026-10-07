# Writing Helm Charts

The last lesson covered what Helm is and how to install and roll back a release. This lesson builds the real thing: a Helm chart for Northbridge Retail's product-catalog service, from `helm create` through a finished `templates/` directory that renders a Deployment and a Service from one `values.yaml`. By the end, you'll have a chart you could actually install.

## What you'll learn

- Scaffolding a new chart with `helm create` and what each generated file is for
- Writing `Chart.yaml` and `values.yaml` for a real service
- Using Go template syntax in `templates/` to turn values into manifests
- Validating a chart with `helm lint` and `helm template` before it ever touches a cluster

## Scaffolding with helm create

```bash
helm create product-catalog
```

This generates a starter chart:

```
product-catalog/
  Chart.yaml
  values.yaml
  charts/             # subcharts (dependencies) go here
  templates/
    deployment.yaml
    service.yaml
    ingress.yaml
    _helpers.tpl
    NOTES.txt
    tests/
```

## Chart.yaml: identity and version

```yaml
apiVersion: v2
name: product-catalog
description: Northbridge Retail product-catalog service
type: application
version: 0.1.0        # chart version — bump when templates/structure change
appVersion: "1.5.2"    # version of the app the chart currently points at
```

`version` and `appVersion` are tracked separately on purpose: `version` changes when the chart's templates change; `appVersion` changes when a new image of product-catalog ships, even if the chart itself is untouched.

## values.yaml: the knobs this chart exposes

```yaml
replicaCount: 3

image:
  repository: northbridgeretail/product-catalog
  tag: "1.5.2"
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 80

resources:
  requests:
    cpu: "250m"
    memory: "256Mi"
  limits:
    cpu: "500m"
    memory: "512Mi"

ingress:
  enabled: true
  host: catalog.northbridgeretail.com
```

Every value here is a default. A values file passed with `--values` at install time only needs to override the ones that differ for that environment.

## templates/deployment.yaml: values become YAML

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Release.Name }}-product-catalog
  labels:
    app: {{ .Chart.Name }}
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      app: {{ .Chart.Name }}
  template:
    metadata:
      labels:
        app: {{ .Chart.Name }}
    spec:
      containers:
        - name: product-catalog
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
          imagePullPolicy: {{ .Values.image.pullPolicy }}
          ports:
            - containerPort: 8080
          resources:
            {{- toYaml .Values.resources | nindent 12 }}
```

`{{ .Values.replicaCount }}` pulls straight from `values.yaml`. `{{ .Release.Name }}` and `{{ .Chart.Name }}` are built-in objects Helm provides automatically — `.Release.Name` is whatever name you give `helm install`, so the same template produces uniquely named resources per release.

## templates/service.yaml

```yaml
apiVersion: v1
kind: Service
metadata:
  name: {{ .Release.Name }}-product-catalog
spec:
  type: {{ .Values.service.type }}
  selector:
    app: {{ .Chart.Name }}
  ports:
    - port: {{ .Values.service.port }}
      targetPort: 8080
```

## Validating before install

```bash
# Lint for structural mistakes
helm lint ./product-catalog

# Render the templates locally and read the actual YAML Helm would apply
helm template catalog ./product-catalog --values values-prod.yaml

# Install for real once the rendered output looks right
helm install catalog ./product-catalog --values values-prod.yaml
```

`helm template` never touches the cluster — it just renders. Running it before every install or upgrade is the single most useful habit for catching a typo in a `{{ }}` expression before it becomes a broken Deployment.

## Key terms

- **`helm create`** — scaffolds a new chart with a standard starter structure
- **Go template syntax** — the `{{ }}` expressions in `templates/` that Helm evaluates against values
- **Built-in objects** — `.Release`, `.Chart`, and `.Values`, available in every template without being defined
- **`helm lint`** — checks a chart for structural and syntax problems without installing it
- **`helm template`** — renders a chart's final YAML locally, with no cluster interaction
