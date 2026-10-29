# Lesson 21 — Reusable Pipeline Templates Across Many Repos

**Chapter 6 · Pipeline-as-Code at Scale · Lesson 21 of 4**

## What you'll learn

- Why copy-pasting CI/CD YAML into every repository turns into an
  organization-wide maintenance problem as the repo count grows
- How GitHub Actions **reusable workflows** (`workflow_call`) let one
  canonical pipeline definition run inside hundreds of repos
- How Azure DevOps achieves the same thing with **pipeline templates**
  and the `extends` keyword
- How to design a template's inputs/secrets contract so it stays
  flexible without turning into a dumping ground of special cases

## The problem: the same 200 lines, copied 300 times

Picture an organization with 300 repositories, each one running its
own `.github/workflows/ci.yml` or `azure-pipelines.yml`. Early on,
someone writes a solid pipeline — checkout, install, test, scan,
build, deploy — and it gets copied into the next repo, and the next.
Eighteen months later, that pipeline logic is duplicated across every
one of those 300 files, each copy having drifted slightly: one team
added a caching step, another skipped the security scan "temporarily"
and never put it back, a third is still on last year's scan action
version. Nobody can say with confidence what pipeline behavior
actually runs where. Fixing a bug in the shared logic means finding
and editing 300 files, not one.

**Reusable pipeline templates** solve this the same way a shared
library solves duplicated application code: write the logic once, in
one place, and have every consuming repo reference it instead of
owning a copy.

## GitHub Actions: reusable workflows

A GitHub Actions **reusable workflow** is a normal workflow file that
starts with `on: workflow_call` instead of `on: push`. It lives in one
repo — often a dedicated `pipeline-templates` repo — and declares the
inputs and secrets it needs:

```yaml
# pipeline-templates repo: .github/workflows/build-test-scan.yml
name: Reusable Build, Test & Scan

on:
  workflow_call:
    inputs:
      node-version:
        required: false
        type: string
        default: "20"
    secrets:
      NPM_TOKEN:
        required: true

jobs:
  build-test-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ inputs.node-version }}
      - run: npm ci
      - run: npm test
      - name: Required security scan
        run: npm audit --audit-level=high
```

Any consuming repo calls it with a single `uses:` line that points at
the template repo and a version tag — `@v1`, not `@main` — so every
consumer's build is reproducible and immune to changes landing on the
template's default branch:

```yaml
# consuming repo: .github/workflows/ci.yml
name: CI
on: [push]

jobs:
  run-shared-pipeline:
    uses: my-org/pipeline-templates/.github/workflows/build-test-scan.yml@v1
    with:
      node-version: "20"
    secrets:
      NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

That one `uses:` line replaces the entire 200-line pipeline the repo
used to own directly. The security scan step is no longer something
each team remembers (or forgets) to add — it's baked into the
template every caller gets by default.

## Azure DevOps: templates and `extends`

Azure DevOps reaches the same outcome with **pipeline templates**
stored in their own repository and referenced through
`resources.repositories`. A step/job/stage template looks like this:

```yaml
# templates repo: templates/build-test-scan.yml
parameters:
  - name: nodeVersion
    type: string
    default: "20.x"

steps:
  - task: NodeTool@0
    inputs:
      versionSpec: ${{ parameters.nodeVersion }}
  - script: npm ci
  - script: npm test
  - script: npm audit --audit-level=high
    displayName: "Required security scan"
```

A consuming repo's `azure-pipelines.yml` pins a specific tag of the
templates repo and extends it, rather than copying its steps:

```yaml
resources:
  repositories:
    - repository: templates
      type: git
      name: PlatformEngineering/pipeline-templates
      ref: refs/tags/v1

extends:
  template: templates/build-test-scan.yml@templates
  parameters:
    nodeVersion: "20.x"
```

`extends` is the important keyword here — it means the consuming
pipeline cannot simply skip steps the template defines, which is
exactly the property you want when a required scan step lives in the
template. A `steps`/`jobs`-level template (included with `template:`
inside a `steps:` list) is more composable but easier for a team to
work around; `extends` is the stronger guarantee for anything meant to
be non-optional.

## Designing the contract: inputs, not special cases

The temptation once a template exists is to keep adding `if` branches
inside it for every team's quirks. Resist that. A healthy template
exposes a small, explicit set of **inputs** (language version, test
command, whether to deploy) and leaves everything else as a sane
default. If a team's need doesn't fit the existing inputs, that's a
signal to either add one well-named input for everyone's benefit, or
conclude their use case genuinely belongs in a different template —
not to bolt on a one-off conditional that only ever applies to them.

## Key terms

| Term | Meaning |
|---|---|
| Reusable workflow | A GitHub Actions workflow starting with `on: workflow_call`, called by other workflows via a versioned `uses:` reference |
| Pipeline template | An Azure DevOps YAML file of parameterized steps/jobs/stages, referenced from another pipeline instead of copied into it |
| `extends` | The Azure DevOps keyword that lets a consumer pipeline inherit a template's structure without being able to silently drop its required steps |
| Version pin (`@v1`, `ref: refs/tags/v1`) | Locking a consumer to a specific tagged release of the template repo instead of its moving default branch |

## Check yourself

You're ready for Lesson 22 when you can explain, without looking: why
does pinning a consumer to `@v1` instead of `@main` matter, and what
is the practical difference between a GitHub Actions reusable
workflow and an Azure DevOps template that uses `extends`?
