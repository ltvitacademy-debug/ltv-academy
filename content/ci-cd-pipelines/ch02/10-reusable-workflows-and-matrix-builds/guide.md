# Reusable Workflows & Matrix Builds

Northbridge Retail's `storefront` now needs to run its test suite against
three supported Node.js versions, and the same lint-then-test pattern keeps
getting copy-pasted into every other repository on the team. This lesson
covers the two features built for exactly those problems: **matrix builds**,
which multiply one job across many configurations, and **reusable
workflows**, which let one workflow file be called from many others.

## What you'll learn

- How `strategy.matrix` turns one job definition into several parallel runs
- How to read a matrix's progress in the real GitHub Actions run graph
- How to define a reusable workflow with `workflow_call`
- How another workflow calls it, passing inputs and secrets in

## Matrix builds: one job, many configurations

Instead of writing three near-identical jobs, storefront defines one and
lets GitHub multiply it:

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20, 22]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm ci
      - run: npm test
```

GitHub runs this job three times in parallel, once per value in
`node-version`, substituting `${{ matrix.node-version }}` each time. By
default, if any one combination fails, GitHub cancels the others
(`fail-fast: true`) — set it to `false` when you want every combination's
result even after one fails.

A run's visualization graph shows a matrix exactly as what it is — one
logical job, fanned out:

![Screenshot of a GitHub Actions workflow run graph, showing a "Matrix: unit-test" node reporting 3 of 3 jobs completed.](/courses/ci-cd-pipelines/ch02/10-reusable-workflows-and-matrix-builds/workflow-graph.png)
*"3/3 jobs are completed" — three Node versions, one job definition, run in parallel.*
Source: [GitHub Docs — Using the visualization graph](https://docs.github.com/en/actions/how-tos/monitor-workflows/use-the-visualization-graph)

## Reusable workflows: write it once

A workflow becomes callable by another workflow the moment it declares
`workflow_call` as a trigger:

```yaml
# .github/workflows/lint-and-test.yml
name: Lint and Test

on:
  workflow_call:
    inputs:
      node-version:
        type: string
        default: "20"
    secrets:
      NPM_TOKEN:
        required: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ inputs.node-version }}
      - run: npm ci
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
      - run: npm test
```

Any other workflow in the same (or another) repository calls it with
`uses:` instead of a normal job body:

```yaml
jobs:
  call-lint-and-test:
    uses: northbridge-retail/storefront/.github/workflows/lint-and-test.yml@main
    with:
      node-version: "20"
    secrets:
      NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Northbridge Retail keeps `lint-and-test.yml` in one place and calls it from
`storefront`, its admin dashboard repo, and its internal CLI tool — three
workflows, one real definition to maintain.

## Key terms

| Term | Meaning |
|---|---|
| `strategy.matrix` | Runs one job definition once per combination of listed values |
| `fail-fast` | Whether GitHub cancels remaining matrix jobs after one fails (default `true`) |
| `workflow_call` | The trigger that makes a workflow callable by another workflow |
| `inputs` / `secrets` (reusable) | Values a caller passes into a reusable workflow |
| Caller workflow | The workflow that invokes a reusable workflow with `uses:` |
