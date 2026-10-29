# Lesson 30 — Lab: Adding a Security Gate to a Real CI/CD Pipeline

**Chapter 8 · Capstone: An Automated Detection-to-Response Pipeline · Lesson 30 of 32**

## What you'll learn

- How to add real dependency scanning and static analysis steps to a GitHub
  Actions workflow, the same `pip-audit` and `bandit` tools Chapter 6 covered
- How to write a small gate script that parses two different scanners' JSON
  output into one pass/fail decision, instead of trusting each tool's own
  exit code in isolation
- Why the gate fails the build only on Critical and High findings, and what
  that threshold choice protects against
- How to confirm the gate actually blocks a merge, not just that it runs

## The scenario

Bramwell Logistics' detection-to-containment script from Lesson 29 now lives
in a real git repository with pull requests, code review, and a path to
production. That's exactly the kind of repository Chapter 7 warned
shouldn't ship without its own protections — a script with Microsoft Graph
and Sentinel credentials, written by a small team under time pressure, is a
believable place for a vulnerable dependency or a hard-coded secret to slip
through review unnoticed. This lab adds the gate that Chapter 6 built in
theory to this specific pipeline.

## Step 1: add a dependency scan to the workflow

```yaml
# .github/workflows/ci-security-gate.yml
name: ci-security-gate

on:
  pull_request:
    branches: [main]

jobs:
  security-gate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"

      - name: Install dependencies
        run: pip install -r requirements.txt

      - name: Dependency scan (pip-audit)
        run: pip-audit -r requirements.txt -f json -o pip-audit-report.json
        continue-on-error: true
```

`continue-on-error: true` is intentional here, not an oversight. `pip-audit`
itself exits non-zero the moment it finds anything, including a single Low
finding — which would fail the build before the gate script ever gets to
apply Bramwell's own, more deliberate threshold.

## Step 2: add static analysis for the script's own code

```yaml
      - name: Static analysis (bandit)
        run: bandit -r src/ -f json -o bandit-report.json
        continue-on-error: true
```

`bandit` scans the Python source directly — exactly the kind of check that
would catch something like a hard-coded Graph API client secret, or the
`execute_containment` function from Lesson 29 being called somewhere with
`dry_run=False` hard-coded in, rather than passed in from a reviewed config.

## Step 3: write one gate script that reads both reports

Trusting two different scanners' own exit codes means maintaining two
different failure thresholds in two different places. Instead, one script
reads both JSON reports and makes a single decision:

```python
# scripts/security_gate.py
import argparse
import json
import sys

def count_blocking_findings(pip_audit_path, bandit_path):
    blocking = 0

    pip_audit = json.load(open(pip_audit_path))
    for dep in pip_audit.get("dependencies", []):
        for vuln in dep.get("vulns", []):
            if vuln.get("severity", "").upper() in {"CRITICAL", "HIGH"}:
                blocking += 1

    bandit = json.load(open(bandit_path))
    for result in bandit.get("results", []):
        if result["issue_severity"] == "HIGH":
            blocking += 1

    return blocking

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--pip-audit", required=True)
    parser.add_argument("--bandit", required=True)
    args = parser.parse_args()

    blocking = count_blocking_findings(args.pip_audit, args.bandit)
    print(f"Critical/High findings: {blocking}")

    if blocking > 0:
        print("Security gate FAILED -- blocking merge.")
        sys.exit(1)

    print("Security gate passed.")
    sys.exit(0)

if __name__ == "__main__":
    main()
```

## Step 4: pick the threshold on purpose, not by accident

Lesson 24's whole argument was that a gate which fails the build on every
Low and Medium finding trains developers to ignore it within a week.
`count_blocking_findings()` only counts Critical and High severity — a
known-bad transitive dependency or a real hard-coded secret — and leaves
everything below that to show up in the PR as a visible but non-blocking
report. That threshold is a policy decision Bramwell's team made explicitly,
not a default nobody looked at.

## Step 5: wire the gate script into the workflow

```yaml
      - name: Evaluate security gate
        run: python scripts/security_gate.py --pip-audit pip-audit-report.json --bandit bandit-report.json

      - name: Upload scan reports
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: security-scan-reports
          path: |
            pip-audit-report.json
            bandit-report.json
```

The `if: always()` on the upload step matters: if the gate step above it
fails and stops the job, the reports still get attached to the failed run so
a reviewer can see exactly which finding blocked the merge, instead of
re-running the scan locally to find out.

## Step 6: prove the gate actually blocks, not just runs

A gate that only ever reports "passed" has never been tested. Confirm it in
both directions:

1. Open a pull request against the repo's current `requirements.txt` and
   watch the workflow run and pass.
2. Open a second pull request that pins a dependency with a known published
   Critical vulnerability, and confirm the `security-gate` job turns red and
   the PR shows it as a required, failing check — not just a warning
   annotation someone can scroll past.
3. Revert that pin and confirm the job goes green again on the next push.

Only after seeing it fail on purpose, once, is the gate verified — the same
principle Chapter 7's secrets-scanning lesson applied to a planted test
credential.

## Key terms

| Term | Meaning |
|---|---|
| `continue-on-error: true` | Lets a scanning step finish and produce its report even when it would otherwise exit non-zero and abort the job |
| Severity threshold | The deliberate choice of which finding severities actually fail the build, versus which are reported but non-blocking |
| Gate script | A small script that turns one or more scanners' raw output into a single pass/fail decision the pipeline enforces |
| Required check | A CI job GitHub (or another platform) is configured to block merging on if it fails |

## Check yourself

You're ready for Lesson 31 when you can explain, without looking: why does
`security_gate.py` read both scanners' JSON output itself instead of relying
on `pip-audit` and `bandit`'s own exit codes, and what would go wrong if the
dependency-scan step didn't have `continue-on-error: true`?
