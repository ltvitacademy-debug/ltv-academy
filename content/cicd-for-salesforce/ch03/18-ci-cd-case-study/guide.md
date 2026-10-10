# Lesson 18 — CI/CD Case Study

**Chapter 3 · Operating Pipelines · Lesson 18 of 19**

## What you'll learn

- How every piece from Lessons 1–17 fits into one coherent, realistic pipeline
- A complete, annotated `.github/workflows/release.yml` combining checkout, auth, delta, quality gates, and a production release
- Where a real incident in this scenario would actually get caught — and where it wouldn't
- How to reason about a pipeline as a whole system, not a list of independent features

## The scenario

A fictional but realistic team, "Meridian Logistics," runs a single Salesforce org with one shared `integration` sandbox and production. Three developers work on feature branches, open pull requests into `integration`, and a release manager periodically promotes a tested state of `integration` into production. They've built up, piece by piece, exactly the pipeline this course has been teaching.

## The full pipeline, annotated

```yaml
name: Release Pipeline

on:
  pull_request:
    branches: [integration]
  push:
    branches: [integration]
  workflow_dispatch:   # manually triggered production release

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }                     # Lesson 10 — full history for delta
      - uses: actions/setup-node@v4
        with: { node-version: "20" }
      - run: npm install --global @salesforce/cli      # Lesson 7
      - run: sf plugins install sfdx-git-delta          # Lesson 10
      - name: Authenticate                              # Lesson 9
        env:
          SF_PRIVATE_KEY: ${{ secrets.SF_PRIVATE_KEY }}
          SF_CLIENT_ID: ${{ secrets.SF_CLIENT_ID }}
          SF_USERNAME: ${{ secrets.SF_USERNAME }}
          SF_INSTANCE_URL: ${{ secrets.SF_INSTANCE_URL }}
        run: |
          printf '%s\n' "$SF_PRIVATE_KEY" > server.key
          sf org login jwt --client-id "$SF_CLIENT_ID" --jwt-key-file server.key \
            --username "$SF_USERNAME" --instance-url "$SF_INSTANCE_URL" --alias target
          rm -f server.key
      - name: Static analysis                           # Lessons 11-12
        run: sf code-analyzer run --target "force-app/**/*.cls" --rule-selector pmd --output-file results.json
      - name: Generate delta                             # Lesson 10
        run: sf sgd source delta --to "HEAD" --from "HEAD~1" --output "."
      - name: Deploy delta with tests                     # Lessons 2, 8, 11
        run: |
          sf project deploy start --manifest package/package.xml \
            --post-destructive-changes destructiveChanges/destructiveChanges.xml \
            --test-level RunLocalTests --target-org target --wait 45 --json

  release-to-production:
    if: github.event_name == 'workflow_dispatch'
    needs: validate
    runs-on: ubuntu-latest
    environment: production   # Lesson 5 — required reviewer approval gate
    steps:
      - uses: actions/checkout@v4
      - run: npm install --global @salesforce/cli
      - name: Validate against production                # Lesson 3
        run: sf project deploy validate --manifest package.xml --test-level RunLocalTests --target-org production --json
      - name: Quick deploy                                 # Lesson 3
        run: sf project deploy quick --job-id ${{ env.VALIDATION_JOB_ID }} --target-org production
```

## Walking the incident through it

Six months in, a developer's feature branch adds a trigger that references a custom field nobody included in the same pull request. Here's where the pipeline actually catches it, and where it doesn't:

- **Static analysis** (the PMD step) would likely miss this — a missing-dependency problem isn't a code-quality pattern PMD's rules look for.
- **The delta-deploy step** is exactly where this surfaces: the deploy fails with a component-level error (Lesson 15) naming the missing field reference, and the job exits non-zero, blocking the pull request's required check.
- If this had somehow slipped past review into `integration` anyway (say, the missing field existed in `integration` by coincidence but not production), the **production validation step** would catch it before `release-to-production` ever reaches the quick-deploy step — exactly the scenario validation (Lesson 3) exists for.
- What the pipeline would **not** catch on its own: whether the trigger's business logic is actually correct. Tests passing and coverage being met proves the code does what its own tests say it should — it doesn't prove those tests encode the right requirement. That gap is why code review, not just pipeline automation, still matters.

## Key terms

| Term | Meaning |
|---|---|
| `workflow_dispatch` | A manually-triggered GitHub Actions event, used here for a deliberate release |
| `needs:` | A job-level dependency ensuring one job only runs after another succeeds |
| Required reviewer | The human approval gate on a GitHub Actions environment (Lesson 5) |

## Lab

Trace a second scenario through this same pipeline: a developer's Apex test asserts against a record type that exists in their own scratch org but not in the `integration` sandbox. At which named step above would this fail, and what would the error actually look like in the deploy's structured output? Write your answer as a short paragraph referencing the specific step name.

## Check yourself

Can you walk through this pipeline top to bottom and name, for each step, which earlier lesson taught you what it does and why it's there? Can you identify one category of real-world bug this pipeline, as designed, would not catch — and explain why that's a gap in requirements verification rather than a flaw in the pipeline's engineering?
