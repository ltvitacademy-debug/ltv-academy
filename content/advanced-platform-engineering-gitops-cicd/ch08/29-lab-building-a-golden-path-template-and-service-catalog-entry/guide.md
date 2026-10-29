# Lesson 29 — Lab: Building a Golden Path Template and Service Catalog Entry

**Chapter 8 · Capstone: Building an Internal Developer Platform · Lesson 29 of 32**

## What you'll learn

- How to turn the catalog and template concepts from Chapter 2 into one real, runnable
  Backstage software template for a new service at **acme-corp**
- How to make that template a true golden path — CI/CD, monitoring, and a GitOps deploy
  path already wired in, not just a bare skeleton of source code
- How the scaffolder's `catalog:register` step closes the loop so the new service is
  visible in the catalog the moment it exists, instead of depending on someone remembering
  to add it later
- Why "the pipeline is green" and "the service is actually deployable" are two different
  checks, and how to verify both before calling the template done

## The scenario

acme-corp's platform team keeps hearing the same complaint: every new service starts life
as a copy-pasted repo, with CI config that's slightly stale, a Dockerfile someone forgot to
update, and no entry in the catalog until a teammate notices it in a dependency graph three
weeks later. This lab builds the fix — a single golden-path template, `nodejs-service`, that
produces a new service with its pipeline, its monitoring dashboard, and its catalog entry
already correct on day one.

## Step 1 — Define what the template asks for

Every template starts with its parameters — the short form a developer fills in, kept
deliberately small:

```yaml
# templates/nodejs-service/template.yaml
apiVersion: scaffolder.backstage.io/v1beta3
kind: Template
metadata:
  name: nodejs-service
  title: Node.js Service (Golden Path)
  description: A production-ready Node.js service with CI/CD, monitoring, and GitOps deploy already wired in
spec:
  parameters:
    - title: Service details
      required: [name, owner]
      properties:
        name:
          type: string
          description: Name of the new service, e.g. order-notifications
        owner:
          type: string
          description: Owning team, e.g. group:checkout-team
```

Two required fields, nothing more. A golden path earns its name by making the easy path the
correct one — every value a developer *doesn't* have to type is a value that can't be typed
wrong.

## Step 2 — Build the skeleton with CI/CD, monitoring, and GitOps already wired in

The skeleton is what actually gets copied and filled in. This is where "golden path" stops
being a slogan and becomes three concrete files sitting next to the application code, before
a single line of business logic exists:

```yaml
# templates/nodejs-service/skeleton/catalog-info.yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: ${{ values.name }}
  annotations:
    github.com/project-slug: acme-corp/${{ values.name }}
spec:
  type: service
  lifecycle: experimental
  owner: ${{ values.owner }}
```

```yaml
# templates/nodejs-service/skeleton/.ci/pipeline.yaml
extends: templates/reusable-nodejs-pipeline@v3   # Chapter 6's shared pipeline template
stages: [build, test, scan, deploy]
deploy:
  target: gitops-config-repo
  path: apps/${{ values.name }}/overlays/dev      # Chapter 4's dev overlay, created empty below
```

```yaml
# templates/nodejs-service/skeleton/monitoring/dashboard.json
{
  "service": "${{ values.name }}",
  "panels": ["request_rate", "error_rate", "p99_latency", "deploy_markers"]
}
```

Notice what each file does: the pipeline config doesn't define CI/CD from scratch, it
*extends* the shared template from Chapter 6, so a fix to that shared template reaches this
new service the same way it reaches every other one. The dashboard ships with the four panels
every service needs on day one, instead of waiting for an on-call engineer to build one after
the first incident.

## Step 3 — Wire the scaffolder's three actions

```yaml
# templates/nodejs-service/template.yaml (continued)
spec:
  steps:
    - id: fetch
      name: Fetch skeleton
      action: fetch:template
      input:
        url: ./skeleton
        values:
          name: ${{ parameters.name }}
          owner: ${{ parameters.owner }}
    - id: publish
      name: Publish to GitHub
      action: publish:github
      input:
        repoUrl: github.com?repo=${{ parameters.name }}&owner=acme-corp
    - id: register
      name: Register in catalog
      action: catalog:register
      input:
        repoContentsUrl: ${{ steps.publish.output.repoContentsUrl }}
        catalogInfoPath: /catalog-info.yaml
    - id: gitops-scaffold
      name: Create empty dev/staging/prod overlays
      action: fs:rename
      input:
        files:
          - from: skeleton/overlays
            to: ../gitops-config/apps/${{ parameters.name }}/overlays
```

Four steps, run in order: fill in the skeleton, push it as a real repo, register that repo in
the catalog, and seed the GitOps config repo's overlay directories so Chapter 4's
directory-per-environment pattern already has somewhere to deploy to. Skipping the fourth step
would leave a service with a pipeline that has nowhere to actually send a build.

## Step 4 — Run it and verify both halves of "done"

```
# In the Backstage UI: Create > Node.js Service (Golden Path)
# name: order-notifications
# owner: group:checkout-team
```

A golden path template isn't done when the wizard finishes — it's done when two separate
things are both true. Check the pipeline:

```
$ ci-tool status order-notifications
build   PASS
test    PASS
scan    PASS
deploy  PASS (envs/dev synced by ArgoCD)
```

Then check the catalog, independently:

```
$ backstage-cli catalog:get order-notifications
name: order-notifications
owner: group:checkout-team
lifecycle: experimental
dependsOn: []
```

Green CI only proves the pipeline ran. A catalog entry that actually resolves, with the right
owner and lifecycle, proves the *registration* half of the golden path worked too — and it's
the half that silently fails most often, because a broken `catalog:register` step still lets
`publish:github` succeed.

## Key terms

| Term | Meaning |
|---|---|
| Golden-path template | A software template whose skeleton already has CI/CD, monitoring, and a GitOps deploy path wired in |
| `fetch:template` | The scaffolder action that fills the skeleton's placeholders with the form's values |
| `catalog:register` | The scaffolder action that adds the newly created repo to the catalog automatically |
| Skeleton | The templated source tree a scaffolder step copies and fills in — the actual deliverable of a golden path |

## Check yourself

You're ready for Lesson 30 when you can explain, without looking: why does extending
Chapter 6's shared pipeline template from inside the skeleton matter more than just copying a
working CI config into it, and what specifically would a developer notice missing if
Step 3's `catalog:register` action were silently removed?
