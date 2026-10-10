# Lesson 2 — Automated Testing

**Chapter 1 · Automating Delivery · Lesson 2 of 19**

## What you'll learn

- Why a pipeline can't skip Apex tests the way a careless admin might skip them in a sandbox
- The real `sf apex run test` command, its coverage flags, and what "detailed coverage" actually shows you
- The four `--test-level` values and when each one actually gets used
- The 75% org-wide Apex coverage requirement that gates every production deployment

## Why automated testing is the backbone of Salesforce CI/CD

Apex is one of the few parts of Salesforce where the platform itself enforces a testing discipline — you cannot deploy Apex classes or triggers to production without unit tests covering a meaningful share of that code. CI/CD doesn't invent this requirement; it automates checking it on every single change, instead of a developer manually running tests "when they remember to." A pipeline step that runs tests automatically on every pull request catches a broken trigger the moment it's introduced, not three weeks later when someone tries to deploy to production and the whole release is blocked.

## Running Apex tests from the CLI

The Salesforce CLI command for this is `sf apex run test`:

```bash
sf apex run test \
  --test-level RunLocalTests \
  --code-coverage \
  --result-format human \
  --detailed-coverage \
  --target-org ci-scratch \
  --wait 20
```

- `--code-coverage` turns on coverage reporting, and the CLI requires `--result-format` alongside it.
- `--detailed-coverage` (used with the human-readable format) breaks coverage down per test method, not just per class — useful for spotting exactly which lines a test suite is missing.
- `--target-org` points at whichever org or scratch org the pipeline is testing against.
- `--wait` tells the CLI how many minutes to wait for the run to finish before returning control; test runs are asynchronous by default and return a test run ID you can poll later with `sf apex get test --test-run-id <id>` if you don't wait.
- Running this command requires the "View All Data" permission on the authenticated user — something to check when a CI integration user mysteriously can't pull coverage numbers.

## The four test levels

The `--test-level` flag accepts exactly one of:

- **`RunSpecifiedTests`** — runs only the Apex test classes you name with `--tests` or `--class-names`. Fastest, but only covers what you explicitly listed.
- **`RunLocalTests`** — runs every test in the org *except* tests belonging to installed managed and unlocked packages. This is the default Salesforce uses for production deployments that include Apex.
- **`RunAllTestsInOrg`** — runs absolutely everything, including managed package tests. Slowest, most complete.
- **`RunRelevantTests`** (Beta) — Salesforce analyzes the deployment payload and its dependencies and runs only the tests it determines are related. Useful for speed, but still a beta feature — most pipelines in this course default to `RunLocalTests` for anything deploying to production, and reserve `RunSpecifiedTests` for faster feedback on feature branches against a scratch org.

Deployments to sandboxes and Developer Edition orgs don't run any tests by default unless you tell them to — which is exactly why a CI pipeline should **always** pass `--test-level` explicitly rather than relying on the default. An unspecified test level in a shared pipeline can silently mean zero tests ran and zero coverage was checked.

## The 75% gate

Before Apex classes and triggers can be deployed to a production org (or included in a managed package), the tests you run must cover at least 75% of the total Apex code lines in that org, and every individual class and trigger in the deployment also has its own coverage floor the platform checks. This isn't a pipeline convention — it's enforced by the platform itself at deploy time. A CI pipeline's job is to **surface** that number early, in a pull request, rather than letting a developer discover it's too low only when a production deployment fails.

## Key terms

| Term | Meaning |
|---|---|
| `sf apex run test` | The CLI command that runs Apex tests, synchronously or asynchronously |
| `--code-coverage` | Flag that includes code coverage numbers in the test run's output |
| `--test-level` | Flag selecting which tests run: specified, local, all-org, or relevant |
| `RunLocalTests` | Runs every test except those from installed managed/unlocked packages |
| 75% coverage requirement | The platform's minimum Apex coverage to deploy to production |

## Lab

Pick (or imagine) an Apex trigger and its test class. Write the exact `sf apex run test` command you'd run in a CI job to: run only that one test class, print human-readable output, and show per-method coverage detail. Then write a second command that would be appropriate for a final production-bound pipeline stage instead — one that runs every local test and reports coverage in JSON instead of human-readable format.

## Check yourself

Can you name all four `--test-level` values and say, for each one, one real situation in a pipeline where you'd choose it over the other three? Can you explain why a pipeline should never leave `--test-level` unspecified?
