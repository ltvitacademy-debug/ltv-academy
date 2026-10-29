# Lesson 22 — Writing a Helm Chart for a Real Application

**Chapter 6 · Deploying with Helm · Lesson 2 of 4**

## What you'll learn

- The exact file layout `helm create` scaffolds, and what each file is
  actually for
- How `Chart.yaml` identifies and versions a chart, separately from
  the version of the application it deploys
- How to write a real `templates/deployment.yaml` that pulls its
  values from `values.yaml` through a shared helper template
- How to validate a chart locally with `helm lint` and `helm template`
  before it ever touches a cluster

## Scaffolding a chart

`helm create myapp` generates a working starter chart, and the
fastest way to learn the layout is to generate one and read it:

```
myapp/
├── Chart.yaml
├── values.yaml
├── .helmignore
├── templates/
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   ├── serviceaccount.yaml
│   ├── _helpers.tpl
│   └── tests/
│       └── test-connection.yaml
└── charts/          # subcharts/dependencies go here
```

`Chart.yaml` is the chart's own manifest — name, description, and two
separate version numbers. `values.yaml` holds the default values every
template in `templates/` reads from. `_helpers.tpl` defines reusable
named templates (helper functions) that other templates call with
`include`, so you're not repeating the same label block in five files.
`.helmignore` works like `.gitignore` — it keeps files out of the
packaged chart.

## `Chart.yaml`: two version numbers, two meanings

```yaml
apiVersion: v2
name: myapp
description: A Helm chart for the myapp API service
type: application
version: 0.3.0        # the chart's own version
appVersion: "2.1.4"    # the version of myapp it deploys
```

`version` is the chart's version — bump it whenever you change the
templates or defaults. `appVersion` is the version of the application
the chart currently points at by default — bump it when you ship a new
image tag. They move independently: you can patch a chart's templates
(`version` 0.3.0 → 0.3.1) without the application itself changing at
all, or vice versa.

## A real `templates/deployment.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "myapp.fullname" . }}
  labels:
    {{- include "myapp.labels" . | nindent 4 }}
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      {{- include "myapp.selectorLabels" . | nindent 6 }}
  template:
    metadata:
      labels:
        {{- include "myapp.selectorLabels" . | nindent 8 }}
    spec:
      containers:
        - name: {{ .Chart.Name }}
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag | default .Chart.AppVersion }}"
          ports:
            - containerPort: {{ .Values.service.port }}
          resources:
            {{- toYaml .Values.resources | nindent 12 }}
```

Notice `{{ include "myapp.fullname" . }}` — that's calling a named
template defined once in `_helpers.tpl` instead of re-typing the
naming convention in every file. `{{- toYaml .Values.resources |
nindent 12 }}` takes an entire block of structured values straight out
of `values.yaml` and re-indents it correctly into the manifest, which
is how a chart handles things like resource requests/limits without
hardcoding every field individually.

## Validating before you ever touch a cluster

Two commands catch problems before `helm install` does:

```
helm lint ./myapp
```

checks the chart for structural problems and missing required values.

```
helm template ./myapp --values values.yaml
```

renders the chart exactly as Helm would, without installing anything,
so you can read the final YAML and confirm it's what you expect before
it goes anywhere near a real cluster.

## Key terms

| Term | Meaning |
|---|---|
| `Chart.yaml` | The chart's own manifest: name, `version` (the chart), `appVersion` (the app it deploys) |
| `_helpers.tpl` | Named templates (helper functions) other templates call with `{{ include }}` |
| `helm lint` | Validates a chart's structure and required values without installing it |
| `helm template` | Renders a chart to plain YAML locally, with no cluster interaction, for review |
| `toYaml` / `nindent` | Template functions that dump a structured values block into a manifest at the correct indentation |

## Check yourself

You're ready for Lesson 23 when you can explain, without looking: what's
the difference between a chart's `version` and its `appVersion` in
`Chart.yaml`, and why would you reach for `helm template` before ever
running `helm install`?
