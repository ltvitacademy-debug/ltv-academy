# Security Scanning Gate Checklist

> From Lesson 15 (Adding Security Scanning & Secrets Management). A quick reference for
> confirming your own three scanners are real blocking gates, not advisory-only steps — the
> exact distinction Category 4 of the acceptance rubric scores on.

## The three scanners, what each one actually blocks

| Scanner | Scans | Blocks on | Where it runs |
|---|---|---|---|
| **Trivy** | The built container image | Any CRITICAL vulnerability with a fix available | CI, after image build |
| **Checkov** | Terraform in `infra/terraform/` | Misconfigured resources (open NSGs, missing encryption) | CI, right after `terraform plan` |
| **gitleaks** | The diff of every commit/PR | Any string matching a secret pattern | Locally (pre-commit hook) AND in CI |

## The gotcha: "wired in" is not the same as "blocking"

A scanner that runs and reports is not the same as a scanner that stops a bad merge. Check your
own CI config for these specific settings before claiming this category is done:

```yaml
# Trivy — this line is what makes it block, not just report:
exit-code: "1"
# Without it, Trivy finds the vulnerability, logs it, and the pipeline
# continues anyway — the scan ran, but it protected nothing.

# Checkov — this line is what makes it block:
soft_fail: false
# soft_fail: true (or omitting the setting, if that's the tool's default)
# means a misconfiguration gets reported but the pipeline still passes.
```

gitleaks blocks by default when it finds a match (the pipeline step itself fails), but confirm
you haven't wrapped it in a step that swallows its exit code (e.g. `continue-on-error: true`) —
that would silently defeat it the same way a missing `exit-code: "1"` defeats Trivy.

## Why gitleaks runs in two places

```
Local pre-commit hook   Catches a leak before it's even pushed —
                          fast feedback, but not guaranteed to be
                          installed on every developer's machine.
CI (every PR)            The backstop that always runs, regardless
                          of whether any individual developer has
                          the local hook set up.
```

Lesson 15's own near-miss (a PaymentPro test API key pasted into `values.yaml`) was caught by
the local hook — but the lesson is explicit that "the CI gitleaks job would have caught the same
thing even if the local hook had been skipped." Don't treat the local hook as sufficient on its
own; verify the CI step would catch the same leak independently.

## Verifying your own gates actually work (don't just read the YAML)

1. Find or construct a container image with a known CRITICAL CVE and confirm the pipeline
   actually fails the build — not just that Trivy's step shows findings in its log.
2. Introduce a deliberately open security rule (e.g. a `0.0.0.0/0` ingress) in a Terraform
   feature branch and confirm Checkov blocks the PR before merge.
3. Attempt to commit a fake, obviously-not-real API-key-shaped string and confirm gitleaks stops
   the commit (or the PR, if testing only the CI path).

If any of the three doesn't actually stop the pipeline when tested this way, it's reporting-only
— fix the blocking configuration before claiming Category 4's points.
