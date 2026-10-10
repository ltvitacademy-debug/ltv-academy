# Lesson 3 — Validation

**Chapter 1 · Automating Delivery · Lesson 3 of 19**

## What you'll learn

- What a "validation-only" deployment actually does differently from a real deployment
- The real `sf project deploy validate` command and the job ID it hands back
- How `sf project deploy quick` turns a passed validation into an actual deployment without re-running tests
- Why sandboxes use a different pattern than production for this same idea

## Deploying is risky; validating first is not

A deployment to production that includes Apex has to run tests, and running `RunLocalTests` or `RunAllTestsInOrg` against a large org can take a long time. If you kick off a real deployment and it fails after forty-five minutes of test execution, you've burned that time and still have a broken release. **Validation** solves this: it runs the exact same checks — compiling every component, running the required tests, checking coverage — against the target org, without actually making any of the changes permanent. You find out whether a deployment *would* succeed before you commit to it.

## Validating with the CLI

```bash
sf project deploy validate \
  --manifest package.xml \
  --test-level RunLocalTests \
  --target-org production \
  --verbose
```

This behaves almost identically to `sf project deploy start`, except Apex tests are mandatory (you can't validate without specifying a real test level), and instead of changing the org, the command hands back a **validation job ID**. That job ID is valid for **10 days** from when the validation started.

## Turning a validation into a real deployment

Once a validation has passed, you don't need to re-run the tests to actually deploy — that's the entire point of having validated first. You pass the job ID to a different command:

```bash
sf project deploy quick --job-id 0Af_your_job_id_here --target-org production
```

`sf project deploy quick` deploys the already-validated metadata without re-running Apex tests, which is why it's meaningfully faster than a normal deploy. The metadata you deploy this way overwrites the corresponding components in the org — it's a real deployment, just one whose test risk was already retired by the validation step.

## Sandboxes work differently

`sf project deploy validate` and `sf project deploy quick` are specifically intended for **production** deployments, where the two-step validate-then-quick-deploy pattern matters because tests are mandatory and slow. Salesforce's own guidance is not to use `deploy validate` against sandboxes. For a sandbox, the equivalent "will this work without actually touching anything" check is a **dry run**:

```bash
sf project deploy start --dry-run --test-level RunLocalTests --target-org my-sandbox
```

`--dry-run` on `sf project deploy start` does the same conceptual job as validation — check without committing — but through the regular deploy command rather than the validate/quick-deploy pair, and it doesn't produce a reusable job ID the way `deploy validate` does.

## Where this fits in a pipeline

A mature pipeline uses validation as a **quality gate** ahead of a production release: a pull request merging into a release branch triggers `deploy validate` automatically; if it passes, a human (or a scheduled release job) triggers `deploy quick` using that validation's job ID to actually ship it, inside the 10-day window. This cleanly separates "did we prove this is safe" from "did we actually do it" — the same separation Continuous Delivery draws between automated verification and the deliberate release action.

## Key terms

| Term | Meaning |
|---|---|
| Validation-only deployment | Runs every deploy check (compile, test, coverage) without making changes permanent |
| `sf project deploy validate` | The CLI command that performs a validation-only deployment against production |
| Validation job ID | The identifier a passed validation returns, usable for 10 days |
| `sf project deploy quick` | Deploys an already-validated job ID without re-running tests |
| `--dry-run` | The sandbox-appropriate equivalent of validation, used with `deploy start` |

## Lab

Write the two commands a production release pipeline would run back to back: first, validate a deployment described by `package.xml` with `RunLocalTests` against an org aliased `prod`; second, assuming that validation returned job ID `0Af9X00000ABCDE`, quick-deploy it to the same org. Then write a one-sentence justification for why a pipeline should never skip straight to `sf project deploy start` against production without validating first.

## Check yourself

Can you explain, in your own words, why `sf project deploy quick` is faster than a normal deploy, and why that speed doesn't come at the cost of safety? Can you say why validation isn't the recommended pattern for sandbox deployments, and what you'd use instead?
